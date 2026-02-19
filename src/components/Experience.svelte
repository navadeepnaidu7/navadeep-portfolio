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
      { threshold: 0.1 },
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
    <div class="header-group">
      <h2 class="section-title">Experience</h2>
    </div>

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
</section>

<style>
  #experience {
    padding: 100px 20px;
    position: relative;
    overflow: hidden;
  }

  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
  }

  .header-group {
    margin-bottom: 60px;
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
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.05) 90%,
      transparent
    );
    border-radius: 2px;
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
    left: -35px; /* Adjust based on timeline padding */
    top: 24px;
    width: 12px;
    height: 12px;
    background: #000;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    z-index: 2;
    transition: all 0.3s ease;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 1); /* fake gap */
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
