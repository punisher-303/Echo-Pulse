<script>
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SupportWidget from '$lib/components/SupportWidget.svelte';

	const GITHUB_REPO = "punisher-303/Echo-Pulse";
	const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1494932524604985444/6UT3cI9tcowf4frIQVyvU2NVUhiF30GdWsLqtTBERXVXhi__97Gvb5tea1foNQiVLpbW";

	let issues = $state([]);
	let commentsData = $state({}); // Store comments keyed by issue number
	let adminReplies = $state({}); // Text bind for admin reply inputs keyed by issue number
	let isLoading = $state(true);
	let isReplying = $state({}); // Loading state for replies keyed by issue number
	
	let toastMessage = $state("");
	let showToast = $state(false);
	let toastType = $state("success");

	// Display alert toasts
	function triggerToast(msg, type = "success") {
		toastMessage = msg;
		toastType = type;
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 5000);
	}

	// Fetch issues from GitHub API
	async function fetchIssues() {
		isLoading = true;
		try {
			const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues?state=all&per_page=100`);
			if (res.ok) {
				const list = await res.json();
				// Filter: exclude PRs, keep only issues with label 'support' or 'bug'
				issues = list.filter(item => 
					!item.pull_request && 
					item.labels.some(label => label.name === 'support' || label.name === 'bug')
				);
				
				// Fetch comments for all active issues
				for (const issue of issues) {
					fetchComments(issue.number);
				}
			} else {
				triggerToast("Failed to fetch issues from GitHub.", "error");
			}
		} catch (e) {
			console.error("Error fetching issues:", e);
			triggerToast("Error loading issues list.", "error");
		} finally {
			isLoading = false;
		}
	}

	// Fetch comments for a specific issue
	async function fetchComments(number) {
		try {
			const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues/${number}/comments`);
			if (res.ok) {
				const list = await res.json();
				commentsData[number] = list;
			}
		} catch (e) {
			console.error(`Error fetching comments for issue #${number}:`, e);
		}
	}

	// Anonymizer helper: strip names, contacts, and email tags from description
	function cleanDescription(body) {
		if (!body) return "No description provided.";
		// Remove 'Support Ticket Details' sections (contains names and contact info)
		const detailsRegex = /### Support Ticket Details[\s\S]*?(?=### Description|$)/i;
		let clean = body.replace(detailsRegex, "").trim();
		// Remove '### Description' header
		clean = clean.replace(/### Description/i, "").trim();
		return clean;
	}

	// Submit Admin Reply to Discord Webhook and prepare Clipboard Copy
	async function submitAdminReply(issueNumber, issueTitle) {
		const replyText = adminReplies[issueNumber] || "";
		if (!replyText.trim()) {
			triggerToast("Please write a reply first.", "error");
			return;
		}

		isReplying[issueNumber] = true;

		// Format webhook payload
		const payload = {
			username: "Echo Pulse Helpdesk",
			avatar_url: "https://raw.githubusercontent.com/punisher-303/Echo-Pulse/main/assets/icon.png",
			embeds: [
				{
					title: `💬 Admin Replied to Support Issue #${issueNumber}`,
					color: 14700394, // Brand pink #E04F6A
					description: `**Ticket Title:** ${issueTitle}\n\n**Reply:**\n${replyText}`,
					fields: [
						{
							name: "🔗 Action Required",
							value: `[Add Comment on GitHub](https://github.com/${GITHUB_REPO}/issues/${issueNumber}#issuecomment-new)`
						}
					],
					footer: {
						text: "Echo Pulse Web Portal · Support Feedback"
					},
					timestamp: new Date().toISOString()
				}
			]
		};

		try {
			// 1. Post to Discord
			const response = await fetch(`${DISCORD_WEBHOOK_URL}?with_components=true`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});

			if (response.ok || response.status === 204) {
				// 2. Copy reply text to clipboard
				await navigator.clipboard.writeText(replyText);
				
				// 3. Clear text input
				adminReplies[issueNumber] = "";

				triggerToast("Reply copied to clipboard and sent to Discord! Opening GitHub to save comments...");

				// 4. Open GitHub issue in a new tab so they can paste the comment
				setTimeout(() => {
					window.open(`https://github.com/${GITHUB_REPO}/issues/${issueNumber}#issuecomment-new`, "_blank");
				}, 1500);
			} else {
				throw new Error("Discord API error");
			}
		} catch (error) {
			console.error("Admin reply submission error:", error);
			triggerToast("Failed to notify Discord. Please try again.", "error");
		} finally {
			isReplying[issueNumber] = false;
		}
	}

	onMount(() => {
		fetchIssues();
	});
