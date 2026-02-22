<script>
  import { onMount } from "svelte";

  let articles = [];
  let writingSection;
  let visible = false;

  // CSS-based "Cosmos Art" to completely fill the cards on hover
  const artStyles = [
    // Rich indigo / cosmic purple fill
    "radial-gradient(120% 120% at 0% 0%, #1e1b4b 0%, #312e81 40%, #4c1d95 80%, #0f172a 100%)",
    // Deep starry night / teal and blue fill
    "radial-gradient(120% 120% at 100% 100%, #0f172a 0%, #1e3a8a 40%, #172554 80%, #020617 100%)",
    // Dark nebula / amethyst and dark navy fill
    "radial-gradient(120% 120% at 50% 100%, #2e1065 0%, #4c1d95 40%, #1e1b4b 80%, #020617 100%)",
  ];

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  async function fetchArticles() {
    try {
      const res = await fetch("https://blog.navadeepnaidu.com/rss.xml");
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const items = xml.querySelectorAll("item");
      articles = Array.from(items)
        .slice(0, 3)
        .map((item, i) => {
          const link = item.querySelector("link")?.textContent ?? "#";
          return {
            title: item.querySelector("title")?.textContent ?? "",
            description: item.querySelector("description")?.textContent ?? "",
            link,
            date: item.querySelector("pubDate")?.textContent ?? "",
            category: item.querySelector("category")?.textContent ?? "Writing",
            art: artStyles[i % artStyles.length],
            id: i,
          };
        });
    } catch (e) {
      console.warn("Could not fetch RSS feed for writing section:", e);
      // Fallback
      articles = [
        {
          title: "WTF is Terraform and why Infrastructure as Code matters?",
          description:
            "An introduction to Terraform and Infrastructure as Code. Part one of two part series.",
          link: "https://blog.navadeepnaidu.com/blog/WTF-is-Terraform-part-one",
          date: "Tue, 27 Jan 2026 00:00:00 GMT",
          category: "Engineering",
          art: artStyles[0],
          id: 0,
        },
        {
          title: "Hello World",
          description:
            "My personal blog where I share thoughts on technology, engineering and everything I find interesting.",
          link: "https://blog.navadeepnaidu.com/blog/hello-world",
          date: "Sat, 13 Dec 2025 00:00:00 GMT",
          category: "Personal",
          art: artStyles[1],
          id: 1,
        },
        {
          title:
            "Decoding Twitter Snowflake: How Distributed, Time-Ordered IDs Power a Global System",
          description:
            "An in depth exploration of Twitter's Snowflake ID generation system, its architecture and role in scalable, distributed applications.",
          link: "https://blog.navadeepnaidu.com/blog/decoding-twitter-snowflake",
          date: "Mon, 30 Jun 2025 00:00:00 GMT",
          category: "Architecture",
          art: artStyles[2],
          id: 2,
        },
      ];
    }
  }

  onMount(() => {
    fetchArticles();
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          visible = true;
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.15, rootMargin: "0px" },
    );

    if (writingSection) {
      observer.observe(writingSection);
    }

    return () => {
      if (writingSection) observer.disconnect();
    };
  });
</script>

