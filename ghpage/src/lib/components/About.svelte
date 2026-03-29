<script>
	import { onMount } from 'svelte';
	
	let mounted = false;
	onMount(() => {
		const handleScroll = () => {
			const el = document.getElementById('about');
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
	.d3 { transition-delay: .26s; }
</style>

<div class="max-w-[1100px] mx-auto px-5 md:px-10">
	<section class="py-16 md:py-[88px]" id="about">
		<p class="rev flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9 before:content-[''] before:block before:w-4 before:h-[2px] before:bg-c-pk before:rounded-sm" class:in={mounted}>
			About
		</p>
		
		<div class="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-12 md:gap-20 items-start">
			<div>
				<h2 class="rev d1 font-serif text-[clamp(36px,4.5vw,60px)] font-light tracking-[-0.04em] leading-[1.02] text-c-t1 mb-7" class:in={mounted}>
					One person.<br><em class="italic text-c-pk">Genuinely.</em>
				</h2>
				
				<div class="rev d2 space-y-[22px]" class:in={mounted}>
					<p class="font-sans text-[15px] text-c-t2 leading-[1.82]">
						<strong>Echo Pulse</strong> is an indie open-source software project by <a href="https://github.com/punisher-303" target="_blank" rel="noopener noreferrer" class="text-c-t1 font-medium no-underline hover:text-c-pk transition-colors">Anand</a> — an independent developer.
					</p>
					
					<p class="font-sans text-[15px] text-c-t2 leading-[1.82]">
						Every app is a passion build, crafted from the first commit to release. No tracking, no ads, no bloated telemetry — just a fast, functional music experience.
					</p>
					
					<p class="font-sans text-[15px] text-c-t2 leading-[1.82]">
						Open source by default. Free forever. Feel free to explore the code or fork the project on GitHub.
					</p>
				</div>
				
				<div class="rev d3 flex flex-wrap gap-1.5 mt-7" class:in={mounted}>
					<span class="font-mono text-[10px] tracking-[0.04em] text-c-t2 bg-c-s1 border-[1.5px] border-c-b1 px-3 py-1.5 rounded-[7px] transition-colors hover:border-c-pk-m hover:text-c-pk">Flutter</span>
					<span class="font-mono text-[10px] tracking-[0.04em] text-c-t2 bg-c-s1 border-[1.5px] border-c-b1 px-3 py-1.5 rounded-[7px] transition-colors hover:border-c-pk-m hover:text-c-pk">Dart</span>
					<span class="font-mono text-[10px] tracking-[0.04em] text-c-t2 bg-c-s1 border-[1.5px] border-c-b1 px-3 py-1.5 rounded-[7px] transition-colors hover:border-c-pk-m hover:text-c-pk">Provider</span>
					<span class="font-mono text-[10px] tracking-[0.04em] text-c-t2 bg-c-s1 border-[1.5px] border-c-b1 px-3 py-1.5 rounded-[7px] transition-colors hover:border-c-pk-m hover:text-c-pk">Android</span>
					<span class="font-mono text-[10px] tracking-[0.04em] text-c-t2 bg-c-s1 border-[1.5px] border-c-b1 px-3 py-1.5 rounded-[7px] transition-colors hover:border-c-pk-m hover:text-c-pk">Windows</span>
					<span class="font-mono text-[10px] tracking-[0.04em] text-c-t2 bg-c-s1 border-[1.5px] border-c-b1 px-3 py-1.5 rounded-[7px] transition-colors hover:border-c-pk-m hover:text-c-pk">C++</span>
				</div>
			</div>
			
			<!-- Card -->
			<div class="rev d2 bg-c-s1 border-[1.5px] border-c-b1 rounded-[22px] p-9 text-center shadow-sh-1" class:in={mounted}>
				<div class="w-20 h-20 mx-auto mb-[22px]">
					<div class="w-[80px] h-[80px] rounded-[14px] flex items-center justify-center bg-c-pk-l border-[1.5px] border-c-pk-m mx-auto relative overflow-hidden group">
						<i class="fa-solid fa-code text-[32px] text-c-pk relative z-10 transition-transform duration-300 group-hover:scale-110"></i>
						<div class="absolute inset-0 bg-gradient-to-br from-c-gd-l transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</div>
				</div>
				
				<h3 class="font-serif text-[22px] font-normal italic tracking-[-0.02em] text-c-t1 mb-2">Connect</h3>
				
				<p class="font-sans text-[13px] text-c-t2 leading-[1.65] mb-6">
					Source available for everyone, forever. No strings attached.
				</p>
				
				<div class="flex flex-col gap-2">
					<a href="https://github.com/punisher-303" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-[15px] py-3 rounded-[11px] no-underline text-c-t2 font-sans text-[13px] border-[1.5px] border-c-b1 transition-all hover:border-c-pk-m hover:text-c-t1 hover:bg-c-pk-l group">
						<span><i class="fa-brands fa-github mr-2"></i> GitHub</span>
						<span class="text-[12px] text-c-t4 group-hover:text-c-pk">↗</span>
					</a>
					<a href="mailto:contact@anand.com" class="flex items-center justify-between px-[15px] py-3 rounded-[11px] no-underline text-c-t2 font-sans text-[13px] border-[1.5px] border-c-b1 transition-all hover:border-c-pk-m hover:text-c-t1 hover:bg-c-pk-l group">
						<span><i class="fa-solid fa-envelope mr-2"></i> Email Me</span>
						<span class="text-[12px] text-c-t4 group-hover:text-c-pk">↗</span>
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
