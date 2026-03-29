<script>
	import { onMount } from 'svelte';
	import { fetchLatestRelease } from '$lib/utils/github';

	export let repo; 
	
	let release = null;
	let loading = true;
	
	onMount(async () => {
		const saved = localStorage.getItem(`latest_rel_body_${repo}`);
		if (saved) release = JSON.parse(saved);
		
		const data = await fetchLatestRelease(repo);
		if (data) {
			release = data;
			localStorage.setItem(`latest_rel_body_${repo}`, JSON.stringify(data));
		}
		loading = false;
	});

	function formatDate(dateStr) {
		if (!dateStr) return '';
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}

	// Simple cleaning of markdown for display
	function cleanMarkdown(md) {
		if (!md) return '';
		return md
			.replace(/###?\s+/g, '')
			.replace(/\*\*/g, '')
			.replace(/__+/g, '')
			.split('\n')[0] + '...'; // Show only first line preview for the card
	}
</script>

<div class="bg-white border-[1.5px] border-c-b2 rounded-[16px] p-5 shadow-sh-1 transition-all hover:border-c-pk-m">
	{#if loading && !release}
		<div class="animate-pulse space-y-3">
			<div class="h-5 bg-c-s2 rounded w-1/3"></div>
			<div class="h-4 bg-c-s2 rounded w-full"></div>
			<div class="h-4 bg-c-s2 rounded w-4/5"></div>
		</div>
	{:else if release}
		<div class="flex items-center justify-between mb-3">
			<h3 class="font-serif text-[18px] text-c-t1">{release.name || release.tag_name}</h3>
			<span class="font-mono text-[9px] text-c-t3 uppercase tracking-[0.05em]">{formatDate(release.published_at)}</span>
		</div>
		<p class="font-sans text-[13px] text-c-t2 leading-[1.6] mb-4">
			{cleanMarkdown(release.body)}
		</p>
		<a href={release.html_url} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 font-mono text-[10px] text-c-pk font-medium uppercase tracking-[0.08em] no-underline hover:opacity-80">
			View Full Changelog
			<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>
			</svg>
		</a>
	{/if}
</div>
