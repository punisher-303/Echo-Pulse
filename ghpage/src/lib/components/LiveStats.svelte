<script>
	import { onMount } from 'svelte';
	import { fetchRepoData, fetchLatestRelease, formatCount } from '$lib/utils/github';

	export let repo; // 'owner/repo'
	export let fallbackVersion = 'v1.0.0';
	export let fallbackStars = '0';
	export let fallbackForks = '0';
	
	let data = null;
	let release = null;
	let loading = true;
	
	onMount(async () => {
		// Try to load from cache
		const cachedData = localStorage.getItem(`repo_data_${repo}`);
		const cachedRelease = localStorage.getItem(`repo_release_${repo}`);
		if (cachedData) data = JSON.parse(cachedData); 
		if (cachedRelease) release = JSON.parse(cachedRelease);
		if (data && release) loading = false;
		
		const [newData, newRelease] = await Promise.all([
			fetchRepoData(repo),
			fetchLatestRelease(repo)
		]);
		
		if (newData) {
			data = newData;
			localStorage.setItem(`repo_data_${repo}`, JSON.stringify(newData));
		}
		if (newRelease) {
			release = newRelease;
			localStorage.setItem(`repo_release_${repo}`, JSON.stringify(newRelease));
		}
		loading = false;
	});
</script>

<div class="flex flex-col items-center gap-3">
	<!-- Version Pill -->
	<div class="inline-flex items-center gap-2 border-[1.5px] rounded-full px-3.5 py-1.5 border-c-b2 bg-white">
		<span class="inline-block w-1.5 h-1.5 rounded-full shrink-0 bg-c-gn"></span>
		<span class="font-mono text-[10px] tracking-[0.06em] text-c-t3">
			Latest: <strong class="text-c-t1 font-normal font-sans">{loading ? fallbackVersion : (release?.tag_name || fallbackVersion)}</strong>
		</span>
	</div>
	
	<!-- Repo Stats -->
	<div class="font-mono text-[10px] tracking-[0.06em] text-c-t3 flex items-center gap-3 flex-wrap justify-center">
		<span class="flex items-center gap-1">
			<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
			</svg>
			{loading ? fallbackStars : formatCount(data?.stargazers_count) + ' Stars'}
		</span>
		<span class="text-c-b3">·</span>
		<span class="flex items-center gap-1">
			<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="M15 14c.2-2 1-3.5 3-4V5c0-1.1-.9-2-2-2h-3L11.5 4.5 10 3H7c-1.1 0-2 .9-2 2v5c2 .5 2.8 2 3 4s0 4-2 4h10c-2 0-2.2-2-2-4z"></path>
			</svg>
			{loading ? fallbackForks : formatCount(data?.forks_count) + ' Forks'}
		</span>
		<span class="text-c-b3">·</span>
		<span>MIT Licensed</span>
		<span class="text-c-b3">·</span>
		<span>No ads · No tracking</span>
	</div>
</div>
