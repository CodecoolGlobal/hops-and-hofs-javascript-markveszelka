const buttonComponent = (id, text) => `<button id="${id}">${text}</button>`;

const beerTypeComponent = (list) => list.map((tag) => `<li>${tag}</li>`).join('');

const beerComponent = ({brewery, name, type, score, abv}) => `
	<div class="beer">
		<h2>NAME: ${name}</h2>
		<h3>BREWERY: ${brewery}</h3>
		<ul>TYPE: ${beerTypeComponent(type)}</ul>
		<h4>SCORE: ${score}</h4>
		<h5>ABV: ${abv}</h5>
	</div>
`;

const winnerComponent = (beer) => `
	<div id="winner">
		<h1>The best light Ale is</h1>
		${beerComponent(beer)}
		${buttonComponent('closeWinner', 'Close')}
	</div>
`;

function getRootElement() {
  return document.getElementById('root');
}

function createButton(buttonId, buttonText) {
  return getRootElement().insertAdjacentHTML('afterbegin', buttonComponent(buttonId, buttonText));
}

function removeSectionTagElement () {
  const sectionTagElementHTMLColl = document.getElementsByTagName('section');
  const sectionTagElement = [...sectionTagElementHTMLColl];
  sectionTagElement.forEach((element) => element.remove());
}

function insertActualListToHTML(position, actualBeerList) {
  return getRootElement().insertAdjacentHTML(position, `<section>${actualBeerList.map((beer) => beerComponent(beer)).join('')}</section>`);
}

function createDescendingSortList (beerList) {
  return [...beerList].sort((a, b) => b.score - a.score);
}

function createAscendingSortList (beerList) {
  return [...beerList].sort((a, b) => a.score - b.score);
}

function removeElement(elementName) {
  return document.getElementById(elementName).remove();
}

function loadBeerButtonContent() {
  removeElement('loadBeers');
  createButton('sortByScore', 'Sort by score');
  createButton('filterStrongIPAs', 'Strong IPAs');
  createButton('bestLightAle', 'Best Light Ale');
  return insertActualListToHTML('afterend', beers);
}

function bestLightAleButtonContent() {
  removeElement('bestLightAle');
  const bestLightAle = [...beers]
    .reduce((accumulator, beer) =>
      beer.type.includes('Ale') && beer.score > accumulator.score && beer.abv <= 6 ? beer : accumulator);
  return getRootElement()
    .insertAdjacentHTML('afterbegin', winnerComponent(bestLightAle));
}

function closeButtonContent() {
  removeElement('winner');
  return createButton('bestLightAle', 'Best Light Ale');
}

function getAscendingSortAttributeInHTML() {
  return getRootElement().getAttribute('sort') === 'ascending';
}

function getDescendingSortAttributeInHTML() {
  return getRootElement().getAttribute('sort') === 'descending';
}

function setAscendingSortAttributeInHTML() {
  return getRootElement().setAttribute('sort', 'ascending');
}

function setDescendingSortAttributeInHTML() {
  return getRootElement().setAttribute('sort', 'descending');
}

function sortByScoreButtonContent() {
  if (getRootElement().getAttribute('sort') === 'none' || getAscendingSortAttributeInHTML()) {
    setDescendingSortAttributeInHTML();
    removeSectionTagElement();
    return insertActualListToHTML('beforeend', createDescendingSortList(beers));
  }
  if (getDescendingSortAttributeInHTML()) {
    setAscendingSortAttributeInHTML();
    removeSectionTagElement();
    return insertActualListToHTML('beforeend', createAscendingSortList(beers));
  }
}

function filterStrongIPAsButtonContent() {
  removeElement('filterStrongIPAs');
  removeSectionTagElement();
  createButton('resetFilter', 'Reset filter');
  if (getRootElement().getAttribute('sort') === 'none') {
    const filteredBeerCopy = [...beers]
      .filter((beer) => beer.abv >= 6.5);
    return insertActualListToHTML('beforeend', filteredBeerCopy);
  }
  if (getAscendingSortAttributeInHTML()) {
    setDescendingSortAttributeInHTML();
    return insertActualListToHTML('beforeend', createAscendingSortList(beers).filter((beer) => beer.abv >= 6.5));
  }
  if (getDescendingSortAttributeInHTML()) {
    setAscendingSortAttributeInHTML();
    return insertActualListToHTML('beforeend', createDescendingSortList(beers).filter((beer) => beer.abv >= 6.5));
  }
}

function resetButtonContent() {
  removeElement('resetFilter');
  removeSectionTagElement();
  createButton('filterStrongIPAs', 'Strong IPAs');
  if (getRootElement().getAttribute('sort') === 'none') {
    return insertActualListToHTML('beforeend', beers);
  }
  if (getAscendingSortAttributeInHTML) {
    setDescendingSortAttributeInHTML();
    return insertActualListToHTML('beforeend', createDescendingSortList(beers));
  }
  if (getDescendingSortAttributeInHTML) {
    setAscendingSortAttributeInHTML();
    return insertActualListToHTML('beforeend', createAscendingSortList(beers));
  }
}


const loadEvent = function () {
  createButton('loadBeers', 'Load the beers');
  getRootElement().setAttribute('sort', 'none');

  const clickEvent = (event) => {
    if (event.target.id === 'loadBeers') {
      loadBeerButtonContent();
    }
    if (event.target.id === 'sortByScore') {
      sortByScoreButtonContent();
    }
    if (event.target.id === 'filterStrongIPAs') {
      filterStrongIPAsButtonContent();
    }
    if (event.target.id === 'resetFilter') {
      resetButtonContent();
    }
    if (event.target.id === 'bestLightAle') {
      bestLightAleButtonContent();
    }
    if (event.target.id === 'closeWinner') {
      closeButtonContent();
    }
  };
  window.addEventListener('click', clickEvent);
};
window.addEventListener('load', loadEvent);

