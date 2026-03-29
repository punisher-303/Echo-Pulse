<script>
	import { base } from '$app/paths';
	import Navbar from '$lib/components/Navbar.svelte';
	import SubNav from '$lib/components/SubNav.svelte';
	import OfficialWarning from '$lib/components/OfficialWarning.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import LiveStats from '$lib/components/LiveStats.svelte';
	import DownloadCounter from '$lib/components/DownloadCounter.svelte';
	import RecognitionRow from '$lib/components/RecognitionRow.svelte';
	import FeaturesGrid from '$lib/components/FeaturesGrid.svelte';
	import Screenshots from '$lib/components/Screenshots.svelte';
	import ReleaseFetcher from '$lib/components/ReleaseFetcher.svelte';
	import Download from '$lib/components/Download.svelte';
	import Support from '$lib/components/Support.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let repo = "punisher-303/Echo-Pulse";
</script>

<svelte:head>
	<title>Echo Pulse — Music that resonates.</title>
	<meta name="description" content="A modern music streaming experience. Open source, beautifully crafted, and free from distractions." />
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
		<SubNav active="overview" />
		<OfficialWarning repo={repo} />

		<div id="overview" class="pb-10 relative">
			<Hero />
			<!-- Integrated Counters and Stats -->
			<div class="flex flex-col items-center gap-6 mt-[-100px] mb-20 px-5 z-20 relative">
				<DownloadCounter repo={repo} />
				<LiveStats repo={repo} fallbackVersion="v5.0.0" fallbackStars="2.1k+" fallbackForks="340" />
			</div>
		</div>

		<RecognitionRow repo={repo} stars="2.1k+" />
		
		<div id="features" class="scroll-mt-[160px]">
			<FeaturesGrid />
		</div>

		<div class="h-[1px] bg-c-b1 max-w-[1040px] mx-auto"></div>
		
		<section id="screenshots" class="scroll-mt-[100px]">
			<Screenshots />
		</section>

		<div class="h-[1px] bg-c-b1 max-w-[1040px] mx-auto"></div>

		<section id="releases" class="py-[84px] px-5 md:px-8 max-w-[1040px] mx-auto scroll-mt-[100px]">
			<div class="flex items-center justify-between mb-9">
				<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3">
					<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
					Releases
				</div>
				<a href="https://github.com/{repo}/releases" target="_blank" rel="noopener noreferrer" class="font-mono text-[10px] tracking-[0.06em] text-c-t3 no-underline hover:text-c-t2 transition-colors">All releases →</a>
			</div>
			<h2 class="font-serif text-[clamp(28px,4vw,44px)] font-light tracking-[-0.035em] leading-[1.05] text-c-t1 mb-3.5">
				What's new in <em class="italic text-c-pk">Echo Pulse.</em>
			</h2>
			<p class="font-sans text-[14px] text-c-t2 leading-[1.78] max-w-[440px] mb-10">
				Actively maintained. Latest stable version shown below, fetched live from GitHub.
			</p>
			<ReleaseFetcher repo={repo} />
		</section>

		<div class="h-[1px] bg-c-b1 max-w-[1040px] mx-auto"></div>

		<div id="download" class="scroll-mt-[100px]">
			<Download />
		</div>

		<div id="about" class="scroll-mt-[100px]">
			<Support repoUrl="https://github.com/punisher-303/Echo-Pulse" githubUrl="https://github.com/punisher-303" />
		</div>
	</main>
	
	<Footer />
</div>

