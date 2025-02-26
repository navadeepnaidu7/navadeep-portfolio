<script>
  import { onMount } from 'svelte';
  
  // svelte-ignore export_let_unused
  export let skills = [];
  
  // Enhanced skills data structure organized by categories with CDN logo URLs
  const skillsCategories = {
    webdev: {
      title: "Web Development",
      skills: [
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'Svelte', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' }
      ]
    },
    devops: {
      title: "DevOps",
      skills: [
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg' }
      ]
    },
    tools: {
      title: "Tools",
      skills: [
        { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
        { name: 'Webpack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg' },
        { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'NPM', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg' }
      ]
    },
    others: {
      title: "Others",
      skills: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
        { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-plain.svg' }
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
  let categories = [];
  let visible = false;
  
  // Enhanced animation for initial load
  let initialAnimation = true;

  onMount(() => {
    // For scroll animations after initial load
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true;
          initialAnimation = false; // Disable initial animation after first scroll into view
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

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

<section id="skills" bind:this={skillsSection} class:visible class:initial-animation={initialAnimation}>
  <div class="background-blur"></div>
  <div class="background-glow"></div>
  <h2 class="section-title">
    <i class="fas fa-code-branch"></i>
    Skills
  </h2>
  
  <div class="categories-grid">
    <!-- Web Development Category -->
    <div class="category" class:visible style="--delay: 0s; --initial-delay: 1.2s">
      <h3 class="category-title">{skillsCategories.webdev.title}</h3>
      <div class="skills-card">
        {#each skillsCategories.webdev.skills as skill, i}
          <div class="tech-item" title={skill.name}>
            <div class="tech-icon">
              <img src={skill.icon} alt={skill.name} on:error={(e) => handleImageError(e, skill.name)} />
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- DevOps Category -->
    <div class="category" class:visible style="--delay: 0.2s; --initial-delay: 1.4s">
      <h3 class="category-title">{skillsCategories.devops.title}</h3>
      <div class="skills-card">
        {#each skillsCategories.devops.skills as skill, i}
          <div class="tech-item" title={skill.name}>
            <div class="tech-icon">
              <img src={skill.icon} alt={skill.name} on:error={(e) => handleImageError(e, skill.name)} />
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Tools Category -->
    <div class="category" class:visible style="--delay: 0.4s; --initial-delay: 1.6s">
      <h3 class="category-title">{skillsCategories.tools.title}</h3>
      <div class="skills-card">
        {#each skillsCategories.tools.skills as skill, i}
          <div class="tech-item" title={skill.name}>
            <div class="tech-icon">
              <img src={skill.icon} alt={skill.name} on:error={(e) => handleImageError(e, skill.name)} />
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Others Category -->
    <div class="category" class:visible style="--delay: 0.6s; --initial-delay: 1.8s">
      <h3 class="category-title">{skillsCategories.others.title}</h3>
      <div class="skills-card">
        {#each skillsCategories.others.skills as skill, i}
          <div class="tech-item" title={skill.name}>
            <div class="tech-icon">
              <img src={skill.icon} alt={skill.name} on:error={(e) => handleImageError(e, skill.name)} />
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
    padding: 40px 20px 60px;
    color: rgba(255, 255, 255, 0.8);
    background: transparent;
    border-radius: 20px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease, transform 0.8s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    overflow: hidden;
  }

  #skills::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0%;
    right: 0%;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.059) 10%,
      rgba(255, 255, 255, 0.059) 90%,
      transparent 100%
    );
    border-radius: 26px;
  }

  /* Add decorative elements */
  #skills::after {
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
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(120, 0, 255, 0.07) 0%, rgba(0, 198, 255, 0.03) 50%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    bottom: -80px;
    left: -80px;
    filter: blur(30px);
  }

  #skills.visible {
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
    gap: 12px;
  }

  .section-title i {
    font-size: 2rem;
    color: rgba(87, 50, 233, 0.8);
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto);
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto;
    justify-content: center;
  }

  .category {
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(15px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    transition-delay: var(--delay, 0s);
    position: relative;
  }

  /* Enhanced category animation for initial load */
  #skills.initial-animation .category {
    animation: slideInCategory 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: var(--initial-delay, 0s);
    transform: translateY(30px);
    opacity: 0;
    transition: none;
  }

  @keyframes slideInCategory {
    0% {
      transform: translateY(30px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .category.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .category-title {
    margin: 0 0 15px 0;
    font-size: 1.3rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.95);
    text-align: left;
    padding-bottom: 8px;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    position: relative;
    display: inline-block;
  }

  /* Updated skills card to match social buttons */
  .skills-card {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    padding: 18px;
    background: rgba(18, 18, 18, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    justify-content: center;
    align-items: center;
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
    /* The card itself will now be responsible for the animation */
    transform-origin: center bottom;
  }
  
  /* Add border gradient effect like social buttons */
  .skills-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: 0;
  }

  /* Special treatment for webdev category to ensure one row */
  .category:first-child .skills-card {
    justify-content: space-between;
  }
  
  .category:first-child .tech-item {
    width: auto;
    min-width: 0;
    flex: 0 0 auto;
  }

  .skills-card:hover {
    transform: translateY(-3px);
    box-shadow: 
      0 8px 15px rgba(0, 0, 0, 0.2),
      0 4px 6px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    border-color: rgba(87, 50, 233, 0.3);
  }

  .tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: calc(20% - 10px);
    min-width: 55px;
    position: relative;
    z-index: 1;
    /* Removed opacity and transform that were used for animation */
  }

  /* Removed individual tech-item animations */
  /* Removed @keyframes placeItem */
  /* Removed tech-item animation in #skills.initial-animation */
  /* Removed scroll animation for tech items */
  /* Removed @keyframes fadeIn for tech items */

  .tech-item:hover {
    transform: none; /* Remove the pop-up effect */
  }
  
  .tech-item:hover::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(87, 50, 233, 0.15), transparent 70%);
    border-radius: 50%;
    z-index: -1;
    animation: pulseGlow 2s infinite;
  }
  
  @keyframes pulseGlow {
    0% { opacity: 0.4; transform: scale(0.8); }
    50% { opacity: 0.6; transform: scale(1.1); }
    100% { opacity: 0.4; transform: scale(0.8); }
  }

  .tech-icon {
    height: 60px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
    position: relative;
    z-index: 1;
  }

  .tech-icon img {
    width: 45px;
    height: 45px;
    object-fit: contain;
    filter: brightness(1.1);
    transition: all 0.3s ease;
  }
  
  /* Docker logo a bit bigger than other SVGs */
  .tech-icon img[alt="Docker"] {
    width: 55px;
    height: 55px;
  }

  .tech-item:hover .tech-icon img {
    filter: brightness(1.3) drop-shadow(0 0 8px rgba(87, 50, 233, 0.5));
    transform: none; /* Remove the scale effect */
  }

  /* GitHub & Bash specific styling for better visibility */
  .tech-icon img[alt="GitHub"], 
  .tech-icon img[alt="Bash"] {
    filter: brightness(3.5);
  }
  
  .tech-icon img[alt="GitHub"]:hover, 
  .tech-icon img[alt="Bash"]:hover {
    filter: brightness(4) drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
  }



  /* Responsive design */
  @media (max-width: 992px) {
    .tech-item {
      width: calc(25% - 10px);
    }
    
    .category:first-child .skills-card {
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .category:first-child .tech-item {
      width: calc(25% - 10px);
      min-width: 55px;
    }
  }

  @media (max-width: 768px) {
    #skills {
      padding: 30px 15px 50px;
    }
    
    .categories-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
    
    .tech-item {
      width: calc(33.33% - 10px);
    }
    
    .category:first-child .tech-item {
      width: calc(33.33% - 10px);
    }
  }

  @media (max-width: 480px) {
    .section-title {
      margin-bottom: 20px;
      font-size: 2rem;
    }
    
    .tech-item {
      width: calc(50% - 8px);
    }
    
    .category:first-child .tech-item {
      width: calc(50% - 8px);
    }
    
    .skills-card {
      padding: 12px;
      gap: 8px;
    }
    
    .category-title {
      margin-bottom: 8px;
      font-size: 1.2rem;
    }
  }

  /* Initial load animation - different from scroll animation */
  #skills.initial-animation {
    transition-delay: 0.5s; /* Reduced delay for faster initial appearance */
    animation: fadeInSection 0.8s ease forwards;
  }
  
  @keyframes fadeInSection {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Add a subtle intro animation for the section title */
  #skills.initial-animation .section-title {
    animation: revealTitle 1s cubic-bezier(0.12, 0.93, 0.12, 0.93) forwards;
    animation-delay: 0.7s;
    opacity: 0;
    transform: translateY(20px);
  }
  
  @keyframes revealTitle {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Enhanced card animation */
  #skills.initial-animation .skills-card {
    animation: popCard 0.7s cubic-bezier(0.2, 0.85, 0.4, 1.275) forwards;
    animation-delay: calc(var(--initial-delay, 0s) + 0.2s);
    opacity: 0;
    transform: translateY(15px) scale(0.95);
  }
  
  /* Scroll-based animation for cards */
  #skills:not(.initial-animation) .category.visible .skills-card {
    animation: popCard 0.5s cubic-bezier(0.2, 0.85, 0.4, 1.275) forwards;
    animation-delay: calc(var(--delay, 0s) + 0.2s);
    opacity: 0;
    transform: translateY(15px) scale(0.95);
  }
  
  @keyframes popCard {
    0% {
      opacity: 0;
      transform: translateY(15px) scale(0.95);
    }
    60% {
      transform: translateY(-5px) scale(1.02);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>

