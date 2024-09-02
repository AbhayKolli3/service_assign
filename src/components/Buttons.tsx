type ButtonsProps = {
    changeIdx: (i:string)=>void
}
export default function Buttons(props:ButtonsProps) {

    return (
        <div>
            <button onClick={()=>props.changeIdx("-")}>Prev</button>
            <button onClick={()=>props.changeIdx("+")}>Next</button>

        </div>
    )

    
}