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

    // function sortByAscendingOrDescending(sortingWay) {
    // const sectionTagElementHTMLColl = document.getElementsByTagName('section');
    // const sectionTagElement = [...sectionTagElementHTMLColl]; // convert HTMLcoll. to array
    // sectionTagElement.map((element) => element.remove());
    //   const sortingBeersCopy = sortingWay;
    //   return getRootElement()
    //     .insertAdjacentHTML('beforeend', `<section>${sortingBeersCopy.map((beer) => beerComponent(beer)).join('')}</section>`);
    // }

    if (event.target.id === 'loadBeers') {
      const loadButtonElement = document.getElementById('loadBeers');
      //   console.dir(event.target);
      //   console.dir(event.target.id);
      getRootElement().insertAdjacentHTML('afterbegin', `<section>${beers.map((beer) => beerComponent(beer)).join('')}</section>`);
      loadButtonElement.remove();
      createButton('sortByScore', 'Sort by score');
      createButton('filterStrongIPAs', 'Strong IPAs');
      createButton('bestLightAle', 'Best Light Ale');
    }

    if (event.target.id === 'sortByScore') { // this one need to be refactored, due to D.R.Y. !!!
      isListSorted = true;
      //console.log(clickCounter);
      if (countingClicksOnSortButton() % 2 === 1) { // ODD
        const sectionTagElementHTMLColl = document.getElementsByTagName('section');
        const sectionTagElement = [...sectionTagElementHTMLColl]; // convert HTMLcoll. to array
        sectionTagElement.map((element) => element.remove());
        const sortingBeersCopy = [...beers]
          .sort((a, b) => a.score - b.score);
        //console.log(sortingBeersCopy);
        getRootElement()
          .insertAdjacentHTML('beforeend', `<section>${sortingBeersCopy.map((beer) => beerComponent(beer)).join('')}</section>`);
      }
      if (countingClicksOnSortButton() % 2 === 0) { // EVEN
        const sectionTagElementHTMLColl = document.getElementsByTagName('section');
        const sectionTagElement = [...sectionTagElementHTMLColl]; // convert HTMLcoll. to array
        sectionTagElement.map((element) => element.remove());
        const sortingBeersCopyReversed = [...beers]
          .sort((a, b) => b.score - a.score);
        getRootElement()
          .insertAdjacentHTML('beforeend', `<section>${sortingBeersCopyReversed.map((beer) => beerComponent(beer)).join('')}</section>`);
      }
    }
    console.log(isListSorted);

    // if (event.target.id === 'sortByScore') {
    //   if (countingClicksOnSortButton() % 2 === 0) { // EVEN
    //     sortByAscendingOrDescending([...beers].sort((a, b) => a.score - b.score));
    //   }
    //   if (countingClicksOnSortButton() % 2 === 1) { // ODD
    //     sortByAscendingOrDescending([...beers].sort((a, b) => b.score - a.score));
    //   }
    // }

    if (event.target.id === 'filterStrongIPAs') {
      const filterButtonElement = document.getElementById('filterStrongIPAs');
      const sectionTagElementHTMLColl = document.getElementsByTagName('section');
      const sectionTagElement = [...sectionTagElementHTMLColl]; // convert HTMLcoll. to array
      sectionTagElement.map((element) => element.remove());
      filterButtonElement.remove();
      createButton('resetFilter', 'Reset filter');
      if (isListSorted === false) {
        const filteredBeerCopy = [...beers]
          .filter((beer) => beer.abv >= 6.5);
        // sortByAscendingOrDescending([...beers].filter((beer) => beer.abv >= 6.5));
        return getRootElement()
          .insertAdjacentHTML('beforeend', `<section>${filteredBeerCopy.map((beer) => beerComponent(beer)).join('')}</section>`);
      }
      if (isListSorted === true && countingClicksOnSortButton() % 2 === 0) {
        const filteredBeerCopy = [...beers]
          .filter((beer) => beer.abv >= 6.5)
          .sort((a, b) => b.score - a.score);
          // sortByAscendingOrDescending([...beers].filter((beer) => beer.abv >= 6.5));
        return getRootElement()
          .insertAdjacentHTML('beforeend', `<section>${filteredBeerCopy.map((beer) => beerComponent(beer)).join('')}</section>`);
      }
      if (isListSorted === true && countingClicksOnSortButton() % 2 === 1) {
        const filteredBeerCopy = [...beers]
          .filter((beer) => beer.abv >= 6.5)
          .sort((a, b) => a.score - b.score);
          // sortByAscendingOrDescending([...beers].filter((beer) => beer.abv >= 6.5));
        return getRootElement()
          .insertAdjacentHTML('beforeend', `<section>${filteredBeerCopy.map((beer) => beerComponent(beer)).join('')}</section>`);
      }
    }

    if (event.target.id === 'resetFilter') {
      const resetButtonElement = document.getElementById('resetFilter');
      const sectionTagElementHTMLColl = document.getElementsByTagName('section');
      const sectionTagElement = [...sectionTagElementHTMLColl]; // convert HTMLcoll. to array
      sectionTagElement.map((element) => element.remove());
      resetButtonElement.remove();
      createButton('filterStrongIPAs', 'Strong IPAs');
      if (isListSorted === false) {
        getRootElement().insertAdjacentHTML('beforeend', `<section>${beers.map((beer) => beerComponent(beer)).join('')}</section>`);
      }
      if (isListSorted === true && countingClicksOnSortButton() % 2 === 0) {
        const filteredBeerCopy = [...beers]
          .sort((a, b) => b.score - a.score);
        return getRootElement()
          .insertAdjacentHTML('beforeend', `<section>${filteredBeerCopy.map((beer) => beerComponent(beer)).join('')}</section>`);
      }
      if (isListSorted === true && countingClicksOnSortButton() % 2 === 1) {
        const filteredBeerCopy = [...beers]
          .sort((a, b) => a.score - b.score);
        return getRootElement()
          .insertAdjacentHTML('beforeend', `<section>${filteredBeerCopy.map((beer) => beerComponent(beer)).join('')}</section>`);
      }

    }
    // 5. Only reduce, insertAdjacentHTML and the click event listener's clickHandler's callback are used for the task. NOT DONE!
    if (event.target.id === 'bestLightAle') {
      const bestLightAleButtonElement = document.getElementById('bestLightAle');
      bestLightAleButtonElement.remove();
      const bestLightAle = [...beers]
        .filter((beer) => (beer.type.includes('Ale') && beer.abv <= 6)) // cannot use filter, only reduce...
        .reduce((a, c) => a.score > c.score ? a : c);
      getRootElement()
        .insertAdjacentHTML('afterbegin', winnerComponent(bestLightAle));
    }

    if (event.target.id === 'closeWinner') {
      const winnerBeerElement = document.getElementById('winner');
      winnerBeerElement.remove();
      createButton('bestLightAle', 'Best Light Ale');
    }
  };
  window.addEventListener('click', clickEvent);
};

window.addEventListener('load', loadEvent);

