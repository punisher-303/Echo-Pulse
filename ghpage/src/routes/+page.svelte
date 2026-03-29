<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import HomeHero from '$lib/components/HomeHero.svelte';
	import AppsGrid from '$lib/components/AppsGrid.svelte';
	import About from '$lib/components/About.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Anand — Software Developer Portfolio</title>
	<meta name="description" content="Portfolio of Anand, an independent software developer creating open source tools with Flutter, Dart, and Svelte." />
</svelte:head>

<div class="bg-c-bg text-c-t1 font-sans min-h-screen selection:bg-c-pk-l selection:text-c-pk-d overflow-x-hidden relative">
	<!-- Background Petals -->
	<div class="petals" aria-hidden="true">
		<div class="petal w-[9px] h-[12px] bg-c-pk-m left-[7%]" style="animation-duration:17s;animation-delay:0s"></div>
		<div class="petal w-[7px] h-[10px] bg-c-pk-l left-[23%]" style="animation-duration:22s;animation-delay:4s"></div>
		<div class="petal w-[11px] h-[14px] bg-c-pk-m left-[56%]" style="animation-duration:19s;animation-delay:8s"></div>
		<div class="petal w-[8px] h-[11px] bg-c-gd-l left-[78%]" style="animation-duration:24s;animation-delay:2.5s"></div>
		<div class="petal w-[6px] h-[9px] bg-c-pk-l left-[41%]" style="animation-duration:15s;animation-delay:11s"></div>
		<div class="petal w-[10px] h-[13px] bg-c-pk-m left-[91%]" style="animation-duration:18s;animation-delay:4.5s"></div>
	</div>

	<Navbar />
	
	<main>
		<HomeHero />
		<div class="h-[1px] bg-c-b1"></div>
		
		<AppsGrid />
		<div class="h-[1px] bg-c-b1 max-w-[1100px] mx-auto"></div>
		
		<About />
	</main>
	
	<Footer />
</div>