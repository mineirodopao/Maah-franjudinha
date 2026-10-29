window.va = window.va || function () {
  (window.vaq = window.vaq || []).push(arguments);
};

const links = {
  brOptionOne: "https://t.me/maah_franjuda_bot",
  brOptionTwo: "https://privacy.com.br/checkout/maah_franjudinha",
  cardOptionOne: "https://t.me/maahfranjuda_bot",
  cardOptionTwo: "https://privacy.com.br/checkout/maah_franjudinha"
};

Object.entries(links).forEach(([id, url]) => {
  const link = document.getElementById(id);

  if (link && url.trim() !== "") {
    link.href = url;
  } else if (link) {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });

    link.classList.add("unavailable");
  }
});

function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  const target = document.getElementById(screenId);

  if (!target) return;

  screens.forEach((screen) => {
    screen.classList.remove("active");
    screen.setAttribute("aria-hidden", "true");
  });

  target.classList.add("active");
  target.setAttribute("aria-hidden", "false");

  if (window.location.hash !== "#" + screenId) {
    history.pushState({ screen: screenId }, "", "#" + screenId);
  }
}

document.querySelectorAll("[data-screen]").forEach((button) => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.screen);
  });
});

function restoreScreenFromHash() {
  const screenId = window.location.hash.slice(1);
  const validScreens = ["homeScreen", "brScreen", "cardScreen"];
  const selectedScreen = validScreens.includes(screenId)
    ? screenId
    : "homeScreen";

  document.querySelectorAll(".screen").forEach((screen) => {
    const isActive = screen.id === selectedScreen;
    screen.classList.toggle("active", isActive);
    screen.setAttribute("aria-hidden", String(!isActive));
  });
}

window.addEventListener("popstate", restoreScreenFromHash);
window.addEventListener("hashchange", restoreScreenFromHash);

restoreScreenFromHash();
