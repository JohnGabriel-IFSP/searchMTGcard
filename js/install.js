let deferredPrompt;
const installButton = document.getElementById("download");

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt fired");
  deferredPrompt = e;
  installButton.addEventListener("click", installApp);
});

function installApp() {
  deferredPrompt.prompt();

  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("PWA accepted");
    } else {
      console.log("PWA rejected");
    }
    deferredPrompt = null;
  });
}
