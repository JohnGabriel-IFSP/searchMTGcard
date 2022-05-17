async function searchCard(cardName) {
  const data = await fetch(
    `https://api.magicthegathering.io/v1/cards?name=${cardName}`
  );
  const cardObject = await data.json();

  if (Object.keys(cardObject.cards).length === 0) {
    alert("Carta não encontrada!");
    searchCard("Miscast");
  }

  cardObject.cards.map((card) => {
    if (card.imageUrl != null) return showCard(card);
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
  image.src = card.imageUrl;

  nameElement.appendChild(name);
  flavorElement.appendChild(flavor);

  informations.appendChild(nameElement);
  informations.appendChild(flavorElement);

  imageContainer.appendChild(image);

  const searchContainer = document.getElementById("search-container");
  document.body.insertBefore(imageContainer, searchContainer);
  document.body.insertBefore(informations, imageContainer);
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
