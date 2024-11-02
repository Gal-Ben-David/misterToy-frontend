import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service-local"
import { Link, useParams } from "react-router-dom"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/')
            })
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <table className="toy-details-table">
                <tbody>
                    <tr>
                        <td>Toy name</td>
                        <td>{toy.name}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>${toy.price}</td>
                    </tr>
                    <tr>
                        <td>Inventory</td>
                        <td>{toy.inStock ? 'Available' : 'Out of stock'}</td>
                    </tr>
                    <tr>
                        <td>Categories</td>
                        <td >
                            <ul className="toy-labels-details">
                                {toy.labels.map((label, i) =>
                                    <li key={i} className="toy-label">
                                        {label}
                                    </li>
                                )}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div>
                <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
                <Link className="btn" to={`/`}>Back</Link>
            </div>

            {/* <h1>Toy name: {toy.name}</h1>
            <h4>Price: ${toy.price}</h4>
            <div>
                <img src={toy.imgUrl} />
            </div>
            <p className={toy.inStock ? 'available' : 'not-available'}>{toy.inStock ? 'Available' : 'Out of stock'}</p>
            <h4>Categories:</h4>
            <ul>
                {toy.labels.map((label, i) =>
                    <li key={i} className="toy-label">
                        {label}
                    </li>
                )}
            </ul> */}

            {/* <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p> */}
        </section>
    )

}