<section id="writing" bind:this={writingSection}>
  <div class="cosmos-background">
    <!-- Astrolabe / Celestial Map overlay: ancient tool to map the cosmos, 
         representing structured observation and writing -->
    <div class="astrolabe-wrapper">
      <div class="astrolabe-ring ring-1"></div>
      <div class="astrolabe-ring ring-2"></div>
      <div class="astrolabe-ring ring-3"></div>
      <div class="astrolabe-ring ring-4"></div>
      <!-- Center glowing focal point -->
      <div class="astrolabe-core"></div>
    </div>
    
    <!-- Faint, giant intersecting arcs scattered around to make it dynamic but not distracting -->
    <div class="orbital-arc arc-a"></div>
    <div class="orbital-arc arc-b"></div>
    <div class="orbital-arc arc-c"></div>
  </div>
  <div class="ambient-glow"></div>

  <div class="container" class:animate={visible}>
    <!-- Hero / Typography Intro -->
    <div class="elegant-intro">
      <div class="line-mask">
        <h2 class="main-line">I Build.</h2>
      </div>
      <div class="line-mask serif-mask">
        <h2 class="serif-line">And I write it down.</h2>
      </div>
      <p class="sub-text">
        Thoughts on software, systems, and clear thinking. Good solutions don't
        ask for attention. They just work — quietly and effectively.
      </p>
    </div>

    <!-- Smooth Elastic Gallery with Dynamic Art -->
    <div class="elastic-gallery">
      {#each articles as article, i}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          class="gallery-card"
          style="--delay: {0.2 + i * 0.1}s; --card-art: {article.art};"
        >
          <!-- Art Background: Mesh Gradient + CSS Noise Filter -->
          <div class="card-bg"></div>
          <div class="noise-overlay"></div>

          <div class="card-content-bounds">
            <!-- Top aligned so ALL titles align perfectly across cards -->
            <div class="fixed-content">
              <div class="meta-row">
                <span class="category">{article.category}</span>
                <span class="date">{formatDate(article.date)}</span>
              </div>

              <h3 class="title">{article.title}</h3>

              <div class="reveal-content">
                <p class="description">{article.description}</p>
                <div class="read-action">
                  <span>Read article</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <!-- Clean, Webflow-inspired Button -->
    <div class="footer-wrapper">
      <a
        href="https://blog.navadeepnaidu.com"
        target="_blank"
        rel="noopener noreferrer"
        class="webflow-btn"
      >
        <span class="btn-text">Read more</span>
        <svg
          class="btn-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>

<style>
  #writing {
    padding: 130px 20px 100px;
    position: relative;
    z-index: 10;
    width: 100%;
    overflow: hidden;
    /* Soft ambient background so it's not a plain black sheet */
    background: radial-gradient(
      circle at 50% 0%,
      rgba(15, 18, 25, 1) 0%,
      #030207 100%
    );
  }

  /* Subtle top highlight connecting it to previous sections */
  .ambient-glow {
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.08),
      transparent
    );
  }

  .cosmos-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  /* ── Celestial Astrolabe (Maps the Cosmos) ── */
  .astrolabe-wrapper {
    position: absolute;
    top: 5%;
    right: -15%;
    width: 800px;
    height: 800px;
    opacity: 0.15;
    pointer-events: none;
    mix-blend-mode: screen;
  }

  .astrolabe-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .ring-1 {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-left-color: transparent;
    animation: slow-spin 90s linear infinite;
  }

  .ring-2 {
    width: 80%;
    height: 80%;
    border: 1px dashed rgba(255, 255, 255, 0.3);
    animation: slow-spin 60s linear infinite reverse;
  }

  .ring-3 {
    width: 60%;
    height: 60%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right-color: transparent;
    border-bottom-color: transparent;
    animation: slow-spin 120s linear infinite;
  }

  .ring-4 {
    width: 30%;
    height: 30%;
    border: 2px dotted rgba(255, 255, 255, 0.6);
    animation: slow-spin 40s linear infinite reverse;
  }

  .astrolabe-core {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.6);
  }

  @keyframes slow-spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  /* ── Random Intersecting Orbital Arcs ── */
  .orbital-arc {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.04);
    pointer-events: none;
    mix-blend-mode: screen;
  }

  .arc-a {
    width: 140vw;
    height: 140vw;
    top: -60%;
    left: -20%;
    border-left-color: rgba(255, 255, 255, 0.1);
    transform: rotate(15deg);
    animation: slow-orbit 180s linear infinite;
  }

  .arc-b {
    width: 120vw;
    height: 120vw;
    bottom: -50%;
    right: -30%;
    border-top-color: rgba(255, 255, 255, 0.08);
    transform: rotate(-35deg);
    animation: slow-orbit 240s linear infinite reverse;
  }

  .arc-c {
    width: 180vw;
    height: 180vw;
    top: 10%;
    left: -50%;
    border-bottom-color: rgba(255, 255, 255, 0.05);
    animation: slow-orbit 200s linear infinite;
  }

  @keyframes slow-orbit {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .container {
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* ── Typography Intro ── */
  .elegant-intro {
    margin-bottom: 64px;
    max-width: 800px;
  }

  .line-mask {
    overflow: hidden;
    display: block;
    margin-bottom: 4px;
  }

  .serif-mask {
    margin-bottom: 24px;
  }

  .main-line {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 0;
    line-height: 1.1;
    transform: translateY(110%);
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .serif-line {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 4.2rem;
    font-weight: 300;
    font-style: italic;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    line-height: 1.1;
    transform: translateY(110%);
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
  }

  .sub-text {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.6;
    margin: 0;
    max-width: 580px;
    font-weight: 300;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  }

  .container.animate .main-line,
  .container.animate .serif-line {
    transform: translateY(0);
  }

  .container.animate .sub-text {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Elastic Gallery ── */
  .elastic-gallery {
    display: flex;
    gap: 16px;
    height: 380px;
    width: 100%;
  }

  .gallery-card {
    /* Perfectly even sizing */
    flex: 1;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    /* Clean transition on flex and transform for 60fps feel */
    transition:
      flex 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
      opacity 0.4s ease,
      box-shadow 0.4s ease,
      transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    
    will-change: flex, transform;

    opacity: 0;
    transform: translateY(30px);

    /* Solid dark background without glass/border edges for rest state */
    background: #101014;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .container.animate .gallery-card {
    opacity: 1;
    transform: translateY(0);
    transition:
      flex 0.4s cubic-bezier(0.2, 0.8, 0.2, 1),
      opacity 0.6s ease var(--delay),
      transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
  }

  /* Hover Expansion */
  .gallery-card:hover {
    flex: 2.5; /* Expand factor */
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.6),
      0 0 30px rgba(255, 255, 255, 0.05);
  }

  @media (min-width: 769px) {
    /* Dim un-hovered cards slightly purely using opacity, not filters, for pure 60fps */
    .elastic-gallery:hover .gallery-card:not(:hover) {
      opacity: 0.6;
    }
  }

  /* ── Universal Beautiful Art Covers ── */
  .card-bg {
    position: absolute;
    inset: 0;
    background: var(--card-art);
    /* Hidden completely at rest to keep the dark clean look */
    opacity: 0; 
    /* No heavy saturate/brightness filters, purely opacity for 60fps smooth fade */
    transition:
      opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
      transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    pointer-events: none;
    transform: scale(1);
    will-change: opacity, transform;
  }

  .gallery-card:hover .card-bg {
    /* Reveal the beautiful full-fill gradient cleanly */
    opacity: 1; 
    transform: scale(1.05); /* Soft, beautiful zoom */
  }

  /* SVG Noise for Texture */
  .noise-overlay {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0;
    mix-blend-mode: overlay;
    pointer-events: none;
    transition: opacity 0.5s ease;
    will-change: opacity;
  }

  .gallery-card:hover .noise-overlay {
    opacity: 0.15; /* Grainy texture becomes visible on hover */
  }

  /* ── Content Alignment (Fixes Uneven Titles) ── */
  .card-content-bounds {
    position: absolute;
    inset: 0;
    width: 600px; /* Safe space for content */
    pointer-events: none;
  }

  .fixed-content {
    position: absolute;
    top: 36px; /* ALIGN TO TOP instead of bottom */
    left: 32px;
    width: 380px; /* Fixed width stops text reflow jerkiness */
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: auto;
  }

  /* ── Meta & Title ── */
  .meta-row {
    display: flex;
    align-items: center;
    gap: 12px;
    opacity: 0.6;
    transition: opacity 0.4s ease;
  }

  .gallery-card:hover .meta-row {
    opacity: 0.9;
  }

  .category {
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.9);
  }

  .date {
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .title {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1.55rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.35;
    margin: 0;
    letter-spacing: -0.01em;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.4s ease;
  }

  .gallery-card:hover .title {
    color: #ffffff;
  }

  /* ── Reveal Content (Now fades in BELOW the title) ── */
  .reveal-content {
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity 0.3s ease,
      transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    /* Remove from layout flow until hovered to keep things clean */
    visibility: hidden;
    margin-top: 8px;
  }

  .gallery-card:hover .reveal-content {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition-delay: 0.1s;
  }

  .description {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    margin: 0 0 20px 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .read-action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
  }

  .read-action svg {
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .gallery-card:hover .read-action svg {
    transform: translateX(4px);
  }

  /* ── Sleek Webflow-Style Centered Button ── */
  .footer-wrapper {
    margin-top: 55px;
    display: flex;
    justify-content: center;
    opacity: 0;
    transform: translateY(20px);
  }

  .container.animate .footer-wrapper {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.6s ease 0.5s;
  }

  .webflow-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 28px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 100px;
    color: #f1f1f1;
    text-decoration: none;
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    overflow: hidden;
    transition:
      color 0.4s ease,
      border-color 0.4s ease;
  }

  /* Sweep background effect */
  .webflow-btn::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    z-index: 0;
  }

  .webflow-btn:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  .webflow-btn:hover {
    color: #000000;
    border-color: #ffffff;
  }

  /* Text and Icon need to stay above the pseudo-element background */
  .btn-text,
  .btn-icon {
    position: relative;
    z-index: 1;
    transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .webflow-btn:hover .btn-icon {
    transform: translateX(4px);
  }

  /* ── Responsive Mobile/Tablet ── */
  @media (max-width: 960px) {
    .main-line {
      font-size: 3.2rem;
    }
    .serif-line {
      font-size: 3.4rem;
    }

    .fixed-content {
      width: 300px;
    }
  }

  @media (max-width: 768px) {
    #writing {
      padding: 100px 16px;
    }

    .main-line {
      font-size: 2.8rem;
    }
    .serif-line {
      font-size: 3rem;
    }
    .sub-text {
      font-size: 1.05rem;
    }

    /* Vertical stack or scrolling for mobile */
    .elastic-gallery {
      flex-direction: row;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      gap: 16px;
      padding-bottom: 24px;
      height: 340px;
      scrollbar-width: none;
    }
    .elastic-gallery::-webkit-scrollbar {
      display: none;
    }

    .gallery-card {
      flex: 0 0 88%;
      scroll-snap-align: center;
      background: #26262a;
    }

    .fixed-content {
      width: calc(100% - 48px);
    }

    .reveal-content {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  @media (max-width: 480px) {
    .main-line {
      font-size: 2.4rem;
    }
    .serif-line {
      font-size: 2.6rem;
    }
    .elastic-gallery {
      height: 320px;
    }
    .title {
      font-size: 1.35rem;
    }
  }
</style>
