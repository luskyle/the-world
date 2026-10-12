document.addEventListener("DOMContentLoaded", () => {
  const search = document.querySelector("#article-search");
  const cards = Array.from(document.querySelectorAll(".article-card"));
  const empty = document.querySelector("#no-results");
  const count = document.querySelector("#search-count");

  if (search && cards.length) {
    const updateResults = () => {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;

      cards.forEach((card) => {
        const matches = card.dataset.search.includes(query);
        card.hidden = !matches;
        if (matches) visible += 1;
      });

      empty.hidden = visible !== 0;
      count.textContent = query ? `找到 ${visible} 篇文章` : "";
    };

    search.addEventListener("input", updateResults);
    document.addEventListener("keydown", (event) => {
      if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        event.preventDefault();
        search.focus();
      }
      if (event.key === "Escape" && document.activeElement === search) {
        search.value = "";
        updateResults();
        search.blur();
      }
    });
  }

  const progress = document.querySelector(".reading-progress span");
  if (progress) {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }
});
