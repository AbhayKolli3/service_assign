import { URLArr } from "./images";
import registerServiceWorker from "./serviceWorkerRegistration";

export default function createDB() {
  console.log("creating db");
  const request = indexedDB.open("imgStore", 1);
  let msg = null;
  request.onupgradeneeded = async (event) => {
    const db = event.target.result;

    const objStore = db.createObjectStore("urls", { autoIncrement: true });

    objStore.transaction.oncomplete = async (event) => {
      const store = await db
        .transaction("urls", "readwrite")
        .objectStore("urls");
      URLArr.forEach((url) => {
        const request = store.add(url);
        request.onsuccess = () => console.log(`added ${url} to store`);
      });
    };
  };
  request.onsuccess = async (event) => {
    console.log("db  already present created");
    navigator.serviceWorker.controller.postMessage(URLArr);
  };
}
