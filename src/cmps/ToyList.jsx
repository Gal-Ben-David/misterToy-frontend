import { ToyPreview } from './ToyPreview.jsx'
import { useSelector } from 'react-redux'

export function ToyList({ toys, onRemoveToy }) {

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    if (toys.length === 0) return <div className="no-toys-msg">No toys were found...</div>

    return (
        <section className="products">
            <h3>Our Magics</h3>
            <ul className="toy-list">
                {toys.map(toy =>
                    <li key={toy._id} className="toy-preview" >
                        <ToyPreview toy={toy} onRemoveToy={onRemoveToy} loggedInUser={loggedInUser} />
                    </li>)}
            </ul>
        </section>
    )
}