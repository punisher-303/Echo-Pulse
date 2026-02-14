<script>
	import { base } from '$app/paths';
	import Background from '$lib/components/Background.svelte';
	import AssetFigure from '$lib/components/AssetFigure.svelte';
	import ProgressDots from '$lib/components/ProgressDots.svelte';
	import Stats from '$lib/components/Stats.svelte';
	import SupportButtons from '$lib/components/SupportButtons.svelte';
	import FeaturesCarousel from '$lib/components/FeaturesCarousel.svelte';
	import AwardsGrid from '$lib/components/AwardsGrid.svelte';
	import DownloadButtons from '$lib/components/DownloadButtons.svelte';
	import AboutDeveloper from '$lib/components/AboutDeveloper.svelte';
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	const hero = `${base}/assets/im.webp`; // served from static/

	let active = $state(0);
	const total = 5;
	let isMobile = $state(false);
	let contentWrapper;
	let supportHighlighted = $state(false);

	function setActive(i) {
		active = i;
		const section = document.querySelector(`#section-${i}`);
		if (section) {
			// Use Lenis scroll if available via window or just native smooth scroll
			// Since Lenis is on html/body (usually), we can just scrollIntoView
			section.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function handleSupportClick() {
		supportHighlighted = true;
		setTimeout(() => {
			supportHighlighted = false;
		}, 5000);
	}

	// Check if we're on mobile
	function checkMobile() {
		isMobile = window.innerWidth <= 992;
	}

	onMount(() => {
		checkMobile();
		const onResize = () => checkMobile();
		window.addEventListener('resize', onResize);

		// GSAP Animations
		const sections = document.querySelectorAll('.content-section');
		
		sections.forEach((section, i) => {
			// Update active dot based on scroll position
			ScrollTrigger.create({
				trigger: section,
				start: 'top center',
				end: 'bottom center',
				onEnter: () => active = i,
				onEnterBack: () => active = i
			});

			// Animate elements within the section
			const animatable = section.querySelectorAll('h1, h2, p, .anim-target');
			if (animatable.length > 0) {
				gsap.from(animatable, {
					scrollTrigger: {
						trigger: section,
						start: 'top 85%', // Trigger slightly earlier
						toggleActions: 'play none none reverse'
					},
					y: 80, // Larger movement for dramatic effect
					opacity: 0,
					duration: 1.2,
					stagger: 0.15, // Stagger text lines
					ease: 'power4.out' // Heavy, cinematic ease
				});
			}
		});

		return () => {
			window.removeEventListener('resize', onResize);
			ScrollTrigger.getAll().forEach(t => t.kill());
		};
	});
</script>

<svelte:head>
	<title>EchoPulse</title>
</svelte:head>

<Background />
<AssetFigure src={hero} alt="Character listening to music" />

<div class="main-container">
	<ProgressDots count={total} index={active} onChange={setActive} />

	<div class="content-wrapper">
		<section id="section-0" class="content-section">
			<h1 class="home-title">EchoPulse</h1>
			<p class="home-subtitle">Multi-source and open music app for free.</p>
			<div class="support-message anim-target" role="region" aria-label="Support EchoPulse">
				<span class="lead">Keep EchoPulse alive!</span>
				<span class="msg">Your support today fuels every <span class="highlight">future update</span>, keeps EchoPulse <span class="highlight">ad-free</span>, and ensures the tunes <span class="highlight">never stop</span>. ✨</span>
			</div>
			
			<div class="anim-target">
				<Stats on:supportClick={handleSupportClick} />
			</div>
		</section>

		<section id="section-1" class="content-section">
			<h2>SourceForge Recognition</h2>
			<p class="section-subtitle">Proudly recognized by SourceForge community - achieved out of 500,000+ open source projects.</p>
			<div class="anim-target">
				<AwardsGrid />
			</div>
		</section>

		<section id="section-2" class="content-section">
			<!-- <h2>🌟 Why Choose EchoPulse?</h2> -->
			<div class="anim-target">
				<FeaturesCarousel />
			</div>
		</section>

		<section id="section-3" class="content-section">
			<h2>Download Now</h2>
			<div class="anim-target">
				<DownloadButtons />
			</div>
		</section>

		<section id="section-4" class="content-section">
			<div class="anim-target">
				<AboutDeveloper />
			</div>
		</section>
	</div>
</div>

<style>
	/* Global container */
	.main-container {
		width: 100%;
		min-height: 100vh;
		position: relative;
		z-index: 4;
		/* Allow normal scrolling */
	}

	.content-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.content-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 100vh; /* Each section takes at least full viewport height */
		padding: 6rem 5% 6rem 5%; /* Increased padding for breathing room */
		/* Adjust padding right to not overlap with the fixed image too much on desktop */
		padding-right: 55%; 
		position: relative;
		box-sizing: border-box;
		overflow: hidden; /* Prevent spillover */
	}

	/* Desktop Typography & Styles */
	.content-section h2 {
		font-size: 3.5rem; /* Larger headers */
		font-weight: 900;
		color: #fff;
		text-transform: uppercase;
		text-align: left; /* Align left for rockstar vibe */
		margin-bottom: 2rem;
		letter-spacing: 2px;
		line-height: 0.9;
		background: none; /* Remove gradient text for now, keep it stark white or specific accent */
		-webkit-text-fill-color: initial;
	}

	.home-title {
		font-family: 'Archivo Black', sans-serif;
		font-size: 6rem; /* Massive title */
		font-weight: 900;
		font-style: normal;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		text-shadow: none;
		letter-spacing: -2px;
		line-height: 0.85;
		color: #fff;
	}

	.home-subtitle {
		font-family: 'Inter', sans-serif; /* Clean body font */
		font-weight: 600;
		font-style: normal;
		font-size: 1.2rem;
		color: var(--accent-color); /* Neon accent */
		margin-top: 1rem;
		margin-bottom: 3rem;
		max-width: 700px;
		letter-spacing: 1px;
		background: none;
		-webkit-text-fill-color: initial;
		line-height: 1.4;
		text-transform: uppercase;
	}
	
	.section-subtitle {
		font-family: 'Inter', sans-serif;
		font-weight: 400;
		font-style: normal;
		font-size: 1.1rem;
		color: rgba(255, 255, 255, 0.7);
		margin-top: 0.1rem;
		margin-bottom: 3rem;
		max-width: 600px;
		letter-spacing: 0.5px;
		line-height: 1.5;
		text-align: left;
		margin-left: 0; /* Align left */
		margin-right: auto;
		background: none;
		-webkit-text-fill-color: initial;
	}

	.support-message {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 500;
		color: rgb(255, 255, 255);
		margin-bottom: 2.5rem;
		max-width: 500px;
		line-height: 1.6;
		text-shadow: none;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.05); /* Subtle glass */
		border-left: 4px solid var(--accent-color); /* Neon accent border */
		border-radius: 0; /* Boxy look */
		backdrop-filter: blur(10px);
	}

	.support-message .highlight {
		color: var(--accent-color);
		font-weight: 700;
		text-shadow: 0 0 10px rgba(255, 0, 160, 0.4);
	}

	.content-section h2, .section-subtitle {
		max-width: 720px;
		margin-left: 0;
		margin-right: auto;
	}

	/* Mobile Styles */
	@media (max-width: 992px) {
		.content-section {
			min-height: 100vh; /* Can assume auto if we don't want full height on mobile, but 100vh is good */
			padding: 80px 20px;
			padding-right: 20px; /* Reset padding for mobile */
			justify-content: center;
			background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,10,0.9) 100%); /* Fade out bottom */
			backdrop-filter: none;
			border-radius: 0;
			margin: 0;
		}

		.home-title {
			font-size: clamp(3rem, 10vw, 4.5rem);
			line-height: 0.9;
			margin-bottom: 1rem;
		}

		.home-subtitle {
			font-size: clamp(0.9rem, 4vw, 1.1rem);
			line-height: 1.4;
			margin-bottom: 2rem;
		}

		.content-section h2 {
			font-size: clamp(2rem, 8vw, 2.5rem);
			margin-bottom: 1.5rem;
			line-height: 0.95;
			text-align: left;
		}

		.section-subtitle {
			font-size: clamp(0.9rem, 4.5vw, 1rem);
			line-height: 1.5;
			margin-bottom: 2rem;
			text-align: left;
		}

		.support-message {
			font-size: clamp(0.9rem, 4vw, 1rem);
			padding: 1.2rem;
		}
	}
</style>