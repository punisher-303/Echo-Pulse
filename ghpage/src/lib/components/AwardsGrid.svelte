<script>
	import { onMount } from 'svelte';

	const projectUrl = 'https://sourceforge.net/projects/echo-pulse/';
	const sfId = '3775631';

	const badges = [
		{ badge: 'oss-open-source-excellence-black', metadata: 'achievement=oss-open-source-excellence' },
		{ badge: 'oss-community-leader-black', metadata: 'achievement=oss-community-leader' },
		{ badge: 'oss-users-love-us-black' },
		{ badge: 'oss-community-choice-black', metadata: 'achievement=oss-community-choice' },
		{ badge: 'oss-rising-star-black', metadata: 'achievement=oss-rising-star' },
		{ badge: 'oss-sf-favorite-black', metadata: 'achievement=oss-sf-favorite' },
	];

	// Duplicate badges to create seamless loop
	const displayBadges = [...badges, ...badges];

	onMount(() => {
		const src = `https://b.sf-syn.com/badge_js?sf_id=${sfId}`;
		const sc = document.createElement('script');
		sc.async = true;
		sc.src = src;
		const p = document.getElementsByTagName('script')[0] || document.body.firstChild;
		p?.parentNode?.insertBefore(sc, p);
	});
</script>

<div class="awards-wrapper">
	<div class="marquee-track">
		{#each displayBadges as b, i}
			<div class="marquee-item">
				<div
					class="sf-root"
					data-id={sfId}
					data-badge={b.badge}
					data-metadata={b.metadata}
					style="width: 140px;"
				>
					<a href={projectUrl} target="_blank" rel="noopener noreferrer">EchoPulse</a>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.awards-wrapper {
		width: 100%;
		max-width: 100%;
		overflow: hidden;
		position: relative;
		mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
		margin-top: 1rem;
		margin-bottom: 3rem;
	}

	.marquee-track {
		display: flex;
		gap: 2rem;
		width: max-content;
		animation: scroll 30s linear infinite;
	}

	.marquee-item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		backdrop-filter: blur(5px);
		transition: transform 0.3s ease;
	}

	.marquee-item:hover {
		transform: translateY(-5px);
		border-color: var(--accent-color);
		background: rgba(255, 255, 255, 0.1);
	}

	.awards-wrapper:hover .marquee-track {
		animation-play-state: paused;
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			/* Translate by half the width (since we duplicated the list) */
			transform: translateX(-50%);
		}
	}
</style>