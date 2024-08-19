document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
  
      const target = document.querySelector(this.getAttribute('href'));
      const targetPosition = target.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // Duration in milliseconds
      let start = null;
  
      window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
  
        // Ease-in-out animation function
        const easeInOutQuad = progress => progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
  
        const percentage = Math.min(progress / duration, 1);
        const easedPosition = easeInOutQuad(percentage);
  
        window.scrollTo(0, startPosition + distance * easedPosition);
  
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      });
    });
  });
  