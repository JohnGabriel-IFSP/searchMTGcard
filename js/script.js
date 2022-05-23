if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/servicework.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

async function searchCard(cardName) {
  // const data = await fetch(
  //   `https://api.magicthegathering.io/v1/cards?name=${cardName}`
  // );
  // const cardObject = await data.json();

  // if (Object.keys(cardObject.cards).length === 0) {
  //   alert("Carta não encontrada!");
  //   searchCard("Miscast");

  fetch(`https://api.magicthegathering.io/v1/cards?name=${cardName}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((cardObject) => {
      cardObject.cards.map((card) => {
        if (card.imageUrl != null) return showCard(card);
      });
    })
    .catch((err) => {
      console.log(err);
      fetch("card404.json")
        .then((response) => response.json())
        .then((json) => showCard(json));
    });
}

let cardName = document.getElementById("cardName");
document.getElementById("btnSearch").addEventListener("click", () => {
  searchCard(cardName.value || "Miscast");
});

function searchCardInPortuguese(cardsPerLanguage) {
  cardsPerLanguage.find((item) => {
    if (item.language === "Portuguese (Brazil)") {
      return item;
    }
  });
}

function showCard(card) {
  removePreviousCard();
  let cardName = card.name;
  let cardFlavor = card.flavor;

  if (card.foreignNames) {
    const cardsPerLanguage = card.foreignNames;
    cardsPerLanguage.find((item) => {
      if (item.language === "Portuguese (Brazil)") {
        cardName = item.name;
        cardFlavor = item.flavor;
      }
    });
  }

  const informations = document.createElement("div");
  informations.id = "information-container";

  const imageContainer = document.createElement("div");
  imageContainer.id = "image-container";

  const nameElement = document.createElement("h2");
  const flavorElement = document.createElement("h3");

  const name = document.createTextNode(cardName);
  const flavor = document.createTextNode(
    cardFlavor === null ? "Flavor não encontrado" : cardFlavor
  );

  const image = document.createElement("img");
  image.id = "cardImage";
  image.src = card.imageUrl;

  const btnFullscreen = document.createElement("button");
  btnFullscreen.id = "fullscreen-image";
  btnFullscreen.textContent = "Expandir";

  nameElement.appendChild(name);
  flavorElement.appendChild(flavor);

  informations.appendChild(nameElement);
  informations.appendChild(flavorElement);

  imageContainer.appendChild(image);
  imageContainer.appendChild(btnFullscreen);

  const searchContainer = document.getElementById("search-container");
  document.body.insertBefore(imageContainer, searchContainer);
  document.body.insertBefore(informations, imageContainer);

  $("#fullscreen-image").addEventListener(
    "click",
    goFullscreenHandler($("#cardImage"))
  );
}

function removePreviousCard() {
  const elementInformation = document.getElementById("information-container");
  if (elementInformation) {
    elementInformation.parentNode.removeChild(elementInformation);
  }
  const elementImage = document.getElementById("image-container");
  if (elementImage) {
    elementImage.parentNode.removeChild(elementImage);
  }
}
