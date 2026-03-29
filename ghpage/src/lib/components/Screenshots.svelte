<script>
	import { base } from '$app/paths';
	const screenshots = [
		{
			src: `${base}/assets/im.webp`,
			alt: 'Echo Pulse - Interface Design',
			label: 'Modern Experience',
			large: true
		},
		{
			src: `${base}/assets/player.png`,
			alt: 'Echo Pulse - Player View',
			label: 'Player View'
		},
		{
			src: `${base}/assets/lyric2.png`,
			alt: 'Echo Pulse - Time-Synced Lyrics',
			label: 'Time-Synced Lyrics'
		},
		{
			src: `${base}/assets/quielist.png`,
			alt: 'Echo Pulse - Queue & Playlist',
			label: 'Playlist Management'
		},
		{
			src: `${base}/assets/home.png`,
			alt: 'Echo Pulse - Home Screen Feed',
			label: 'Home Feed'
		},
		{
			src: `${base}/assets/login2.png`,
			alt: 'Echo Pulse - Integration Sources',
			label: 'Integration & Sources'
		}
	];
</script>

<!-- SCREENSHOTS -->
<section class="py-[84px] px-5 md:px-8 max-w-[1040px] mx-auto scroll-mt-[100px]" id="screenshots">
	<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9">
		<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
		Screenshots
	</div>
	
	<h2 class="font-serif text-[clamp(32px,4.5vw,52px)] font-light tracking-[-0.04em] leading-[1.02] text-c-t1 mb-10">
		See Echo Pulse <em class="italic">in action.</em>
	</h2>
	
	<!-- Top large screenshot -->
	{#if screenshots[0].large}
		<div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
			<div class="col-span-1 md:col-span-2 rounded-[14px] overflow-hidden border-[1.5px] border-c-b1 shadow-sh-md">
				<img src="{screenshots[0].src}" alt="{screenshots[0].alt}" class="w-full h-auto block object-cover max-h-[400px]" loading="lazy">
			</div>
		</div>
	{/if}
	
	<!-- Grid of smaller screenshots -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
		{#each screenshots as screenshot, i}
			{#if !screenshot.large}
				<div class="rounded-[14px] overflow-hidden border-[1.5px] border-c-b1 shadow-sh-md bg-white flex flex-col justify-between">
					<img src="{screenshot.src}" alt="{screenshot.alt}" class="w-full h-auto block object-cover max-h-[500px]" loading="lazy">
					<div class="font-mono text-[9px] tracking-[0.08em] uppercase text-c-t3 px-3.5 py-2 border-t border-c-b1 bg-c-s1 mt-auto">
						{screenshot.label}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</section>
