<script>
	export let stars = '2.1k+';
	export let repo;
</script>

<div class="h-[1px] bg-c-b1 max-w-[1040px] mx-auto mt-16"></div>
<section class="py-[60px] px-5 md:px-8 max-w-[1040px] mx-auto text-center">
	<p class="flex items-center justify-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-8">
		<span class="w-[14px] h-[2px] bg-c-pk rounded-sm block"></span>
		Recognition
		<span class="w-[14px] h-[2px] bg-c-pk rounded-sm block"></span>
	</p>
	
	<div class="flex flex-wrap justify-center items-center gap-4">
		<!-- GitHub Stars -->
		<a href="https://github.com/{repo}/stargazers" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2.5 h-[40px] px-4 bg-c-s1 border-[1.5px] border-c-b1 rounded-[10px] no-underline hover:border-c-pk-m hover:bg-c-pk-l transition-all group shrink-0">
			<span class="text-[15px] leading-none">⭐</span>
			<div class="leading-none text-left">
				<div class="font-sans text-[12px] font-medium text-c-t1 group-hover:text-c-pk transition-colors">{stars} Stars</div>
				<div class="font-mono text-[9px] tracking-[0.05em] text-c-t3 mt-[3px]">on GitHub</div>
			</div>
			<span class="text-c-t4 group-hover:text-c-pk text-[10px] transition-colors ml-1">↗</span>
		</a>

		<!-- Licensing -->
		<div class="inline-flex items-center gap-2.5 h-[40px] px-4 bg-c-s1 border-[1.5px] border-c-b1 rounded-[10px] shrink-0">
			<span class="text-[15px] leading-none">🔓</span>
			<div class="leading-none text-left">
				<div class="font-sans text-[12px] font-medium text-c-t1">MIT License</div>
				<div class="font-mono text-[9px] tracking-[0.05em] text-c-t3 mt-[3px]">Open Source</div>
			</div>
		</div>

		<!-- Tech Stack -->
		<div class="inline-flex items-center gap-2.5 h-[40px] px-4 bg-c-s1 border-[1.5px] border-c-b1 rounded-[10px] shrink-0">
			<span class="text-[15px] leading-none">💙</span>
			<div class="leading-none text-left">
				<div class="font-sans text-[12px] font-medium text-c-t1">Flutter Core</div>
				<div class="font-mono text-[9px] tracking-[0.05em] text-c-t3 mt-[3px]">Cross-Platform</div>
			</div>
		</div>

		<!-- Platforms -->
		<div class="inline-flex items-center gap-2.5 h-[40px] px-4 bg-c-s1 border-[1.5px] border-c-b1 rounded-[10px] shrink-0">
			<span class="text-[15px] leading-none">📱</span>
			<div class="leading-none text-left">
				<div class="font-sans text-[12px] font-medium text-c-t1">Multi-OS</div>
				<div class="font-mono text-[9px] tracking-[0.05em] text-c-t3 mt-[3px]">Android • Windows • Linux</div>
			</div>
		</div>
	</div>
</section>
<div class="h-[1px] bg-c-b1 max-w-[1040px] mx-auto"></div>
