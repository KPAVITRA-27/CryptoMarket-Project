# 🚀 Crypto Market Dashboard

A responsive **Crypto Market Dashboard** built using **HTML, CSS, and JavaScript**.

The application fetches live cryptocurrency market data, provides real-time search functionality, and allows users to create a persistent watchlist.

Deployed using **Netlify**.

---

## 🌐 Live Demo

🔗 **Deployed Link:**  
https://beautiful-kataifi-79643d.netlify.app  

💻 **GitHub Repository:**  
https://github.com/KPAVITRA-27/CryptoMarket-Project  

---

## 🖥️ Screenshots

### 📊 Dashboard View

<img width="1030" height="880" alt="Screenshot 2026-03-01 232524" src="https://github.com/user-attachments/assets/cb17dec5-1502-453c-a08a-3fcbf0b0a6b1" />


---

### ⭐ Watchlist Section

<img width="1030" height="880" alt="Screenshot 2026-03-01 232524" src="https://github.com/user-attachments/assets/f8868b8e-d1f5-4ae5-b991-f6c4619d90be" />


---

### ⚠️ API Failure Handling

<img width="1408" height="842" alt="Screenshot 2026-03-01 232448" src="https://github.com/user-attachments/assets/c87594ac-deb2-4831-8037-99eab7e6e9e8" />


---

## 📌 Features

### ✅ Market Viewer

- Fetches live cryptocurrency data from **CoinGecko API**
- Displays:
  - Coin Name
  - Symbol
  - Current Price
  - 24h Price Change %
- 🟢 Green → Positive change
- 🔴 Red → Negative change
- Auto refresh every 2 minutes
- Graceful API failure handling

---

### ✅ Search Functionality

- Real-time filtering
- Search by:
  - Coin name
  - Coin symbol
- Instant UI updates

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
├── README.md
└── screenshots/
      dashboard.png
      watchlist.png
      api-warning.png
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
- CSS3
- JavaScript (Vanilla JS)
- CoinGecko Public API
- LocalStorage
- Netlify (Deployment)

---

## 🚀 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/KPAVITRA-27/CryptoMarket-Project.git
```

2. Navigate to the project folder:

```bash
cd CryptoMarket-Project
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

**K Pavitra**  
Frontend Developer  

---

## 📜 License

This project is built for educational purposes.
