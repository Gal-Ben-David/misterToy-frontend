import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom"

export function ToyList({ toys, onRemoveToy }) {
    // console.log('toys:', toys)
    if (!toys) return <div>Loading...</div>

    return (
        <section>
            <h3>Our Magics</h3>
            <ul className="toy-list">
                {toys.map(toy =>
                    <li key={toy._id} className="toy-preview" >
                        <div className="toy-img">
                            <img src={toy.imgUrl} />
                        </div>
                        <ToyPreview toy={toy} />

                        <div>
                            <button className="btn btn-remove-toy" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                            {/* <button onClick={() => onEditToy(toy)}>Edit</button> */}
                        </div>
                    </li>)}
            </ul>
        </section>
    )
}