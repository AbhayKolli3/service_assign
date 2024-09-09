type eventType = Event & {
  detail: string | number | [number, string];
};
export default function addEventListeners(arr: string[]) {
  addListener(arr);
  subtractListener(arr);
  changeListener(arr);
}

function addListener(arr: string[]) {
  window.addEventListener("add", (event: eventType) => {
    if (typeof event.detail == "string") {
      arr = [...arr, event.detail];
    }
    navigator.serviceWorker.controller?.postMessage(arr);
  });
}

function subtractListener(arr: string[]) {
  window.addEventListener("subtract", (event: eventType) => {
    arr = arr.filter((item: string, index: number) => index !== event.detail);
    navigator.serviceWorker.controller?.postMessage(arr);
  });
}

function changeListener(arr: string[]) {
  window.addEventListener("change", (event: eventType) => {
    if (Array.isArray(event.detail)) {
      arr[event.detail[0]] = event.detail[1];
    }

    navigator.serviceWorker.controller?.postMessage(arr);
  });
}
