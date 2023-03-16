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
  sectionTagElement.map((element) => element.remove());
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

const loadEvent = function () {
  createButton('loadBeers', 'Load the beers');
  let clickCounter = 0;
  let isListSorted = false;

  const clickEvent = (event) => {
    function countingClicksOnSortButton() {
      const sortButton = document.getElementById('sortByScore');
      sortButton.onclick = function() {
        clickCounter++;
      };
      return clickCounter;
    }

    if (event.target.id === 'loadBeers') {
      removeElement('loadBeers');
      createButton('sortByScore', 'Sort by score');
      createButton('filterStrongIPAs', 'Strong IPAs');
      createButton('bestLightAle', 'Best Light Ale');
      return insertActualListToHTML('afterend', beers);
    }

    if (event.target.id === 'sortByScore') {
      isListSorted = true;
      if (countingClicksOnSortButton() % 2 === 0) {
        removeSectionTagElement();
        return insertActualListToHTML('beforeend', createDescendingSortList(beers));
      }
      if (countingClicksOnSortButton() % 2 === 1) {
        removeSectionTagElement();
        return insertActualListToHTML('beforeend', createAscendingSortList(beers));
      }
    }

    if (event.target.id === 'filterStrongIPAs') {
      removeElement('filterStrongIPAs');
      removeSectionTagElement();
      createButton('resetFilter', 'Reset filter');
      if (isListSorted === false) {
        const filteredBeerCopy = [...beers]
          .filter((beer) => beer.abv >= 6.5);
        return insertActualListToHTML('beforeend', filteredBeerCopy);
      }
      if (isListSorted === true && countingClicksOnSortButton() % 2 === 0) {
        return insertActualListToHTML('beforeend', createDescendingSortList(beers).filter((beer) => beer.abv >= 6.5));
      }
      if (isListSorted === true && countingClicksOnSortButton() % 2 === 1) {
        return insertActualListToHTML('beforeend', createAscendingSortList(beers).filter((beer) => beer.abv >= 6.5));
      }
    }

    if (event.target.id === 'resetFilter') {
      removeElement('resetFilter');
      removeSectionTagElement();
      createButton('filterStrongIPAs', 'Strong IPAs');
      if (isListSorted === false) {
        return insertActualListToHTML('beforeend', beers);
      }
      if (isListSorted === true && countingClicksOnSortButton() % 2 === 0) {
        return insertActualListToHTML('beforeend', createDescendingSortList(beers));
      }
      if (isListSorted === true && countingClicksOnSortButton() % 2 === 1) {
        return insertActualListToHTML('beforeend', createAscendingSortList(beers));
      }
    }
    // 5. Only reduce, insertAdjacentHTML and the click event listener's clickHandler's callback are used for the task. NOT DONE!
    if (event.target.id === 'bestLightAle') {
      removeElement('bestLightAle');
      const bestLightAle = [...beers]
        .filter((beer) => (beer.type.includes('Ale') && beer.abv <= 6)) // cannot use filter, only reduce...
        .reduce((a, c) => a.score > c.score ? a : c);
      return getRootElement()
        .insertAdjacentHTML('afterbegin', winnerComponent(bestLightAle));
    }

    if (event.target.id === 'closeWinner') {
      removeElement('winner');
      return createButton('bestLightAle', 'Best Light Ale');
    }
  };
  window.addEventListener('click', clickEvent);
};

window.addEventListener('load', loadEvent);

