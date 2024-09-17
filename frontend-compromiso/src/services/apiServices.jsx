import {
    WOLFRAM_ALPHA_API_KEY,
    NEWS_API_KEY,
    WIKIPEDIA_URL,
    WEATHER_API_KEY,
    CURRENCY_API_KEY
  } from '../config/config.jsx';
  
  // Consultar noticias
  export const queryNews = async () => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`);
    const data = await response.json();
    const articles = data.articles.slice(0, 3);
    return articles.map(article => `${article.title} - ${article.description}`).join('\n') + '\nEsta información fue basada en https://newsapi.org.';
  };
  
  // Buscar en Wikipedia
  export const searchWikipedia = async (message) => {
    const query = message.replace(/wiki|wikipedia/i, '').trim();
    const response = await fetch(`${WIKIPEDIA_URL}?action=query&format=json&prop=extracts&titles=${query}&utf8=1&formatversion=2&exintro=1&explaintext=1`);
    const data = await response.json();
    const page = data.query.pages[0];
    if (page.extract) {
      return page.extract + '\nEsta información fue basada en https://es.wikipedia.org.';
    } else {
      return 'No encontré información sobre eso en Wikipedia. Esta información fue basada en https://es.wikipedia.org.';
    }
  };
  
  // Consultar Wolfram Alpha
  export const queryWolframAlpha = async (message) => {
    const query = message.replace(/wolfram/i, '').trim();
    const response = await fetch(`https://api.wolframalpha.com/v2/query?input=${encodeURIComponent(query)}&format=plaintext&output=json&apikey=${WOLFRAM_ALPHA_API_KEY}`);
    const data = await response.json();
    const pods = data.queryresult.pods;
    if (pods && pods.length > 0) {
      return pods.map(pod => pod.title + ': ' + (pod.subpods[0].plaintext || '')).join('\n') + '\nEsta información fue basada en https://wolframalpha.com.';
    } else {
      return 'No encontré información en Wolfram Alpha sobre eso. Esta información fue basada en https://wolframalpha.com.';
    }
  };
  
  // Consultar clima
  export const queryWeather = async (message) => {
    const query = message.replace(/clima|weather/i, '').trim();
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (data.current) {
      return `El clima en ${data.location.name} es ${data.current.condition.text} con una temperatura de ${data.current.temp_c}°C.\nEsta información fue basada en https://weatherapi.com.`;
    } else {
      return 'No encontré información sobre el clima. Esta información fue basada en https://weatherapi.com.';
    }
  };
  
  // Consultar conversión de divisas
  export const queryCurrency = async (message) => {
    const query = message.replace(/moneda|currency/i, '').trim();
    const [from, to] = query.split(' a ');
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
    const data = await response.json();
    const rate = data.rates[to];
    if (rate) {
      return `1 ${from} es equivalente a ${rate} ${to}.\nEsta información fue basada en https://exchangerate-api.com.`;
    } else {
      return 'No encontré información sobre la conversión de divisas. Esta información fue basada en https://exchangerate-api.com.';
    }
  };
  