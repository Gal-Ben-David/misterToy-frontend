import { useEffect, useState } from "react"

export function Review({ review, setReview, onSaveReview }) {
    const [isAddedReview, setIsAddedReview] = useState(false)

    function handleReviewChange({ target }) {
        const field = target.name
        let value = target.value
        setReview(value)
    }

    return (
        <form onSubmit={onSaveReview}>
            <h4>Review</h4>
            <button type="button" className="btn btn-light" onClick={() => setIsAddedReview(prev => !prev)}>Add Review</button>

            {isAddedReview &&
                <>
                    <input
                        type="text"
                        name="reviews"
                        value={review}
                        placeholder="Type here..."
                        onChange={handleReviewChange}
                        required
                        autoFocus
                    />
                    <button disabled={!review} className="btn btn-save-review">Save</button>
                </>}

        </form>
    )
}