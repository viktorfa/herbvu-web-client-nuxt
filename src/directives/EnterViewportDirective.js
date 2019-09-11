export default {
  inserted: (el, { value }) => {
    function handleIntersect(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (value && typeof value === "function") {
            value();
          }
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: "0",
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    }
    if (window.IntersectionObserver) {
      createObserver();
    } else {
      console.warn(
        "Browser does not support window.IntersectionObserver. Infinite scroll not supported.",
      );
    }
  },
};
