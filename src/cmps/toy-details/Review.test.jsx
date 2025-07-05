import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { Review } from './Review'

describe('Review component', () => {
    const setup = () => {
        const setReview = vi.fn()
        const onSaveReview = vi.fn((e) => e.preventDefault())
        const loggedInUser = { id: 'u123', fullname: 'Test User' }

        render(
            <Review
                review=""
                setReview={setReview}
                onSaveReview={onSaveReview}
                loggedInUser={loggedInUser}
            />
        )
        return { setReview, onSaveReview }
    }

    it('renders Reviews title and Add button', () => {
        setup()
        expect(screen.getByText('Reviews')).toBeInTheDocument()
        expect(screen.getByText('Add')).toBeInTheDocument()
    })

    it('shows input field when Add button is clicked', () => {
        setup()
        const addButton = screen.getByText('Add')
        fireEvent.click(addButton)
        expect(screen.getByPlaceholderText('Type here...')).toBeInTheDocument()
    })

    it('calls setReview when input changes', () => {
        const { setReview } = setup()
        fireEvent.click(screen.getByText('Add'))
        const input = screen.getByPlaceholderText('Type here...')
        fireEvent.change(input, { target: { value: 'Nice toy!' } })
        expect(setReview).toHaveBeenCalledWith('Nice toy!')
    })
})