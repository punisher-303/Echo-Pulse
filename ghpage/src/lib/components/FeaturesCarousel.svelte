<script>
	// All features remain in a flat array
	const allFeatures = [
		{ icon: 'fa-solid fa-ban', title: 'Ad-Free Experience', desc: 'Say goodbye to interruptions' },
		{ icon: 'fa-solid fa-globe', title: 'Multi-Source Player', desc: 'YouTube, Fuk Saavn & more' },
		{ icon: 'fa-solid fa-code', title: 'Flutter-Powered', desc: 'Beautiful design meets performance' },
		{ icon: 'fa-solid fa-music', title: 'Time-Synced Lyrics', desc: 'Sing along perfectly' },
		{ icon: 'fa-solid fa-download', title: 'Offline Playback', desc: 'Music anywhere, anytime' },
		{ icon: 'fa-solid fa-brain', title: 'AI Recommendations', desc: 'Discover new favorites' },
		{ icon: 'fa-solid fa-table-list', title: 'Playlist Import', desc: 'From various sources' },
		{ icon: 'fa-solid fa-moon', title: 'Sleep Timer', desc: 'Peaceful listening' },
		{ icon: 'fa-solid fa-chart-line', title: 'Global Charts', desc: 'Billboard, Last.fm & more' },
		{ icon: 'fa-solid fa-feather', title: 'Lightweight', desc: 'Minimal data & space usage' },
		{ icon: 'fa-solid fa-share', title: 'Playlist Sharing', desc: 'Share your music taste' },
		{ icon: 'fa-solid fa-language', title: 'Multi-Language', desc: 'Global accessibility' }
	];

	// Split features into two rows for visual interest
	const midPoint = Math.ceil(allFeatures.length / 2);
	// Duplicate for seamless loop
	const row1 = [...allFeatures.slice(0, midPoint), ...allFeatures.slice(0, midPoint)]; 
	const row2 = [...allFeatures.slice(midPoint), ...allFeatures.slice(midPoint)]; 
</script>

<div class="features-wrapper">
	<!-- Row 1: Scrolls Left -->
	<div class="marquee-track scroll-left">
		{#each row1 as feature}
			<div class="feature-card">
				<i class="{feature.icon}" aria-hidden="true"></i>
				<div class="text-content">
					<b>{feature.title}</b>
					<span>{feature.desc}</span>
				</div>
			</div>
		{/each}
	</div>

	<!-- Row 2: Scrolls Right -->
	<div class="marquee-track scroll-right">
		{#each row2 as feature}
			<div class="feature-card">
				<i class="{feature.icon}" aria-hidden="true"></i>
				<div class="text-content">
					<b>{feature.title}</b>
					<span>{feature.desc}</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.features-wrapper {
		width: 100%;
		overflow: hidden;
		position: relative;
		mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
		margin: 2rem 0;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.marquee-track {
		display: flex;
		gap: 1.5rem;
		width: max-content;
	}

	.scroll-left {
		animation: scroll 40s linear infinite;
	}

	.scroll-right {
		animation: scroll-reverse 45s linear infinite;
	}

	.features-wrapper:hover .marquee-track {
		animation-play-state: paused;
	}

	.feature-card {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		padding: 1.2rem 1.5rem;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		min-width: 280px;
		color: #e0e0e0;
		transition: transform 0.3s ease, border-color 0.3s ease;
	}

	.feature-card:hover {
		transform: scale(1.02);
		border-color: var(--accent-color);
		background: rgba(255, 255, 255, 0.1);
	}

	.feature-card i { 
		font-size: 1.5rem; 
		background: var(--accent-gradient); 
		-webkit-background-clip: text; 
		background-clip: text; 
		color: transparent; 
		width: 30px;
		text-align: center;
	}

	.text-content {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.feature-card b {
		color: #ffffff;
		font-size: 1rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.feature-card span {
		font-size: 0.85rem;
		opacity: 0.8;
	}

	@keyframes scroll {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	@keyframes scroll-reverse {
		0% { transform: translateX(-50%); }
		100% { transform: translateX(0); }
	}

	@media (max-width: 768px) {
		.feature-card {
			min-width: 240px;
			padding: 1rem;
		}
		
		.feature-card b {
			font-size: 0.9rem;
		}
	}
</style>