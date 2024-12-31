import { useEffect, useState } from 'react'

export function Message({ setMsg, msg, onSaveMsg }) {
    const [isAddedMsg, setIsAddedMsg] = useState(false)

    function handleChange({ target }) {
        let value = target.value
        setMsg(value)
    }

    return (
        <form onSubmit={onSaveMsg}>
            <h4>Messages</h4>
            <button type="button" className="btn btn-light" onClick={() => setIsAddedMsg(prev => !prev)}>Add message</button>
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
    )
}