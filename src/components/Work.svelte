<script>
  import { onMount } from "svelte";
  import { projects } from "../lib/projects.js";

  let workSection;
  let visible = false;
  
  // Take only top 3
  const topProjects = projects.slice(0, 3);
  
  const artStyles = [
    // Tech-blue/electric fill
    "radial-gradient(120% 120% at 0% 0%, #0f172a 0%, #1e3a8a 40%, #2563eb 80%, #020617 100%)",
    // Cyberpunk/teal fill
    "radial-gradient(120% 120% at 100% 100%, #064e3b 0%, #0f766e 40%, #10b981 80%, #020617 100%)",
    // Violet/Deep space fill
    "radial-gradient(120% 120% at 50% 100%, #2e1065 0%, #4c1d95 40%, #7c3aed 80%, #020617 100%)",
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          visible = true;
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.15, rootMargin: "0px" },
    );

    if (workSection) {
      observer.observe(workSection);
    }

    return () => {
      if (workSection) observer.disconnect();
    };
  });
  
  function getRoute(project) {
    if (project.hasDeepDive) {
      return `/work/${project.slug}`;
    }
    return project.liveUrl !== "#" ? project.liveUrl : project.githubUrl;
  }
</script>

<section id="work" bind:this={workSection}>
  <!-- Cosmos/Constellation Background -->
  <div class="cosmos-background">
    <div class="constellation-wrapper">
      <!-- Neural / Constellation Points -->
      <div class="star-node p1"></div>
      <div class="star-node p2"></div>
      <div class="star-node p3"></div>
      <div class="star-node p4"></div>
      <div class="star-node p5"></div>
      <div class="star-node p6"></div>
      
      <!-- Connection Lines -->
      <svg class="constellation-lines" viewBox="0 0 800 600" preserveAspectRatio="none">
        <line x1="20%" y1="20%" x2="50%" y2="40%" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="50%" y1="40%" x2="80%" y2="30%" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="50%" y1="40%" x2="40%" y2="70%" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="40%" y1="70%" x2="70%" y2="80%" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="80%" y1="30%" x2="70%" y2="80%" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
      </svg>
    </div>
  </div>
  
  <div class="ambient-glow"></div>

  <div class="container" class:animate={visible}>
    <!-- Hero / Typography Intro -->
    <div class="elegant-intro">
      <div class="line-mask">
        <h2 class="main-line">I Engineer.</h2>
      </div>
      <div class="line-mask serif-mask">
        <h2 class="serif-line">Systems and Services.</h2>
      </div>
      <p class="sub-text">
        A selection of high-impact architectures, scalable backend services, and
        infrastructure as code I've built. Driven by performance and resilience.
      </p>
    </div>

    <!-- Grid Gallery for Projects -->
    <div class="projects-grid">
      {#each topProjects as project, i}
        <a
          href={getRoute(project)}
          class="project-card"
          style="--delay: {0.2 + i * 0.1}s; --card-art: {artStyles[i % artStyles.length]};"
          data-sveltekit-noscroll
        >
          <!-- Project Image instead of CSS Gradient Fill -->
          {#if project.image}
            <div class="card-bg image-bg" style="background-image: url('{project.image}')"></div>
            <!-- Gradient overlay to ensure text readability -->
            <div class="image-gradient-overlay"></div>
          {:else}
            <div class="card-bg"></div>
          {/if}
          
          <div class="noise-overlay"></div>

          <div class="card-content-bounds">
            <div class="fixed-content">
              <div class="meta-row">
                <span class="category">{project.category}</span>
                {#if project.hasDeepDive}
                  <span class="badge">Case Study</span>
                {/if}
              </div>

              <h3 class="title">{project.title}</h3>

              <div class="reveal-content">
                <p class="description">{project.shortDescription}</p>
                
                <div class="tech-stack">
                  {#each project.techStack.slice(0, 3) as tech}
                    <span class="tech-tag">{tech}</span>
                  {/each}
                  {#if project.techStack.length > 3}
                    <span class="tech-tag">+{project.techStack.length - 3}</span>
                  {/if}
                </div>
                
                <div class="read-action">
                  <span>{project.hasDeepDive ? 'Read case study' : 'View project'}</span>
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
                    {#if project.hasDeepDive}
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    {:else}
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    {/if}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>

    <!-- View All Projects Button -->
    <div class="footer-wrapper">
      <a href="/work" class="webflow-btn">
        <span class="btn-text">View all projects</span>
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
  #work {
    padding: 130px 20px 100px;
    position: relative;
    z-index: 10;
    width: 100%;
    overflow: hidden;
    /* Complementary dark gradient to the Writing section */
    background: radial-gradient(
      circle at 50% 100%,
      rgba(15, 18, 25, 1) 0%,
      #030207 100%
    );
  }

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

  /* ── Constellation / Systems Background ── */
  .cosmos-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .constellation-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    pointer-events: none;
    mix-blend-mode: screen;
  }
  
  .constellation-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .star-node {
    position: absolute;
    width: 4px;
    height: 4px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.4);
    animation: twinkle 4s infinite alternate;
  }
  
  .p1 { top: 20%; left: 20%; animation-delay: 0s; }
  .p2 { top: 40%; left: 50%; animation-delay: 1s; }
  .p3 { top: 30%; left: 80%; animation-delay: 0.5s; }
  .p4 { top: 70%; left: 40%; animation-delay: 1.5s; }
  .p5 { top: 80%; left: 70%; animation-delay: 2s; }
  .p6 { top: 60%; left: 10%; animation-delay: 0.7s; opacity: 0.5; }

  @keyframes twinkle {
    0% { opacity: 0.3; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1.2); }
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

  /* ── Projects Grid ── */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    width: 100%;
  }

  .project-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    height: 420px;
    transition:
      opacity 0.4s ease,
      box-shadow 0.4s ease,
      transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
    
    will-change: transform;
    opacity: 0;
    transform: translateY(30px);
    background: #101014;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255,255,255,0.05);
  }

  .container.animate .project-card {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.6s ease var(--delay),
      transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
  }

  .project-card:hover {
    transform: translateY(-8px);
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.6),
      0 0 30px rgba(255, 255, 255, 0.05);
    border-color: rgba(255,255,255,0.1);
  }

  /* Universal Beautiful Art Covers & Images */
  .card-bg {
    position: absolute;
    inset: 0;
    background: var(--card-art);
    opacity: 0.3; /* Keep it slightly visible as a base, instead of 0 */
    transition: opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    pointer-events: none;
    transform: scale(1);
    will-change: opacity, transform;
  }
  
  .image-bg {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.5; /* Default image opacity */
    mix-blend-mode: luminosity; /* Blend nicely with the dark theme */
    filter: grayscale(80%) contrast(1.2); /* Stylized look initially */
    transition: opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.6s ease;
  }
  
  /* Gradient overlay specifically for image backgrounds to ensure text remains readable */
  .image-gradient-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(10, 10, 14, 1) 0%,
      rgba(10, 10, 14, 0.8) 40%,
      rgba(10, 10, 14, 0.2) 100%
    );
    z-index: 1;
    opacity: 0.9;
    transition: opacity 0.5s ease;
  }

  .project-card:hover .card-bg {
    opacity: 1; 
    transform: scale(1.05); /* Soft, beautiful zoom */
  }
  
  .project-card:hover .image-bg {
    opacity: 0.7; /* Full color reveal on hover */
    filter: grayscale(0%) contrast(1.1); /* Bring back color */
    mix-blend-mode: normal;
  }
  
  .project-card:hover .image-gradient-overlay {
    opacity: 0.95; /* Darken bottom slightly more on hover for text contrast */
    background: linear-gradient(
      to top,
      rgba(10, 10, 14, 1) 0%,
      rgba(10, 10, 14, 0.9) 50%,
      rgba(10, 10, 14, 0.4) 100%
    );
  }

  /* SVG Noise */
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

  .project-card:hover .noise-overlay {
    opacity: 0.15;
  }

  /* Content Alignment */
  .card-content-bounds {
    position: absolute;
    inset: 0;
    padding: 36px 32px;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    z-index: 2; /* Needs to sit above the image and gradient overlay */
  }

  .fixed-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    pointer-events: auto;
  }

  .meta-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    opacity: 0.6;
    transition: opacity 0.4s ease;
  }

  .project-card:hover .meta-row {
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
  
  .badge {
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    background: rgba(255,255,255,0.1);
    padding: 4px 8px;
    border-radius: 4px;
    color: #fff;
    backdrop-filter: blur(4px);
  }

  .title {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1.8rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
    line-height: 1.25;
    margin: 0 0 16px 0;
    letter-spacing: -0.01em;
    transition: color 0.4s ease;
  }

  .project-card:hover .title {
    color: #ffffff;
  }

  .reveal-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  .project-card:hover .reveal-content {
    opacity: 1;
  }

  .description {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin: 0 0 20px 0;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    margin-bottom: 24px;
  }

  .tech-tag {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 10px;
    border-radius: 6px;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  
  .project-card:hover .tech-tag {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }

  .read-action {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    margin-top: auto; /* Push to bottom */
  }

  .read-action svg {
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .project-card:hover .read-action svg {
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

  .btn-text,
  .btn-icon {
    position: relative;
    z-index: 1;
    transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .webflow-btn:hover .btn-icon {
    transform: translateX(4px);
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    #work {
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

    .projects-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .project-card {
      height: auto;
      min-height: 380px;
    }
    
    .card-content-bounds {
      padding: 24px;
    }
  }

  @media (max-width: 480px) {
    .main-line {
      font-size: 2.4rem;
    }
    .serif-line {
      font-size: 2.6rem;
    }
  }
</style>
