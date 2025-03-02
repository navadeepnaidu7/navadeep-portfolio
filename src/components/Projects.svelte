<script>
  import { onMount } from 'svelte';

  const projects = [
    {
      title: "Cloud Native CI/CD Pipeline",
      description: "Implemented a complete CI/CD pipeline using GitHub Actions, Docker, and Kubernetes for automated testing and deployment.",
      tags: ["Docker", "Kubernetes", "GitHub Actions", "AWS"],
      links: {
        github: "https://github.com/yourusername/project1",
        live: "https://project1.demo.com"
      },
      image: "src/assets/project-thumbnails/cicd-pipeline.png"
    },
    {
      title: "Portfolio Website",
      description: "Modern portfolio website built with Svelte and deployed on AWS, featuring smooth animations and responsive design.",
      tags: ["Svelte", "AWS", "TypeScript", "CSS"],
      links: {
        github: "https://github.com/yourusername/portfolio",
        live: "https://yourportfolio.com"
      },
      image: "src/assets/project-thumbnails/portfolio.png"
    },
    {
      title: "FastAPI Backend Service",
      description: "RESTful API service built with FastAPI, featuring authentication, PostgreSQL database, and comprehensive testing.",
      tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
      links: {
        github: "https://github.com/yourusername/fastapi-service",
      },
      image: "src/assets/project-thumbnails/fastapi.png"
    }
  ];

  let projectsSection;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
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

  <div class="projects-grid">
    {#each projects as project, i}
      <div 
        class="project-card" 
        style="--delay: {0.2 * i}s"
      >
        <div class="project-image">
          <img src={project.image} alt={project.title} />
          <div class="project-links">
            {#if project.links.github}
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i>
              </a>
            {/if}
            {#if project.links.live}
              <a href={project.links.live} target="_blank" rel="noopener noreferrer">
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
    border-radius: 20px;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow: hidden;
    margin-bottom: 100px;
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

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .project-card {
    background: rgba(18, 18, 18, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeIn 0.6s ease forwards;
    animation-delay: var(--delay);
    backdrop-filter: blur(10px);
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 8px 15px rgba(0, 0, 0, 0.2),
      0 4px 6px rgba(0, 0, 0, 0.1);
    border-color: rgba(87, 50, 233, 0.3);
  }

  .project-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
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
  }

  .project-links a:hover {
    background: rgba(87, 50, 233, 0.8);
    transform: scale(1.1);
  }

  .project-content {
    padding: 20px;
  }

  .project-content h3 {
    margin: 0 0 10px;
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.9);
  }

  .project-content p {
    margin: 0 0 15px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag {
    background: rgba(87, 50, 233, 0.2);
    color: rgba(255, 255, 255, 0.8);
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.85rem;
    border: 1px solid rgba(87, 50, 233, 0.3);
  }

  @media (max-width: 768px) {
    .projects-grid {
      grid-template-columns: 1fr;
      padding: 10px;
    }

    .project-card {
      max-width: 500px;
      margin: 0 auto;
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