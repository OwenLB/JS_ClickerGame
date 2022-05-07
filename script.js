const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

daysLeft = 60;
gameOverNumber = 50;
loopPlay = false;

function start() {
  count = 0;
  getFaster = 6000;
  daysRemaining = daysLeft; 

  canvas.innerHTML = '';
  score.innerHTML = count;
  days.innerHTML = daysRemaining;

  // make sure to not play loop several times
  loopPlay ? '' : game();   
  loopPlay = true;

  function game() {
    let randomTime = Math.round(Math.random() * getFaster);
    getFaster > 700 ? getFaster = (getFaster * 0.90) : '';
  
    setTimeout(() => {
      if (daysRemaining === 0){
        youWin();
      } else if (canvas.childElementCount < gameOverNumber){
        enzoPop();
        game();
      } else {
        gameOver();
      }
    }, randomTime);  
  };

  const gameOver = () => {
    endScreen.innerHTML = `<div class="gameOver">Pas de chance, tu vas devoir y aller, prévoit des Boules Quies.<br/>score : ${count} </div>`;
    endScreen.style.visibility = 'visible';
    endScreen.style.opacity = '1';
    loopPlay = false;
  };

  const youWin = () => {
    let accuracy = Math.round(count / daysLeft * 100);
    endScreen.innerHTML = `<div class="youWin">Bien jouer tu as réussi à t'en sortir, c'était pas gagné...<br/><span>Accuarcy: ${accuracy} %</span></div>`;
    endScreen.style.visibility = 'visible';
    endScreen.style.opacity = '1';
    loopPlay = false; 
  };
};

// create random element
function enzoPop() {
  let enzo = new Image();

  enzo.src = "./media/enzo.png"

  enzo.classList.add('enzo');
  enzo.classList.add('enzo-bis');
  enzo.style.top = Math.random() * 500 + 'px';
  enzo.style.left = Math.random() * 500 + 'px';

  let x, y;
  x = y = (Math.random() * 45) + 30;
  enzo.style.setProperty('--x', `${ x }px`);
  enzo.style.setProperty('--y', `${ y }px`);

  let plusMinus = Math.random() < 0.5 ? -1 : 1;
  let trX = Math.random() * 500 * plusMinus;
  let trY = Math.random() * 500 * plusMinus;
  enzo.style.setProperty('--trX', `${ trX }%`);
  enzo.style.setProperty('--trY', `${ trY }%`);

  canvas.appendChild(enzo);
};

// countdown on click
canvas.addEventListener('click', () => {
  if (daysRemaining > 0) {
    daysRemaining--;
    days.innerHTML = daysRemaining;
  }
});

// remove element clicked
document.addEventListener("click", function(e){
  let targetElement = e.target || e.srcElement;

  if (targetElement.classList.contains('enzo')) {
    targetElement.remove();
    count++;
    score.innerHTML = count;
  };
});

// hide and screen on click
endScreen.addEventListener('click', () => {
  start();
  setTimeout(() => {
    endScreen.style.visibility = 'hidden';
  }, 1000);
});