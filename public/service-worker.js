/* eslint-disable no-restricted-globals */

const CACHE_NAME = "V4";
let URLArr = null;

class Cache {
  constructor() {
    this.name = CACHE_NAME;
  }
  buildCurrWindow(curr) {
    let temp = [];
    for (let i = curr - 5; i <= curr + 5; i++) {
      if (i < 0) {
        temp.push(URLArr.length + i);
      } else if (i >= URLArr.length) {
        temp.push(i % URLArr.length);
      } else {
        temp.push(i);
      }
    }

    return temp;
  }
  async getImage(request) {
    const curr = URLArr.indexOf(request);
    const currWindow = this.buildCurrWindow(curr);
    console.log("current window", currWindow);

    for (const val of currWindow) {
      let res = await this.checkCache(URLArr[val]);
      if (!res) {
        console.log("adding ", val);
        await this.toCache(URLArr[val]);
      }
    }
    await this.deleteFromCache(currWindow);
    const finalRes = await this.checkCache(request);
    return finalRes;
  }

  async deleteFromCache(currWindow) {
    const cache = await caches.open(this.name);
    const keys = await cache.keys();
    for (const key of keys) {
      let tempIdx = URLArr.indexOf(key.url);

      if (!currWindow.includes(tempIdx)) {
        console.log(`deleting ${tempIdx}`);
        await cache.delete(key);
      } else {
      }
    }
  }

  async toCache(request) {
    const cache = await caches.open(this.name);
    const response = await fetch(request);
    await cache.put(request, response);
  }
  async checkCache(request) {
    const cache = await caches.open(this.name);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      console.log("found in cache");
      return cachedResponse;
    } else {
      return false;
    }
  }
}

const ourCache = new Cache();
self.addEventListener("install", (event) => {
  console.log("installed service worker");
});

self.addEventListener("fetch", async (event) => {
  console.log("catching ", event.request.url);
  if (URLArr != null) {
    if (URLArr.includes(event.request.url)) {
      event.respondWith(ourCache.getImage(event.request.url));
    } else {
      console.log("not an img");
    }
  } else {
    console.log("data base not ready yet");
  }
});
self.addEventListener("activate", (event) => {
  console.log("activated service worker");
});

self.addEventListener("message", (event) => {
  URLArr = event.data;
  console.log("data base ready");
});
