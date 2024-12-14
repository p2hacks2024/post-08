addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // リクエストされたURLのパスを保持したままターゲットURLに転送
  const targetUrl = 'https://p2hacks2024-post-8.firebaseapp.com' + url.pathname + url.search;

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method === 'POST' ? request.body : null,  // POSTリクエストの場合のみボディを転送
  });

  const newHeaders = new Headers(response.headers);
  newHeaders.set('X-Proxy-By', 'Cloudflare Workers','Access-Control-Allow-Origin', '*'); // 必要に応じてカスタムヘッダーを追加

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
