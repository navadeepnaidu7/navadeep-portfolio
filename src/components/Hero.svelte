<script>
  export let name;
</script>

<main>
  <div class="left-section">
    <h1>{name}</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
  </div>

  <div class="right-section">
    <img src="/src/assets/endurance.jpg" alt="Profile Logo" class="profile-pic" />
  </div>
</main>

<style>
  main {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }

  .left-section {
    flex: 1;
    padding: 20px;
  }

  .left-section h1 {
    font-size: 3rem;
    margin-bottom: 10px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .left-section h1 {
      white-space: normal;
    }
  }

  .right-section {
    flex: 1.2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 80px;
    margin-left: auto;
  }

  @media (max-width: 768px) {
    .right-section {
      flex: 1;
      padding-right: 20px;
    }
  }

  .right-section img {
    max-width: 300px;
    height: auto;
    border-radius: 50%;
    box-shadow: 
      0 4px 20px rgba(0, 157, 255, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    background-color: #ffffff;
    animation: floating 3s ease-in-out infinite;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
  }

  .right-section img:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 
      0 8px 40px rgba(0, 157, 255, 0.4),
      0 0 20px rgba(0, 157, 255, 0.3),
      0 0 0 2px rgba(255, 255, 255, 0.2);
  }

  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0px); }
  }

  .profile-pic {
    margin-left: 19rem; 
    margin-top: -4rem;
  }
</style>