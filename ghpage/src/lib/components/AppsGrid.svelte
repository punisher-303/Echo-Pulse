<script>
	import { onMount } from 'svelte';
	
	let mounted = false;
	
	onMount(() => {
		const handleScroll = () => {
			const el = document.getElementById('apps-grid');
			if (el) {
				const rect = el.getBoundingClientRect();
				if (rect.top < window.innerHeight - 100) {
					mounted = true;
				}
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<style>
	.rev {
		opacity: 0;
		transform: translateY(14px);
		transition: opacity .55s ease, transform .55s ease;
	}
	.rev.in {
		opacity: 1;
		transform: none;
	}
	.d1 { transition-delay: .08s; }
	.d2 { transition-delay: .17s; }
</style>

<div class="max-w-[1100px] mx-auto px-5 md:px-10" id="apps">
	<section class="py-16 md:py-[88px]" id="apps-grid">
		<p class="rev flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9 before:content-[''] before:block before:w-4 before:h-[2px] before:bg-c-pk before:rounded-sm" class:in={mounted}>
			The App
		</p>
		
		<h2 class="rev d1 font-serif text-[clamp(36px,4.5vw,60px)] font-light tracking-[-0.04em] leading-[1.02] text-c-t1 mb-3.5" class:in={mounted}>
			Built with <em class="italic text-c-pk">passion.</em>
		</h2>
		
		<p class="rev d2 font-sans text-[15px] text-c-t2 leading-[1.78] max-w-[440px] mb-[52px]" class:in={mounted}>
			A modern music streaming experience. Open source, beautifully crafted, and free from distractions.
		</p>
		
		<div class="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-5 items-stretch">
			
			<!-- Echo Pulse card -->
			<div class="rev d1" class:in={mounted}>
				<a href="#download" class="h-full min-h-[430px] bg-c-s1 border-[1.5px] border-c-b1 rounded-[20px] overflow-hidden no-underline flex flex-col relative transition-all duration-[220ms] shadow-sh-1 hover:shadow-sh-3 hover:-translate-y-1 hover:border-c-pk-m group block">
					<div class="h-[3px] w-full transition-all duration-200 group-hover:h-[4px]" style="background:linear-gradient(90deg,#f8bfc9 0%,#e04f6a 50%,#f8bfc9 100%)"></div>
					<div class="p-[26px] pb-[64px] flex-1">
						<div class="flex items-start justify-between mb-[18px]">
							<div class="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center shrink-0" style="background:linear-gradient(145deg,#fde8ed,#fcd8e4)">
								<i class="fa-solid fa-music text-c-pk text-[20px]"></i>
							</div>
							<span class="font-mono text-[9px] tracking-[0.1em] uppercase px-[9px] py-[3px] rounded-[5px] h-fit whitespace-nowrap text-c-gn bg-c-gn-l border border-[#a8dac0]">Live</span>
						</div>
						
						<div class="font-serif text-[26px] font-normal tracking-[-0.035em] text-c-t1 mb-[3px] leading-[1.1]">Echo Pulse</div>
						<div class="font-mono text-[9px] tracking-[0.07em] uppercase text-c-t3 mb-3">Music Player · Flutter App</div>
						
						<p class="font-sans text-[15px] text-c-t2 leading-[1.65] mb-[18px] mt-3">Advanced music player featuring seamless background playback, intelligent queue management, comprehensive codec support, and a responsive, beautiful interface.</p>
						
						<div class="flex flex-wrap gap-[5px]">
							<span class="font-mono text-[9px] tracking-[0.04em] text-c-t3 bg-c-bg border border-c-b1 px-[8px] py-[3px] rounded-[4px]">Flutter</span>
							<span class="font-mono text-[9px] tracking-[0.04em] text-c-t3 bg-c-bg border border-c-b1 px-[8px] py-[3px] rounded-[4px]">Dart</span>
							<span class="font-mono text-[9px] tracking-[0.04em] text-c-t3 bg-c-bg border border-c-b1 px-[8px] py-[3px] rounded-[4px]">Android</span>
							<span class="font-mono text-[9px] tracking-[0.04em] text-c-t3 bg-c-bg border border-c-b1 px-[8px] py-[3px] rounded-[4px]">Windows</span>
						</div>
					</div>
					<span class="absolute bottom-6 right-6 text-[16px] text-c-t4 transition-all duration-[180ms] group-hover:text-c-pk group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">↗</span>
				</a>
			</div>
            
            <!-- Future Projects card -->
			<div class="rev d2" class:in={mounted}>
				<div class="h-full min-h-[430px] bg-c-s1 border-[1.5px] border-c-b1 rounded-[20px] overflow-hidden no-underline flex flex-col relative opacity-60">
					<div class="h-[3px] w-full bg-c-b1"></div>
					<div class="p-[26px] pb-[64px] flex-1">
						<div class="flex items-start justify-between mb-[18px]">
							<div class="w-[50px] h-[50px] rounded-[14px] flex items-center justify-center shrink-0 bg-c-s3">
								<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--color-c-b3)" stroke-width="1.5" stroke-linecap="round">
									<line x1="11" y1="5" x2="11" y2="17"></line><line x1="5" y1="11" x2="17" y2="11"></line>
								</svg>
							</div>
							<span class="font-mono text-[9px] tracking-[0.1em] uppercase px-[9px] py-[3px] rounded-[5px] h-fit whitespace-nowrap text-c-t3 bg-c-s2 border border-c-b1">Coming</span>
						</div>
						
						<div class="font-serif text-[26px] font-normal tracking-[-0.035em] text-c-t3 mb-[3px] leading-[1.1]">Spotify Canva</div>
						<div class="font-mono text-[9px] tracking-[0.07em] uppercase text-c-t3 mb-3">In Development</div>
						
						<p class="font-sans text-[15px] text-c-t2 leading-[1.65] mb-[18px] mt-3">An upcoming integration connecting rich media backgrounds and dynamic visualizers to your local and streamed tracks.</p>

                        <div class="flex flex-wrap gap-[5px]">
							<span class="font-mono text-[9px] tracking-[0.04em] text-c-t3 bg-c-bg border border-c-b1 px-[8px] py-[3px] rounded-[4px]">Visualizer</span>
							<span class="font-mono text-[9px] tracking-[0.04em] text-c-t3 bg-c-bg border border-c-b1 px-[8px] py-[3px] rounded-[4px]">Graphics</span>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</section>
</div>
