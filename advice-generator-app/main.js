let title = document.querySelector('.title-advice');
let text = document.querySelector('.text-advice');
let dice = document.querySelector('.dice');

dice.addEventListener('click', ev => {
  fetchData();
});

async function fetchData() {
  let textObj = {};
  try {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    textObj = data;
    title.innerHTML = `Advice #${textObj['slip']['id']}`;
    text.innerHTML = textObj['slip']['advice'];
  } catch (error) {
    console.error(error);
  }
}
// fetchData();
// You only need to make fetch iterable, what when user clicks on .dice the fetchDate function starts over