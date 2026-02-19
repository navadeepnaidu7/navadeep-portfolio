<script>
  // @ts-nocheck

  import { onMount, onDestroy } from "svelte";

  const currentYear = new Date().getFullYear();
  const socialLinks = {
    github: "https://github.com/navadeepnaidu7",
    linkedin: "https://linkedin.com/in/navadeepnaidu",
    twitter: "https://x.com/Navadeep_naidu7",
    medium: "https://medium.com/@navadeepnaidu7",
  };

  let indiaTime = "";
  let intervalId;

  function updateIndiaTime() {
    const now = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    indiaTime = now.toLocaleTimeString("en-US", options);
  }

  onMount(() => {
    updateIndiaTime();
    intervalId = setInterval(updateIndiaTime, 1000);
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
</script>

<footer>
  <div class="footer-underline"></div>
  <div class="footer-content">
    <div class="copyright">Made with ❤️ by Navadeep Naidu</div>
    <div class="live-time">
      Hyderabad, India | {indiaTime}
    </div>
    <div class="social-links">
      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <i class="fab fa-github"></i>
      </a>
      <a
        href={socialLinks.medium}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Medium"
      >
        <i class="fab fa-medium"></i>
      </a>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <i class="fab fa-linkedin"></i>
      </a>
      <a
        href={socialLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <i class="fab fa-twitter"></i>
      </a>
    </div>
  </div>
</footer>

<style>
  /* Import IBM Plex Mono Bold for retro terminal look */
  @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@700&display=swap");
  footer {
    width: 100%;
    background: rgba(0, 0, 0, 0.73);
    backdrop-filter: blur(10px);
    margin-top: auto;
    position: relative;
  }

  .footer-underline {
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

  .footer-content {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 80px 40px;
    gap: 20px;
  }

  .copyright {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1rem;
    font-weight: 300;
    font-family:
      "SF Pro Display",
      -apple-system,
      BlinkMacSystemFont,
      sans-serif;
    flex: 1;
    text-align: left;
  }

  .live-time {
    color: rgba(222, 222, 222, 0.553);
    font-size: 13px;
    font-weight: 700;
    font-family: "IBM Plex Mono", "Courier New", Courier, monospace;
    letter-spacing: 1px;
    flex: 1;
    text-align: center;
    text-transform: uppercase;
    background: rgba(0, 0, 0, 0.35);
    padding: 6px 10px;
    border-radius: 6px;
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.4);
  }

  .social-links {
    display: flex;
    gap: 20px;
    flex: 1;
    justify-content: flex-end;
  }

  .social-links a {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.4rem;
    transition: all 0.3s ease;
  }

  .social-links a:hover {
    color: rgba(255, 255, 255, 0.9);
    /* transform: scale(1); */
  }

  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: 15px;
      text-align: center;
      padding: 20px 25px;
    }

    .copyright,
    .live-time,
    .social-links {
      flex: none;
      text-align: center;
      justify-content: center;
    }

    .copyright {
      font-size: 0.95rem;
    }

    .live-time {
      font-size: 12px;
      padding: 8px 12px;
    }

    .social-links {
      gap: 18px;
    }

    .social-links a {
      font-size: 1.3rem;
    }
  }

  @media (max-width: 480px) {
    .footer-content {
      gap: 12px;
      padding: 18px 15px;
    }

    .copyright {
      font-size: 0.85rem;
    }

    .live-time {
      font-size: 11px;
      padding: 7px 10px;
      letter-spacing: 0.5px;
    }

    .social-links {
      gap: 15px;
    }

    .social-links a {
      font-size: 1.2rem;
    }
  }
</style>
