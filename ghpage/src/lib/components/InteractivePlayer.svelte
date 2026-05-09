<script>
	import { onMount, onDestroy } from 'svelte';

	// Svelte 5 Runes for premium reactive state
	let playing = $state(true);
	let currentTime = $state(2);
	let currentSongIndex = $state(0);
	let volume = $state(75);
	let showDiscordRpc = $state(true);
	let isMuted = $state(false);

	const songs = [
		{
			title: "Resonance of Pulse",
			artist: "Echo Pulse Core",
			source: "YouTube Music Stream",
			sourceType: "hls",
			duration: 24,
			cover: "🌸",
			lyrics: [
				{ time: 0, native: "സംഗീതം ഹൃദയത്തിൽ", roman: "Sangeetham hridayathil", eng: "Music is inside the heart" },
				{ time: 6, native: "ഓരോ സ്പന്ദനവും", roman: "Oro spandhanavum", eng: "Every single heartbeat" },
				{ time: 12, native: "നമ്മെ ഒന്നാക്കുന്നു", roman: "Namme onnaakkunnu", eng: "Brings us closer together" },
				{ time: 18, native: "ഈണം തുടരുന്നു", roman: "Eenam thudarnnu", eng: "And the melody continues" }
			]
		},
		{
			title: "Midnight Scrobble",
			artist: "The Last FM Scrobbler",
			source: "Offline Library Cache",
			sourceType: "offline",
			duration: 20,
			cover: "📊",
			lyrics: [
				{ time: 0, native: "ഇരുട്ടിൽ പാടാം", roman: "Iruttil paadam", eng: "Let's sing in the quiet dark" },
				{ time: 5, native: "വരികൾ തെളിയുന്നു", roman: "Varikal theliyunnu", eng: "The lyrics appear perfectly" },
				{ time: 10, native: "കണക്റ്റ് ചെയ്യുമ്പോൾ", roman: "Connect cheyyumpol", eng: "Once connection is restored" },
				{ time: 15, native: "സ്ക്രോബിൾ ചെയ്യപ്പെടും", roman: "Scrobble cheyyappedum", eng: "Your listening history scrobbles" }
			]
		},
		{
			title: "Together (Live Room)",
			artist: "Echo Room Jam",
			source: "Live Sync Room",
			sourceType: "room",
			duration: 28,
			cover: "👥",
			lyrics: [
				{ time: 0, native: "കൂട്ടുകാർ ഒപ്പം", roman: "Koottukaar oppam", eng: "Our friends are all here" },
				{ time: 7, native: "ഒരേ താളത്തിൽ", roman: "Ore thaalathil", eng: "Vibing in perfect synchrony" },
				{ time: 14, native: "ചാറ്റ് ചെയ്യാം നമുക്ക്", roman: "Chat cheyyaam namukku", eng: "Chat live while listening" },
				{ time: 21, native: "സംഗീത വിരുന്ന്", roman: "Sangeetha virunnu", eng: "An absolute musical feast" }
			]
		}
	];

	// Derived values for the active song
	let currentSong = $derived(songs[currentSongIndex]);
	let activeLyricIndex = $derived.by(() => {
		let index = 0;
		for (let i = 0; i < currentSong.lyrics.length; i++) {
			if (currentTime >= currentSong.lyrics[i].time) {
				index = i;
			}
		}
		return index;
	});

	let interval;
	
	function startTimer() {
		clearInterval(interval);
		interval = setInterval(() => {
			if (playing) {
				if (currentTime >= currentSong.duration) {
					currentTime = 0;
				} else {
					currentTime += 1;
				}
			}
		}, 1000);
	}

	onMount(() => {
		startTimer();
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	// Trigger restart of timer cycle when song changes
	$effect(() => {
		// This runs whenever currentSongIndex changes
		currentTime = 0;
	});

	function togglePlay() {
		playing = !playing;
	}

	function nextSong() {
		currentSongIndex = (currentSongIndex + 1) % songs.length;
	}

	function prevSong() {
		currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
	}

	function handleProgressClick(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const width = rect.width;
		const percentage = clickX / width;
		currentTime = Math.floor(percentage * currentSong.duration);
	}

	function formatTime(sec) {
		const m = Math.floor(sec / 60);
		const s = Math.floor(sec % 60);
		return `${m}:${s < 10 ? '0' : ''}${s}`;
	}

	function toggleMute() {
		isMuted = !isMuted;
	}
</script>

<div class="interactive-player-card w-full max-w-[780px] mx-auto rounded-[24px] overflow-hidden border border-neutral-800 bg-neutral-950/80 backdrop-blur-2xl shadow-[0_24px_60px_-15px_rgba(224,79,106,0.18)] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-stretch text-neutral-200 select-none z-10 relative">
	<!-- Ambient Background Glow Inside the Card -->
	<div class="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(224,79,106,0.14)_0%,transparent_60%)] pointer-events-none z-0 animate-pulse" style="animation-duration: 8s"></div>
	<div class="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(67,163,111,0.06)_0%,transparent_60%)] pointer-events-none z-0 animate-pulse" style="animation-duration: 12s"></div>

	<!-- Left Deck: Player Controls, Cover, Info -->
	<div class="flex flex-col flex-1 z-10 relative justify-between">
		
		<!-- Source Badge -->
		<div class="flex items-center justify-between mb-4">
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
				{#if currentSong.sourceType === 'hls'}
					<span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
					<span class="w-1.5 h-1.5 rounded-full bg-red-500 absolute"></span>
				{:else if currentSong.sourceType === 'offline'}
					<span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>
				{:else}
					<span class="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
				{/if}
				{currentSong.source}
			</div>
			<div class="font-mono text-[9px] text-neutral-500">MOCK PLAYER</div>
		</div>

		<!-- Album Cover Art & Info Row -->
		<div class="flex items-center gap-4.5 mb-6">
			<!-- Album Art with 3D shadow and glow -->
			<div class="w-[74px] h-[74px] rounded-[16px] flex items-center justify-center bg-gradient-to-tr border border-neutral-700/40 shadow-[0_8px_20px_rgba(0,0,0,0.5)] transform hover:scale-[1.03] transition-transform duration-300 relative group overflow-hidden shrink-0"
				class:from-rose-500={currentSongIndex === 0}
				class:to-pink-600={currentSongIndex === 0}
				class:from-emerald-500={currentSongIndex === 1}
				class:to-teal-600={currentSongIndex === 1}
				class:from-indigo-500={currentSongIndex === 2}
				class:to-blue-600={currentSongIndex === 2}
			>
				{#if currentSongIndex === 0}
					<!-- Cherry Blossom Outline SVG -->
					<svg class="w-10 h-10 text-white/90 drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 2.69l.79.62c2.14 1.67 4.88 2.69 7.64 2.69h.88v.88c0 2.76-1.02 5.5-2.69 7.64l-.62.79.62.79c1.67 2.14 2.69 4.88 2.69 7.64v.88h-.88c-2.76 0-5.5-1.02-7.64-2.69l-.79-.62-.79.62c-2.14 1.67-4.88 2.69-7.64 2.69h-.88v-.88c0-2.76 1.02-5.5 2.69-7.64l.62-.79-.62-.79C3.71 14.38 2.69 11.64 2.69 8.88v-.88h.88c2.76 0 5.5 1.02 7.64 2.69l.79.62z"/>
						<circle cx="12" cy="12" r="3" fill="currentColor"/>
					</svg>
				{:else if currentSongIndex === 1}
					<!-- Spinning Vinyl / Disc SVG -->
					<svg class="w-10 h-10 text-white/90 drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]" class:animate-spin={playing} style="animation-duration: 4s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/>
						<circle cx="12" cy="12" r="6"/>
						<circle cx="12" cy="12" r="2" fill="currentColor"/>
						<path d="M12 2a10 10 0 0 1 10 10"/>
					</svg>
				{:else}
					<!-- Network Connections / Sync Group SVG -->
					<svg class="w-10 h-10 text-white/90 drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
						<circle cx="9" cy="7" r="4"/>
						<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
						<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
					</svg>
				{/if}
			</div>
			<!-- Song Title & Artist -->
			<div class="min-w-0">
				<h3 class="font-serif text-[18px] md:text-[20px] font-medium tracking-tight text-white leading-tight truncate">
					{currentSong.title}
				</h3>
				<p class="font-sans text-[12px] md:text-[13px] text-neutral-400 font-light truncate mt-0.5">
					{currentSong.artist}
				</p>
			</div>
		</div>

		<!-- Progress Bar -->
		<div class="mb-5">
			<button class="w-full h-2.5 rounded-full bg-neutral-800/80 cursor-pointer overflow-hidden relative group border-0 p-0 block" onclick={handleProgressClick} aria-label="Progress bar">
				<div 
					class="h-full bg-gradient-to-r from-c-pk via-c-pk-m to-white rounded-full transition-all duration-300 relative" 
					style="width: {(currentTime / currentSong.duration) * 100}%"
				>
					<div class="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md scale-0 group-hover:scale-100 transition-transform duration-150"></div>
				</div>
			</button>
			<div class="flex items-center justify-between font-mono text-[10px] text-neutral-500 mt-2">
				<span>{formatTime(currentTime)}</span>
				<span>{formatTime(currentSong.duration)}</span>
			</div>
		</div>

		<!-- Control Buttons -->
		<div class="flex items-center justify-between gap-4 mb-2">
			<!-- Secondary controls: mute -->
			<button class="w-9 h-9 rounded-full bg-neutral-900/60 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer" onclick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
				{#if isMuted || volume === 0}
					<!-- Volume Mute SVG -->
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
						<line x1="23" y1="9" x2="17" y2="15"></line>
						<line x1="17" y1="9" x2="23" y2="15"></line>
					</svg>
				{:else if volume < 35}
					<!-- Volume Low SVG -->
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
						<path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
					</svg>
				{:else}
					<!-- Volume High SVG -->
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
						<path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
					</svg>
				{/if}
			</button>

			<!-- Core transport controls -->
			<div class="flex items-center gap-4">
				<button class="w-10 h-10 rounded-full bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 flex items-center justify-center text-[15px] transition-all hover:scale-[1.05] cursor-pointer text-neutral-400 hover:text-white" onclick={prevSong} aria-label="Previous song">
					<!-- Prev SVG -->
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="19 20 9 12 19 4 19 20"></polygon>
						<line x1="5" y1="19" x2="5" y2="5"></line>
					</svg>
				</button>
				<button 
					class="w-13 h-13 rounded-full bg-c-pk hover:bg-c-pk-m border-0 flex items-center justify-center text-white transition-all hover:scale-[1.08] active:scale-[0.96] cursor-pointer shadow-[0_4px_20px_rgba(224,79,106,0.4)] hover:shadow-[0_6px_25px_rgba(224,79,106,0.6)]" 
					onclick={togglePlay} 
					aria-label={playing ? "Pause" : "Play"}
				>
					{#if playing}
						<!-- Pause SVG -->
						<svg class="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
							<rect x="6" y="4" width="4" height="16"></rect>
							<rect x="14" y="4" width="4" height="16"></rect>
						</svg>
					{:else}
						<!-- Play SVG -->
						<svg class="w-4.5 h-4.5 translate-x-[1px]" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polygon points="5 3 19 12 5 21 5 3"></polygon>
						</svg>
					{/if}
				</button>
				<button class="w-10 h-10 rounded-full bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 flex items-center justify-center text-[15px] transition-all hover:scale-[1.05] cursor-pointer text-neutral-400 hover:text-white" onclick={nextSong} aria-label="Next song">
					<!-- Next SVG -->
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<polygon points="5 4 15 12 5 20 5 4"></polygon>
						<line x1="19" y1="5" x2="19" y2="19"></line>
					</svg>
				</button>
			</div>

			<!-- Discord RPC view toggle -->
			<button 
				class="w-9 h-9 rounded-full border flex items-center justify-center transition-all cursor-pointer {showDiscordRpc ? 'bg-indigo-600 border-indigo-500 text-white hover:bg-indigo-500' : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'}"
				onclick={() => showDiscordRpc = !showDiscordRpc}
				title="Simulate Discord Rich Presence"
			>
				<!-- Discord Brand Icon SVG -->
				<svg class="w-4 h-4 fill-current" viewBox="0 0 127.14 96.36">
					<path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2a75.58,75.58,0,0,0,72.9,0c.82.71,1.68,1.4,2.58,2a68.69,68.69,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,32.53-18.83C129.1,54.65,123.38,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
				</svg>
			</button>
		</div>

	</div>
	<!-- Right Deck: Live Synced Romanized Lyrics Panel -->
	<div class="flex flex-col flex-1 border-t md:border-t-0 md:border-l border-neutral-800/80 pt-6 md:pt-0 md:pl-8 min-h-[220px] justify-between z-10 relative">
		
		<!-- Lyrics header -->
		<div class="flex items-center justify-between mb-4.5">
			<div class="font-mono text-[10px] uppercase tracking-widest text-c-pk flex items-center gap-2">
				<span class="w-[8px] h-[8px] rounded-full bg-c-pk animate-pulse"></span>
				Synced Lyrics Romanized
			</div>
			<div class="font-mono text-[9px] text-neutral-500 bg-neutral-900/40 px-2 py-0.5 rounded border border-neutral-800">Svelte 5 UI</div>
		</div>

		<!-- Scrolling lyric list -->
		<div class="flex-1 overflow-hidden relative flex flex-col gap-5 py-2 justify-center">
			<!-- Glowing top/bottom masks for fading out top/bottom list entries -->
			<div class="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-neutral-950 to-transparent pointer-events-none z-10"></div>
			<div class="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none z-10"></div>
			
			{#each currentSong.lyrics as lyric, idx}
				<div 
					class="lyric-line transition-all duration-300 transform"
					class:active-lyric={idx === activeLyricIndex}
					class:inactive-lyric={idx !== activeLyricIndex}
					style="
						opacity: {idx === activeLyricIndex ? 1 : (Math.abs(idx - activeLyricIndex) === 1 ? 0.35 : 0.1)};
						transform: translateY({(activeLyricIndex - idx) * -4}px) scale({idx === activeLyricIndex ? 1.02 : 0.96});
					"
				>
					<!-- Native alphabet line -->
					<div class="native-text font-serif text-[15px] md:text-[17px] leading-tight text-neutral-400">
						{lyric.native}
					</div>
					<!-- Highlighted English-script translation & pronunciation (Romanized) -->
					<div class="roman-text font-serif text-[18px] md:text-[21px] font-normal leading-tight tracking-tight mt-1.5 min-h-[26px]">
						{#if idx === activeLyricIndex}
							<span class="bg-gradient-to-r from-c-pk via-[#ff7891] to-white bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(224,79,106,0.15)]">
								{lyric.roman}
							</span>
						{:else}
							<span>{lyric.roman}</span>
						{/if}
					</div>
					<!-- English translation subtitle -->
					{#if idx === activeLyricIndex}
						<div class="eng-text font-sans text-[11px] text-neutral-500 italic mt-1.5 transition-all animate-fade-in">
							({lyric.eng})
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Discord RPC Live Sim Box -->
		{#if showDiscordRpc}
			<div class="discord-rpc-widget mt-5 p-3 rounded-[14px] bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center gap-3 transition-all duration-300 hover:bg-[#5865F2]/15 animate-fade-in relative overflow-hidden group">
				<!-- Discord controller watermark SVG -->
				<svg class="absolute -right-4 -bottom-4 w-[84px] h-[84px] text-white opacity-[0.04] group-hover:scale-110 transition-transform duration-300 fill-current" viewBox="0 0 127.14 96.36">
					<path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2a75.58,75.58,0,0,0,72.9,0c.82.71,1.68,1.4,2.58,2a68.69,68.69,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,32.53-18.83C129.1,54.65,123.38,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
				</svg>
				<!-- Discord icon/avatar -->
				<div class="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white shrink-0 font-bold relative shadow-md">
					<!-- Headphones SVG -->
					<svg class="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
						<path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
					</svg>
					<span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-neutral-950 rounded-full" title="Online"></span>
				</div>
				<!-- Discord activity status -->
				<div class="min-w-0 flex-1">
					<div class="flex items-center gap-1.5">
						<span class="font-sans text-[11px] font-semibold text-white">Anand</span>
						<span class="font-mono text-[7px] uppercase tracking-wider text-neutral-400 bg-neutral-900/60 border border-neutral-800 px-1 py-0.2 rounded-sm shrink-0">Discord RPC</span>
					</div>
					<p class="font-sans text-[10px] text-neutral-300 leading-tight truncate mt-0.5">
						Listening to <strong class="text-[#5865F2] font-normal">{currentSong.title}</strong>
					</p>
					<p class="font-sans text-[9px] text-neutral-400 truncate mt-0.2 font-light">
						on Echo Pulse · {formatTime(currentTime)} elapsed
					</p>
				</div>
			</div>
		{/if}

	</div>
</div>

<style>
	.lyric-line {
		transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
	}
	.active-lyric .native-text {
		color: #b3a497;
	}
	.active-lyric .roman-text {
		font-weight: 500;
	}
	.inactive-lyric .roman-text {
		color: #594a3d;
	}
	.inactive-lyric .native-text {
		color: #40342a;
	}
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(4px); }
		to { opacity: 1; transform: none; }
	}
	:global(.animate-fade-in) {
		animation: fadeIn 0.35s ease-out forwards;
	}
</style>
