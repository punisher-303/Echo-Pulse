<script>
	export let githubUrl = 'https://github.com/punisher-303';
	export let repoUrl = 'https://github.com/punisher-303/Echo-Pulse';

	// Action to track pointer positions efficiently without triggering Svelte re-renders
	function spotlight(node) {
		const handleMouseMove = (e) => {
			const rect = node.getBoundingClientRect();
			node.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
			node.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
		};
		node.addEventListener('mousemove', handleMouseMove, { passive: true });
		return {
			destroy() {
				node.removeEventListener('mousemove', handleMouseMove);
			}
		};
	}
</script>

<div class="h-[1px] bg-c-b1 max-w-[1040px] mx-auto"></div>
<section id="about" class="py-[84px] px-5 md:px-8 max-w-[1040px] mx-auto">
	<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9">
		<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
		Support & Connect
	</div>
	
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
		<!-- Keep the music playing -->
		<div use:spotlight class="bg-c-s1 border-[1.5px] border-c-b1 rounded-[20px] p-7 flex flex-col justify-between hover-3d-card group glow-card">
			<div class="z-10 relative">
				<h3 class="font-serif text-[22px] font-normal tracking-[-0.025em] text-c-t1 mb-3">
					Keep the <em class="italic text-c-pk">music playing.</em>
				</h3>
				<p class="font-sans text-[13px] text-c-t2 leading-[1.7] mb-5 flex items-start gap-2.5">
					<svg class="w-4.5 h-4.5 text-c-pk shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
					</svg>
					<span>Echo Pulse is an independent project. Your support helps keep it ad-free and actively maintained for everyone.</span>
				</p>
			</div>
			
			<div class="flex flex-col gap-2.5 z-10 relative mt-4">
				<a href="https://github.com/sponsors/punisher-303" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-4 py-3.5 rounded-[12px] no-underline bg-c-bg border-[1.5px] border-c-b2 hover:border-c-pk-m hover:bg-c-pk-l transition-all group">
					<div class="flex items-center gap-3">
						<svg class="w-5 h-5 text-c-pk shrink-0" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
						</svg>
						<div>
							<div class="font-sans text-[13px] font-medium text-c-t1">GitHub Sponsors</div>
							<div class="font-mono text-[9px] tracking-[0.05em] text-c-t3 uppercase mt-0.5">Support my work</div>
						</div>
					</div>
					<span class="text-c-t4 group-hover:text-c-pk transition-colors">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
						</svg>
					</span>
				</a>
			</div>
		</div>

		<!-- Get in touch -->
		<div use:spotlight class="bg-c-s1 border-[1.5px] border-c-b1 rounded-[20px] p-7 hover-3d-card group glow-card">
			<div class="z-10 relative">
				<h3 class="font-serif text-[22px] font-normal tracking-[-0.025em] text-c-t1 mb-3">
					Get in <em class="italic text-c-pk">touch.</em>
				</h3>
				<p class="font-sans text-[13px] text-c-t2 leading-[1.7] mb-5">
					Questions, bug reports, or feature ideas? I'm always happy to connect:
				</p>
			</div>
			<div class="flex flex-col gap-2 z-10 relative">
				<a href="{githubUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-4 py-3 rounded-[11px] no-underline bg-c-bg border-[1.5px] border-c-b2 hover:border-c-pk-m hover:bg-c-pk-l transition-all group">
					<div class="flex items-center gap-2.5">
						<svg class="w-5 h-5 text-neutral-700 group-hover:text-c-pk shrink-0 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
						</svg>
						<div>
							<div class="font-sans text-[12px] font-medium text-c-t1">GitHub</div>
							<div class="font-mono text-[9px] tracking-[0.04em] text-c-t3 uppercase mt-0.5">Follow me</div>
						</div>
					</div>
					<span class="text-c-t4 group-hover:text-c-pk transition-colors">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
						</svg>
					</span>
				</a>
				<a href="{repoUrl}/discussions" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-4 py-3 rounded-[11px] no-underline bg-c-bg border-[1.5px] border-c-b2 hover:border-c-pk-m hover:bg-c-pk-l transition-all group">
					<div class="flex items-center gap-2.5">
						<svg class="w-5 h-5 text-neutral-700 group-hover:text-c-pk shrink-0 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
						</svg>
						<div>
							<div class="font-sans text-[12px] font-medium text-c-t1">Discussions</div>
							<div class="font-mono text-[9px] tracking-[0.04em] text-c-t3 uppercase mt-0.5">Share ideas</div>
						</div>
					</div>
					<span class="text-c-t4 group-hover:text-c-pk transition-colors">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
						</svg>
					</span>
				</a>
				<a href="{repoUrl}/issues" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-4 py-3 rounded-[11px] no-underline bg-c-bg border-[1.5px] border-c-b2 hover:border-c-pk-m hover:bg-c-pk-l transition-all group">
					<div class="flex items-center gap-2.5">
						<svg class="w-5 h-5 text-neutral-700 group-hover:text-c-pk shrink-0 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 2v9m-7-5h14m-12 5l-2-2m18 2l2-2"/>
						</svg>
						<div>
							<div class="font-sans text-[12px] font-medium text-c-t1">Report a Bug</div>
							<div class="font-mono text-[9px] tracking-[0.04em] text-c-t3 uppercase mt-0.5">Open an issue</div>
						</div>
					</div>
					<span class="text-c-t4 group-hover:text-c-pk transition-colors">
						<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
						</svg>
					</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	.glow-card {
		position: relative;
		overflow: hidden;
	}
	.glow-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(224, 79, 106, 0.07), transparent 75%);
		pointer-events: none;
		z-index: 0;
		opacity: 0;
		transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		border-radius: inherit;
	}
	.glow-card::after {
		content: '';
		position: absolute;
		inset: -1.5px;
		background: radial-gradient(180px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(224, 79, 106, 0.25), transparent 70%);
		border-radius: inherit;
		pointer-events: none;
		z-index: 2;
		opacity: 0;
		transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		padding: 1.5px;
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
	}
	.glow-card:hover::before,
	.glow-card:hover::after {
		opacity: 1;
	}
</style>
