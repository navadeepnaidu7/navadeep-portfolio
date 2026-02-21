<script>
  import { onMount } from "svelte";

  let experienceSection;
  let visible = false;

  const experiences = [
    {
      role: "Software Engineering Intern",
      company: "Inheights Enterprises Pvt. LTD",
      period: "May 2025 – Oct 2025",
      description: [
        "Contributed to backend systems and API services for core product features.",
        "Assisted in cloud infrastructure management and deployment processes.",
        "Implemented monitoring improvements and automated deployment workflows.",
      ],
      tech: ["Backend Dev", "CI/CD", "Deployment"],
    },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    if (experienceSection) {
      observer.observe(experienceSection);
    }

    return () => {
      if (experienceSection) {
        observer.unobserve(experienceSection);
      }
    };
  });
</script>

<section id="experience" bind:this={experienceSection} class:visible>
  <div class="content-wrapper">
    <div class="grid-layout">
      <!-- Left Column: Visuals & Header -->
      <div class="visual-column">
        <div class="header-group">
          <h2 class="section-title">Experience</h2>
          <p class="section-subtitle">
            Building robust backend systems and orchestrating scalable cloud
            infrastructure.
          </p>
        </div>

        <div class="graphic-container hidden-mobile">
          <div class="glow-bg"></div>

          <div class="diagram-wrapper">
            <!-- Connection Lines -->
            <svg class="connection-svg" viewBox="0 0 400 350">
              <defs>
                <filter
                  id="glow-dot"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient
                  id="line-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stop-color="rgba(255,255,255,0.05)" />
                  <stop offset="50%" stop-color="rgba(255,255,255,0.2)" />
                  <stop offset="100%" stop-color="rgba(255,255,255,0.05)" />
                </linearGradient>
              </defs>

              <!-- Lines -->
              <path
                d="M 64 50 C 113 50, 113 155, 162 155"
                class="diagram-line"
              />
              <path
                d="M 54 120 C 108 120, 108 155, 162 155"
                class="diagram-line"
              />
              <path
                d="M 54 190 C 108 190, 108 155, 162 155"
                class="diagram-line"
              />
              <path
                d="M 64 260 C 113 260, 113 155, 162 155"
                class="diagram-line"
              />

              <path
                d="M 218 155 L 290 155"
                class="diagram-line highlight-line"
              />

              <!-- Animated Dots -->
              <circle r="2.5" fill="#fff" filter="url(#glow-dot)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 64 50 C 113 50, 113 155, 162 155"
                  begin="0s"
                />
              </circle>
              <circle r="2.5" fill="#fff" filter="url(#glow-dot)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 54 120 C 108 120, 108 155, 162 155"
                  begin="0.75s"
                />
              </circle>
              <circle r="2.5" fill="#fff" filter="url(#glow-dot)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 54 190 C 108 190, 108 155, 162 155"
                  begin="1.5s"
                />
              </circle>
              <circle r="2.5" fill="#fff" filter="url(#glow-dot)">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M 64 260 C 113 260, 113 155, 162 155"
                  begin="2.25s"
                />
              </circle>

              <circle r="3" fill="#3b82f6" filter="url(#glow-dot)">
                <animateMotion
                  dur="1.5s"
                  repeatCount="indefinite"
                  path="M 218 155 L 290 155"
                  begin="0s"
                />
              </circle>
            </svg>

            <!-- Building Nodes -->
            <div class="node left-node n1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><polyline points="4 17 10 11 4 5" /><line
                  x1="12"
                  x2="20"
                  y1="19"
                  y2="19"
                /></svg
              >
            </div>
            <div class="node left-node n2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                  d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
                /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg
              >
            </div>
            <div class="node left-node n3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><ellipse cx="12" cy="5" rx="9" ry="3" /><path
                  d="M3 5V19A9 3 0 0 0 21 19V5"
                /><path d="M3 12A9 3 0 0 0 21 12" /></svg
              >
            </div>
            <div class="node left-node n4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path d="M18 16 l 4 -4 l -4 -4" /><path
                  d="M6 8 l -4 4 l 4 4"
                /><path d="M14.5 4 l -5 16" /></svg
              >
            </div>

            <!-- Deploying Node -->
            <div class="node center-node">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><rect width="8" height="8" x="3" y="3" rx="2" /><path
                  d="M7 11v4a2 2 0 0 0 2 2h4"
                /><rect width="8" height="8" x="13" y="13" rx="2" /></svg
              >
            </div>

            <!-- Managing Node -->
            <div class="node right-node">
              <div class="right-node-inner">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.1 21.1 L2.9 21.1 L12 5.3 Z" />
                </svg>
              </div>
            </div>

            <!-- Labels -->
            <div class="diagram-label label-building">Building</div>
            <div class="diagram-label label-deploying">Deploying</div>
            <div class="diagram-label label-managing">Managing</div>
          </div>
        </div>
      </div>

      <!-- Right Column: Timeline -->
      <div class="timeline-column">
        <div class="timeline">
          {#each experiences as job, i}
            <div class="timeline-item" style="--delay: {i * 0.2}s">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <div class="job-card">
                  <div class="card-header">
                    <div>
                      <h3 class="role">{job.role}</h3>
                      <p class="company">{job.company}</p>
                    </div>
                    <span class="period">{job.period}</span>
                  </div>

                  <ul class="responsibilities">
                    {#each job.description as item}
                      <li>{item}</li>
                    {/each}
                  </ul>

                  {#if job.tech}
                    <div class="tech-stack">
                      {#each job.tech as tech}
                        <span class="tech-tag">{tech}</span>
                      {/each}
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  #experience {
    padding: 60px 20px 100px;
    position: relative;
    overflow: hidden;
  }

  .content-wrapper {
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
  }

  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 80px;
    align-items: start;
  }

  .visual-column {
    position: sticky;
    top: 150px;
  }

  .header-group {
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
    background: linear-gradient(to right, #fff, #a5a5a5);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 16px;
    line-height: 1.6;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI",
      sans-serif;
  }

  /* Graphic Container & Architecture SVG */
  .graphic-container {
    position: relative;
    margin-top: 40px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .glow-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(59, 130, 246, 0.12) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 0;
  }

  .diagram-wrapper {
    position: relative;
    width: 400px;
    height: 350px;
    z-index: 1;
    opacity: 0;
    transform: translateY(30px) scale(0.96);
    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
  }

  #experience.visible .diagram-wrapper {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .connection-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .diagram-line {
    stroke: url(#line-gradient);
    stroke-width: 1.5;
    fill: none;
  }

  .highlight-line {
    stroke: rgba(59, 130, 246, 0.4);
    stroke-dasharray: 4 4;
    animation: dashScroll 20s linear infinite;
  }

  @keyframes dashScroll {
    to {
      stroke-dashoffset: -1000;
    }
  }

  .node {
    position: absolute;
    background: rgba(30, 30, 35, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.8);
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    transition: all 0.4s ease;
  }

  .node:hover {
    transform: translate(-50%, -50%) scale(1.1);
    color: #fff;
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  .left-node {
    width: 48px;
    height: 48px;
    border-radius: 12px;
  }

  .left-node svg {
    width: 22px;
    height: 22px;
  }

  .n1 {
    top: 50px;
    left: 40px;
  }
  .n2 {
    top: 120px;
    left: 30px;
  }
  .n3 {
    top: 190px;
    left: 30px;
  }
  .n4 {
    top: 260px;
    left: 40px;
  }

  .center-node {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    top: 155px;
    left: 190px;
    background: rgba(40, 40, 45, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .center-node svg {
    width: 26px;
    height: 26px;
  }

  .right-node {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    top: 155px;
    left: 330px;
    background: linear-gradient(
      135deg,
      rgba(30, 58, 138, 0.8),
      rgba(37, 99, 235, 0.8)
    );
    border: 1px solid rgba(96, 165, 250, 0.4);
    box-shadow:
      0 0 30px rgba(59, 130, 246, 0.3),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
  }

  .right-node-inner {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
    animation: nodePulse 2s infinite alternate ease-in-out;
  }

  .right-node-inner svg {
    width: 34px;
    height: 34px;
  }

  @keyframes nodePulse {
    0% {
      transform: scale(0.95);
      opacity: 0.9;
    }
    100% {
      transform: scale(1.05);
      opacity: 1;
    }
  }

  .diagram-label {
    position: absolute;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.4);
    transform: translateX(-50%);
    top: 310px;
  }

  .label-building {
    left: 40px;
  }
  .label-deploying {
    left: 190px;
  }
  .label-managing {
    left: 330px;
    color: rgba(96, 165, 250, 0.6);
  }

  /* Timeline Construction */
  .timeline {
    position: relative;
    padding-left: 30px;
  }

  .timeline::before {
    content: "";
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.08) 70%,
      transparent
    );
    border-radius: 2px;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  }

  #experience.visible .timeline::before {
    transform: scaleY(1);
  }

  .timeline-item {
    position: relative;
    margin-bottom: 60px;
    opacity: 0;
    transform: translateX(-30px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: var(--delay);
  }

  .timeline-marker {
    position: absolute;
    left: -35px;
    top: 24px;
    width: 12px;
    height: 12px;
    background: #000;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    z-index: 2;
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 1);
    transform: scale(0);
  }

  #experience.visible .timeline-marker {
    transform: scale(1);
    animation: markerPulse 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s;
  }

  @keyframes markerPulse {
    0% {
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 1);
    }
    50% {
      box-shadow:
        0 0 0 4px rgba(0, 0, 0, 1),
        0 0 12px rgba(255, 255, 255, 0.3);
    }
    100% {
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 1);
    }
  }

  .timeline-item:hover .timeline-marker {
    background: #fff;
    border-color: #fff;
    box-shadow:
      0 0 15px rgba(255, 255, 255, 0.4),
      0 0 0 4px rgba(0, 0, 0, 1);
  }

  .job-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    padding: 32px;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    backdrop-filter: blur(10px);
  }

  .job-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.3);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
    gap: 20px;
  }

  .role {
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
    margin: 0 0 4px 0;
    letter-spacing: -0.01em;
  }

  .company {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }

  .period {
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.05);
    padding: 6px 12px;
    border-radius: 100px;
    white-space: nowrap;
  }

  .responsibilities {
    list-style: none;
    padding: 0;
    margin: 0 0 24px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .responsibilities li {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.6;
    padding-left: 20px;
    position: relative;
  }

  .responsibilities li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: rgba(255, 255, 255, 0.3);
  }

  .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 20px;
  }

  .tech-tag {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 10px;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .job-card:hover .tech-tag {
    background: rgba(255, 255, 255, 0.1);
  }

  /* Visibility State */
  #experience.visible .header-group {
    opacity: 1;
    transform: translateY(0);
  }

  #experience.visible .timeline-item {
    opacity: 1;
    transform: translateX(0);
  }

  @media (max-width: 900px) {
    .grid-layout {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .visual-column {
      position: relative;
      top: 0;
    }

    .hidden-mobile {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .card-header {
      flex-direction: column;
      gap: 12px;
    }

    .period {
      align-self: flex-start;
    }

    .timeline {
      padding-left: 20px;
    }

    .timeline-marker {
      left: -26px;
    }

    .job-card {
      padding: 24px;
    }
  }
</style>
