<script>
	import { onMount } from 'svelte';
	
	let mounted = false;
	
	onMount(() => {
		// Small delay to allow CSS transitions to trigger
		setTimeout(() => {
			mounted = true;
		}, 50);
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
	.d3 { transition-delay: .26s; }
</style>

<section class="min-h-[100svh] flex flex-col items-center justify-center text-center px-5 md:px-10 pt-[100px] pb-[84px] relative z-10 overflow-hidden">
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[480px] bg-[radial-gradient(ellipse,rgba(224,79,106,0.05)_0%,transparent_68%)] pointer-events-none" aria-hidden="true"></div>
	
	<p class="rev font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-7 flex items-center gap-3 before:content-[''] before:block before:w-5 before:h-[1px] before:bg-c-b2 after:content-[''] after:block after:w-5 after:h-[1px] after:bg-c-b2" class:in={mounted}>
		Echo Pulse
	</p>
	
	<h1 class="rev d1 font-serif text-[clamp(58px,9vw,116px)] font-light leading-[0.93] tracking-[-0.045em] text-c-t1 mb-6 relative z-10" class:in={mounted}>
		Music that<br><em class="italic text-c-pk block">resonates.</em>
	</h1>
	
	<p class="rev d2 font-sans text-[clamp(14px,1.7vw,16px)] font-light text-c-t2 max-w-[400px] leading-[1.78] mb-11" class:in={mounted}>
		Cross-platform music experience. <br> Beautifully designed, completely free.
	</p>
	
	<!-- CTA buttons -->
	<div class="rev d3 flex gap-2.5 flex-wrap items-center justify-center mb-[60px]" class:in={mounted}>
		<a href="#download" class="inline-flex items-center justify-center gap-2 h-[44px] px-6 rounded-[10px] font-sans text-[14px] font-medium no-underline bg-c-pk text-white shadow-[0_2px_12px_rgba(224,79,106,0.28)] transition-all duration-[180ms] hover:opacity-85 hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(224,79,106,0.3)]">
			Try Echo Pulse
		</a>
		<a href="#apps" class="inline-flex items-center justify-center gap-2 h-[44px] px-6 rounded-[10px] font-sans text-[14px] font-medium no-underline text-c-t2 border-[1.5px] border-c-b2 transition-all duration-[180ms] hover:text-c-t1 hover:border-c-b3 hover:bg-c-s2">
			Explore Features
		</a>
	</div>
	
	<!-- Stats row -->
	<div class="rev flex gap-8 flex-wrap justify-center" class:in={mounted}>
		<div class="flex flex-col items-center gap-[3px]">
			<span class="font-serif text-[34px] font-light tracking-[-0.04em] text-c-t1 leading-none">Flutter</span>
			<span class="font-mono text-[9px] tracking-[0.13em] uppercase text-c-t3">Built With</span>
		</div>
		<div class="flex flex-col items-center gap-[3px]">
			<span class="font-serif text-[34px] font-light tracking-[-0.04em] text-c-t1 leading-none">2</span>
			<span class="font-mono text-[9px] tracking-[0.13em] uppercase text-c-t3">Platforms</span>
		</div>
		<div class="flex flex-col items-center gap-[3px]">
			<span class="font-serif text-[34px] font-light tracking-[-0.04em] text-c-t1 leading-none">Free</span>
			<span class="font-mono text-[9px] tracking-[0.13em] uppercase text-c-t3">Forever</span>
		</div>
		<div class="flex flex-col items-center gap-[3px]">
			<span class="font-serif text-[34px] font-light tracking-[-0.04em] text-c-t1 leading-none">Open</span>
			<span class="font-mono text-[9px] tracking-[0.13em] uppercase text-c-t3">Source</span>
		</div>
	</div>
</section>
