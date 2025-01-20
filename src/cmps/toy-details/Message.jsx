import { useEffect, useState } from 'react'

export function Message({ setMsg, msg, onSaveMsg, loggedInUser }) {
    const [isAddedMsg, setIsAddedMsg] = useState(false)

    function handleChange({ target }) {
        let value = target.value
        setMsg(value)
    }

    return (
        <form className="adding-form" onSubmit={onSaveMsg}>
            <div className="form-header">
                <h4>Messages</h4>
                <button type="button" className="btn btn-light" onClick={() => setIsAddedMsg(prev => !prev)}>Add</button>
            </div>
            {isAddedMsg &&
                <div className="adding-input">
                    <input
                        type="text"
                        name="msgs"
                        value={msg}
                        placeholder="Type here..."
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <div className="adding-input-buttons">
                        <button disabled={!msg || !loggedInUser} className="btn btn-save-msg">Save</button>
                        <button type="button" className="btn" onClick={() => setIsAddedMsg(false)}>Cancel</button>
                    </div>
                </div>
            }
        </form>
    )
}