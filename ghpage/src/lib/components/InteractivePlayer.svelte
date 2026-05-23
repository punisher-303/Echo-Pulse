<script>
	import { onMount, onDestroy } from 'svelte';

	// Svelte 5 Runes for premium reactive state
	let playing = $state(false); // Start paused so it respects browser autoplay policies
	let currentTime = $state(0);
	let currentSongIndex = $state(0);
	let volume = $state(75);
	let showDiscordRpc = $state(true);
	let isMuted = $state(false);
	let videoEl = $state(null);
	let audioEl = $state(null);
	let shuffleActive = $state(false);
	let repeatActive = $state(false);

	let lanyardData = $state(null);
	let pollInterval;
	
	const DISCORD_USER_ID = "1377133763670183987"; // Replace with your Discord User ID (18 digits)

	async function fetchLanyard() {
		if (!DISCORD_USER_ID || DISCORD_USER_ID === "YOUR_DISCORD_USER_ID") return;
		try {
			const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
			if (res.ok) {
				const json = await res.json();
				if (json.success) {
					lanyardData = json.data;
				}
			}
		} catch (e) {
			console.error("Error fetching Lanyard status:", e);
		}
	}

	const songs = [
		{
			title: "Malare (Premam)",
			artist: "Vijay Yesudas",
			source: "Apple CDN Stream",
			sourceType: "hls",
			duration: 30,
			canvasUrl: "https://canvaz.scdn.co/upload/licensor/5bSw7fRotCnRCcO9br14W5/video/32b57cbf354b453a95eee32bb04d4e42.cnvs.mp4",
			audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/41/59/b4/4159b41b-708b-8140-d758-e8da1ed7bedd/mzaf_7080443034849106781.plus.aac.p.m4a",
			lyrics: [
				{ time: 0, native: "മലരേ നിന്നെ കാണാതിരുന്നാൽ", roman: "Malare ninne kaanaathirunnal", eng: "My flower, if I do not see you..." },
				{ time: 6, native: "മിഴികൾ പൂട്ടി മനസ്സിൻ താളിൽ", roman: "Mizhikal pootti manassin thaalil", eng: "With eyes closed on the pages of my heart..." },
				{ time: 13, native: "ഒരു പ്രേമലേഖനം എഴുതി വച്ചൂ", roman: "Oru premalekhanam ezhuthi vachoo", eng: "I have written a sweet love letter..." },
				{ time: 20, native: "നീയൊരു പൂവായി വിരിയുമെങ്കിൽ", roman: "Neeyoru poovaayi viriyumengil", eng: "If only you would bloom like a beautiful flower..." }
			]
		},
		{
			title: "Darshana (Hridayam)",
			artist: "Hesham Abdul Wahab",
			source: "Apple CDN Stream",
			sourceType: "hls",
			duration: 30,
			// High-performance abstract neon flow loop (Mixkit AWS CloudFront CDN) for absolute uptime
			canvasUrl: "https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-wave-lines-41908-large.mp4",
			audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/b6/55/65/b6556556-7aa0-de01-d33b-b0a58b16b4ea/mzaf_7770297109763908884.plus.aac.p.m4a",
			lyrics: [
				{ time: 0, native: "ദർശനാ സരിഗമപധനി", roman: "Darshana... Sarigamapadhani...", eng: "Darshana... (singing the musical notes scale)" },
				{ time: 6, native: "നിൻ നോക്കിൽ മിന്നൽ തിളക്കം", roman: "Nin nokkil minnal thilakkam", eng: "There is a spark of lightning in your eyes..." },
				{ time: 13, native: "എൻ നെഞ്ചിൽ അനുരാഗ രാഗം", roman: "En nenchil anuraaga raagam", eng: "A melody of deep love in my heart..." },
				{ time: 21, native: "എന്നെന്നും നീയെൻ പ്രിയതമ", roman: "Ennennum neeyen priyathama", eng: "You will always be my beloved..." }
			]
		},
		{
			title: "Jimikki Kammal",
			artist: "Vineeth Sreenivasan",
			source: "Apple CDN Stream",
			sourceType: "hls",
			duration: 30,
			// Beautiful active particle star loop (Mixkit AWS CloudFront CDN) for absolute uptime
			canvasUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-background-1611-large.mp4",
			audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/98/29/389829ae-8b46-4641-b333-f2f0930ad1fa/mzaf_16566485780048582185.plus.aac.p.m4a",
			lyrics: [
				{ time: 0, native: "എന്റമ്മേടെ ജിമിക്കി കമ്മൽ", roman: "Entammede jimikki kammal", eng: "My mother's golden jimikki earring..." },
				{ time: 7, native: "എന്റപ്പൻ കട്ടോണ്ട് പോയി", roman: "Entappan kattondu poyi", eng: "My father stole it and ran away..." },
				{ time: 14, native: "എന്റമ്മേടെ ജിമിക്കി കമ്മൽ", roman: "Entammede jimikki kammal", eng: "My mother's golden jimikki earring..." },
				{ time: 21, native: "എന്റപ്പൻ കട്ടോണ്ട് പോയി", roman: "Entappan kattondu poyi", eng: "My father stole it and ran away..." }
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

	let volumePercent = $derived(isMuted ? 0 : volume / 100);

	// Reactive Discord Presence State from Lanyard with simulated fallback
	const discordState = $derived.by(() => {
		if (lanyardData) {
			const user = lanyardData.discord_user;
			const isSpotify = lanyardData.listening_to_spotify && lanyardData.spotify;
			const custom = lanyardData.activities?.find(a => a.type === 4);
			const game = lanyardData.activities?.find(a => a.type !== 4);
			
			// Build status dot color class
			let statusColor = "bg-neutral-400"; // offline
			if (lanyardData.discord_status === "online") statusColor = "bg-green-500";
			else if (lanyardData.discord_status === "idle") statusColor = "bg-yellow-500";
			else if (lanyardData.discord_status === "dnd") statusColor = "bg-red-500";
			
			// Avatar URL
			let avatarUrl = "";
			if (user.avatar) {
				avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
			} else {
				// Default Discord avatar formula
				const defaultAvatarIndex = user.discriminator === "0" 
					? Number((BigInt(user.id) >> 22n) % 6n)
					: Number(user.discriminator) % 5;
				avatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;
			}

			// Avatar Decoration URL
			let decorationUrl = null;
			if (user.avatar_decoration_data && user.avatar_decoration_data.asset) {
				decorationUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=96`;
			}
			
			let statusTitle = "Online";
			let statusDetails = "Active on Discord";
			
			if (isSpotify) {
				statusTitle = lanyardData.spotify.song;
				statusDetails = `by ${lanyardData.spotify.artist}`;
			} else if (game) {
				statusTitle = game.name;
				statusDetails = game.details || game.state || "Active";
			} else if (custom) {
				statusTitle = custom.state || "";
				statusDetails = "Custom Status";
			}
			
			return {
				isLive: true,
				username: user.global_name || user.username || "Anand",
				avatarUrl,
				decorationUrl,
				statusColor,
				statusTitle,
				statusDetails,
				isSpotify,
				tag: isSpotify ? "LISTENING ON SPOTIFY" : game ? "PLAYING" : "DISCORD STATUS"
			};
		}
		
		// Fallback to local simulator
		return {
			isLive: false,
			username: "Anand",
			avatarUrl: null,
			decorationUrl: null,
			statusColor: "bg-green-500",
			statusTitle: currentSong.title,
			statusDetails: `on Echo Pulse · ${formatTime(currentTime)} elapsed`,
			isSpotify: false,
			tag: "DISCORD PRESENCE"
		};
	});

	onMount(() => {
		if (videoEl && playing) {
			videoEl.play().catch(() => {});
		}
		if (audioEl && playing) {
			audioEl.play().catch(() => {});
		}
		
		if (DISCORD_USER_ID && DISCORD_USER_ID !== "YOUR_DISCORD_USER_ID") {
			fetchLanyard();
			pollInterval = setInterval(fetchLanyard, 15000); // Update status every 15s
		}
	});

	onDestroy(() => {
		if (pollInterval) clearInterval(pollInterval);
	});

	// Trigger restart when song changes
	$effect(() => {
		// Watch currentSongIndex
		currentTime = 0;
		if (audioEl) {
			audioEl.load();
			if (playing) {
				audioEl.play().catch(() => {});
			}
		}
		if (videoEl) {
			videoEl.load();
			if (playing) {
				videoEl.play().catch(() => {});
			}
		}
	});

	// Control play/pause states dynamically
	$effect(() => {
		if (audioEl) {
			if (playing) {
				audioEl.play().catch(() => {});
			} else {
				audioEl.pause();
			}
		}
		if (videoEl) {
			if (playing) {
				videoEl.play().catch(() => {});
			} else {
				videoEl.pause();
			}
		}
	});

	// Sync volume to audio element
	$effect(() => {
		if (audioEl) {
			audioEl.volume = volumePercent;
		}
	});

	// Automatic lyrics centering scroll action
	let lyricElements = [];
	function registerLyricEl(node, idx) {
		lyricElements[idx] = node;
		return {
			destroy() {
				lyricElements[idx] = null;
			}
		};
	}

	$effect(() => {
		// Watch activeLyricIndex and scroll container automatically
		const activeEl = lyricElements[activeLyricIndex];
		if (activeEl) {
			activeEl.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest'
			});
		}
	});

	function handleVideoError() {
		console.warn("Spotify Canvas loop failed to load. Applying stable fallback stream.");
		if (videoEl) {
			const fallbackUrl = "https://canvaz.scdn.co/upload/licensor/5bSw7fRotCnRCcO9br14W5/video/32b57cbf354b453a95eee32bb04d4e42.cnvs.mp4";
			if (videoEl.src !== fallbackUrl) {
				videoEl.src = fallbackUrl;
				videoEl.load();
				if (playing) {
					videoEl.play().catch(() => {});
				}
			}
		}
	}

	function togglePlay() {
		playing = !playing;
	}

	function nextSong() {
		if (shuffleActive) {
			let nextIndex;
			do {
				nextIndex = Math.floor(Math.random() * songs.length);
			} while (nextIndex === currentSongIndex && songs.length > 1);
			currentSongIndex = nextIndex;
		} else {
			currentSongIndex = (currentSongIndex + 1) % songs.length;
		}
	}

	function prevSong() {
		currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
	}

	function handleProgressClick(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const width = rect.width;
		const percentage = clickX / width;
		seekToTime(Math.floor(percentage * currentSong.duration));
	}

	function seekToTime(time) {
		currentTime = time;
		if (audioEl) {
			audioEl.currentTime = time;
		}
		if (videoEl) {
			videoEl.currentTime = time;
		}
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

<!-- HTML5 Audio Element mapping direct song previews -->
<!-- svelte-ignore a11y_media_has_caption -->
<audio 
	bind:this={audioEl}
	src={currentSong.audioUrl}
	bind:currentTime={currentTime}
	bind:muted={isMuted}
	onended={nextSong}
></audio>

<!-- IMMERSIVE PREMIUM LIGHT CURVY IOS GLASSMORPHIC CONTAINER BOX -->
<div class="interactive-player-card hover-3d-widget w-full max-w-[940px] mx-auto rounded-[36px] overflow-hidden border border-white/70 bg-white/45 backdrop-blur-[24px] shadow-[0_32px_70px_-12px_rgba(224,79,106,0.12),inset_0_1px_1px_rgba(255,255,255,0.7)] p-5 md:p-7 flex flex-col md:flex-row gap-7 items-stretch text-[#1c1c1e] select-none z-10 relative">
	
	<!-- Premium light background grid element inside card -->
	<div class="absolute inset-0 bg-grid-slate-100/40 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none z-0"></div>
	
	<!-- Ambient Background Glow Inside the Card (Subtle high-end translucent lights) -->
	<div class="absolute -top-[45%] -left-[20%] w-[85%] h-[85%] bg-[radial-gradient(circle,rgba(224,79,106,0.08)_0%,transparent_60%)] pointer-events-none z-0 animate-pulse" style="animation-duration: 8s"></div>
	<div class="absolute -bottom-[45%] -right-[20%] w-[85%] h-[85%] bg-[radial-gradient(circle,rgba(67,163,111,0.04)_0%,transparent_60%)] pointer-events-none z-0 animate-pulse" style="animation-duration: 12s"></div>

	<!-- LEFT COLUMN: Highly Realistic, Premium Smartphone Mockup -->
	<div class="flex-none w-full max-w-[310px] mx-auto z-10 relative">
		<!-- Phone Chassis Container -->
		<div class="iphone-mockup float-3d-medium" class:paused={!playing}>
			<!-- Camera Notch -->
			<div class="notch">
				<div class="notch-speaker"></div>
				<div class="notch-camera"></div>
			</div>
			
			<!-- Screen Content Area -->
			<div class="screen-content">
				<!-- Background Loop Video Container -->
				<div class="canvas-video-container">
					<!-- svelte-ignore a11y_media_has_caption -->
					<video 
						bind:this={videoEl}
						src={currentSong.canvasUrl}
						loop
						muted
						playsinline
						onerror={handleVideoError}
						class="w-full h-full object-cover"
					></video>
					<!-- Dark Glass gradient wash to maintain premium readability -->
					<div class="video-overlay"></div>
				</div>

				<!-- Translucent Phone Top Bar Widget -->
				<div class="phone-header">
					<span class="font-mono text-[10px] tracking-wide text-white">9:41</span>
					<div class="status-icons">
						<!-- Wifi Vector SVG -->
						<svg class="phone-icon-small fill-current text-white" viewBox="0 0 24 24" width="12" height="12">
							<path d="M12 21a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm0-4a6 6 0 0 1-6-6 1 1 0 0 1 2 0 4 4 0 0 0 8 0 1 1 0 0 1 2 0 6 6 0 0 1-6 6zm0-5a10 10 0 0 1-10-10 1 1 0 1 1 2 0 8 8 0 0 0 16 0 1 1 0 1 1 2 0 10 10 0 0 1-10 10z"/>
						</svg>
						<!-- Cellular Signal Vector SVG -->
						<svg class="phone-icon-small fill-current text-white" viewBox="0 0 24 24" width="12" height="12">
							<rect x="3" y="14" width="3" height="6" rx="1"/>
							<rect x="8" y="10" width="3" height="10" rx="1"/>
							<rect x="13" y="6" width="3" height="14" rx="1"/>
							<rect x="18" y="2" width="3" height="18" rx="1"/>
						</svg>
						<!-- Battery Vector SVG -->
						<svg class="phone-icon-small text-white" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
							<rect x="2" y="7" width="16" height="10" rx="2"/>
							<line x1="22" y1="11" x2="22" y2="13"/>
							<rect x="4" y="9" width="8" height="6" rx="1" fill="currentColor"/>
						</svg>
					</div>
				</div>

				<!-- Player Screen Overlay -->
				<div class="player-overlay">
					<!-- Top Track Info Indicator Row -->
					<div class="track-header-meta">
						<div class="canvas-active-tag">
							<div class="bar-animation">
								<span class="eq-bar eq-1"></span>
								<span class="eq-bar eq-2"></span>
								<span class="eq-bar eq-3"></span>
							</div>
							<span>CANVAS PLAYING</span>
						</div>
						<div class="btn-circle-blur">
							<!-- Heart vector SVG -->
							<svg viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5 text-c-pk">
								<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
							</svg>
						</div>
					</div>

					<!-- Bottom Playing Status Overlay Panel -->
					<div class="player-bottom">
						<!-- Title, artist & source -->
						<div class="song-details-wrap">
							<div class="song-text text-left">
								<h4 class="truncate max-w-[170px] text-white">{currentSong.title}</h4>
								<p class="truncate max-w-[170px] text-white/70">{currentSong.artist}</p>
							</div>
							<div class="source-bubble">
								{#if currentSong.sourceType === 'hls'}
									<span class="source-dot bg-red-500 animate-pulse"></span>
								{:else if currentSong.sourceType === 'offline'}
									<span class="source-dot bg-emerald-500"></span>
								{:else}
									<span class="source-dot bg-blue-500 animate-pulse"></span>
								{/if}
								<span>{currentSong.sourceType.toUpperCase()}</span>
							</div>
						</div>

						<!-- Tiny progress slider bar -->
						<div class="playback-bar-container">
							<span class="time-label text-left">{formatTime(currentTime)}</span>
							<button class="playback-slider border-0 p-0" onclick={handleProgressClick} aria-label="Seek track">
								<div class="slider-filled" style="width: {(currentTime / currentSong.duration) * 100}%"></div>
								<div class="slider-thumb" style="left: {(currentTime / currentSong.duration) * 100}%"></div>
							</button>
							<span class="time-label text-right">{formatTime(currentSong.duration)}</span>
						</div>

						<!-- Core Controller Buttons Row inside Phone Screen -->
						<div class="playback-controls">
							<!-- Shuffle Button -->
							<button class="btn-ctrl" class:active={shuffleActive} onclick={() => shuffleActive = !shuffleActive} aria-label="Shuffle" title="Shuffle">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="16 3 21 3 21 8"></polyline>
									<line x1="4" y1="20" x2="21" y2="3"></line>
									<polyline points="21 16 21 21 16 21"></polyline>
									<line x1="15" y1="15" x2="21" y2="21"></line>
									<line x1="4" y1="4" x2="9" y2="9"></line>
								</svg>
							</button>

							<!-- Prev Button -->
							<button class="btn-ctrl" onclick={prevSong} aria-label="Previous">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="19 20 9 12 19 4 19 20"></polygon>
									<line x1="5" y1="19" x2="5" y2="5"></line>
								</svg>
							</button>

							<!-- Primary Play Pause Circle Button -->
							<button class="btn-play-pause" onclick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
								{#if playing}
									<svg viewBox="0 0 24 24" fill="currentColor">
										<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
									</svg>
								{:else}
									<svg viewBox="0 0 24 24" class="translate-x-[1px]" fill="currentColor">
										<path d="M8 5v14l11-7z"/>
									</svg>
								{/if}
							</button>

							<!-- Next Button -->
							<button class="btn-ctrl" onclick={nextSong} aria-label="Next">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<polygon points="5 4 15 12 5 20 5 4"></polygon>
									<line x1="19" y1="5" x2="19" y2="19"></line>
								</svg>
							</button>

							<!-- Repeat Button -->
							<button class="btn-ctrl" class:active={repeatActive} onclick={() => repeatActive = !repeatActive} aria-label="Repeat" title="Repeat">
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<polyline points="17 1 21 5 17 9"></polyline>
									<path d="M3 11V9a4 4 0 0 1 4-4h14M7 23 3 19 7 15"></path>
									<path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
								</svg>
							</button>
						</div>

						<!-- Connected Status Info Row -->
						<div class="player-footer-icons">
							<div class="flex items-center gap-1.5 text-indigo-400">
								<!-- Headphones Icon -->
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3 h-3">
									<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
									<path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
								</svg>
								<span>Pulse Room Sync</span>
							</div>
							<button class="btn-text-mute" onclick={toggleMute} aria-label="Mute Toggle">
								{#if isMuted}
									<!-- Volume mute -->
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3.5 h-3.5 text-red-400">
										<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
										<line x1="23" y1="9" x2="17" y2="15"></line>
										<line x1="17" y1="9" x2="23" y2="15"></line>
									</svg>
								{:else}
									<!-- Volume high -->
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3.5 h-3.5 text-white/80">
										<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
										<path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
									</svg>
								{/if}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- RIGHT COLUMN: Elegant Glassmorphic Live Sync Lyrics Sheet -->
	<div class="flex-grow flex flex-col pt-4 md:pt-0 md:pl-7 border-t md:border-t-0 md:border-l border-[#1c1c1e]/[0.06] min-h-[320px] justify-between z-10 relative text-left">
		
		<!-- Panel Head Info -->
		<div class="flex items-center justify-between mb-4">
			<div class="font-mono text-[10px] uppercase tracking-[0.15em] text-c-pk flex items-center gap-2 font-bold">
				<span class="w-[7px] h-[7px] rounded-full bg-c-pk animate-pulse"></span>
				Live Romanized Lyrics
			</div>
			<div class="font-mono text-[9px] text-[#55555c] bg-white/50 border border-white/90 px-3 py-0.5 rounded-full font-semibold shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
				Track {currentSongIndex + 1} of {songs.length}
			</div>
		</div>

		<!-- List selection chips of other tracks to let user switch tracks -->
		<div class="flex flex-wrap gap-2 mb-4">
			{#each songs as song, idx}
				<button 
					class="px-3 py-1.5 rounded-full font-sans text-[11px] font-semibold border transition-all cursor-pointer flex items-center gap-2 shadow-sm"
					class:active-chip={idx === currentSongIndex}
					class:inactive-chip={idx !== currentSongIndex}
					onclick={() => currentSongIndex = idx}
				>
					<span class="w-1.5 h-1.5 rounded-full chip-dot"></span>
					{song.title}
				</button>
			{/each}
		</div>

		<!-- Lyrics block with fade mask overlays -->
		<div class="flex-grow overflow-hidden relative flex flex-col gap-4 py-3 justify-start max-h-[220px] overflow-y-auto scrollbar-none pr-1">
			<!-- Faded top/bottom light visual overlays -->
			<div class="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-10"></div>
			<div class="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-10"></div>
			
			{#each currentSong.lyrics as lyric, idx}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div 
					use:registerLyricEl={idx}
					class="lyric-line transition-all duration-350 transform py-1 px-2.5 rounded-xl cursor-pointer hover:bg-white/[0.03]"
					class:active-lyric={idx === activeLyricIndex}
					class:inactive-lyric={idx !== activeLyricIndex}
					onclick={() => seekToTime(lyric.time)}
					style="
						opacity: {idx === activeLyricIndex ? 1 : (Math.abs(idx - activeLyricIndex) === 1 ? 0.65 : 0.35)};
						transform: scale({idx === activeLyricIndex ? 1.01 : 0.98});
					"
				>
					<!-- Original script regional lyrics line -->
					<div class="native-text font-serif text-[13px] md:text-[14px] leading-snug transition-colors">
						{lyric.native}
					</div>
					<!-- Transliterated Romanized Lyric Line with pink-blossom neon glow on active -->
					<div class="roman-text font-serif text-[17px] md:text-[19px] font-medium leading-snug tracking-tight mt-1 transition-colors">
						{#if idx === activeLyricIndex}
							<span class="bg-gradient-to-r from-c-pk via-[#ff7890] to-white bg-clip-text text-transparent font-semibold drop-shadow-[0_2px_8px_rgba(224,79,106,0.35)]">
								{lyric.roman}
							</span>
						{:else}
							<span>{lyric.roman}</span>
						{/if}
					</div>
					<!-- English translation subtitle on active line -->
					{#if idx === activeLyricIndex}
						<div class="eng-text font-sans text-[11px] text-[#48484a] font-medium italic mt-1 transition-all animate-fade-in flex items-center gap-1">
							<!-- Subtitle Info Icon -->
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="w-3.5 h-3.5 text-neutral-400">
								<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
							</svg>
							<span>{lyric.eng}</span>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Discord Rich Presence live simulation console bottom bar -->
		{#if showDiscordRpc}
			<div class="discord-rpc-widget mt-4 p-3 rounded-[18px] bg-white/45 border border-white/75 flex items-center gap-3 transition-all duration-300 hover:bg-white/60 animate-fade-in relative overflow-hidden group shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
				<!-- Discord controller watermark SVG background -->
				<svg class="absolute -right-4 -bottom-4 w-[74px] h-[74px] text-[#5865F2] opacity-[0.06] group-hover:scale-110 transition-transform duration-300 fill-current" viewBox="0 0 127.14 96.36">
					<path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2a75.58,75.58,0,0,0,72.9,0c.82.71,1.68,1.4,2.58,2a68.69,68.69,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,32.53-18.83C129.1,54.65,123.38,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/>
				</svg>
				
				<!-- Discord user details avatar & decoration -->
				<div class="relative w-9 h-9 shrink-0 flex items-center justify-center">
					{#if discordState.avatarUrl}
						<div class="w-[30px] h-[30px] rounded-full overflow-hidden border border-[#5865F2]/20 shadow-sm bg-neutral-100 relative">
							<img src={discordState.avatarUrl} alt={discordState.username} class="w-full h-full object-cover" />
						</div>
					{:else}
						<div class="w-[30px] h-[30px] rounded-full bg-[#5865F2] flex items-center justify-center text-white relative shadow-sm border border-[#5865F2]/20">
							<!-- Audio controller headphones SVG -->
							<svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
								<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
								<path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
							</svg>
						</div>
					{/if}
					
					{#if discordState.decorationUrl}
						<img src={discordState.decorationUrl} alt="Discord Avatar Decoration" class="absolute -top-[12%] -left-[12%] w-[124%] h-[124%] pointer-events-none z-10 scale-[1.08]" />
					{/if}
					
					<span class="absolute bottom-0 right-0 w-2.5 h-2.5 {discordState.statusColor} border-2 border-white rounded-full z-20"></span>
				</div>
				
				<div class="min-w-0 flex-1">
					<div class="flex items-center gap-1.5">
						<span class="font-sans text-[11px] font-bold text-[#1c1c1e]">{discordState.username}</span>
						<span class="font-mono text-[7px] uppercase tracking-wider text-[#4d57c8] bg-[#5865F2]/12 border border-[#5865F2]/20 px-1.5 py-0.2 rounded-sm shrink-0 font-bold">{discordState.tag}</span>
					</div>
					<p class="font-sans text-[10px] text-[#2c2c2e] leading-tight truncate mt-0.5">
						{#if discordState.isSpotify}
							Listening to <strong class="text-c-pk font-bold">{discordState.statusTitle}</strong>
						{:else}
							<strong>{discordState.statusTitle}</strong>
						{/if}
					</p>
					<p class="font-sans text-[9px] text-[#8e8e93] truncate mt-0.2">
						{discordState.statusDetails}
					</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* iPhone Mockup frame with active 3D floating and hover tilt */
	.iphone-mockup {
		width: 100%;
		height: 480px;
		background: #0d0d11;
		border-radius: 40px;
		padding: 10px;
		box-shadow: 
			0 30px 60px -15px rgba(0, 0, 0, 0.7),
			0 0 0 4px #1a1a24,
			0 0 0 8px #08080c;
		position: relative;
		overflow: hidden;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		transform-style: preserve-3d;
		perspective: 1000px;
	}
	.iphone-mockup:hover {
		transform: translateY(-8px) rotateX(8deg) rotateY(-6deg) scale(1.03) !important;
		box-shadow: 
			0 50px 100px -20px rgba(0, 0, 0, 0.9),
			0 15px 30px rgba(224, 79, 106, 0.25),
			0 0 0 4px #222230,
			0 0 0 8px #0c0c12;
		animation-play-state: paused !important; /* freeze float cycle when interacting */
	}

	/* Dynamic screen container inside frame */
	.screen-content {
		width: 100%;
		height: 100%;
		background-color: #0d0c0f;
		border-radius: 32px;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 18px 14px 14px;
	}

	/* Apple Camera Notch details */
	.notch {
		position: absolute;
		top: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: 100px;
		height: 18px;
		background: #000;
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 0 10px;
	}
	.notch-speaker {
		width: 35px;
		height: 3px;
		background: #111;
		border-radius: 2px;
	}
	.notch-camera {
		width: 5.5px;
		height: 5.5px;
		background: #0d0022;
		border-radius: 50%;
		box-shadow: inset 0 1px 1.5px rgba(255,255,255,0.2);
	}

	/* Video looping layer */
	.canvas-video-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	.video-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.88) 100%);
		z-index: 2;
	}

	/* Simulated Status bar headers */
	.phone-header {
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 4px;
	}
	.status-icons {
		display: flex;
		align-items: center;
		gap: 5px;
	}
	.phone-icon-small {
		width: 11px;
		height: 11px;
	}

	/* Translucent overlays */
	.player-overlay {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding-top: 14px;
	}

	.track-header-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.canvas-active-tag {
		background: rgba(0,0,0,0.6);
		border: 1px solid rgba(255,255,255,0.2);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		border-radius: 20px;
		padding: 4px 10px;
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 0.6rem;
		font-weight: 700;
		color: #fff;
		letter-spacing: 0.05em;
	}

	.btn-circle-blur {
		width: 26px;
		height: 26px;
		background: rgba(0,0,0,0.45);
		border: 1px solid rgba(255,255,255,0.1);
		backdrop-filter: blur(6px);
		border-radius: 50%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	/* Live active music sound Equalizer */
	.bar-animation {
		display: flex;
		align-items: flex-end;
		gap: 1.5px;
		width: 8.5px;
		height: 7px;
	}
	.bar-animation .eq-bar {
		width: 1.5px;
		background-color: var(--color-c-pk);
		border-radius: 1px;
	}
	.bar-animation .eq-1 { height: 30%; animation: eqScale 0.5s infinite alternate; }
	.bar-animation .eq-2 { height: 90%; animation: eqScale 0.4s infinite alternate-reverse 0.1s; }
	.bar-animation .eq-3 { height: 60%; animation: eqScale 0.6s infinite alternate 0.2s; }

	@keyframes eqScale {
		0% { height: 20%; }
		100% { height: 100%; }
	}

	.paused .eq-bar {
		animation-play-state: paused !important;
	}

	.player-bottom {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.song-details-wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.song-text h4 {
		font-size: 1.05rem;
		font-weight: 700;
		color: #fff;
		line-height: 1.2;
		letter-spacing: -0.01em;
	}
	.song-text p {
		font-size: 0.8rem;
		color: rgba(255,255,255,0.7);
		font-weight: 500;
		margin-top: 2px;
	}
	.source-bubble {
		background: rgba(255,255,255,0.1);
		border: 1px solid rgba(255,255,255,0.08);
		backdrop-filter: blur(4px);
		border-radius: 20px;
		padding: 3px 8px;
		font-size: 0.65rem;
		font-weight: 700;
		color: rgba(255,255,255,0.9);
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.source-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
	}

	/* Slider range mechanics */
	.playback-bar-container {
		display: flex;
		align-items: center;
		gap: 6px;
	}
	.time-label {
		font-size: 0.6rem;
		color: rgba(255,255,255,0.5);
		width: 25px;
		font-family: var(--font-mono);
	}
	.playback-slider {
		flex-grow: 1;
		height: 3px;
		background: rgba(255,255,255,0.22);
		border-radius: 2px;
		position: relative;
		cursor: pointer;
	}
	.slider-filled {
		height: 100%;
		background: #fff;
		border-radius: 2px;
	}
	.slider-thumb {
		width: 6.5px;
		height: 6.5px;
		background: #fff;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.playback-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2px;
	}
	.btn-ctrl {
		background: transparent;
		border: none;
		color: rgba(255,255,255,0.6);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		transition: all 0.2s ease;
	}
	.btn-ctrl svg {
		width: 15px;
		height: 15px;
	}
	.btn-ctrl:hover {
		color: #fff;
	}
	.btn-ctrl.active {
		color: var(--color-c-pk);
		drop-shadow: 0 0 8px rgba(224,79,106,0.5);
	}

	.btn-play-pause {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #fff;
		border: none;
		color: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 4px 12px rgba(0,0,0,0.3);
		transition: transform 0.2s ease, background-color 0.2s ease;
	}
	.btn-play-pause:hover {
		transform: scale(1.06);
		background-color: var(--color-c-pk-m);
	}
	.btn-play-pause svg {
		width: 16px;
		height: 16px;
	}

	.player-footer-icons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: rgba(255,255,255,0.5);
		font-size: 0.6rem;
		font-weight: 500;
	}
	.player-footer-icons span {
		font-weight: 700;
		font-size: 0.65rem;
		letter-spacing: 0.01em;
	}
	.btn-text-mute {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.2s ease;
	}

	/* Interactive selection chip layout - iOS Light Glassmorphic Style */
	.active-chip {
		background: rgba(224, 79, 106, 0.12);
		border-color: rgba(224, 79, 106, 0.25);
		color: var(--color-c-pk);
		box-shadow: 0 4px 12px rgba(224, 79, 106, 0.06);
	}
	.active-chip .chip-dot {
		background-color: var(--color-c-pk);
	}
	.inactive-chip {
		background: rgba(255, 255, 255, 0.45);
		border-color: rgba(0, 0, 0, 0.05);
		color: #4a4a4f;
	}
	.inactive-chip .chip-dot {
		background-color: rgba(0, 0, 0, 0.2);
	}
	.inactive-chip:hover {
		background: rgba(255, 255, 255, 0.7);
		border-color: rgba(0, 0, 0, 0.1);
		color: #1c1c1e;
	}

	/* Lyrics live transitions mechanics - High Contrast Light Mode */
	.lyric-line {
		transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s ease;
	}
	.active-lyric {
		background-color: rgba(224, 79, 106, 0.07);
		border-left: 3.5px solid var(--color-c-pk);
		padding-left: 9px !important;
	}
	.active-lyric .native-text {
		color: #1c1c1e;
	}
	.active-lyric .roman-text {
		font-weight: 700;
		color: #000;
	}
	.inactive-lyric .roman-text {
		color: #3a3a3c;
	}
	.inactive-lyric .native-text {
		color: #8e8e93;
	}

	/* Custom hidden scrollbar style to make it seamless */
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
	.scrollbar-none {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(4px); }
		to { opacity: 1; transform: none; }
	}
	:global(.animate-fade-in) {
		animation: fadeIn 0.35s ease-out forwards;
	}
</style>
