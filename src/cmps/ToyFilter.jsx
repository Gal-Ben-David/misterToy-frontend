import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    const LABELS = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function toggleLabel(label) {
        setFilterByToEdit((prevFilter) => {
            if (prevFilter.labels.includes(label)) {
                return { ...prevFilter, labels: prevFilter.labels.filter(item => item !== label) }
            } else {
                return { ...prevFilter, labels: [...prevFilter.labels, label] }
            }
        })
    }

    return (
        <section className="toy-filter">
            {/* <h1>Find your special toy</h1> */}
            <form className="filter-form">
                <div className="filter-form-dropdown-menu">
                    <h4>Categories</h4>
                    {LABELS.map((label) => (
                        <div key={label} className="dropdown-item">
                            <input
                                type="checkbox"
                                id={label}
                                value={label}
                                checked={filterByToEdit.labels.includes(label) || false}
                                onChange={() => toggleLabel(label)}
                            />
                            <label className="toy-label-filter" htmlFor={label}>{label}</label>
                        </div>
                    ))}
                </div>

                <div className="filter-form-left-side">
                    <label className="toy-name" htmlFor="toy-name">
                        <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                        <input type="text"
                            name="name"
                            id="toy-name"
                            className="toy-name"
                            placeholder="Find your special toy"
                            value={filterByToEdit.txt}
                            onChange={handleChange}
                        />
                    </label>

                    <select className="toy-inStock" name="inStock" onChange={handleChange} value={filterBy.inStock}>
                        <option value="all">All</option>
                        <option value="available">Available</option>
                        <option value="not-available">Not Available</option>
                    </select>


                    {/* <select className="toy-inStock" name="labels" onChange={handleChange} value={filterBy.labels}>
                    <option value="">Select</option>
                    {LABELS.map((label, i) =>
                        <option key={i} value={label}>{label}</option>
                    )}
                </select> */}

                    <h3> sort</h3>
                    <select className="tot-sort" name="selector" onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="createdAt">Created At</option>
                    </select>
                </div>
            </form>
        </section>
    )

}