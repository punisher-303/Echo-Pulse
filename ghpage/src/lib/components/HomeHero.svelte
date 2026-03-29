<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	
	let mounted = false;
	onMount(() => {
		setTimeout(() => mounted = true, 50);
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

<section class="min-h-[90svh] flex flex-col items-center justify-center text-center px-5 md:px-10 pt-[120px] pb-[100px] relative z-10">
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(224,79,106,0.04)_0%,transparent_70%)] pointer-events-none"></div>
	
	<p class="rev font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-7 flex items-center gap-3 before:content-[''] before:block before:w-5 before:h-[1px] before:bg-c-b2 after:content-[''] after:block after:w-5 after:h-[1px] after:bg-c-b2" class:in={mounted}>
		Anand's Portfolio
	</p>
	
	<h1 class="rev d1 font-serif text-[clamp(48px,8vw,100px)] font-light leading-[0.95] tracking-[-0.04em] text-c-t1 mb-8" class:in={mounted}>
		Software that<br><em class="italic text-c-pk">EchoPulse.</em>
	</h1>
	
	<p class="rev d2 font-sans text-[clamp(14px,1.6vw,16px)] font-light text-c-t2 max-w-[440px] leading-[1.78] mb-12" class:in={mounted}>
		Thoughtfully designed tools for everyday users. <br> Open source, privacy-first, and elegantly crafted.
	</p>
	
	<div class="rev d3 flex gap-3 flex-wrap items-center justify-center" class:in={mounted}>
		<a href="#apps" class="inline-flex items-center justify-center h-[46px] px-7 rounded-[11px] font-sans text-[14px] font-medium no-underline bg-c-pk text-white shadow-[0_2px_12px_rgba(224,79,106,0.28)] transition-all duration-200 hover:opacity-85 hover:-translate-y-[2px]">
			Explore Apps
		</a>
		<a href="https://github.com/punisher-303" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center h-[46px] px-7 rounded-[11px] font-sans text-[14px] font-medium no-underline text-c-t2 border-[1.5px] border-c-b2 transition-all duration-200 hover:border-c-b3 hover:bg-c-s2">
			<i class="fa-brands fa-github mr-2"></i> GitHub
		</a>
	</div>
</section>
