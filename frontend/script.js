const buttonComponent = (id, text) => `<button id="${id}">${text}</button>`;

const beerTypeComponent = (list) => list.map((tag) => `<li>${tag}</li>`).join('');

const beerComponent = ({brewery, name, type, score, abv}) => `
	<div class="beer">
		<h2>${name}</h2>
		<h3>${brewery}</h3>
		<ul>${beerTypeComponent(type)}</ul>
		<h4>${score}</h4>
		<h5>${abv}</h5>
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

const loadEvent = function () {
  createButton('loadBeers', 'Load the beers');
  let clickCounter = 0;

  const clickEvent = (event) => {
    function countingClicksOnSortButton() {
      const sortButton = document.getElementById('sortByScore');
      sortButton.onclick = function() {
        clickCounter++;
      };
      return clickCounter;
    }

    function sortByAscendingOrDescending(sortingWay) {
      const beerClassElementHTMLColl = document.getElementsByClassName('beer'); // HTMLcollection
      const beerClassElement = [...beerClassElementHTMLColl]; // convert HTMLcoll. to array
      beerClassElement.map((element) => element.remove());
      const sortingBeersCopy = sortingWay;
      return getRootElement()
        .insertAdjacentHTML('beforeend', sortingBeersCopy.map((beer) => beerComponent(beer)).join(''));
    }

    if (event.target.id === 'loadBeers') {
      const loadButtonElement = document.getElementById('loadBeers');
      // console.dir(event.target); // button#loadBeers
      // console.dir(event.target.id); // loadBeers
      getRootElement().insertAdjacentHTML('afterbegin', beers.map((beer) => beerComponent(beer)).join(''));
      loadButtonElement.remove();
      createButton('sortByScore', 'Sort by score');
      createButton('filterStrongIPAs', 'Strong IPAs');
    }

    if (event.target.id === 'sortByScore') {
      if (countingClicksOnSortButton() % 2 === 0) { // EVEN
        sortByAscendingOrDescending([...beers].sort((a, b) => a.score - b.score));
      }
      if (countingClicksOnSortButton() % 2 === 1) { // ODD
        sortByAscendingOrDescending([...beers].sort((a, b) => b.score - a.score));
      }
    }

    if (event.target.id === 'filterStrongIPAs') {
      const filterButtonElement = document.getElementById('filterStrongIPAs');
      const beerClassElementHTMLColl = document.getElementsByClassName('beer'); // HTMLcollection
      const beerClassElement = [...beerClassElementHTMLColl]; // convert HTMLcoll. to array
      beerClassElement.map((element) => element.remove());
      filterButtonElement.remove();
      createButton('resetFilter', 'Reset filter');
      //   const filteredBeerCopy =
      sortByAscendingOrDescending([...beers].filter((beer) => beer.abv >= 6.5));
      //   return getRootElement()
      //     .insertAdjacentHTML('beforeend', filteredBeerCopy.map((beer) => beerComponent(beer)).join(''));
    }

    if (event.target.id === 'resetFilter') {
      const resetButtonElement = document.getElementById('resetFilter');
      const beerClassElementHTMLColl = document.getElementsByClassName('beer'); // HTMLcollection
      const beerClassElement = [...beerClassElementHTMLColl]; // convert HTMLcoll. to array
      beerClassElement.map((element) => element.remove());
      resetButtonElement.remove();
      createButton('filterStrongIPAs', 'Strong IPAs');
    }
  };
  window.addEventListener('click', clickEvent);
};

window.addEventListener('load', loadEvent);

