<script>
	import { onMount } from 'svelte';
	import { fetchRepoData, formatCount } from '$lib/utils/github';

	export let repo; // 'owner/repo'
	export let defaultStars = '0';
	
	let stars = defaultStars;
	
	onMount(async () => {
		const saved = localStorage.getItem(`repo_stars_${repo}`);
		if (saved) stars = saved;
		
		const data = await fetchRepoData(repo);
		if (data && data.stargazers_count !== undefined) {
			stars = formatCount(data.stargazers_count);
			localStorage.setItem(`repo_stars_${repo}`, stars);
		}
	});
</script>

<div class="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.06em] text-c-t3">
	<span class="flex items-center gap-1">
		<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
		</svg>
		{stars} Stars
	</span>
</div>
