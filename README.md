# Weather App

A small static weather app that fetches current weather from OpenWeatherMap and displays it with simple SVG icons. Designed to be responsive for desktop, tablet and mobile.

**Files**
- `index.html` — main markup
- `style.css` — styles including responsive media queries
- `script.js` — fetches weather (OpenWeatherMap) and updates UI
- `images/` — SVG icons used for weather states

**Overview**
- The app fetches current weather using OpenWeatherMap's "Current Weather" API and displays temperature, humidity, wind, and an icon.
- By default the app tries geolocation; fallback is a default city (London).

**Prerequisites**
- Modern browser
- Internet access
- (Optional) A local static server for testing (recommended) — Python or Node

**Configure API Key**
1. Open `script.js` and find the `API_KEY` constant.
2. Replace the value with your OpenWeatherMap API key.

Note: This is a client-side key and will be visible to users. For private use, consider a server-side proxy or serverless function.

**Run locally (simple)**
- You can open `index.html` directly in a browser, but some browsers restrict fetch calls via `file://`. Recommended to run a local static server.

PowerShell (Python 3):
```powershell
# from project directory
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Node (http-server):
```powershell
npm install -g http-server
http-server -c-1
# open the printed local URL
```

**Git / GitHub — quick commands**
- Initialize repo and push to GitHub (PowerShell):
```powershell
cd path\to\Whether_App
git init
git add .
git commit -m "Initial commit"
# create repository on GitHub (via web) and then:
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
# Weather App

A small static weather app that fetches current weather from OpenWeatherMap and displays it with simple SVG icons. Designed to be responsive for desktop, tablet and mobile.

**Files**
- `index.html` — main markup
- `style.css` — styles including responsive media queries
- `script.js` — fetches weather (via Netlify proxy function) and updates UI
- `images/` — SVG icons used for weather states

**Overview**
- The app fetches current weather using OpenWeatherMap's "Current Weather" API and displays temperature, humidity, wind, and an icon.
- By default the app tries geolocation; fallback is a default city (London).

**Prerequisites**
- Modern browser
- Internet access
- (Optional) A local static server for testing (recommended) — Python or Node

**Netlify: functions & API key (recommended)**
- This repo includes a Netlify serverless function at `netlify/functions/getWeather.js` and a `netlify.toml` that rewrites `/api/*` to functions.
- Instead of embedding your OpenWeatherMap key in `script.js`, set an environment variable in Netlify named `OWM_API_KEY` and the function will use it.

How the client calls the function:
- Client requests `/api/getWeather?q=London` or `/api/getWeather?lat=..&lon=..` and the function proxies to OpenWeatherMap.

**Configure API Key (Netlify)**
1. Push this repo to GitHub and connect it to Netlify (or deploy via Netlify CLI).
2. On Netlify site dashboard → Site settings → Build & deploy → Environment, add `OWM_API_KEY` = your OpenWeatherMap key.

Note: If you prefer not to use Netlify, you can still run the app with a client-side key (see "Run locally" below), but that exposes the key to users.

**Run locally (simple)**
- You can open `index.html` directly in a browser, but some browsers restrict fetch calls via `file://`. Recommended to run a local static server.

PowerShell (Python 3):
```powershell
# from project directory
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Node (http-server):
```powershell
npm install -g http-server
http-server -c-1
# open the printed local URL
```

Local testing of Netlify functions:
- Install Netlify CLI and run `netlify dev` to serve functions locally and apply `/api/*` redirects:
```powershell
npm install -g netlify-cli
netlify dev
```

**Deploy to Netlify (connect GitHub)**
1. Go to https://app.netlify.com → Sites → "New site from Git".
2. Choose GitHub and select repository `GOLLAVAMSI/weatherApp`.
3. Branch: `main`, Build command: (leave blank), Publish directory: `/`.
4. After site creation, add environment variable `OWM_API_KEY` in Site settings → Build & deploy → Environment.

**Alternative hosting**
- GitHub Pages, Vercel, Cloudflare Pages, and Surge can also host static sites. For serverless proxies, prefer Netlify, Vercel, or Cloudflare Functions.

**Testing / Debugging**
- Open DevTools (F12) to see `console.log` output from `script.js` and network requests.
- If location permission is denied, type a city name and press Enter or click Search.

**How it works (short)**
1. `script.js` on load requests geolocation; if available, it fetches weather using the Netlify function for coords.
2. If geolocation fails, it fetches a default city (London).
3. When you search, it fetches by city name.
4. The response is parsed and the DOM updated: `city`, `temp`, `humidity`, `wind`, and the `images/*.svg` icon.

**Next steps / improvements**
- Add unit toggle (Celsius/Fahrenheit).
- Add caching/localStorage to reduce API calls.
- Add automated deploy (Netlify already supports CI on push).

---
If you want, I can:
- Create a GitHub Actions workflow file for automatic deployment to Pages.
- Add extra Netlify Functions (caching, forecast endpoint) or update the client to handle more conditions.
- Add a `package.json` and an npm `deploy` script that uses `gh-pages`.

