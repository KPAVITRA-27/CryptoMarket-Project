document.addEventListener("DOMContentLoaded", function () {

  const marketContainer = document.getElementById("market-container");
  const watchlistContainer = document.getElementById("watchlist-container");
  const searchInput = document.getElementById("search");
  const apiWarning = document.getElementById("apiWarning");

  let allCoins = JSON.parse(localStorage.getItem("cachedCoins")) || [];
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  let selectionMode = false;

  /* =========================
     INITIAL RENDER FROM CACHE
  ========================= */

  renderMarket();
  renderWatchlist();

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

      if (Array.isArray(data) && data.length > 0) {
        allCoins = data;
        localStorage.setItem("cachedCoins", JSON.stringify(allCoins));
        renderMarket();
        renderWatchlist();
      }

      apiWarning?.classList.remove("active");

    } catch (error) {
      console.error("API Error:", error);

      const cached = JSON.parse(localStorage.getItem("cachedCoins")) || [];
      if (cached.length > 0) {
        allCoins = cached;
        renderMarket();
        renderWatchlist();
      }

      apiWarning?.classList.add("active");
    }
  }

  /* =========================
     RENDER MARKET
  ========================= */

  function renderMarket(coins = allCoins.slice(0, 8)) {
    marketContainer.innerHTML = "";

    if (!coins || coins.length === 0) {
      marketContainer.innerHTML =
        `<div class="error-message">No market data available.</div>`;
      return;
    }

    coins.forEach((coin) => {
      marketContainer.appendChild(createCoinCard(coin));
    });
  }

  /* =========================
     RENDER WATCHLIST
  ========================= */

  function renderWatchlist() {
    watchlistContainer.innerHTML = "";

    watchlist = [...new Set(watchlist)];
    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    const availableCoins = allCoins.length > 0
      ? allCoins
      : JSON.parse(localStorage.getItem("cachedCoins")) || [];

    if (watchlist.length > 0) {
      watchlist.forEach((id) => {
        const coin = availableCoins.find((c) => c.id === id);
        if (coin) {
          watchlistContainer.appendChild(createCoinCard(coin));
        }
      });
    }

    // Always show Add Card
    const addCard = document.createElement("div");
    addCard.className = "add-watchlist-card";
    addCard.innerHTML = `
      <div class="plus-circle">+</div>
      <p>Add asset to watchlist</p>
    `;
    watchlistContainer.appendChild(addCard);
  }

  /* =========================
     EVENT DELEGATION (CRITICAL FIX)
  ========================= */

  // Click on "Add asset to watchlist"
  watchlistContainer.addEventListener("click", function (e) {
    const addCard = e.target.closest(".add-watchlist-card");
    if (!addCard) return;

    selectionMode = true;
    marketContainer.classList.add("select-mode");
  });

  // Click on market card
  marketContainer.addEventListener("click", function (e) {
    if (!selectionMode) return;

    const card = e.target.closest(".card");
    if (!card) return;

    const coinId = card.dataset.id;

    if (!watchlist.includes(coinId)) {
      watchlist.push(coinId);
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }

    selectionMode = false;
    marketContainer.classList.remove("select-mode");

    renderWatchlist();
  });

  /* =========================
     CREATE CARD
  ========================= */

  function createCoinCard(coin) {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = coin.id; // VERY IMPORTANT

    const isPositive = coin.price_change_percentage_24h >= 0;

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
          ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </div>
      </div>
    `;

    return card;
  }

  /* =========================
     SEARCH
  ========================= */

  searchInput.addEventListener("input", function (e) {
    const value = e.target.value.toLowerCase().trim();

    if (!value) {
      renderMarket();
      return;
    }

    const filtered = allCoins.filter((coin) =>
      coin.name.toLowerCase().includes(value) ||
      coin.symbol.toLowerCase().includes(value)
    );

    renderMarket(filtered.slice(0, 8));
  });

  /* =========================
     CLOSE WARNING
  ========================= */

  window.closeWarning = function () {
    apiWarning?.classList.remove("active");
  };

  /* =========================
     INIT FETCH
  ========================= */

  fetchCrypto();
  setInterval(fetchCrypto, 120000);

});
