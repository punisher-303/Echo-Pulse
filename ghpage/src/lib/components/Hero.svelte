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

<section id="overview" class="pt-[56px] pb-[88px] px-5 md:px-8 text-center max-w-[760px] mx-auto relative">
	<div class="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[360px] bg-[radial-gradient(ellipse,rgba(224,79,106,0.06)_0%,transparent_70%)] pointer-events-none z-0"></div>
	
	<p class="rev font-mono text-[10px] tracking-[0.18em] uppercase text-c-pk mb-5 inline-flex items-center gap-2.5" class:in={mounted}>
		<span class="w-[18px] h-[1.5px] bg-c-pk-m rounded-sm block"></span>
		Free · Open Source · Official
		<span class="w-[18px] h-[1.5px] bg-c-pk-m rounded-sm block"></span>
	</p>
	
	<h1 class="rev d1 font-serif text-[clamp(84px,15vw,172px)] font-light tracking-[-0.055em] leading-[0.88] text-c-t1 mb-[18px] relative z-10" class:in={mounted}>
		Echo Pulse
	</h1>

	<p class="rev d1 font-serif text-[clamp(16px,2.2vw,22px)] font-light italic text-c-t2 mb-[18px] tracking-[-0.01em]" class:in={mounted}>
		music that resonates. your way.
	</p>
	
	<p class="rev d2 font-sans text-[14px] text-c-t2 max-w-[400px] mx-auto mb-10 leading-[1.78]" class:in={mounted}>
		Cross-platform music player built with Flutter and Dart. Mix your local library with online streams, sing along with lyrics, and own every bit of it. Ad-free. Always.
	</p>
	
	<!-- CTA buttons -->
	<div class="rev d3 flex flex-wrap justify-center gap-2.5 mb-6 relative z-10" class:in={mounted}>
		<a href="#download" class="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[10px] bg-c-pk text-white font-sans text-[14px] font-medium no-underline transition-all hover:opacity-90 hover:-translate-y-[2px] shadow-[0_2px_14px_rgba(224,79,106,0.32)] hover:shadow-[0_6px_22px_rgba(224,79,106,0.34)]">
			Download for Android
		</a>
		<a href="#download" class="inline-flex items-center justify-center gap-2 h-11 px-[22px] rounded-[10px] bg-transparent text-c-t2 border-[1.5px] border-c-b2 font-sans text-[14px] no-underline transition-all hover:text-c-t1 hover:border-c-b3 hover:bg-c-s2">
			Windows
		</a>
		<a href="#download" class="inline-flex items-center justify-center gap-2 h-11 px-[22px] rounded-[10px] bg-transparent text-c-t2 border-[1.5px] border-c-b2 font-sans text-[14px] no-underline transition-all hover:text-c-t1 hover:border-c-b3 hover:bg-c-s2">
			Linux
		</a>
	</div>
</section>


