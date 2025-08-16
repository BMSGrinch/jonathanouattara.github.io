'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/asset/project_img/Details_screen.mvpfast.png": "3655d7e7e180386ce84660dbdf9bfe3e",
"assets/asset/project_img/Favoris_screen.mvpfast.png": "e4a2a1e7fc4f32a9145828bbcc5e2631",
"assets/asset/project_img/Main_page_appvitrine.png": "385e89413cfaf0d45d61b708d761f316",
"assets/asset/project_img/Main_screen.mvpfast.png": "8fd7c3e321b8b2cc94a335f91f62f4ee",
"assets/asset/project_img/Main_screen_animal_fav.png": "6747db187abf404dae497bed0f91bb80",
"assets/asset/project_img/Panier_screen.mvpfast.png": "7fdacd7dd56f64944d7f3ddb65c3311e",
"assets/asset/utils_img/Bms2.png": "250a57c663a1d09173af87d3c746638f",
"assets/asset/utils_img/Bms_grinch.png": "0690135a4a20a2d64fc328695b48870c",
"assets/asset/utils_img/dart-logo-png_seeklogo-273023.png": "f7a0bcf536d9ec9fa8b197d6739db858",
"assets/asset/utils_img/flutter-logo-png_seeklogo-354671.png": "0dfb837f2d64414fbb1b569f073459ed",
"assets/asset/utils_img/github-logo-png_seeklogo-273183.png": "31a63e837cb3765dbe78bf984a71dfdd",
"assets/asset/utils_img/gmail-new-2020-logo-png_seeklogo-389043.png": "35d905019e394d0f77d6cdf9929d453d",
"assets/asset/utils_img/laravel-logo-png_seeklogo-363134.png": "400410d1db929c983008f0b1751d347e",
"assets/asset/utils_img/Logo_dev%2520en1024.png": "da0f7ee202d3f62402192678ce72f1ca",
"assets/asset/utils_img/php-logo-png_seeklogo-265704.png": "5a1c564deaa4226dfdf9d454b37b7ee1",
"assets/asset/utils_img/sql-logo-png_seeklogo-505247.png": "c42c9f4b1e563efb971842b7b204ef30",
"assets/asset/utils_img/supabase-logo-png_seeklogo-435677.png": "bfd3c48998def989a95509485565f658",
"assets/AssetManifest.bin": "9a703cfb568c05e42a63fed526d98191",
"assets/AssetManifest.bin.json": "2821196027caec26d7c00008c9ba2f4d",
"assets/AssetManifest.json": "00b5066f89fc301ac862c49aa59df1b9",
"assets/FontManifest.json": "7df10702a8c60a62e6694f43081d46e7",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "489e7298c56a69656a1e2dfe0de2e675",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "b93248a553f9e8bc17f1065929d5934b",
"assets/packages/iconsax_flutter/fonts/FlutterIconsax.ttf": "76bd55cc08e511bb603cc53003b81051",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"cv-Ouattara-kindouli-Jonathan.pdf": "ae86afb380a6d58b9480022f3404a827",
"favicon.png": "d3ace21c6164414732422cf5ebe594e4",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"flutter_bootstrap.js": "03befab2032b712e84b6cf21873df699",
"icons/Icon-192.png": "1b81251e3c920926277a7ce8b6921b85",
"icons/Icon-512.png": "9535bfdd2f4b7c9d35e2c1f96f70497c",
"icons/Icon-maskable-192.png": "1b81251e3c920926277a7ce8b6921b85",
"icons/Icon-maskable-512.png": "9535bfdd2f4b7c9d35e2c1f96f70497c",
"index.html": "c9be1553e3e52ab12e1fee2d76ac6a08",
"/": "c9be1553e3e52ab12e1fee2d76ac6a08",
"main.dart.js": "56a0348340eceb48dbab88020106d82b",
"manifest.json": "93d585fde3a9e5d7393b62184bc47d05",
"version.json": "3fb385a06b77667ea2402fd1ba06f56d"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
