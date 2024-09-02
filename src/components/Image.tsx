import { useEffect } from "react"

type ImageProps={
    source:string
}



export default function Image(props:ImageProps) {

    return (
        <div>
            <img src={props.source}  />
        </div>
    )
}