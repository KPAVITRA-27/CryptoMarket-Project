const marketContainer = document.getElementById("market-container");
const watchlistContainer = document.getElementById("watchlist-container");
const searchInput = document.getElementById("search");

let allCoins = [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

/* =========================
   FETCH CRYPTO DATA
========================= */

async function fetchCrypto() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false"
    );

    if (!response.ok) throw new Error("API failed");

    const data = await response.json();
    allCoins = data;

    renderMarket();
    renderWatchlist();
  } catch (error) {
    console.error("API Error:", error);
  }
}

/* =========================
   RENDER MARKET
========================= */

function renderMarket() {
  marketContainer.innerHTML = "";

  allCoins.slice(0, 8).forEach((coin) => {
    marketContainer.appendChild(createCoinCard(coin));
  });
}

/* =========================
   RENDER WATCHLIST
========================= */

function renderWatchlist() {
  watchlistContainer.innerHTML = "";

  [...new Set(watchlist)].slice(0, 3).forEach((id) => {
    const coin = allCoins.find((c) => c.id === id);
    if (coin) {
      watchlistContainer.appendChild(createCoinCard(coin));
    }
  });

  const addCard = document.createElement("div");
  addCard.classList.add("add-watchlist-card");
  addCard.innerHTML = `
    <div class="plus-circle">+</div>
    <p>Add asset to watchlist</p>
  `;
  watchlistContainer.appendChild(addCard);
}

/* =========================
   CREATE CARD
========================= */

function createCoinCard(coin) {
  const card = document.createElement("div");
  card.className = "card";

  const isPositive = coin.price_change_percentage_24h >= 0;

  const upTrend = `
    <path 
      d="M2 14 L6 10 L10 12 L14 6 L18 8 L22 4 L20 4 L22 4 L22 6"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  `;

  const downTrend = `
    <path 
      d="M2 4 L6 8 L10 6 L14 12 L18 10 L22 14 L20 14 L22 14 L22 12"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  `;

  card.innerHTML = `
    <div class="card-header">
        <div class="header-left">
            <div class="icon-circle">
                <img src="${coin.image}" alt="${coin.name}" />
            </div>
            <div class="coin-details">
                <div class="coin-name">${coin.name}</div>
                <div class="coin-symbol">${coin.symbol.toUpperCase()}</div>
            </div>
        </div>
        <div class="star">★</div>
    </div>

    <div class="card-body">
        <div class="price">
            $${coin.current_price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
        </div>

        <div class="change ${isPositive ? "positive" : "negative"}">
            <svg class="trend-icon" viewBox="0 0 24 18">
                ${isPositive ? upTrend : downTrend}
            </svg>
            ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </div>
    </div>
  `;

  return card;
}

/* =========================
   SEARCH FUNCTION
========================= */

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = allCoins.filter((coin) =>
    coin.name.toLowerCase().includes(value)
  );

  marketContainer.innerHTML = "";
  filtered.slice(0, 8).forEach((coin) => {
    marketContainer.appendChild(createCoinCard(coin));
  });
});

/* =========================
   INITIAL LOAD
========================= */

fetchCrypto();
setInterval(fetchCrypto, 30000);