import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'
import { Form, Link, useParams } from 'react-router-dom'
import { saveToy } from "../store/actions/toy.actions.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ChatRoom } from '../cmps/ChatRoom.jsx'
import { Message } from '../cmps/Message.jsx'
import { Review } from '../cmps/Review.jsx'

export function ToyDetails() {
    const [msg, setMsg] = useState('')
    const [reviews, setReviews] = useState([])
    const [review, setReview] = useState('')
    const [isChat, setIsChat] = useState(false)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const curToy = await toyService.getById(toyId)
            setToy(curToy)
            const fetchedReviews = await toyService.getReviews({ aboutToyId: toyId })
            setReviews(fetchedReviews || [])
            console.log(fetchedReviews)
        } catch (err) {
            console.log('Had issues in toy details', err)
            // navigate('/')
        }
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        try {
            console.log('review', review)
            const savedReview = await toyService.addReview({ txt: review, aboutToyId: toy._id })
            setReviews(prevReviews => [...prevReviews, savedReview])
            setReview('')
            showSuccessMsg('Review saved!')
        } catch (err) {
            console.log('error saving the review :', err)
        }
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

    async function onRemoveReview(reviewId) {
        try {
            await toyService.removeReview(reviewId)
            setReviews(prev => prev.filter(review => review._id !== reviewId))
            showSuccessMsg('Review removed!')
        } catch (err) {
            console.log('problem with removing review', err)
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <>
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

                <Message onSaveMsg={onSaveMsg} msg={msg} setMsg={setMsg} />
                <ul className="toy-msgs-details">
                    {toy.msgs && toy.msgs.map(msg =>
                        <li key={msg.id} className="toy-msg">
                            <span>{msg.txt}</span><span>author:{msg.by?.fullname || ''}</span><button onClick={() => onRemoveMsg(msg.id)} className="btn"><i className="fa-solid fa-xmark"></i></button>
                        </li>
                    )}
                </ul>

                <hr />

                <Review review={review} setReview={setReview} onSaveReview={onSaveReview} />
                <ul className="toy-review-details">
                    {reviews.length !== 0 && reviews.map(review =>
                        <li key={review._id} className="toy-review">
                            <span>{review.txt}</span>
                            <span>Created at:{review.createdAt}</span>
                            <button className="btn" onClick={() => onRemoveReview(review._id)}><i className="fa-solid fa-xmark"></i></button>
                        </li>
                    )}
                </ul>

                <div className="chat-button" onClick={() => setIsChat(true)}><img src="/img/chat/speak.png"></img></div>
            </section>

            {<ChatRoom topic={toyId} isChat={isChat} setIsChat={setIsChat} />}

        </>
    )
}