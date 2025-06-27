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
  <div class="background-blur"></div>
  <div class="background-glow"></div>
  <h2 class="section-title">
    <i class="fas fa-briefcase section-icon"></i>
    <span>Experience</span>
  </h2>

  <div class="experience-container">
    <div class="job-card">
      <h3>Software Engineer Intern</h3>
      <h4>Inheights Enterprises Pvt. LTD</h4>
      <p class="date-range">May 2025 - June 2025</p>
      <ul class="responsibilities">
        <li>Developed and maintained web applications using modern frameworks.</li>
        <li>Collaborated with a team to design and implement new features.</li>
        <li>Participated in code reviews and contributed to improving code quality.</li>
      </ul>
    </div>
  </div>
</section>

<style>
  #experience {
    position: relative;
    padding: 40px 20px 60px;
    color: rgba(255, 255, 255, 0.8);
    background: transparent;
    border-radius: 30px;
    opacity: 1; /* Temporarily set to 1 for visibility test */
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow: hidden;
    margin-bottom: 100px;  
    isolation: isolate;
    border: 1px solid rgba(255, 255, 255, 0.03);
  }

  #experience::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 1px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0.08) 30%,
      rgba(255, 255, 255, 0.03)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    border-radius: 30px;
  }

  /* Add decorative elements */
  #experience::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 114, 255, 0.08) 0%, rgba(0, 198, 255, 0.05) 35%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    top: -100px;
    right: -100px;
    filter: blur(20px);
  }
  
  /* Add a second decorative gradient */
  .background-glow {
    position: absolute;
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, rgba(120, 0, 255, 0.07) 0%, rgba(0, 198, 255, 0.03) 50%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    bottom: -80px;
    left: -80px;
    filter: blur(30px);
  }

  #experience.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .background-blur {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 20px;
    backdrop-filter: blur(80px);
    background: rgba(10, 10, 20, 0.05);
  }

  .section-title {
    text-align: center;
    margin-bottom: 35px;
    font-size: 2.4rem;
    font-weight: 600;
    color: rgba(220, 220, 230, 0.9);
    position: relative;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }

  .section-icon {
    font-size: 2rem;
    background: linear-gradient(45deg, #5732e9, #a194fd);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(87, 50, 233, 0.5);
    filter: drop-shadow(0 2px 4px rgba(87, 50, 233, 0.2));
  }

  .experience-container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .job-card {
    background: rgba(18, 18, 18, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    padding: 25px;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .job-card:hover {
    transform: translateY(-5px);
    box-shadow:
      0 8px 15px rgba(0, 0, 0, 0.2),
      0 4px 6px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .job-card h3 {
    margin-top: 0;
    margin-bottom: 5px;
    font-size: 1.6rem;
    color: rgba(255, 255, 255, 0.95);
  }

  .job-card h4 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: rgba(170, 170, 180, 0.9);
  }

  .job-card .date-range {
    font-size: 0.9rem;
    color: rgba(150, 150, 160, 0.8);
    margin-bottom: 15px;
  }

  .job-card .responsibilities {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .job-card .responsibilities li {
    margin-bottom: 8px;
    font-size: 1rem;
    line-height: 1.5;
    color: rgba(200, 200, 210, 0.9);
    position: relative;
    padding-left: 20px;
  }

  .job-card .responsibilities li::before {
    content: '\2022'; /* Bullet point */
    color: #5732e9; /* Accent color */
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
    position: absolute;
    left: 0;
  }

  @media (max-width: 768px) {
    #experience {
      padding: 30px 15px 60px;
    }

    .job-card {
      padding: 20px;
    }

    .job-card h3 {
      font-size: 1.4rem;
    }

    .job-card h4 {
      font-size: 1.1rem;
    }

    .job-card .date-range {
      font-size: 0.85rem;
    }

    .job-card .responsibilities li {
      font-size: 0.9rem;
    }
  }
</style>
