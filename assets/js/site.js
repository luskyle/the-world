document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const updateThemeButton = () => {
    if (!themeToggle) return;
    const isDark = document.documentElement.dataset.theme === "dark";
    const label = isDark ? "切换到浅色主题" : "切换到深色主题";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
    themeToggle.setAttribute("aria-pressed", String(isDark));
    if (themeColor) themeColor.content = isDark ? "#0b1220" : "#f4f8fc";
  };

  if (themeToggle) {
    updateThemeButton();
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = nextTheme;
      updateThemeButton();
      try {
        localStorage.setItem("world-theme", nextTheme);
      } catch {
        // Keep the in-page theme change even if the preference cannot be saved.
      }
    });
  }

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
