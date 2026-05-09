<script>
	const features = [
		{
			id: 'ads',
			title: 'Ad-Free Music',
			desc: 'Zero ads, zero interruptions. Just your music, playing the way you want it.'
		},
		{
			id: 'lyrics',
			title: 'Sync Lyrics',
			desc: 'Time-synced karaoke lyrics for all your tracks, even offline.'
		},
		{
			id: 'scrobbler',
			title: 'Last.fm Scrobbler',
			desc: 'Intelligent scrobbling with offline caching. Track your stats anywhere.'
		},
		{
			id: 'offline',
			title: 'Offline Library',
			desc: 'Download your favorite tracks and play them without any internet connection.'
		},
		{
			id: 'canvas',
			title: 'Spotify Canvas',
			desc: 'Experience dynamic looping background video canvases fetched natively behind your tracks.'
		},
		{
			id: 'timer',
			title: 'Sleep Timer',
			desc: 'Fall asleep to your music with a set-and-forget timer for sweet dreams.'
		},
		{
			id: 'mixes',
			title: 'Personalized Mixes',
			desc: 'Create and share your own playlists with friends and the community.'
		},
		{
			id: 'charts',
			title: 'Global Charts',
			desc: 'Stay updated with daily charts from Billboard, Last.fm, and more.'
		},
		{
			id: 'platform',
			title: 'Cross-Platform',
			desc: 'Fully native experience across Android, Windows, and Linux desktops.'
		},
		{
			id: 'efficiency',
			title: 'Data Efficient',
			desc: 'Optimized for minimal data usage and high-quality audio streaming.'
		},
		{
			id: 'storage',
			title: 'Space Saver',
			desc: 'Space-efficient local storage that keeps your device light and fast.'
		},
		{
			id: 'opensource',
			title: 'Open Source',
			desc: 'Transparent, secure, and community-driven. Your music, your app.'
		}
	];
</script>

<!-- FEATURES -->
<section id="features" class="py-[84px] px-5 md:px-8 max-w-[1040px] mx-auto scroll-mt-[100px]">
	<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9">
		<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
		What's inside
	</div>

	<h2 class="font-serif text-[clamp(32px,4.5vw,52px)] font-light tracking-[-0.04em] leading-[1.02] text-c-t1 mb-3.5">
		Built for <em class="italic text-c-pk">music people.</em>
	</h2>
	<p class="font-sans text-[14px] text-c-t2 leading-[1.78] max-w-[420px] mb-10">
		Everything you actually need, nothing you don't. Open source, MIT licensed, free forever.
	</p>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
		{#each features as feature}
			<div class="bg-c-s1 border-c-b1 border-[1.5px] rounded-[13px] p-4 flex gap-3 items-start transition-all duration-150 hover:border-c-pk-m group">
				<!-- Icon container with real vector icons, no emojis -->
				<div class="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 mt-[1px] bg-c-pk-l/30 text-c-pk group-hover:scale-105 transition-transform duration-200">
					{#if feature.id === 'ads'}
						<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
						</svg>
					{:else}
						{#if feature.id === 'lyrics'}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
							</svg>
						{:else if feature.id === 'scrobbler'}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
							</svg>
						{:else if feature.id === 'offline'}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
							</svg>
						{:else if feature.id === 'canvas'}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
								<line x1="7" y1="2" x2="7" y2="22"/>
								<line x1="17" y1="2" x2="17" y2="22"/>
								<line x1="2" y1="12" x2="22" y2="12"/>
								<line x1="2" y1="7" x2="7" y2="7"/>
								<line x1="2" y1="17" x2="7" y2="17"/>
								<line x1="17" y1="17" x2="22" y2="17"/>
								<line x1="17" y1="7" x2="22" y2="7"/>
							</svg>
						{:else if feature.id === 'timer'}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
							</svg>
						{:else if feature.id === 'mixes'}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
								<path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
							</svg>
						{:else if feature.id === 'charts'}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
							</svg>
						{:else if feature.id === 'platform'}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
							</svg>
						{:else if feature.id === 'efficiency'}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M23 6l-9.5 9.5-5-5L1 18"/><polyline points="17 6 23 6 23 12"/>
							</svg>
						{:else if feature.id === 'storage'}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
							</svg>
						{:else}
							<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
								<circle cx="12" cy="12" r="10"/><line x1="14.31" y1="8" x2="20.05" y2="17.94"/><line x1="9.69" y1="8" x2="21.17" y2="8"/><line x1="7.38" y1="12" x2="13.12" y2="2.06"/><line x1="9.69" y1="16" x2="3.95" y2="6.06"/><line x1="14.31" y1="16" x2="2.83" y2="16"/><line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
							</svg>
						{/if}
					{/if}
				</div>
				<!-- Text -->
				<div class="flex-1 min-w-0">
					<div class="font-serif text-[14px] font-normal tracking-[-0.015em] leading-[1.2] mb-[3px] text-c-t1">
						{feature.title}
					</div>
					<p class="font-sans text-[12px] leading-[1.6] text-c-t2">
						{feature.desc}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>
