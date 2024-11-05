import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service"
import { Form, Link, useParams } from "react-router-dom"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyDetails() {
    const [msg, setMsg] = useState('')
    const [isAddedMsg, setIsAddedMsg] = useState(false)
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

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        setMsg(value)
    }

    async function onSaveMsg(ev) {
        ev.preventDefault
        console.log(msg)
        const savedMsg = await toyService.addMsg(toy._id, msg)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: [...(prevToy.msgs || []), savedMsg],
        }))
        setMsg('')
    }

    async function onRemoveMsg(msgId) {
        await toyService.removeMsg(toy._id, msgId)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: prevToy.msgs.filter((msg) => msgId !== msg.id),
        }))
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

            <hr />

            <form onSubmit={onSaveMsg}>
                <h4>Messages</h4>
                <button type="button" className="btn btn-light" onClick={() => setIsAddedMsg(true)}>Add message</button>
                {isAddedMsg &&
                    <>
                        <input
                            type="text"
                            name="msgs"
                            value={msg}
                            placeholder="Type here..."
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <button disabled={!msg} className="btn btn-save-msg">Save</button>
                        <button type="button" className="btn" onClick={() => setIsAddedMsg(false)}>Cancel</button>
                    </>
                }
            </form>

            <ul className="toy-msgs-details">
                {toy.msgs && toy.msgs.map(msg =>
                    <li key={msg.id} className="toy-msg">
                        <span>{msg.txt}</span><span>author:{msg.by?.fullname || ''}</span><button onClick={() => onRemoveMsg(msg.id)} className="btn"><i className="fa-solid fa-xmark"></i></button>
                    </li>
                )}
            </ul>

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