<script>
  // svelte-ignore export_let_unused
    export let skills = [];
  
  // Enhanced skills data structure
  const skillsData = [
    { name: 'JavaScript', icon: '👨‍💻', level: 'Advanced', description: 'Modern ES6+ features' },
    { name: 'TypeScript', icon: '⚡', level: 'Advanced', description: 'Type-safe development' },
    { name: 'React', icon: '⚛️', level: 'Advanced', description: 'Frontend development' },
    { name: 'Svelte', icon: '🔥', level: 'Intermediate', description: 'Modern web apps' },
    { name: 'Node.js', icon: '🚀', level: 'Advanced', description: 'Backend development' },
    { name: 'Python', icon: '🐍', level: 'Intermediate', description: 'Scripting & automation' }
  ];
</script>

<section id="skills">
  <div class="background-blur"></div>
  <h2>Skills</h2>
  <div class="skills-grid">
    {#each skillsData as skill}
      <div class="skill-card">
        <span class="skill-icon">{skill.icon}</span>
        <h3>{skill.name}</h3>
        <span class="skill-level">{skill.level}</span>
        <p>{skill.description}</p>
      </div>
    {/each}
  </div>
</section>

<style>
  #skills {
    position: relative;
    padding: auto;
    color: rgba(255, 255, 255, 0.8);
    background: transparent;
  }

  .background-blur {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .skills-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .skill-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
  }

  .skill-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 5px 15px rgba(0, 157, 255, 0.1);
  }

  .skill-icon {
    font-size: 2.5rem;
    margin-bottom: 10px;
    display: block;
  }

  .skill-card h3 {
    margin: 10px 0;
    color: rgba(255, 255, 255, 0.9);
  }

  .skill-level {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
    background: rgba(255, 255, 255, 0.1);
    margin: 5px 0;
  }

  .skill-card p {
    margin-top: 10px;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.6);
  }
</style>
