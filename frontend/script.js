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

function createSortButton() {
  const sortButtonId = 'sortByScore';
  const sortButtonText = 'Sort by score';
  return getRootElement().insertAdjacentHTML('afterbegin', buttonComponent(sortButtonId, sortButtonText));
}

const loadEvent = function () {
  // the HTML elements with ID are available as global variables with the ID (eg. root) but it is better if you
  // const rootElement = document.getElementById('root');

  //You can add the HTML code to the DOM like this
  const loadButtonId = 'loadBeers';
  const loadButtonText = 'Load the beers';
  getRootElement().insertAdjacentHTML('afterbegin', buttonComponent(loadButtonId, loadButtonText));
  const loadButtonElement = document.getElementById('loadBeers');

  let clickCounter = 0;

  const clickEvent = (event) => {
    if (event.target.id === 'loadBeers') {
      console.dir(event.target); // button#loadBeers
      console.dir(event.target.id); // loadBeers
      getRootElement().insertAdjacentHTML('afterbegin', beers.map((beer) => beerComponent(beer)).join(''));
      loadButtonElement.remove();
      createSortButton();
    }

    function countingClicksOnSortButton() {
      const sortButton = document.getElementById('sortByScore');
      sortButton.onclick = function() {
        clickCounter++;
      };
      return clickCounter;
    }

    if (event.target.id === 'sortByScore') { // this one need to be refactored, due to D.R.Y. !!!
      //console.log(clickCounter);
      if (countingClicksOnSortButton() % 2 === 0) { // EVEN
        const beerClassElementHTMLColl = document.getElementsByClassName('beer'); // HTMLcollection
        const beerClassElement = [...beerClassElementHTMLColl]; // convert HTMLcoll. to array
        beerClassElement.map((element) => element.remove());
        const sortingBeersCopy = [...beers]
          .sort((a, b) => a.score - b.score);
        //console.log(sortingBeersCopy);
        getRootElement()
          .insertAdjacentHTML('beforeend', sortingBeersCopy.map((beer) => beerComponent(beer)).join(''));
      }
      if (countingClicksOnSortButton() % 2 === 1) { // ODD
        const beerClassElementHTMLColl = document.getElementsByClassName('beer'); // HTMLcollection
        const beerClassElement = [...beerClassElementHTMLColl]; // convert HTMLcoll. to array
        beerClassElement.map((element) => element.remove());
        const sortingBeersCopyReversed = [...beers]
          .sort((a, b) => b.score - a.score);
        //console.log(sortingBeersCopyReversed);
        getRootElement()
          .insertAdjacentHTML('beforeend', sortingBeersCopyReversed.map((beer) => beerComponent(beer)).join(''));
      }
    }
  };
  window.addEventListener('click', clickEvent);
};

// you can run your code in different ways but this is the safest. This way you can make sure that all the content (including css, fonts) is loaded.
window.addEventListener('load', loadEvent);

