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
git push -u origin main
```

**Deploy on GitHub Pages (simple)**
Option A — Serve from `main` branch root (recommended for simple static sites):
1. Push your project to GitHub (see commands above).
2. In the repository on GitHub, go to `Settings` → `Pages` → `Build and deployment`.
3. Under `Source`, select `Deploy from a branch`, choose `main` and folder `/ (root)` and save.
4. After a minute, your site will be available at `https://<your-username>.github.io/<repo-name>/`.

Option B — Use `gh-pages` branch:
```powershell
# create gh-pages branch and push
git checkout -b gh-pages
git push origin gh-pages
# then configure GitHub Pages to publish from 'gh-pages' branch
```

Option C — Use GitHub Actions for CI/CD (recommended if you want a build step or to inject secrets):
- Create an action that runs on push and deploys to GitHub Pages. You can store private values in repository Secrets and use them in workflows.

**Expose API key safely**
- Client-side: Replace `API_KEY` in `script.js` — easy but publicly visible.
- Safer: create a small serverless function (Netlify Functions, Vercel Serverless, or GitHub Actions workflow with secrets) to proxy requests so the key stays secret.

**Testing / Debugging**
- Open DevTools (F12) to see `console.log` output from `script.js` and network requests.
- If location permission is denied, type a city name and press Enter or click Search.

**How it works (short)**
1. `script.js` on load requests geolocation; if available, it fetches weather for coords.
2. If geolocation fails, it fetches a default city (London).
3. When you search, it fetches by city name.
4. The response is parsed and the DOM updated: `city`, `temp`, `humidity`, `wind`, and the `images/*.svg` icon.

**Next steps / improvements**
- Move API calls server-side to protect the key.
- Add unit toggle (Celsius/Fahrenheit).
- Add caching/localStorage to reduce API calls.

---
If you want, I can:
- Create a GitHub Actions workflow file for automatic deployment to Pages.
- Add instructions and a script to keep the API key out of the client using a serverless proxy.
- Add a `package.json` and an npm `deploy` script that uses `gh-pages`.

