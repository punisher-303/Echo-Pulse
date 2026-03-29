<script>
	const features = [
		{
			title: 'Seamless Navigation',
			desc: 'Fluid page transitions and an intuitive UI architecture make jumping between artists and albums feel instantaneous.',
			icon: 'fa-solid fa-route'
		},
		{
			title: 'Material 3 Design',
			desc: 'Adheres strictly to the latest Material requirements for responsive, beautiful layouts across all form factors.',
			icon: 'fa-solid fa-paintbrush'
		},
		{
			title: 'Auto Cache',
			desc: 'Intelligent caching system predicts your next track and loads it silently. Playback continues even when connection drops.',
			icon: 'fa-solid fa-sd-card'
		},
		{
			title: 'Background Play',
			desc: 'Listen without bounds. Echo Pulse keeps the music flowing even when your phone is locked or you are using other apps.',
			icon: 'fa-solid fa-circle-play'
		},
		{
			title: 'Sync Lyrics',
			desc: 'Sing along exactly on time. Time-synced lyrics support lets you see every word as it is sung.',
			icon: 'fa-solid fa-microphone-lines'
		},
		{
			title: 'Bulk Download',
			desc: 'Save your entire library offline in just a tap with parallel download acceleration.',
			icon: 'fa-solid fa-cloud-arrow-down'
		}
	];
</script>

<!-- FEATURES -->
<section id="features" class="py-[84px] px-5 md:px-8 max-w-[1040px] mx-auto">
	<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9">
		<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
		What's inside
	</div>
	
	<h2 class="font-serif text-[clamp(32px,4.5vw,52px)] font-light tracking-[-0.04em] leading-[1.02] text-c-t1 mb-3.5">
		Built for <em class="italic text-c-pk">music lovers.</em>
	</h2>
	
	<p class="font-sans text-[14px] text-c-t2 leading-[1.78] max-w-[420px] mb-10">
		Everything you need to play your library or sync streams in ultimate quality.
	</p>
	
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
		{#each features as feature}
			<div class="bg-c-s1 border-c-b1 border-[1.5px] rounded-[13px] p-4 flex gap-3 items-start transition-colors duration-150 hover:border-[var(--accent)]" style="--accent:var(--color-c-pk);--accent-bg:rgba(224,79,106,0.08);">
				<!-- Icon container -->
				<div class="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center shrink-0 mt-[1px]" style="background:var(--accent-bg);">
					<i class="{feature.icon}" style="color:var(--accent); font-size:16px;"></i>
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
