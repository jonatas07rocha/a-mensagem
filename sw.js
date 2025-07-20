// Define o nome do cache
const CACHE_NAME = 'visualizador-web-cache-v1';
// Lista de arquivos para fazer cache (a 'casca' do aplicativo)
const urlsToCache = [
  'index.html'
];

// Evento de Instalação: é acionado quando o service worker é registrado pela primeira vez.
self.addEventListener('install', event => {
  // Espera até que o cache seja aberto e os arquivos sejam adicionados a ele.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de Fetch: é acionado para cada requisição que a página faz (ex: para imagens, scripts, etc.).
self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta encontrar a resposta para a requisição no cache.
    caches.match(event.request)
      .then(response => {
        // Se a resposta for encontrada no cache, a retorna.
        if (response) {
          return response;
        }
        // Se não for encontrada no cache, faz a requisição à rede.
        return fetch(event.request);
      }
    )
  );
});