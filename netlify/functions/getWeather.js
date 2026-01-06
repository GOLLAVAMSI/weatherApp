// Netlify Function to proxy OpenWeatherMap requests and keep API key server-side
// URL examples:
// /api/getWeather?q=London
// /api/getWeather?lat=12.34&lon=56.78

exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const { q, lat, lon } = params;
    if (!q && (!lat || !lon)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Provide `q` or both `lat` and `lon` query parameters.' })
      };
    }

    const base = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
    const target = q
      ? `${base}&q=${encodeURIComponent(q)}`
      : `${base}&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;

    const apiKey = process.env.OWM_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ message: 'API key not configured on server.' }) };
    }

    const res = await fetch(`${target}&appid=${apiKey}`);
    const data = await res.json();

    return {
      statusCode: res.ok ? 200 : 502,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ message: err.message }) };
  }
};
