# 🚀 Crypto Market Overview 

A responsive **Crypto Market Dashboard** built using ** HTML, CSS and JavaScript**.  
The application displays live cryptocurrency market data, supports search functionality, and allows users to create a persistent watchlist.

Deployed using **Netlify**.

---

## 🌐 Live Demo

- 🔗 **Deployed Link:**()
- 💻 **GitHub Repository:** ()

---

## 📌 Features

### ✅ Market Viewer
- Fetches live cryptocurrency data from CoinGecko API
- Displays:
  - Coin Name
  - Symbol
  - Current Price
  - 24h Price Change %
- Color-coded price change:
  - 🟢 Green → Positive change
  - 🔴 Red → Negative change
- Auto-refresh every 2 minutes
- Graceful API failure handling

---

### ✅ Search Functionality
- Real-time filtering
- Search by:
  - Coin name
  - Coin symbol

---

### ✅ Watchlist Feature
- Add assets via selection mode
- Watchlist displayed separately
- Prevents duplicate entries
- Stored in `localStorage`
- Automatically loads on page refresh

---

### ✅ Production-Ready Enhancements

To ensure stability after deployment:

- API fallback using cached data
- Latest successful API response stored in `localStorage`
- Watchlist remains visible even if API fails
- Warning card displayed when API connection fails
- Reduced refresh interval to avoid rate limiting

---

## 🏗️ Project Structure

```
crypto-dashboard/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🧠 Architecture Overview

### Data Flow

```
CoinGecko API
        ↓
fetchCrypto()
        ↓
Cache data in localStorage
        ↓
Render Market + Watchlist
```

If API fails:

```
localStorage (cachedCoins)
        ↓
Render UI without breaking
```

---

## ⚙️ Tech Stack

- HTML5
- CSS3 (No UI libraries)
- JavaScript 
- CoinGecko Public API
- LocalStorage
- Netlify (Deployment)

---

## 🚀 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/your-username/crypto-dashboard.git
```

2. Navigate to the project folder:

```bash
cd crypto-dashboard
```

3. Open `index.html` in your browser.

No build tools required.

---

## 🔄 Auto Refresh Strategy

```javascript
setInterval(fetchCrypto, 120000);
```

- Reduced refresh frequency to prevent API rate limiting
- Ensures updated market data
- Maintains stable production behavior

---

## 🛡️ Error Handling

| Scenario | Behavior |
|----------|----------|
| API Success | Fresh data rendered |
| API Failure | Cached data rendered |
| No Cached Data | Error message displayed |
| Network Offline | Watchlist still visible |

---

## 📈 Performance Considerations

- Renders only top 8 coins for performance
- Deduplicates watchlist using `Set`
- Caches latest successful API response
- Avoids unnecessary DOM updates
- Handles deployment environment differences

---

## 🌍 Deployment

Deployed using **Netlify**.

Production considerations included:
- API fallback strategy
- Local storage persistence
- Reduced API request frequency
- Stable rendering in case of network failure

---

## 👩‍💻 Author

** K Pavitra**  
Frontend Developer  

---

## 📜 License

This project is built for educational purposes.
