import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_TYPING } from '../services/socket.service.js'

export function ChatRoom({ topic, isChat, setIsChat }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [typingUser, setTypingUser] = useState('')

    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    const botTimeoutRef = useRef()
    const typingTimeoutRef = useRef()

    console.log(topic)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EVENT_TYPING, handleTyping)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_TYPING, handleTyping)
            botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
            typingTimeoutRef.current && clearTimeout(typingTimeoutRef.current)
        }
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)
    }, [])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function handleTyping({ isTyping, user }) {
        setIsTyping(isTyping)
        setTypingUser(user)
    }

    function sendBotResponse() {
        // Handle case: send single bot response (debounce).
        botTimeoutRef.current && clearTimeout(botTimeoutRef.current)
        botTimeoutRef.current = setTimeout(() => {
            setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You are amazing!' }]))
        }, 1250)
    }

    function sendMsg(ev) {
        ev.preventDefault()
        console.log('loggedInUser', loggedInUser)
        const from = loggedInUser?.fullname || 'Me'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // if (isBotMode) sendBotResponse()
        // for now - we add the msg ourself
        // addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))

        socketService.emit(SOCKET_EVENT_TYPING, { isTyping: true, user: loggedInUser.fullname, topic })

        typingTimeoutRef.current && clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false)
            socketService.emit(SOCKET_EVENT_TYPING, { isTyping: false, user: loggedInUser.fullname, topic })
        }, 1000)
    }

    return (
        <section className={`chat ${isChat && 'active'}`}>
            <div className="chat-header">
                <div onClick={() => setIsChat(prev => !prev)}><img src="/img/chat/live-chat.png"></img></div>
                {isChat && <button className="btn" onClick={() => setIsChat(false)}>x</button>}
            </div>
            <div>
                <form onSubmit={sendMsg}>
                    <input
                        type="text" value={msg.txt} onChange={handleFormChange}
                        name="txt" autoComplete="off" />
                    <button>Send</button>
                </form>
                {isTyping && typingUser && <p>{typingUser} is typing...</p>}

                <ul>
                    {msgs.map((msg, idx) => (<li key={idx}>{(msg.from === loggedInUser.fullname) ? 'me' : msg.from}: {msg.txt}</li>))}
                </ul>
            </div>
        </section>
    )
}