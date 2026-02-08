<script>
  import { onMount } from "svelte";

  let experienceSection;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          } else {
            visible = false;
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
  <h2 class="section-title">
    <i class="fas fa-briefcase section-icon"></i>
    <span>Experience</span>
  </h2>

  <div class="experience-container">
    <div class="experience-row">
      <div class="experience-meta">
        <p class="role">Software Engineering Intern</p>
        <p class="company">Inheights Enterprises Pvt. LTD</p>
        <p class="date-range">May 2025 – Oct 2025</p>
      </div>
      <div class="experience-details">
        <ul class="responsibilities">
          <li>
            Contributed to backend systems and API services for core product
            features.
          </li>
          <li>
            Assisted in cloud infrastructure management and deployment
            processes.
          </li>
          <li>
            Implemented monitoring improvements and automated deployment
            workflows to enhance release stability.
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  #experience {
    position: relative;
    padding: 48px 24px 64px;
    color: rgba(255, 255, 255, 0.92);
    background: transparent;
    border-radius: 0;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
    overflow: hidden;
    margin-bottom: 96px;
    isolation: isolate;
    border: none;
    min-height: auto;
  }

  /* Title animation */
  .section-title {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  #experience.visible .section-title {
    opacity: 1;
    transform: translateY(0);
  }

  /* Timeline line animation */
  .experience-row {
    --line-height: 0%;
  }

  #experience.visible .experience-row {
    --line-height: 100%;
  }

  /* Content stagger animation */
  .experience-meta,
  .experience-details {
    opacity: 0;
    transform: translateX(-20px);
    transition:
      opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .experience-meta {
    transition-delay: 0.2s;
  }

  .experience-details {
    transition-delay: 0.35s;
  }

  #experience.visible .experience-meta,
  #experience.visible .experience-details {
    opacity: 1;
    transform: translateX(0);
  }

  .section-title {
    text-align: left;
    margin: 0 auto 32px;
    max-width: 900px;
    font-size: 2rem;
    font-weight: 600;
    color: rgba(245, 245, 250, 0.95);
    position: relative;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 14px;
  }

  .section-icon {
    font-size: 1.75rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .experience-container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .experience-row {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 40px;
    padding: 32px 0;
    border-left: 2px solid rgba(255, 255, 255, 0.1);
    padding-left: 24px;
    margin-left: 8px;
    position: relative;
    transition: border-color 0.3s ease;
  }

  .experience-row:hover {
    border-left-color: rgba(255, 255, 255, 0.5);
  }

  .experience-row::before {
    content: "";
    position: absolute;
    left: -5px;
    top: 38px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transition: background 0.3s ease;
  }

  .experience-row:hover::before {
    background: rgba(255, 255, 255, 0.8);
  }

  .experience-meta {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .role {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    letter-spacing: -0.01em;
    line-height: 1.4;
  }

  .company {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(200, 200, 210, 0.7);
  }

  .date-range {
    margin: 4px 0 0 0;
    font-size: 0.8rem;
    color: rgba(160, 160, 175, 0.6);
    letter-spacing: 0.02em;
    font-variant-numeric: tabular-nums;
  }

  .experience-details p {
    margin: 0 0 16px 0;
    font-size: 0.95rem;
    line-height: 1.7;
    color: rgba(220, 220, 230, 0.85);
  }

  .responsibilities {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .responsibilities li {
    position: relative;
    padding-left: 16px;
    font-size: 0.9rem;
    color: rgba(200, 200, 215, 0.8);
    line-height: 1.6;
  }

  .responsibilities li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(200, 200, 210, 0.4);
  }

  @media (max-width: 768px) {
    #experience {
      padding: 32px 16px 48px;
      margin-bottom: 64px;
    }

    .section-title {
      font-size: 1.75rem;
      margin-bottom: 24px;
    }

    .experience-row {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 24px 0 24px 20px;
      margin-left: 4px;
    }

    .experience-row::before {
      top: 30px;
    }

    .role {
      font-size: 1rem;
    }

    .experience-details p {
      font-size: 0.92rem;
    }

    .responsibilities li {
      font-size: 0.88rem;
    }
  }

  @media (max-width: 480px) {
    #experience {
      padding: 24px 12px 40px;
    }

    .section-title {
      font-size: 1.5rem;
      gap: 10px;
    }

    .section-icon {
      font-size: 1.5rem;
    }

    .experience-row {
      padding-left: 16px;
    }
  }
</style>
