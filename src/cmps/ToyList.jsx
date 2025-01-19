import { ToyPreview } from "./ToyPreview.jsx"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

export function ToyList({ toys, onRemoveToy }) {

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <section className="products">
            <h3>Our Magics</h3>
            <ul className="toy-list">
                {toys.map(toy =>
                    <li key={toy._id} className="toy-preview" >
                        <div className="toy-img">
                            <img src={toy.imgUrl} />
                        </div>
                        <ToyPreview toy={toy} onRemoveToy={onRemoveToy} loggedInUser={loggedInUser} />
                    </li>)}
            </ul>
        </section>
    )
}