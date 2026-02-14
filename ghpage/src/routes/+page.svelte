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
						start: 'top 80%',
						toggleActions: 'play none none reverse'
					},
					y: 50,
					opacity: 0,
					duration: 1,
					stagger: 0.2,
					ease: 'power3.out'
				});
			}
		});

		// Parallax for the AssetFigure (Hero Image)
		// Assuming AssetFigure is fixed or absolute, we might want to animate it based on scroll
		// For now, let's just leave it as is or add a subtle parallax if it was part of the flow.
		// Since it is fixed in the layout (likely), we might not need to scroll it, 
		// BUT the original design had it fixed. Let's keep it fixed.

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
		padding: 4rem 5% 4rem 5%;
		/* Adjust padding right to not overlap with the fixed image too much on desktop */
		padding-right: 55%; 
		position: relative;
		box-sizing: border-box;
		overflow: hidden; /* Prevent spillover */
	}

	/* Desktop Typography & Styles */
	.content-section h2 {
		font-size: 2.5rem;
		font-weight: 700;
		background: linear-gradient(45deg, #ff8a00, #e52e71);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		text-align: center;
		margin-bottom: 3.5rem;
		letter-spacing: 1px;
	}

	.home-title {
		font-family: 'Borel', sans-serif;
		font-size: 4.5rem;
		font-weight: 700;
		font-style: italic;
		margin-bottom: 0.2rem;
		text-shadow: 0 0 15px rgba(200, 150, 255, 0.4);
	}

	.home-subtitle {
		font-family: 'Borel', cursive;
		font-weight: 700;
		font-style: normal;
		font-size: 1.4rem;
		color: rgba(255, 237, 248, 0.949);
		margin-top: -0.8rem;
		margin-bottom: 2.5rem;
		max-width: 700px;
		letter-spacing: 0.3px;
		background: linear-gradient(45deg, #ff5258, #ffd48e);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		line-height: 1.2;
		padding-top: 0.6rem;
	}
	
	.section-subtitle {
		font-family: 'Borel', cursive;
		font-weight: 700;
		font-style: normal;
		font-size: 1.4rem;
		color: rgba(255, 237, 248, 0.949);
		margin-top: 0.1rem;
		margin-bottom: 2.5rem;
		max-width: 700px;
		letter-spacing: 0.3px;
		line-height: 1.2;
		padding-top: 0.6rem;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		background: linear-gradient(45deg, #ff5258, #ffd48e);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.support-message {
		font-family: 'IBM Plex Sans', 'Montserrat', sans-serif;
		font-size: 1.1rem;
		font-weight: 500;
		color: rgb(255, 255, 255);
		margin-bottom: 1.8rem;
		max-width: 480px;
		line-height: 1.6;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.645);
		padding: 1rem 1.2rem;
		background: rgba(255, 255, 255, 0.05);
		border-left: 3px solid rgb(235, 49, 111);
		border-radius: 8px;
		backdrop-filter: blur(10px);
	}

	.support-message .highlight {
		color: #ff5258;
		font-weight: 700;
		text-shadow: none;
	}

	.content-section h2, .section-subtitle {
		max-width: 720px;
		margin-left: auto;
		margin-right: auto;
	}

	/* Mobile Styles */
	@media (max-width: 992px) {
		.content-section {
			min-height: 100vh; /* Can assume auto if we don't want full height on mobile, but 100vh is good */
			padding: 40px 15px;
			padding-right: 15px; /* Reset padding for mobile */
			justify-content: center;
			background: rgba(16, 11, 33, 0.15);
			backdrop-filter: blur(25px);
			border-radius: 15px;
			margin: 10px 12px;
		}

		.home-title {
			font-size: clamp(2.2rem, 8vw, 3rem);
			line-height: 1.2;
			margin-bottom: 1rem;
		}

		.home-subtitle {
			font-size: clamp(0.8rem, 6vw, 1.2rem);
			line-height: 1.3;
			margin-bottom: 1.5rem;
		}

		.content-section h2 {
			font-size: clamp(1.0rem, 7vw, 1.6rem);
			margin-bottom: 1.5rem;
			line-height: 1.2;
		}

		.section-subtitle {
			font-size: clamp(0.9rem, 4.5vw, 1.1rem);
			line-height: 1.4;
			margin-bottom: 1.5rem;
		}

		.support-message {
			font-size: clamp(0.85rem, 3.8vw, 1rem);
			padding: 0.8rem 1rem;
		}
	}
</style>