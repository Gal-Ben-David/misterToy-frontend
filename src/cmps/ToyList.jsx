import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom"

export function ToyList({ toys, onRemoveToy }) {
    // console.log('toys:', toys)
    if (!toys) return <div>Loading...</div>

    return (
        <section className="products">
            <h3>Our Magics</h3>
            <ul className="toy-list">
                {toys.map(toy =>
                    <li key={toy._id} className="toy-preview" >
                        <div className="toy-img">
                            <img src={toy.imgUrl} />
                        </div>
                        <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
                    </li>)}
            </ul>
        </section>
    )
}