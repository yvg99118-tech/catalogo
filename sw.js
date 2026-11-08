var C='despesas-v2',F=['./','index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(F)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C&&x!=='compartilhados'}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
/* Recebe comprovante compartilhado de outro app (Web Share Target) */
self.addEventListener('fetch',function(e){var r=e.request,u=new URL(r.url);
if(r.method==='POST'&&u.pathname.slice(-11)==='/compartilhar'){
e.respondWith((async function(){try{var f=await r.formData(),a=f.get('comprovante');
if(a){var c=await caches.open('compartilhados');await c.put(new URL('ultimo-comprovante',self.registration.scope).href,new Response(a))}}catch(x){}
return Response.redirect(new URL('./?compartilhado=1',self.registration.scope).href,303)})());return}});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(function(r){var c=r.clone();if(r.ok&&e.request.url.indexOf(self.location.origin)===0)caches.open(C).then(function(x){x.put(e.request,c)});return r}).catch(function(){return caches.match(e.request)}))});
