import { useEffect, useState } from "react"

export function Review({ review, setReview, onSaveReview, loggedInUser }) {
    const [isAddedReview, setIsAddedReview] = useState(false)

    function handleReviewChange({ target }) {
        const field = target.name
        let value = target.value
        setReview(value)
    }

    return (
        <form className="adding-form" onSubmit={onSaveReview}>
            <div className="form-header">
                <h4>Reviews</h4>
                <button type="button" className="btn btn-light" onClick={() => setIsAddedReview(prev => !prev)}>Add Review</button>
            </div>

            {isAddedReview &&
                <div className="adding-input">
                    <input
                        type="text"
                        name="reviews"
                        value={review}
                        placeholder="Type here..."
                        onChange={handleReviewChange}
                        required
                        autoFocus
                    />
                    <div className="adding-input-buttons">
                        <button disabled={!review || !loggedInUser} className="btn btn-save-review">Save</button>
                        <button type="button" className="btn" onClick={() => setIsAddedReview(false)}>Cancel</button>
                    </div>
                </div>}

        </form>
    )
}