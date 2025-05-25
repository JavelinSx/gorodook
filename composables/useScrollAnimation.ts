// composables/useScrollAnimations.ts
export const useScrollAnimations = () => {
  const initializeScrollAnimations = () => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const animatedElements = document.querySelectorAll(
        '.fade-in, .fade-up, .fade-down, .slide-in-left, .slide-in-right, .bounce-in, .scale-in'
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px', // Триггер анимации чуть раньше
        }
      );

      animatedElements.forEach((el) => observer.observe(el));

      // Cleanup function
      return () => {
        observer.disconnect();
      };
    }

    return () => {}; // Пустая функция для cleanup если IntersectionObserver недоступен
  };

  return {
    initializeScrollAnimations,
  };
};
