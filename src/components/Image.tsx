import { useEffect } from "react";
import { UrlObject } from "url";

type ImageProps = {
  source: string;
};

export default function Image(props: ImageProps) {
  let res = props.source;

  useEffect(() => {
    navigator.serviceWorker.controller?.postMessage(props.source);
    const handleMessage = (event: MessageEvent) => {
      res = URL.createObjectURL(event.data);
    };
    globalThis.addEventListener("message", handleMessage);
  }, [props.source]);

  return (
    <div>
      <img src={res} alt={props.source} />
    </div>
  );
}
