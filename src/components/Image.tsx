import { useEffect } from "react";
import { UrlObject } from "url";

type ImageProps = {
  source: string;
};
let res: undefined | string;
const handleMessage = (event: MessageEvent) => {
  console.log("received message from service worker");
  console.log(event.data, " received on main thread");
  res = URL.createObjectURL(event.data);
};

export default function Image(props: ImageProps) {
  navigator.serviceWorker.controller?.postMessage(props.source);
  useEffect(() => {
    navigator.serviceWorker.addEventListener("message", handleMessage);
  }, []);
  return (
    <div>
      <img src={res} />
    </div>
  );
}
