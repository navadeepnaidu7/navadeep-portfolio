<script>
  import { onMount } from "svelte";
  import { projects } from "../lib/projects.js";

  let visible = false;

  const artStyles = [
    "radial-gradient(120% 120% at 0% 0%, #0f172a 0%, #1e3a8a 40%, #2563eb 80%, #020617 100%)",
    "radial-gradient(120% 120% at 100% 100%, #064e3b 0%, #0f766e 40%, #10b981 80%, #020617 100%)",
    "radial-gradient(120% 120% at 50% 100%, #2e1065 0%, #4c1d95 40%, #7c3aed 80%, #020617 100%)",
    "radial-gradient(120% 120% at 0% 100%, #450a0a 0%, #991b1b 40%, #dc2626 80%, #020617 100%)"
  ];

  onMount(() => {
    // Add small delay for animation
    setTimeout(() => {
      visible = true;
    }, 100);
    
    // Ensure scroll is at top when this page loads
    window.scrollTo(0, 0);
  });
  
  function getRoute(project) {
    if (project.hasDeepDive) {
      return `/work/${project.slug}`;
    }
    return project.liveUrl !== "#" ? project.liveUrl : project.githubUrl;
  }
</script>

<div class="page-container" class:animate={visible}>
  <!-- Simple ambient background -->
  <div class="ambient-glow top-glow"></div>
  
  <div class="container">
    <div class="header">
      <a href="/" class="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Home
      </a>
      
      <div class="elegant-intro">
        <div class="line-mask">
          <h1 class="main-line">Selected Work</h1>
        </div>
        <p class="sub-text">
          A comprehensive list of systems, applications, and infrastructure projects I've built.
        </p>
      </div>
    </div>

    <!-- Grid Gallery for Projects -->
    <div class="projects-grid">
      {#each projects as project, i}
        <a
          href={getRoute(project)}
          class="project-card"
          style="--delay: {0.1 + i * 0.05}s; --card-art: {artStyles[i % artStyles.length]};"
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
                  {#each project.techStack as tech}
                    <span class="tech-tag">{tech}</span>
                  {/each}
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
  </div>
</div>

<style>
  .page-container {
    padding: 140px 20px 100px;
    min-height: 100vh;
    background: #030207;
    position: relative;
    overflow: hidden;
  }

  .ambient-glow {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
    width: 80%;
    left: 10%;
  }

  .top-glow {
    top: 80px;
  }

  .container {
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
  }
  
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 40px;
    transition: color 0.3s ease;
  }
  
  .back-link svg {
    width: 18px;
    height: 18px;
    transition: transform 0.3s ease;
  }
  
  .back-link:hover {
    color: #fff;
  }
  
  .back-link:hover svg {
    transform: translateX(-4px);
  }

  /* ── Typography Intro ── */
  .elegant-intro {
    margin-bottom: 64px;
    max-width: 800px;
  }

  .line-mask {
    overflow: hidden;
    display: block;
    margin-bottom: 16px;
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
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
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
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
  }

  .page-container.animate .main-line {
    transform: translateY(0);
  }

  .page-container.animate .sub-text {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Projects Grid ── */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    width: 100%;
  }

  .project-card {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    height: 440px;
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

  .page-container.animate .project-card {
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
    padding: 40px;
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
    margin-bottom: 20px;
    opacity: 0.6;
    transition: opacity 0.4s ease;
  }

  .project-card:hover .meta-row {
    opacity: 0.9;
  }

  .category {
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .badge {
    font-family: "SF Pro Display", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    background: rgba(255,255,255,0.1);
    padding: 6px 12px;
    border-radius: 4px;
    color: #fff;
    backdrop-filter: blur(4px);
  }

  .title {
    font-family: "SF Pro Display", sans-serif;
    font-size: 2.2rem;
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
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
    margin: 0 0 24px 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    margin-bottom: 32px;
  }

  .tech-tag {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.05);
    padding: 6px 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
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
    font-size: 1rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
  }

  .read-action svg {
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .project-card:hover .read-action svg {
    transform: translateX(4px);
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .page-container {
      padding: 100px 16px;
    }

    .main-line {
      font-size: 3rem;
    }

    .project-card {
      height: auto;
      min-height: 400px;
    }
    
    .card-content-bounds {
      padding: 24px;
    }
    
    .title {
      font-size: 1.8rem;
    }
  }
</style>