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
            <h1>Toy name: {toy.name}</h1>
            <h4>Price: ${toy.price}</h4>
            <p>🧸</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <h4>In Stock: {toy.inStock ? 'Available' : 'Not in stock'}</h4>
            <h4>Categories:</h4>
            <ul>
                {toy.labels.map((label, i) =>
                    <li key={i} className="toy-label">
                        {label}
                    </li>
                )}
            </ul>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/`}>Back</Link>
            {/* <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p> */}
        </section>
    )

}