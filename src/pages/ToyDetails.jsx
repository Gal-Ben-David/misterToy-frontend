import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'
import { Link, useParams } from 'react-router-dom'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ChatRoom } from '../cmps/ChatRoom.jsx'
import { Message } from '../cmps/toy-details/Message.jsx'
import { Review } from '../cmps/toy-details/Review.jsx'
import { ToyDetailsTable } from '../cmps/toy-details/ToyDetailsTable.jsx'

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
        } catch (err) {
            console.log('Had issues in toy details', err)
            throw err
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
            throw err
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
            throw err
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <>
            <section className="toy-details">
                <ToyDetailsTable toy={toy} />

                <div>
                    <Link className="btn" to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
                    <Link className="btn" to={`/`}>Back</Link>
                </div>

                <hr />

                <Message onSaveMsg={onSaveMsg} msg={msg} setMsg={setMsg} />
                <ul className="data-list toy-msgs-details">
                    {toy.msgs && toy.msgs.map(msg =>
                        <li key={msg.id} className="toy-msg">
                            <div className="data-details">
                                <span>{msg.txt}</span>
                                <span className="created-or-author">Added by {msg.by?.fullname || ''}</span>
                            </div>
                            <button onClick={() => onRemoveMsg(msg.id)} className="btn"><i className="fa-solid fa-xmark"></i></button>
                        </li>
                    )}
                </ul>

                <hr />

                <Review review={review} setReview={setReview} onSaveReview={onSaveReview} />
                <ul className="data-list toy-review-details">
                    {reviews.length === 0 ? 'No reviews yet, be the first one!' :
                        reviews.map(review =>
                            <li key={review._id} className="toy-review">
                                <div className="data-details">
                                    <span>{review.txt}</span>
                                    <span className="created-or-author">
                                        {new Date(review.createdAt).toLocaleString('en-GB', {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
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