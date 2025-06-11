import { ToyPreview } from './ToyPreview.jsx'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export function ToyList({ toys, onRemoveToy }) {

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [visibleCount, setVisibleCount] = useState(10)

    if (toys.length === 0) return <div className="no-toys-msg">No toys were found...</div>

    return (
        <section className="products">
            <h3>Our Magics</h3>
            <ul className="toy-list">
                {toys.slice(0, visibleCount).map(toy =>
                    <li key={toy._id} className="toy-preview" >
                        <ToyPreview toy={toy} onRemoveToy={onRemoveToy} loggedInUser={loggedInUser} />
                    </li>)}
            </ul>

            {visibleCount < toys.length && (
                <button className="btn btn-light btn-load-more" onClick={() => setVisibleCount(prev => prev + 10)}>Load More</button>
            )}
        </section>
    )
}