<script>
  import { onMount } from 'svelte';

  const projects = [
    {
      title: "Cloud Native CI/CD Pipeline",
      description: "Architected and implemented a comprehensive CI/CD pipeline leveraging GitHub Actions for automation, Docker for containerization, and Kubernetes for orchestration. The pipeline features automated testing, seamless deployment, and robust monitoring capabilities.",
      tags: ["Docker", "Kubernetes", "GitHub Actions", "AWS"],
      links: {
        github: "https://github.com/yourusername/project1",
        live: "https://project1.demo.com"
      },
      image: "/src/assets/project-images/ci-cd.png" 
    },
    {
      title: "Portfolio Website",
      description: "Designed and developed a modern portfolio website using Svelte and Vite. Features include smooth animations, responsive design, and dynamic content loading. Deployed on AWS with CloudFront for optimal performance and global content delivery.",
      tags: ["Svelte", "AWS", "TypeScript", "CSS"],
      links: {
        github: "https://github.com/yourusername/portfolio",
        live: "https://yourportfolio.com"
      },
      image: "src/assets/project-images/portfolio.png"
    },
    {
      title: "FastAPI Backend Service",
      description: "Built a high-performance RESTful API service using FastAPI with PostgreSQL integration. Implemented JWT authentication, comprehensive testing, and Docker containerization. Features include automated API documentation and efficient database querying.",
      tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
      links: {
        github: "https://github.com/yourusername/fastapi-service",
      },
      image: "src/assets/project-images/fastapi.png"
    }
  ];

  let projectsSection;
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

    if (projectsSection) {
      observer.observe(projectsSection);
    }

    return () => {
      if (projectsSection) {
        observer.unobserve(projectsSection);
      }
    };
  });
</script>

<section id="projects" bind:this={projectsSection} class:visible>
  <div class="background-blur"></div>
  <div class="background-glow"></div>
  <h2 class="section-title">
    <i class="fas fa-code section-icon"></i>
    <span>Projects</span>
  </h2>

  <div class="projects-container">
    {#each projects as project, i}
      <div 
        class="project-card" 
        class:visible
        style="--delay: {0.2 * i}s; --initial-delay: {1.2 + 0.2 * i}s"
      >
        <div class="project-image">
          <img src={project.image} alt={project.title} />
          <div class="project-links">
            {#if project.links.github}
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" aria-label="View GitHub Repository">
                <i class="fab fa-github"></i>
              </a>
            {/if}
            {#if project.links.live}
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" aria-label="View Live Demo">
                <i class="fas fa-external-link-alt"></i>
              </a>
            {/if}
          </div>
        </div>
        <div class="project-content">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div class="project-tags">
            {#each project.tags as tag}
              <span class="tag">{tag}</span>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  #projects {
    position: relative;
    padding: 40px 20px 60px;  
    color: rgba(255, 255, 255, 0.8);
    background: transparent;
    border-radius: 30px;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow: hidden;
    margin-bottom: 100px;
    isolation: isolate;
    border: 1px solid rgba(255, 255, 255, 0.03);
  }


  #projects::before {
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

  #projects::after {
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

  #projects.visible {
    opacity: 1;
    transform: translateY(0);
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
  }

  .projects-container {
    display: flex;
    flex-direction: column;
    gap: 40px; 
    max-width: 1400px;  
    margin: 0 auto;
    padding: 40px;  
  }

  .project-card {
    display: flex;
    background: rgba(18, 18, 18, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px; 
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: var(--delay);
    backdrop-filter: blur(10px);
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    min-height: 380px;
    position: relative;
  }

  #projects.visible .project-card {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 8px 15px rgba(0, 0, 0, 0.2),
      0 4px 6px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .project-image {
    flex: 0 0 450px;  
    position: relative;
    overflow: hidden;
    margin: 20px; 
    border-radius: 16px; 
    border: 1px solid rgba(255, 255, 255, 0.1); 
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    border-radius: 16px; 
  }

  .project-card:hover .project-image img {
    transform: scale(1.05);
  }

  .project-links {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 10px;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
  }

  .project-card:hover .project-links {
    opacity: 1;
    transform: translateY(0);
  }

  .project-links a {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .project-links a:hover {
    background: rgba(255, 255, 255, 0.9);
    color: #000;
    transform: none;
  }

  .project-content {
    flex: 1;
    padding: 35px;  
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left; 
  }

  .project-content h3 {
    margin: 0 0 20px; 
    font-size: 1.8rem;  
    color: rgba(255, 255, 255, 0.9);
    text-align: left; 
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .project-content p {
    margin: 0 0 25px; 
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;  
    line-height: 1.6;
    text-align: left; 
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: auto;
    justify-content: flex-start;
  }

  .tag {
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.85);
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tag::before {
 /* content: '#'; */
    opacity: 0.5;
    font-weight: 400;
  }

  .tag:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    .project-card {
      flex-direction: column;
    }

    .project-image {
      height: 300px;  
      margin: 15px;   
    }

    .project-content {
      padding: 30px;  
    }
  }

  @media (max-width: 480px) {
    .section-title {
      font-size: 2rem;
    }

    .project-content h3 {
      font-size: 1.2rem;
    }

    .project-content p {
      font-size: 0.9rem;
    }
  }
</style>