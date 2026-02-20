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
      { threshold: 0.7 },
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
          <div class="glow"></div>

          <div class="notion-card card-1">
            <div class="card-icon">
              <!-- Code/Terminal Icon -->
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><polyline points="16 18 22 12 16 6"></polyline><polyline
                  points="8 6 2 12 8 18"
                ></polyline></svg
              >
            </div>
            <div class="card-text">
              <div class="card-title">System Architecture</div>
              <div class="card-bar"></div>
              <div class="card-bar short"></div>
            </div>
          </div>

          <div class="notion-card card-2">
            <div class="card-icon">
              <!-- Server/Database Icon -->
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><rect x="2" y="2" width="20" height="8" rx="2" ry="2"
                ></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"
                ></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line
                  x1="6"
                  y1="18"
                  x2="6.01"
                  y2="18"
                ></line></svg
              >
            </div>
            <div class="card-text">
              <div class="card-title">Cloud Infrastructure</div>
              <div class="card-bar"></div>
            </div>
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
    transform: translateY(20px);
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
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

  /* Graphic Container & Notion Cards */
  .graphic-container {
    position: relative;
    margin-top: 60px;
    height: 300px;
  }

  .glow {
    position: absolute;
    top: 40%;
    left: 40%;
    width: 250px;
    height: 250px;
    background: rgba(76, 201, 240, 0.15); /* Tech blue glow matching Hero */
    filter: blur(70px);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 0;
  }

  .notion-card {
    position: absolute;
    background: rgba(25, 25, 25, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    gap: 16px;
    align-items: center;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow:
      0 10px 30px -10px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    z-index: 1;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .card-1 {
    top: 20px;
    left: 0;
    width: 260px;
    transform: translateY(30px) rotate(-5deg) scale(0.95);
  }

  .card-2 {
    top: 130px;
    left: 40px;
    width: 240px;
    transform: translateY(30px) rotate(3deg) scale(0.95);
    transition-delay: 0.15s;
  }

  #experience.visible .card-1 {
    opacity: 1;
    transform: translateY(0) rotate(-2deg) scale(1);
    animation: float1 6s ease-in-out infinite alternate 0.8s;
  }

  #experience.visible .card-2 {
    opacity: 1;
    transform: translateY(0) rotate(2deg) scale(1);
    animation: float2 7s ease-in-out infinite alternate 1s;
  }

  @keyframes float1 {
    0% {
      transform: translateY(0) rotate(-2deg) scale(1);
    }
    100% {
      transform: translateY(-12px) rotate(-1deg) scale(1);
    }
  }

  @keyframes float2 {
    0% {
      transform: translateY(0) rotate(2deg) scale(1);
    }
    100% {
      transform: translateY(15px) rotate(3deg) scale(1);
    }
  }

  .card-icon {
    width: 42px;
    height: 42px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .card-icon svg {
    width: 20px;
    height: 20px;
    opacity: 0.9;
  }

  .card-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .card-title {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: -0.01em;
  }

  .card-bar {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    width: 100%;
  }

  .card-bar.short {
    width: 60%;
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
    transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
  }

  #experience.visible .timeline::before {
    transform: scaleY(1);
  }

  .timeline-item {
    position: relative;
    margin-bottom: 60px;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
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
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 1);
    transform: scale(0);
  }

  #experience.visible .timeline-marker {
    transform: scale(1);
    animation: markerPulse 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.8s;
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
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
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
