const startBtn = document.getElementById('startBtn');
const minInput = document.getElementById('min');
const maxInput = document.getElementById('max');
const game = document.getElementById('game');
const guessText = document.getElementById('guessText');
const lowerBtn = document.getElementById('lowerBtn');
const correctBtn = document.getElementById('correctBtn');
const higherBtn = document.getElementById('higherBtn');
const restartBtn = document.getElementById('restartBtn');
const themeToggle = document.getElementById('themeToggle');

let low, high, guess;

// Initialize theme based on localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.classList.add(savedTheme);
themeToggle.textContent = savedTheme === 'light' ? 'Dark Mode' : 'Light Mode';

startBtn.onclick = () => {
  low = parseInt(minInput.value);
  high = parseInt(maxInput.value);

  if (isNaN(low) || isNaN(high) || low > high) {
    alert("Please enter a valid range (min ≤ max).");
    return;
  }

  startBtn.classList.add('hidden');
  minInput.classList.add('hidden');
  maxInput.classList.add('hidden');
  game.classList.remove('hidden');
  lowerBtn.classList.remove('hidden');
  higherBtn.classList.remove('hidden');
  correctBtn.classList.remove('hidden');
  restartBtn.classList.add('hidden');

  makeGuess();
};

function makeGuess() {
  if (low > high) {
    guessText.textContent = "Oops! Something went wrong. No numbers left to guess.";
    lowerBtn.classList.add('hidden');
    higherBtn.classList.add('hidden');
    correctBtn.classList.add('hidden');
    restartBtn.classList.remove('hidden');
    return;
  }

  guess = Math.floor((low + high) / 2);
  guessText.textContent = `Is your number ${guess}?`;
}

lowerBtn.onclick = () => {
  high = guess - 1;
  makeGuess();
};

higherBtn.onclick = () => {
  low = guess + 1;
  makeGuess();
};

correctBtn.onclick = () => {
  guessText.textContent = `Your number is ${guess}! 🎉`;
  lowerBtn.classList.add('hidden');
  higherBtn.classList.add('hidden');
  correctBtn.classList.add('hidden');
  restartBtn.classList.remove('hidden');
};

restartBtn.onclick = () => {
  startBtn.classList.remove('hidden');
  minInput.classList.remove('hidden');
  maxInput.classList.add('hidden');
  game.classList.add('hidden');
  lowerBtn.classList.add('hidden');
  higherBtn.classList.add('hidden');
  correctBtn.classList.add('hidden');
  restartBtn.classList.add('hidden');
  minInput.value = '';
  maxInput.value = '';
  guessText.textContent = '';
  low = null;
  high = null;
  guess = null;
};

themeToggle.onclick = () => {
  const isLight = document.body.classList.contains('light');
  document.body.classList.toggle('light', !isLight);
  document.body.classList.toggle('dark', isLight);
  const newTheme = isLight ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'light' ? 'Dark Mode' : 'Light Mode';
};