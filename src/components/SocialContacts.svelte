<script>
  import { onMount, onDestroy, tick } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { Tween } from "svelte/motion";
  import { fade } from "svelte/transition";
  import appleMailIcon from "../assets/social/email/apple.svg";
  import gmailIcon from "../assets/social/email/gmail.svg";
  import outlookIcon from "../assets/social/email/outlook.svg";
  import protonmailIcon from "../assets/social/email/protonmail.svg";
  import linkedinAvatar from "../assets/social/linkedin-avatar.jpg";
  import xAvatar from "../assets/social/x-avatar.jpg";
  import { getGithubContributions, SOCIAL } from "../lib/social.js";
  import { flyWithBlur } from "../lib/transitions.js";
  import GithubGraph from "./GithubGraph.svelte";

  let open = $state(false);
  let contentIndex = $state(0);
  let direction = $state(0);
  let renderId = $state(0);
  let isInstant = false;
  /** Bumps on every hover so stale measures from exiting cards are ignored */
  let measureGen = 0;
  let emailCopied = $state(false);
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let copyTimeout;
  /** @type {ReturnType<typeof setInterval> | undefined} */
  let emailLogoInterval;
  let emailLogoIndex = $state(0);
  /** @type {{ total: number; start: string; levels: string; counts: number[] } | null} */
  let contributions = $state(null);
  let contributionsLabel = $state("Loading contributions…");

  /** @type {HTMLDivElement | undefined} */
  let rootEl = $state();
  /** @type {HTMLDivElement | undefined} */
  let buttonsEl = $state();

  const left = new Tween(0, { duration: 280, easing: cubicOut });
  const width = new Tween(0, { duration: 280, easing: cubicOut });
  const height = new Tween(0, { duration: 280, easing: cubicOut });

  /** Stable card widths — avoids Medium slowly shrinking from the GitHub graph width */
  const CARD_WIDTH = {
    email: 280,
    github: 360,
    linkedin: 300,
    twitter: 300,
    medium: 280,
  };

  /** Email clients shown on the email hover card — rotate every 3s */
  const EMAIL_CLIENTS = [
    {
      id: "protonmail",
      name: "Proton Mail",
      icon: protonmailIcon,
      accent: "rgba(109, 74, 255, 0.22)",
      border: "rgba(109, 74, 255, 0.45)",
    },
    {
      id: "gmail",
      name: "Gmail",
      icon: gmailIcon,
      accent: "rgba(234, 67, 53, 0.18)",
      border: "rgba(234, 67, 53, 0.4)",
    },
    {
      id: "apple",
      name: "Apple Mail",
      icon: appleMailIcon,
      accent: "rgba(162, 170, 173, 0.16)",
      border: "rgba(255, 255, 255, 0.22)",
    },
    {
      id: "outlook",
      name: "Outlook",
      icon: outlookIcon,
      accent: "rgba(0, 120, 212, 0.18)",
      border: "rgba(0, 120, 212, 0.45)",
    },
  ];

  const activeEmailClient = $derived(EMAIL_CLIENTS[emailLogoIndex % EMAIL_CLIENTS.length]);

  function startEmailLogoCycle() {
    stopEmailLogoCycle();
    emailLogoIndex = 0;
    emailLogoInterval = setInterval(() => {
      emailLogoIndex = (emailLogoIndex + 1) % EMAIL_CLIENTS.length;
    }, 3000);
  }

  function stopEmailLogoCycle() {
    if (emailLogoInterval) {
      clearInterval(emailLogoInterval);
      emailLogoInterval = undefined;
    }
  }

  const items = [
    { id: "email", label: "Email", kind: "copy" },
    {
      id: "github",
      label: "GitHub",
      kind: "link",
      url: SOCIAL.github,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      kind: "link",
      url: SOCIAL.linkedin,
    },
    {
      id: "twitter",
      label: "Twitter",
      kind: "link",
      url: SOCIAL.twitter,
    },
    {
      id: "medium",
      label: "Medium",
      kind: "link",
      url: SOCIAL.medium,
    },
  ];

  onMount(() => {
    getGithubContributions(SOCIAL.githubUsername)
      .then((data) => {
        contributions = data;
        contributionsLabel = `${data.total.toLocaleString()} contributions last year`;
      })
      .catch(() => {
        contributionsLabel = "Open on GitHub";
      });
  });

  onDestroy(() => {
    stopEmailLogoCycle();
    clearTimeout(copyTimeout);
  });

  /**
   * Center preview under the hovered icon, but clamp so the full card
   * stays inside the contacts container (fixes half-cut cards on the edges).
   * @param {HTMLElement} iconNode
   * @param {number} cardWidth
   * @param {{ duration?: number }} [opts]
   */
  function placeLeft(iconNode, cardWidth, opts = {}) {
    if (!rootEl || !buttonsEl) return;
    const rootRect = rootEl.getBoundingClientRect();
    const iconRect = iconNode.getBoundingClientRect();
    const iconCenter = iconRect.left + iconRect.width / 2 - rootRect.left;

    const pad = 8;
    const half = cardWidth / 2;
    const min = half + pad;
    const max = Math.max(min, rootRect.width - half - pad);
    const clamped = Math.min(Math.max(iconCenter, min), max);

    left.set(clamped, isInstant ? { duration: 0 } : opts);
  }

  /**
   * @param {number} index
   * @param {PointerEvent & { currentTarget: EventTarget & HTMLElement }} event
   */
  async function handleEnter(index, event) {
    if (event.pointerType !== "mouse") return;

    const node = event.currentTarget;
    const itemId = /** @type {keyof typeof CARD_WIDTH} */ (items[index].id);
    const cardW = CARD_WIDTH[itemId];

    isInstant = !open;
    open = true;

    const prev = contentIndex;
    contentIndex = index;
    direction = Math.max(Math.min(contentIndex - prev, 1), -1);
    renderId += 1;
    // Invalidate any in-flight measures from the previous card (including
    // ResizeObservers still attached during its outro transition).
    measureGen += 1;
    const gen = measureGen;

    // Start/stop rotating email-client logos with the email card
    if (itemId === "email") {
      if (prev !== 0 || !emailLogoInterval) startEmailLogoCycle();
    } else {
      stopEmailLogoCycle();
    }

    placeLeft(node, cardW);
    // Width known immediately — height measured after content mounts
    width.set(cardW, isInstant ? { duration: 0 } : {});

    await tick();
    if (gen !== measureGen) return;

    // Double rAF: layout after the new card paints
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (gen !== measureGen) return;
        measureActive(gen, renderId);
      });
    });
  }

  function handleLeave() {
    open = false;
    stopEmailLogoCycle();
  }

  /**
   * @param {number} gen
   * @param {number} id
   */
  function measureActive(gen, id) {
    if (gen !== measureGen) return;
    // Target the *current* card only — during transitions an outgoing
    // card still has [data-preview-content] and would report the old size.
    const node = rootEl?.querySelector(`[data-preview-id="${id}"]`);
    if (!(node instanceof HTMLElement)) return;
    applyHeight(node, gen);
  }

  /**
   * @param {HTMLElement} node
   * @param {number} gen
   */
  function applyHeight(node, gen) {
    if (gen !== measureGen) return;
    // offsetHeight = natural content size (not clipped by the animating shell)
    const h = Math.ceil(node.offsetHeight);
    if (!h) return;
    height.set(h, isInstant ? { duration: 0 } : {});
  }

  /** @param {HTMLElement} node */
  function measure(node) {
    // Capture the gen for *this* card instance only
    const gen = measureGen;
    const apply = () => applyHeight(node, gen);

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(node);

    const imgs = [...node.querySelectorAll("img")];
    /** @param {Event} _e */
    const onImg = (_e) => apply();
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", onImg, { once: true });
    });

    return {
      destroy() {
        ro.disconnect();
        imgs.forEach((img) => img.removeEventListener("load", onImg));
      },
    };
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SOCIAL.email);
      emailCopied = true;
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => {
        emailCopied = false;
      }, 2500);
    } catch {
      window.location.href = `mailto:${SOCIAL.email}`;
    }
  }

  /** @param {MouseEvent} event */
  function handleEmailClick(event) {
    event.preventDefault();
    copyEmail();
  }
