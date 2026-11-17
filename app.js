    (function () {
      function initNavigation() {
        const welcomeScreen = document.getElementById("welcomeScreen");
        const linksScreen = document.getElementById("linksScreen");
        const previewButton = document.getElementById("previewButton");
        const backButton = document.getElementById("backButton");

        if (!welcomeScreen || !linksScreen || !previewButton || !backButton) return;

        function showScreen(activeScreen) {
          [welcomeScreen, linksScreen].forEach(function (screen) {
            const active = screen === activeScreen;
            screen.classList.toggle("active", active);
            screen.setAttribute("aria-hidden", String(!active));
          });
        }

        previewButton.addEventListener("click", function () {
          showScreen(linksScreen);
        });
        backButton.addEventListener("click", function () {
          showScreen(welcomeScreen);
        });
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initNavigation);
      } else {
        initNavigation();
      }
    })();
