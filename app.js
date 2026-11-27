
"use strict";

/* ===================================
   CONFIGURAÇÕES DO SITE
   =================================== */

const config = {

    vip: "https://telegram.me/Maah_franjuda_bot",

    privacy: "https://privacy.com.br/@maah_franjudinha",

    profile: "./perfil.JPEG",

    openingDuration: 900

};

/* ===================================
   ELEMENTOS DA PÁGINA
   =================================== */

const giftScreen = document.getElementById("giftScreen");

const revealScreen = document.getElementById("revealScreen");

const giftScene = document.getElementById("giftScene");

const giftTouch = document.getElementById("giftTouch");

const openGiftButton = document.getElementById("openGift");

const giftButtonText = document.getElementById("giftButtonText");

const revealTitle = document.getElementById("revealTitle");

const copyButton = document.getElementById("copyLink");

const copyText = document.getElementById("copyText");

const feedback = document.getElementById("feedback");

const manualCopy = document.getElementById("manualCopy");

const profilePhoto = document.getElementById("profilePhoto");

const profileFallback = document.getElementById("profileFallback");

let opening = false;

let opened = false;

let copyTimer;

/* ===================================
   CONFIGURAR LINKS E FOTO
   =================================== */

document.getElementById("vipLink").href = config.vip;

document.getElementById("privacyLink").href = config.privacy;

document.getElementById("year").textContent =
    new Date().getFullYear();

function showPhotoFallback() {

    profilePhoto.hidden = true;

    profileFallback.hidden = false;

}

profilePhoto.addEventListener("error", showPhotoFallback);

profilePhoto.src = config.profile;

if (profilePhoto.complete && profilePhoto.naturalWidth === 0) {

    showPhotoFallback();

}

/* ===================================
   PARTÍCULAS DO FUNDO
   =================================== */

function createAmbientParticles() {

    const ambient = document.querySelector(".ambient");

    for (let i = 0; i < 18; i++) {

        const particle = document.createElement("i");

        particle.style.left =
            `${(i * 37 + 11) % 100}%`;

        particle.style.top =
            `${(i * 23 + 7) % 100}%`;

        particle.style.animationDelay =
            `${i * 0.6}s`;

        ambient.appendChild(particle);

    }

}

/* ===================================
   ESTRELAS AO REDOR DO PRESENTE
   =================================== */

function createGiftStars() {

    const stars = document.querySelector(".gift-stars");

    for (let i = 0; i < 8; i++) {

        const star = document.createElement("span");

        star.textContent = "✦";

        star.style.left =
            `${(i * 31 + 7) % 95}%`;

        star.style.top =
            `${(i * 23 + 12) % 85}%`;

        star.style.animationDelay =
            `${i * 0.4}s`;

        stars.appendChild(star);

    }

}

/* ===================================
   PARTÍCULAS DA ABERTURA
   =================================== */

function createGiftParticles() {

    const container =
        document.querySelector(".gift-particles");

    for (let i = 0; i < 12; i++) {

        const particle =
            document.createElement("span");

        particle.style.setProperty(
            "--angle",
            `${i * 30}deg`
        );

        particle.style.setProperty(
            "--delay",
            `${i * 0.018}s`
        );

        particle.style.setProperty(
            "--distance",
            `${90 + (i % 3) * 20}px`
        );

        container.appendChild(particle);

    }

}

/* ===================================
   REVELAR A SEGUNDA TELA
   =================================== */

function revealContent() {

    giftScreen.hidden = true;

    revealScreen.hidden = false;

    opened = true;

    opening = false;

    revealTitle.focus({
        preventScroll: true
    });

}

/* ===================================
   ABRIR O PRESENTE
   =================================== */

function openGift() {

    if (opening || opened) {
        return;
    }

    opening = true;

    giftTouch.disabled = true;

    openGiftButton.disabled = true;

    giftButtonText.textContent = "ABRINDO...";

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {

        revealContent();

        return;

    }

    giftScene.classList.add("opening");

    giftScreen.classList.add("leaving");

    window.setTimeout(
        revealContent,
        config.openingDuration
    );

}

/* ===================================
   COPIAR LINK - MÉTODO ALTERNATIVO
   =================================== */

function fallbackCopy(text) {

    const textarea =
        document.createElement("textarea");

    const previous =
        document.activeElement;

    textarea.value = text;

    textarea.setAttribute("readonly", "");

    textarea.style.position = "fixed";

    textarea.style.top = "0";

    textarea.style.left = "0";

    textarea.style.opacity = "0";

    textarea.style.fontSize = "16px";

    document.body.appendChild(textarea);

    try {

        textarea.focus();

        textarea.select();

        textarea.setSelectionRange(
            0,
            textarea.value.length
        );

        return document.execCommand("copy");

    } catch (error) {

        return false;

    } finally {

        textarea.remove();

        if (previous && previous.focus) {

            previous.focus();

        }

    }

}

/* ===================================
   CONFIRMAÇÃO DE CÓPIA
   =================================== */

function showCopySuccess() {

    window.clearTimeout(copyTimer);

    copyButton.classList.add("copied");

    copyText.textContent = "LINK COPIADO!";

    feedback.textContent =
        "Link copiado com sucesso!";

    manualCopy.hidden = true;

    copyTimer = window.setTimeout(() => {

        copyButton.classList.remove("copied");

        copyText.textContent =
            "COPIAR LINK DO SITE";

        feedback.textContent = "";

    }, 3000);

}

/* ===================================
   COPIAR ENDEREÇO ATUAL
   =================================== */

async function copySiteLink() {

    window.clearTimeout(copyTimer);

    copyButton.classList.remove("copied");

    copyText.textContent = "COPIAR LINK DO SITE";

    manualCopy.hidden = true;

    feedback.textContent = "";

    const url = window.location.href;

    try {

        if (navigator.clipboard &&
            navigator.clipboard.writeText) {

            await navigator.clipboard.writeText(url);

            showCopySuccess();

            return;

        }

    } catch (error) {

        // Utiliza o método alternativo.

    }

    if (fallbackCopy(url)) {

        showCopySuccess();

        return;

    }

    manualCopy.value = url;

    manualCopy.hidden = false;

    feedback.textContent =
        "Pressione o endereço abaixo para copiar.";

    manualCopy.focus();

    manualCopy.select();

}

/* ===================================
   EVENTOS DOS BOTÕES
   =================================== */

giftTouch.addEventListener(
    "click",
    openGift
);

openGiftButton.addEventListener(
    "click",
    openGift
);

copyButton.addEventListener(
    "click",
    copySiteLink
);

manualCopy.addEventListener(
    "click",
    () => manualCopy.select()
);

/* ===================================
   INICIAR O SITE
   =================================== */

createAmbientParticles();

createGiftStars();

createGiftParticles();
