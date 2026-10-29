window.va = window.va || function () {
  (window.vaq = window.vaq || []).push(arguments);
};

const welcomeScreen = document.getElementById("welcomeScreen");
const linksScreen = document.getElementById("linksScreen");
const previewButton = document.getElementById("previewButton");
const backButton = document.getElementById("backButton");

function showScreen(screenToShow) {
  const screens = [welcomeScreen, linksScreen];

  screens.forEach((screen) => {
    const isActive = screen === screenToShow;
    screen.classList.toggle("active", isActive);
    screen.setAttribute("aria-hidden", String(!isActive));
  });
}

previewButton.addEventListener("click", () => {
  showScreen(linksScreen);
});

backButton.addEventListener("click", () => {
  showScreen(welcomeScreen);
});
