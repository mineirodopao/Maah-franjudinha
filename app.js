window.va = window.va || function () {
  (window.vaq = window.vaq || []).push(arguments);
};

(function () {
  function iniciar() {
    const welcomeScreen = document.getElementById("welcomeScreen");
    const linksScreen = document.getElementById("linksScreen");
    const previewButton = document.getElementById("previewButton");
    const backButton = document.getElementById("backButton");
    if (!welcomeScreen || !linksScreen || !previewButton || !backButton) return;

    function showScreen(screenToShow) {
      [welcomeScreen, linksScreen].forEach((screen) => {
        const isActive = screen === screenToShow;
        screen.classList.toggle("active", isActive);
        screen.setAttribute("aria-hidden", String(!isActive));
      });
    }
    previewButton.addEventListener("click", () => showScreen(linksScreen));
    backButton.addEventListener("click", () => showScreen(welcomeScreen));
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
