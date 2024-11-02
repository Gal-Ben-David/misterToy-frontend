import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { toyService } from "../services/toy.service-local.js"
import { MultipleSelectChip } from "../cmps/Chip.jsx"

import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const labels = toyService.getLabels()
    const sortOptions = [{ value: '', title: 'select' }, { value: 'name', title: 'name' }, { value: 'price', title: 'price' }, { value: 'createdAt', title: 'createdAt' }]
    onSetFilter = useRef(utilService.debounce(onSetFilter, 300))

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
            <form className="filter-form">
                <div className="filter-form-left-side">
                    <h4>Categories</h4>
                    {labels.map((label) => (
                        <div key={label} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={label}
                                value={label}
                                checked={filterBy.labels.includes(label) || false}
                                onChange={() => toggleLabel(label)}
                            />
                            <label className="toy-label-filter" htmlFor={label}>{label}</label>
                        </div>
                    ))}
                </div>

                <div className="filter-form-right-side">
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

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Stock</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Stock"
                                name="inStock"
                                className="toy-inStock"
                                value={filterBy.inStock || ''}
                                onChange={handleChange}
                                sx={{
                                    borderRadius: 2,
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: 'rgb(219, 219, 219)',
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: 'rgb(219, 219, 219)',
                                    },
                                }}
                            >
                                <MenuItem value={'all'}>All</MenuItem>
                                <MenuItem value={'available'}>Available</MenuItem>
                                <MenuItem value={'not-available'}>Not Available</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Sort"
                                name="selector"
                                className="tot-sort"
                                value={filterBy.selector || ''}
                                onChange={handleChange}
                                sx={{
                                    borderRadius: 2,
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: 'rgb(219, 219, 219)',
                                    },
                                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: 'rgb(219, 219, 219)',
                                    },
                                }}
                            >
                                <MenuItem value={''}>Clear</MenuItem>
                                <MenuItem value={'name'}>Name</MenuItem>
                                <MenuItem value={'price'}>Price</MenuItem>
                                <MenuItem value={'createdAt'}>Created At</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <MultipleSelectChip setFilterByToEdit={setFilterByToEdit} names={labels} filterBy={filterBy} />

                    {/* <fieldset>
                        <legend>Stock</legend>
                        <select className="toy-inStock" name="inStock" onChange={handleChange} value={filterBy.inStock}>
                            <option value="all">All</option>
                            <option value="available">Available</option>
                            <option value="not-available">Not Available</option>
                        </select>
                    </fieldset> */}


                    {/* <select className="toy-inStock" name="labels" onChange={handleChange} value={filterBy.labels}>
                    <option value="">Select</option>
                    {LABELS.map((label, i) =>
                        <option key={i} value={label}>{label}</option>
                    )}
                </select> */}
                    {/* <fieldset>
                        <legend>Sort</legend>
                        <select className="tot-sort" name="selector" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                            <option value="createdAt">Created At</option>
                        </select>
                    </fieldset> */}
                </div>
            </form>
        </section>
    )

}