import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

export function ToyPreview({ toy, onRemoveToy }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <article className="toy-preview">
            <h4>{toy.name}</h4>
            <p><span>${toy.price.toLocaleString()}</span></p>
            <p className={toy.inStock ? 'available' : 'not-available'}>{toy.inStock ? 'Available' : 'Out of stock'}</p>
            {/* {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <hr /> */}
            <div>
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
                <Link to={`/toy/${toy._id}`}>Details</Link>
            </div>
            {
                loggedInUser &&
                <div>
                    <button className="btn btn-light btn-remove-toy" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                </div>
            }

        </article>
    )
}