<script>
  import { onMount } from 'svelte';

  let experienceSection;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        } else {
          visible = false;
        }
      });
    }, { threshold: 0.1 });

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
        <p class="role">Backend Engineer · DevOps</p>
        <p class="company">Inheights Enterprises Pvt. LTD</p>
        <p class="date-range">May 2025 – Oct 2025</p>
      </div>
      <div class="experience-details">
        <p>Built backend systems and managed cloud infrastructure to keep services reliable and scalable.</p>
        <ul class="responsibilities">
          <li>Delivered API services and data pipelines for core product features.</li>
          <li>Provisioned and maintained cloud resources with operational best practices.</li>
          <li>Improved monitoring and deployment workflows for stable releases.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  #experience {
    position: relative;
    padding: 40px 20px 60px;
    color: rgba(255, 255, 255, 0.88);
    background: transparent;
    border-radius: 0;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow: hidden;
    margin-bottom: 100px;  
    isolation: isolate;
    border: none;
    min-height: auto;
  }

  #experience.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title {
    text-align: left;
    margin: 0 auto 24px;
    max-width: 900px;
    font-size: 2.1rem;
    font-weight: 600;
    color: rgba(220, 220, 230, 0.9);
    position: relative;
    letter-spacing: 0.2px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
  }

  .section-icon {
    font-size: 2rem;
    color: rgba(235, 235, 245, 0.8);
  }

  .experience-container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .experience-row {
    display: grid;
    grid-template-columns: minmax(180px, 240px) 1fr;
    gap: 30px;
    padding: 24px 6px 18px;
  }

  .experience-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .role {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(240, 240, 245, 0.95);
  }

  .company {
    margin: 0;
    font-size: 0.95rem;
    color: rgba(190, 190, 200, 0.75);
  }

  .date-range {
    margin: 0;
    font-size: 0.85rem;
    color: rgba(160, 160, 175, 0.7);
    letter-spacing: 0.2px;
  }

  .experience-details p {
    margin: 0 0 12px 0;
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(210, 210, 220, 0.88);
  }

  .responsibilities {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 8px;
  }

  .responsibilities li {
    position: relative;
    padding-left: 18px;
    font-size: 0.98rem;
    color: rgba(200, 200, 210, 0.85);
    line-height: 1.5;
  }

  .responsibilities li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: rgba(200, 200, 210, 0.5);
  }

  @media (max-width: 768px) {
    #experience {
      padding: 30px 15px 60px;
    }

    .experience-row {
      grid-template-columns: 1fr;
      gap: 12px;
      padding-top: 18px;
    }

    .role {
      font-size: 1rem;
    }
  }
</style>
