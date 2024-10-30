import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom"

export function ToyList({ toys, onRemoveToy }) {
    // console.log('toys:', toys)
    if (!toys) return <div>Loading...</div>

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id} className="toy-preview" >
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                    </div>
                </li>)}
        </ul>
    )
}