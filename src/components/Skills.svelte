<script>
  import { onMount } from 'svelte';
  
  const categories = [
    {
      title: "Frontend",
      skills: [
        { name: 'React', icon: '/icons/react.svg' },
        { name: 'Svelte', icon: '/icons/svelte.svg' },
        { name: 'TypeScript', icon: '/icons/typescript.svg' },
        { name: 'JavaScript', icon: '/icons/javascript.svg' }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: 'Node.js', icon: '/icons/nodejs.svg' },
        { name: 'Python', icon: '/icons/python.svg' },
        { name: 'MongoDB', icon: '/icons/mongodb.svg' },
        { name: 'PostgreSQL', icon: '/icons/postgresql.svg' }
      ]
    },
    {
      title: "DevOps",
      skills: [
        { name: 'Docker', icon: '/icons/docker.svg' },
        { name: 'AWS', icon: '/icons/aws.svg' },
        { name: 'Git', icon: '/icons/git.svg' },
        { name: 'GitHub Actions', icon: '/icons/github-actions.svg' }
      ]
    },
    {
      title: "Tools",
      skills: [
        { name: 'VS Code', icon: '/icons/vscode.svg' },
        { name: 'Figma', icon: '/icons/figma.svg' },
        { name: 'Webpack', icon: '/icons/webpack.svg' },
        { name: 'NPM', icon: '/icons/npm.svg' }
      ]
    }
  ];

  let skillsSection;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(skillsSection);
    return () => observer.disconnect();
  });
</script>

<section id="skills" bind:this={skillsSection} class:visible={isVisible}>
  <h2>Skills & Technologies</h2>
  
  <div class="categories-grid">
    {#each categories as category}
      <div class="category" class:visible={isVisible}>
        <h3>{category.title}</h3>
        <div class="skills-card">
          {#each category.skills as skill}
            <div class="skill-item" title={skill.name}>
              <img src={skill.icon} alt={skill.name} />
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  #skills {
    padding: 4rem 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }

  #skills.visible {
    opacity: 1;
    transform: translateY(0);
  }

  h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.4rem;
    color: rgba(255, 255, 255, 0.9);
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .category {
    opacity: 0;
    transform: translateY(15px);
    transition: all 0.6s ease;
  }

  .category.visible {
    opacity: 1;
    transform: translateY(0);
  }

  h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .skills-card {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .skill-item {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease;
  }

  .skill-item:hover {
    transform: translateY(-5px);
  }

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    .categories-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

