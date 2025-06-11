import { Link } from "react-router-dom"


export function ToyPreview({ toy, onRemoveToy, loggedInUser }) {


    return (
        <article className="toy-preview">
            <div className="toy-img">
                <img src={toy.imgUrl} loading="lazy" />
            </div>
            <h4>{toy.name}</h4>
            <p><span>${toy.price.toLocaleString()}</span></p>
            <p className={toy.inStock ? 'available' : 'not-available'}>{toy.inStock ? 'Available' : 'Out of stock'}</p>
            {/* {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            <hr /> */}
            <div >
                {loggedInUser && loggedInUser.isAdmin &&
                    <><Link to={`/toy/edit/${toy._id}`} className="toy-preview-actions">Edit</Link> <span> &nbsp; | &nbsp;</span>
                    </>}
                <Link to={`/toy/${toy._id}`} className="toy-preview-actions">Details</Link>
            </div>
            {
                loggedInUser && loggedInUser.isAdmin &&
                <div>
                    <button className="btn btn-light btn-remove-toy" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                </div>
            }

        </article>
    )
}