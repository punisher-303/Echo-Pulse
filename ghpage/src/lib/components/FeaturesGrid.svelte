<script>
	const features = [
		{
			title: 'Ad-Free Music',
			desc: 'Zero ads, zero interruptions. Just your music, playing the way you want it.',
			icon: '🚫'
		},
		{
			title: 'Sync Lyrics',
			desc: 'Time-synced karaoke lyrics for all your tracks, even offline.',
			icon: '📝'
		},
		{
			title: 'Last.fm Scrobbler',
			desc: 'Intelligent scrobbling with offline caching. Track your stats anywhere.',
			icon: '📊'
		},
		{
			title: 'Offline Library',
			desc: 'Download your favorite tracks and play them without any internet connection.',
			icon: '🎵'
		},
		{
			title: 'Playlist Import',
			desc: 'Seamlessly import your existing playlists from YouTube and other sources.',
			icon: '🔽'
		},
		{
			title: 'Sleep Timer',
			desc: 'Fall asleep to your music with a set-and-forget timer for sweet dreams.',
			icon: '⏲️'
		},
		{
			title: 'Personalized Mixes',
			desc: 'Create and share your own playlists with friends and the community.',
			icon: '🎧'
		},
		{
			title: 'Global Charts',
			desc: 'Stay updated with daily charts from Billboard, Last.fm, and more.',
			icon: '🌐'
		},
		{
			title: 'Cross-Platform',
			desc: 'Fully native experience across Android, Windows, and Linux desktops.',
			icon: '🖥️'
		},
		{
			title: 'Data Efficient',
			desc: 'Optimized for minimal data usage and high-quality compression.',
			icon: '📉'
		},
		{
			title: 'Space Saver',
			desc: 'Space-efficient local storage that keeps your device light and fast.',
			icon: '💾'
		},
		{
			title: 'Open Source',
			desc: 'Transparent, secure, and community-driven. Your music, your app.',
			icon: '🔓'
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
			<div class="bg-c-s1 border-c-b1 border-[1.5px] rounded-[13px] p-4 flex gap-3 items-start transition-all duration-150 hover:border-c-pk-m">
				<!-- Icon container -->
				<div class="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 mt-[1px] bg-c-pk-l/30 text-[16px]">
					{feature.icon}
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