</script>

<div
  class="social-contacts"
  bind:this={rootEl}
  onmouseleave={handleLeave}
  role="presentation"
>
  <div class="social-buttons" bind:this={buttonsEl}>
    {#each items as item, index (item.id)}
      {#if item.kind === "copy"}
        <button
          type="button"
          class="social-button email reveal"
          aria-label={emailCopied ? "Email copied" : "Copy email address"}
          style="--i: {3 + index * 0.1}"
          onpointerenter={(e) => handleEnter(index, e)}
          onclick={handleEmailClick}
        >
          <i class="fa-solid fa-envelope"></i>
        </button>
      {:else}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          class="social-button {item.id} reveal"
          aria-label={item.label}
          style="--i: {3 + index * 0.1}"
          onpointerenter={(e) => handleEnter(index, e)}
        >
          {#if item.id === "github"}
            <i class="fab fa-github"></i>
          {:else if item.id === "linkedin"}
            <i class="fab fa-linkedin"></i>
          {:else if item.id === "twitter"}
            <i class="fab fa-twitter"></i>
          {:else if item.id === "medium"}
            <i class="fab fa-medium"></i>
          {/if}
        </a>
      {/if}
    {/each}
  </div>

  {#if open}
    <div
      transition:fade={{ duration: 140 }}
      class="preview"
      style:left="{left.current}px"
      style:width="{width.current}px"
      style:height="{height.current}px"
    >
      {#key renderId}
        <div
          class="preview-inner"
          data-preview-id={renderId}
          in:flyWithBlur={{ x: 120 * direction, duration: 240 }}
          out:flyWithBlur={{ x: 120 * -direction, duration: 240 }}
          use:measure
          style:width="{CARD_WIDTH[/** @type {keyof typeof CARD_WIDTH} */ (items[contentIndex].id)]}px"
        >
          {#if contentIndex === 0}
            <!-- Email -->
            <div class="card card-email">
              <div class="card-row">
                <div
                  class="avatar-wrap email-icon"
                  style:background={activeEmailClient.accent}
                  style:border-color={activeEmailClient.border}
                >
                  {#key activeEmailClient.id}
                    <img
                      class="email-client-logo"
                      src={activeEmailClient.icon}
                      alt=""
                      width="22"
                      height="22"
                      in:fade={{ duration: 280 }}
                      out:fade={{ duration: 200 }}
                    />
                  {/key}
                </div>
                <div class="card-meta">
                  <span class="card-title">{activeEmailClient.name}</span>
                  <span class="card-sub mono">{SOCIAL.email}</span>
                </div>
              </div>
              <button type="button" class="cta cta-email" onclick={copyEmail}>
                {#if emailCopied}
                  <i class="fa-solid fa-check"></i>
                  Copied!
                {:else}
                  <i class="fa-regular fa-copy"></i>
                  Copy email
                {/if}
              </button>
              <div class="email-dots" aria-hidden="true">
                {#each EMAIL_CLIENTS as client, i (client.id)}
                  <span
                    class="email-dot"
                    class:active={i === emailLogoIndex % EMAIL_CLIENTS.length}
                  ></span>
                {/each}
              </div>
            </div>
          {:else if contentIndex === 1}
            <!-- GitHub -->
            <div class="card card-github">
              <div class="card-row">
                <div class="avatar-wrap">
                  <img
                    src="https://github.com/{SOCIAL.githubUsername}.png?size=80"
                    alt=""
                    width="40"
                    height="40"
                  />
                  <span class="status-badge" aria-hidden="true">🎧</span>
                </div>
                <div class="card-meta">
                  <span class="card-title">{SOCIAL.githubUsername}</span>
                  <span class="card-sub">{contributionsLabel}</span>
                </div>
              </div>
              <GithubGraph {contributions} />
            </div>
          {:else if contentIndex === 2}
            <!-- LinkedIn -->
            <div class="card card-linkedin">
              <div class="linkedin-banner"></div>
              <div class="banner-avatar">
                <img src={linkedinAvatar} alt="" width="56" height="56" />
              </div>
              <div class="banner-body">
                <div class="card-title">
                  {SOCIAL.name}
                  <i class="fa-solid fa-certificate verify" title="Profile"></i>
                </div>
                <div class="banner-footer">
                  <p class="card-sub">
                    {SOCIAL.linkedinHeadline}<br />{SOCIAL.linkedinLocation}
                  </p>
                  <a
                    class="cta cta-linkedin"
                    href={SOCIAL.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect
                  </a>
                </div>
              </div>
            </div>
          {:else if contentIndex === 3}
            <!-- X / Twitter -->
            <div class="card card-x">
              <div class="x-banner"></div>
              <div class="banner-avatar">
                <img src={xAvatar} alt="" width="56" height="56" />
              </div>
              <div class="banner-body x-body">
                <div class="x-header">
                  <div class="x-identity">
                    <span class="card-title">
                      {SOCIAL.twitterHandle}
                      <i class="fa-solid fa-circle-check verify-x"></i>
                    </span>
                    <span class="card-sub">{SOCIAL.twitterBio}</span>
                  </div>
                  <a
                    class="cta cta-x"
                    href={SOCIAL.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow
                  </a>
                </div>
              </div>
            </div>
          {:else if contentIndex === 4}
            <!-- Medium -->
            <div class="card card-medium">
              <div class="card-row">
                <div class="avatar-wrap medium-icon">
                  <i class="fab fa-medium"></i>
                </div>
                <div class="card-meta">
                  <span class="card-title">{SOCIAL.mediumHandle}</span>
                  <span class="card-sub">Essays on systems & engineering</span>
                </div>
              </div>
              <a
                class="cta cta-medium"
                href={SOCIAL.medium}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read on Medium
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
          {/if}
        </div>
      {/key}
    </div>
  {/if}

  <!-- Pointer bridge below icons so the cursor can enter the preview -->
  <div class="pointer-bridge" aria-hidden="true"></div>
</div>

<style>
  .social-contacts {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    margin-right: auto;
    max-width: 100%;
    /* Give the below-preview room; don't clip half-cards */
    overflow: visible;
  }

  .social-buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-start;
    max-width: 100%;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
  }

  .social-button {
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: rgba(255, 255, 255, 0.9);
    position: relative;
    background: rgba(18, 18, 18, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    cursor: pointer;
    text-decoration: none;
    padding: 0;
    font-family: inherit;
  }

  .social-button::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .social-button i {
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
  }

  .email:hover i {
    color: #5732e9;
    text-shadow: 0 0 15px rgba(87, 50, 233, 0.5);
  }
  .github:hover i {
    color: #ffffff;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
  .linkedin:hover i {
    color: #0077b5;
    text-shadow: 0 0 15px rgba(0, 119, 181, 0.5);
  }
  .twitter:hover i {
    color: #1da1f2;
    text-shadow: 0 0 15px rgba(29, 161, 242, 0.5);
  }
  .medium:hover i {
    color: #ffffff;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }

  .reveal {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(24px);
    animation: fluidReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: calc(0.15s + var(--i) * 0.15s);
  }

  @keyframes fluidReveal {
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }

  /* Preview opens BELOW the icons so it never covers the name/intro */
  .preview {
    position: absolute;
    top: calc(100% + 0.65rem);
    transform: translateX(-50%);
    z-index: 20;
    overflow: hidden;
    border-radius: 14px;
    background: rgba(14, 14, 18, 0.96);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
      0 24px 48px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(255, 255, 255, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(16px);
    pointer-events: auto;
  }

  /* Top-aligned: growing height reveals more content; never clips the top half */
  .preview-inner {
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
  }

  .pointer-bridge {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: 0.85rem;
    z-index: 1;
  }

  .card {
    padding: 0.85rem;
    width: 100%;
    box-sizing: border-box;
    color: #fff;
    font-family: "Inter", system-ui, sans-serif;
  }

  .card-github {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .card-linkedin,
  .card-x {
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  .card-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .avatar-wrap {
    position: relative;
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    overflow: visible;
  }

  .avatar-wrap img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    object-fit: cover;
    display: block;
  }

  .email-icon,
  .medium-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(87, 50, 233, 0.2);
    border: 1px solid rgba(87, 50, 233, 0.35);
    border-radius: 12px;
    color: #a78bfa;
    font-size: 1rem;
    transition:
      background 0.35s ease,
      border-color 0.35s ease;
  }

  .email-icon {
    position: relative;
    overflow: hidden;
  }

  .email-client-logo {
    width: 1.35rem;
    height: 1.35rem;
    object-fit: contain;
    display: block;
    border-radius: 0;
    position: absolute;
  }

  .email-dots {
    display: flex;
    justify-content: center;
    gap: 0.35rem;
    margin-top: 0.65rem;
  }

  .email-dot {
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
    transition:
      background 0.3s ease,
      transform 0.3s ease;
  }

  .email-dot.active {
    background: rgba(255, 255, 255, 0.75);
    transform: scale(1.2);
  }

  .medium-icon {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.12);
    color: #fff;
  }

  .status-badge {
    position: absolute;
    right: -0.35rem;
    bottom: -0.35rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 999px;
    background: rgba(18, 18, 22, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  .card-meta {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
    flex: 1;
  }

  .card-title {
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #fff;
  }

  .card-sub {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.35;
  }

  .card-sub.mono {
    font-family: "Space Mono", ui-monospace, monospace;
    font-size: 0.72rem;
    color: rgba(255, 255, 255, 0.65);
    overflow-wrap: anywhere;
    word-break: break-word;
  }

  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.75rem;
    width: 100%;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    font-size: 0.82rem;
    font-weight: 600;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition:
      filter 0.2s ease,
      background 0.2s ease,
      transform 0.15s ease;
    font-family: inherit;
  }

  .cta:active {
    transform: scale(0.97);
  }

  .cta-email {
    background: #5732e9;
    color: #fff;
  }
  .cta-email:hover {
    filter: brightness(1.12);
  }

  .cta-linkedin {
    width: auto;
    margin-top: 0;
    background: #0a66c2;
    color: #fff;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cta-linkedin:hover {
    filter: brightness(1.12);
  }

  .cta-x {
    width: auto;
    margin-top: 0;
    background: #fff;
    color: #0a0a0a;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cta-x:hover {
    filter: brightness(0.92);
  }

  .cta-medium {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
  .cta-medium:hover {
    background: rgba(255, 255, 255, 0.14);
  }

  .linkedin-banner {
    height: 4rem;
    width: 100%;
    background-image:
      radial-gradient(
        circle at 120% 200%,
        #0000000a 0%,
        #0000000a 50%,
        #c5c5c50a 50%,
        #c5c5c50a 100%
      ),
      radial-gradient(
        circle at 130% -10%,
        #4040400a 0%,
        #4040400a 50%,
        #ffffff0a 50%,
        #ffffff0a 100%
      ),
      linear-gradient(to right, #0a66c2, #0a66c280);
  }

  .x-banner {
    height: 5.5rem;
    width: 100%;
    background:
      radial-gradient(circle at 20% 80%, rgba(87, 50, 233, 0.45), transparent 50%),
      radial-gradient(circle at 90% 20%, rgba(29, 161, 242, 0.35), transparent 45%),
      linear-gradient(135deg, #0b0b12 0%, #1a1030 50%, #0a1520 100%);
  }

  .banner-avatar {
    position: absolute;
    left: 0.75rem;
    top: 2.35rem;
    padding: 0.15rem;
    border-radius: 999px;
    background: rgba(14, 14, 18, 0.96);
    z-index: 1;
  }

  .card-x .banner-avatar {
    top: 3.5rem;
  }

  .banner-avatar img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 999px;
    object-fit: cover;
    display: block;
  }

  .banner-body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 2.1rem 0.85rem 0.85rem;
  }

  .x-body {
    padding-top: 2.35rem;
  }

  .banner-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0.75rem;
    margin-top: 0.35rem;
  }

  .x-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .x-identity {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    min-width: 0;
  }

  .verify {
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.85em;
    margin-left: 0.15rem;
  }

  .verify-x {
    color: #1d9bf0;
    font-size: 0.85em;
    margin-left: 0.15rem;
  }

  @media (max-width: 768px) {
    .social-contacts {
      margin-right: 0;
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    .social-buttons {
      justify-content: center;
      gap: 1rem;
    }

    .social-button {
      width: 3rem;
      height: 3rem;
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    .social-buttons {
      gap: 0.8rem;
    }

    .social-button {
      width: 2.8rem;
      height: 2.8rem;
      font-size: 1.1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal {
      animation: none;
      opacity: 1;
      filter: none;
      transform: none;
    }
  }
</style>
