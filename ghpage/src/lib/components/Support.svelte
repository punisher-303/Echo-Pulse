<script>
	export let developer = 'Anand';
	export let githubUrl = 'https://github.com/punisher-303';
	export let repoUrl = 'https://github.com/punisher-303/Echo-Pulse';
</script>

<div class="h-[1px] bg-c-b1 max-w-[1040px] mx-auto"></div>
<section id="about" class="py-[84px] px-5 md:px-8 max-w-[1040px] mx-auto">
	<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-9">
		<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
		Support & Connect
	</div>
	
	<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
		<!-- Keep the music playing -->
		<div class="bg-c-s1 border-[1.5px] border-c-b1 rounded-[20px] p-7 flex flex-col justify-between">
			<div>
				<h3 class="font-serif text-[22px] font-normal tracking-[-0.025em] text-c-t1 mb-3">
					Keep the <em class="italic text-c-pk">music playing.</em>
				</h3>
				<p class="font-sans text-[13px] text-c-t2 leading-[1.7] mb-5">
					Echo Pulse is an independent project. Your support helps keep it ad-free and actively maintained for everyone. ☕🎶
				</p>
			</div>
			
			<div class="flex flex-col gap-2.5">
				<a href="https://github.com/sponsors/punisher-303" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-4 py-3.5 rounded-[12px] no-underline bg-c-bg border-[1.5px] border-c-b2 hover:border-c-pk-m hover:bg-c-pk-l transition-all group">
					<div class="flex items-center gap-3">
						<span class="text-[20px]">🤍</span>
						<div>
							<div class="font-sans text-[13px] font-medium text-c-t1">GitHub Sponsors</div>
							<div class="font-mono text-[9px] tracking-[0.05em] text-c-t3 uppercase mt-0.5">Support my work</div>
						</div>
					</div>
					<span class="text-c-t4 group-hover:text-c-pk transition-colors">↗</span>
				</a>
			</div>
		</div>

		<!-- Get in touch -->
		<div class="bg-c-s1 border-[1.5px] border-c-b1 rounded-[20px] p-7">
			<h3 class="font-serif text-[22px] font-normal tracking-[-0.025em] text-c-t1 mb-3">
				Get in <em class="italic text-c-pk">touch.</em>
			</h3>
			<p class="font-sans text-[13px] text-c-t2 leading-[1.7] mb-5">
				Questions, bug reports, or feature ideas? I'm always happy to connect:
			</p>
			<div class="flex flex-col gap-2">
				<a href="{githubUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-4 py-3 rounded-[11px] no-underline bg-c-bg border-[1.5px] border-c-b2 hover:border-c-pk-m hover:bg-c-pk-l transition-all group">
					<div class="flex items-center gap-2.5">
						<span class="text-[15px]">🐙</span>
						<div>
							<div class="font-sans text-[12px] font-medium text-c-t1">GitHub</div>
							<div class="font-mono text-[9px] tracking-[0.04em] text-c-t3 uppercase mt-0.5">Follow me</div>
						</div>
					</div>
					<span class="text-c-t4 group-hover:text-c-pk text-[12px] transition-colors">↗</span>
				</a>
				<a href="{repoUrl}/discussions" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-4 py-3 rounded-[11px] no-underline bg-c-bg border-[1.5px] border-c-b2 hover:border-c-pk-m hover:bg-c-pk-l transition-all group">
					<div class="flex items-center gap-2.5">
						<span class="text-[15px]">💬</span>
						<div>
							<div class="font-sans text-[12px] font-medium text-c-t1">Discussions</div>
							<div class="font-mono text-[9px] tracking-[0.04em] text-c-t3 uppercase mt-0.5">Share ideas</div>
						</div>
					</div>
					<span class="text-c-t4 group-hover:text-c-pk text-[12px] transition-colors">↗</span>
				</a>
				<a href="{repoUrl}/issues" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-4 py-3 rounded-[11px] no-underline bg-c-bg border-[1.5px] border-c-b2 hover:border-c-pk-m hover:bg-c-pk-l transition-all group">
					<div class="flex items-center gap-2.5">
						<span class="text-[15px]">🐛</span>
						<div>
							<div class="font-sans text-[12px] font-medium text-c-t1">Report a Bug</div>
							<div class="font-mono text-[9px] tracking-[0.04em] text-c-t3 uppercase mt-0.5">Open an issue</div>
						</div>
					</div>
					<span class="text-c-t4 group-hover:text-c-pk text-[12px] transition-colors">↗</span>
				</a>
			</div>
		</div>
	</div>
</section>