</script>

<svelte:head>
	<title>Echo Pulse — Support Board</title>
	<meta name="description" content="Public dashboard of reported issues and active status updates." />
</svelte:head>

<div class="bg-c-bg text-c-t1 font-sans min-h-screen selection:bg-c-pk-l selection:text-c-pk-d overflow-x-hidden relative">
	<Navbar />

	<main class="pt-[92px] pb-[88px] px-5 md:px-8 max-w-[940px] mx-auto min-h-[calc(100vh-140px)]">
		<!-- Section Header -->
		<div class="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.18em] uppercase text-c-t3 mb-7 animate-fade-in">
			<div class="w-[14px] h-[2px] bg-c-pk rounded-sm"></div>
			Support Center
		</div>

		<div class="mb-10 animate-fade-in">
			<h1 class="font-serif text-[clamp(32px,5vw,52px)] font-light tracking-[-0.04em] text-c-t1 mb-3">
				Public <em class="italic text-c-pk">Issues Board.</em>
			</h1>
			<p class="font-sans text-[14px] text-c-t2 leading-[1.7] max-w-[500px]">
				Browse anonymous tickets, check active dev status, and view replies. You can report bugs using the headset widget in the bottom right corner.
			</p>
		</div>

		{#if isLoading}
			<div class="flex flex-col items-center justify-center py-20 gap-3">
				<i class="fa-solid fa-circle-notch animate-spin text-[26px] text-c-pk"></i>
				<span class="font-mono text-[10px] uppercase tracking-wider text-c-t3">Loading issues board...</span>
			</div>
		{:else if issues.length === 0}
			<div class="text-center py-20 bg-c-s1 border border-c-b1 rounded-[24px] p-6 shadow-sh-md">
				<i class="fa-solid fa-circle-check text-[32px] text-c-gn mb-4 block"></i>
				<h3 class="font-serif text-[18px] font-normal text-c-t1 mb-1.5">No reported issues!</h3>
				<p class="font-sans text-[13px] text-c-t3">All systems are operational and no support tickets are open.</p>
			</div>
		{:else}
			<div class="flex flex-col gap-5">
				{#each issues as issue}
					<div class="bg-c-s1 border border-c-b1 rounded-[24px] p-5 md:p-6 shadow-sh-md transition-shadow hover:shadow-[0_6px_20px_rgba(0,0,0,0.02)] flex flex-col gap-4.5">
						<!-- Issue Header -->
						<div class="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-c-b1">
							<div class="flex items-center gap-3">
								<span class="font-mono text-[11px] font-bold text-c-pk bg-c-pk-l border border-c-pk-m/20 px-2.5 py-0.5 rounded-md">
									Issue #{issue.number}
								</span>
								<h3 class="font-sans text-[14px] font-semibold text-c-t1 leading-tight max-w-[400px] truncate" title={issue.title}>
									{issue.title.replace(/\[.*?\]\s*/g, '')}
								</h3>
							</div>
							
							<div class="flex items-center gap-2">
								{#if issue.state === 'closed'}
									<span class="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-c-gn bg-c-gn-l border border-[#aadcc0] px-2 py-0.5 rounded-full font-semibold">
										<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
										Fixed
									</span>
								{:else}
									<span class="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-c-pk bg-c-pk-l border border-c-pk-m/25 px-2 py-0.5 rounded-full font-semibold">
										<span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
										Pending
									</span>
								{/if}
								
								<a href={issue.html_url} target="_blank" rel="noopener noreferrer" class="w-7 h-7 rounded-lg bg-c-s2 hover:bg-c-s3 flex items-center justify-center text-c-t3 hover:text-c-t1 transition-all" title="View on GitHub" aria-label="View on GitHub">
									<i class="fa-brands fa-github text-[14px]"></i>
								</a>
							</div>
						</div>

						<!-- Issue Description (Anonymized) -->
						<div class="flex flex-col gap-2.5">
							<span class="font-mono text-[8px] uppercase tracking-widest text-c-t3 font-bold">Issue Description</span>
							<p class="font-sans text-[13px] text-c-t2 leading-relaxed bg-[#faf8f4]/40 border border-c-b1/50 rounded-xl p-3.5 whitespace-pre-wrap">
								{cleanDescription(issue.body)}
							</p>
						</div>

						<!-- Admin Replies / Comments thread -->
						<div class="flex flex-col gap-2.5">
							<span class="font-mono text-[8px] uppercase tracking-widest text-c-t3 font-bold">Developer Updates</span>
							
							{#if commentsData[issue.number] && commentsData[issue.number].length > 0}
								<div class="flex flex-col gap-3">
									{#each commentsData[issue.number] as comment}
										{#if comment.user.login === 'punisher-303' || comment.author_association === 'OWNER'}
											<!-- Highlight Admin Comments -->
											<div class="bg-c-pk-l/40 border border-c-pk-m/35 rounded-xl p-3.5 flex flex-col gap-1.5 relative overflow-hidden group">
												<div class="flex items-center justify-between">
													<div class="flex items-center gap-1.5 font-sans text-[11px] font-bold text-c-pk">
														<i class="fa-solid fa-user-shield text-[12px]"></i>
														<span>Reply by Admin</span>
													</div>
													<span class="font-mono text-[8.5px] text-c-t3">
														{new Date(comment.created_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
													</span>
												</div>
												<p class="font-sans text-[12.5px] text-c-t1 leading-relaxed">
													{comment.body}
												</p>
											</div>
										{:else}
											<!-- General Comments -->
											<div class="bg-white/40 border border-c-b1/60 rounded-xl p-3.5 flex flex-col gap-1.5">
												<div class="flex items-center justify-between">
													<div class="flex items-center gap-1.5 font-sans text-[11px] font-bold text-c-t2">
														<i class="fa-solid fa-user text-[11px] text-c-t3"></i>
														<span>Developer Response</span>
													</div>
													<span class="font-mono text-[8.5px] text-c-t3">
														{new Date(comment.created_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}
													</span>
												</div>
												<p class="font-sans text-[12.5px] text-c-t2 leading-relaxed">
													{comment.body}
												</p>
											</div>
										{/if}
									{/each}
								</div>
							{:else}
								<div class="text-[11px] text-c-t3 italic px-1">No responses posted yet.</div>
							{/if}
						</div>

						<!-- Admin Reply Action Box -->
						<div class="mt-2.5 pt-3.5 border-t border-c-b1 flex flex-col gap-2">
							<span class="font-mono text-[8px] uppercase tracking-widest text-c-t3 font-bold">Write response as admin</span>
							<div class="flex gap-2">
								<textarea
									placeholder="Type response to notify Discord..."
									bind:value={adminReplies[issue.number]}
									disabled={isReplying[issue.number]}
									rows="1"
									class="flex-1 min-h-[38px] max-h-[120px] px-3.5 py-2.5 rounded-[12px] bg-white/50 border border-c-b1 focus:border-c-pk-m/60 focus:bg-white text-[12.5px] text-c-t1 transition-all outline-none resize-y leading-relaxed font-sans"
								></textarea>
								
								<button
									type="button"
									disabled={isReplying[issue.number] || !(adminReplies[issue.number] || "").trim()}
									onclick={() => submitAdminReply(issue.number, issue.title)}
									class="h-[38px] px-4.5 rounded-[12px] bg-c-pk text-white font-sans text-[12.5px] font-medium transition-all hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-[1px] active:translate-y-0 shadow-[0_2px_8px_rgba(224,79,106,0.18)] cursor-pointer flex items-center justify-center gap-1.5 border-none"
								>
									{#if isReplying[issue.number]}
										<i class="fa-solid fa-circle-notch animate-spin text-[12px]"></i>
									{:else}
										<i class="fa-solid fa-share text-[11px]"></i>
										<span>Send</span>
									{/if}
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</main>

	<!-- Global Success/Error Notification Toast -->
	{#if showToast}
		<div
			class="fixed top-6 left-1/2 -translate-x-1/2 z-[250] flex items-center gap-3 px-4.5 py-3.5 rounded-[18px] border bg-[#faf8f4]/95 backdrop-blur-[16px] shadow-[0_10px_35px_rgba(0,0,0,0.06)] animate-fade-down max-w-[90%] w-[420px]"
		>
			<div class="flex items-center justify-center w-7 h-7 rounded-full shrink-0 {toastType === 'success' ? 'bg-c-gn/12 text-c-gn' : 'bg-c-pk/12 text-c-pk'}">
				<i class={toastType === 'success' ? 'fa-solid fa-circle-check text-[15px]' : 'fa-solid fa-triangle-exclamation text-[14px]'}></i>
			</div>
			<p class="font-sans text-[12px] leading-tight text-c-t1 font-medium select-none pr-1">
				{toastMessage}
			</p>
		</div>
	{/if}

	<SupportWidget />
	<Footer />
</div>

<style>
	/* Fade down toast animations */
	@keyframes fadeDown {
		from {
			opacity: 0;
			transform: translate(-50%, -15px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}
	.animate-fade-down {
		animation: fadeDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(6px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.animate-fade-in {
		animation: fadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}
</style>
