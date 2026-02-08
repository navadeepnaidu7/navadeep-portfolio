<script>
  import { onMount } from 'svelte';
  import expressjsIcon from '../assets/skills-logos/expressjs.svg';
  import flaskIcon from '../assets/skills-logos/flask.svg';
  import awsIcon from '../assets/skills-logos/aws.svg';
  import githubActionsIcon from '../assets/skills-logos/GitHub Actions.svg';
  import prismaIcon from '../assets/skills-logos/prisma.svg';
  import pandasIcon from '../assets/skills-logos/pandas.svg';
  
  const skillsCategories = {
    webdev: {
      title: "Web & Backend Development",
      blurb: "Interfaces, APIs, and scalable server logic.",
      skills: [
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'Svelte', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
        { name: 'Express.js', icon: expressjsIcon },
        { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
        { name: 'Flask', icon: flaskIcon } 
      ]
    },
    devops: {
      title: "DevOps & Cloud",
      blurb: "Infrastructure, delivery, and cloud platforms.",
      skills: [
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
        { name: 'AWS', icon: awsIcon },
        { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
        { name: 'GitHub Actions', icon: githubActionsIcon },
        
      ]
    },
    tools: {
      title: "Tools & Automation",
      blurb: "Workflow boosters and automation kits.",
      skills: [
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
        { name: 'Webpack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg' },
        { name: 'Selenium', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg' },
        {name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      ]
    },
    databases: {
      title: "Databases & AI",
      blurb: "Data modeling, queries, and analytics.",
      skills: [
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Prisma', icon: prismaIcon },
        { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
        { name: 'Pandas', icon: pandasIcon }
      ]
    }
  };

  // Function to handle rare image loading errors
  function handleImageError(event, techName) {
    console.log(`Failed to load icon for ${techName}`);
    event.target.onerror = null;
    // Create a text-based placeholder with first letters of the tech name
    const initials = techName.split(' ').map(word => word[0]).join('');
    event.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40"><rect width="100" height="100" rx="20" fill="rgba(255,255,255,0.1)"/><text y="50%" x="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="white">${initials}</text></svg>`;
  }

  // Animation on scroll
  let skillsSection;
  let visible = false;
  let activeCategory = Object.keys(skillsCategories)[0];

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
        } else {
          visible = false;
        }
      });
    }, { threshold: 0.25 });

    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  });
</script>

<section id="skills" bind:this={skillsSection} class:visible>
  <div class="skills-shell">
    <div class="section-heading">
      <p class="section-kicker">Skills</p>
      <h2 class="section-title">
        <i class="fas fa-code-branch section-icon"></i>
        <span>Skills</span>
      </h2>
      <p class="section-subtitle">Organized stacks that open into the tools I use daily.</p>
    </div>
    
    <div class="skills-layout">
      <nav class="skills-categories" aria-label="Skills categories">
        {#each Object.entries(skillsCategories) as [key, category]}
          <button
            class="category-tab"
            class:active={activeCategory === key}
            on:click={() => (activeCategory = key)}
            aria-expanded={activeCategory === key}
            aria-controls={"skills-panel-" + key}
            type="button"
          >
            <span class="tab-title">{category.title}</span>
          </button>
        {/each}
      </nav>

      <div class="skills-panels">
        {#each Object.entries(skillsCategories) as [key, category]}
          <div
            id={"skills-panel-" + key}
            class="skills-panel"
            class:active={activeCategory === key}
            aria-hidden={activeCategory !== key}
          >
            <div class="panel-header">
              <div>
                <h3 class="panel-title">{category.title}</h3>
                <p class="panel-subtitle">{category.blurb}</p>
              </div>
            </div>

            <div class="skills-list">
              {#each category.skills as skill}
                <div class="skill-tile">
                  <div class="skill-icon">
                    <img src={skill.icon} alt={skill.name} on:error={(e) => handleImageError(e, skill.name)} />
                  </div>
                  <span class="skill-label">{skill.name}</span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  #skills {
    position: relative;
    padding: 50px 20px 70px;
    color: rgba(255, 255, 255, 0.9);
    background: transparent;
    border-radius: 0;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
    overflow: hidden;
    margin-bottom: 100px;  
    isolation: isolate;
    border: none;
    min-height: auto;
  }

  #skills.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .skills-shell {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .section-heading {
    text-align: left;
    margin: 0 auto 32px;
    max-width: 1200px;
  }

  .section-kicker {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(200, 200, 210, 0.65);
    margin: 0 0 12px 0;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .section-title {
    margin: 0 0 12px 0;
    font-size: 2.4rem;
    font-weight: 600;
    color: #f4f4f7;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
    letter-spacing: 0.2px;
  }

  .section-icon {
    font-size: 2rem;
    color: rgba(235, 235, 245, 0.8);
  }

  .section-subtitle {
    max-width: 640px;
    margin: 0;
    font-size: 0.98rem;
    color: rgba(200, 200, 210, 0.7);
    line-height: 1.6;
  }

  .skills-layout {
    display: grid;
    grid-template-columns: minmax(220px, 1fr) 2.2fr;
    gap: 28px;
    align-items: stretch;
  }

  .skills-categories {
    display: grid;
    gap: 14px;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    padding-right: 18px;
  }

  .category-tab {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    padding: 10px 12px;
    border-radius: 8px;
    background: transparent;
    border: 1px solid transparent;
    border-left: 2px solid transparent;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
    box-shadow: none;
  }

  .category-tab.active {
    border-color: transparent;
    border-left-color: rgba(255, 255, 255, 0.6);
    background: transparent;
    color: #ffffff;
  }

  .tab-title {
    z-index: 1;
  }

  .skills-panels {
    position: relative;
    min-height: 320px;
  }

  .skills-panel {
    display: none;
    flex-direction: column;
    gap: 20px;
    background: transparent;
    border-radius: 0;
    padding: 6px 0 0;
    border: none;
    box-shadow: none;
    animation: panelReveal 0.5s ease;
  }

  .skills-panel.active {
    display: flex;
  }

  @keyframes panelReveal {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .panel-title {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
    color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .panel-subtitle {
    margin: 6px 0 0 0;
    font-size: 0.95rem;
    color: rgba(200, 200, 210, 0.7);
  }

  .skills-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 16px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .skill-tile {
    display: grid;
    gap: 10px;
    padding: 6px 0;
    border-radius: 0;
    background: transparent;
    border: none;
    text-align: center;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .skill-tile:hover {
    color: rgba(255, 255, 255, 0.95);
  }

  .skill-icon {
    height: 54px;
    width: 54px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .skill-icon img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    filter: none;
  }

  .skill-label {
    font-size: 0.9rem;
    color: rgba(240, 242, 255, 0.85);
  }

  /* Responsive design */
  @media (max-width: 1024px) {
    #skills {
      padding: 40px 18px 60px;
    }
  }

  @media (max-width: 992px) {
    .skills-layout {
      grid-template-columns: 1fr;
    }

    .skills-categories {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      border-right: none;
      padding-right: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 14px;
    }

    .skills-panels {
      min-height: auto;
    }
  }

  @media (max-width: 768px) {
    #skills {
      padding: 30px 15px 40px;
      margin-bottom: 60px;
    }

    .section-title {
      font-size: 2.1rem;
    }

    .section-subtitle {
      font-size: 0.95rem;
    }

    .skills-categories {
      grid-template-columns: 1fr;
    }

    .skills-panel {
      padding: 20px;
    }

    .skills-list {
      grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    }
  }

  @media (max-width: 480px) {
    #skills {
      padding: 25px 10px 30px;
      margin-bottom: 40px;
      border-radius: 0;
    }

    .section-title {
      font-size: 1.8rem;
    }

    .category-tab {
      padding: 12px 14px;
    }

    .skills-panel {
      padding: 18px;
    }

    .skills-list {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
  }
</style>

