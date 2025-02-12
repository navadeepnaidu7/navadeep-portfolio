<section id="projects">
  <h2>Projects</h2>
  <div class="project-grid">
    <div class="project-card">
      <h3>Project 1</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <div class="project-card">
      <h3>Project 2</h3>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
    <div class="project-card">
      <h3>Project 3</h3>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    </div>
  </div>
</section>

<style>
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px 0;
  }

  .project-card {
    background: #000000;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 157, 255, 0.1);
  }
</style>