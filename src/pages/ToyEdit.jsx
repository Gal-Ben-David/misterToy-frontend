import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service-local.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"

import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'


export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const labels = toyService.getLabels()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/')
            })
    }

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

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    function toggleLabel(label) {
        setToyToEdit((prevToyToEdit) => {
            if (prevToyToEdit.labels.includes(label)) {
                return { ...prevToyToEdit, labels: prevToyToEdit.labels.filter(item => item !== label) }
            } else {
                return { ...prevToyToEdit, labels: [...prevToyToEdit.labels, label] }
            }
        })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 100
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/')
            })
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Had issues in toy details')
            })
    }

    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <form onSubmit={onSaveToy} >
                {/* <label htmlFor="toy-name">Toy name: </label>
                <input type="text"
                    name="name"
                    id="toy-name"
                    placeholder="Enter name..."
                    value={toyToEdit.name}
                    onChange={handleChange}
                /> */}
                {/* <label htmlFor="price">Price: </label>
                <input type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={toyToEdit.price}
                    onChange={handleChange}
                /> */}

                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="Toy name"
                        variant="outlined"
                        name="name"
                        value={toyToEdit.name}
                        onChange={handleChange} />

                    <TextField
                        id="outlined-number"
                        name="price"
                        label="Price"
                        type="number"
                        value={toyToEdit.price}
                        onChange={handleChange}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </Box>

                <div className="filter-form-dropdown-menu">
                    <h4>Categories</h4>
                    {labels.map((label) => (
                        <div key={label} className="dropdown-item">
                            <input
                                type="checkbox"
                                id={label}
                                value={label}
                                checked={toyToEdit.labels.includes(label) || false}
                                onChange={() => toggleLabel(label)}
                            />
                            <label className="toy-label-filter" htmlFor={label}>{label}</label>
                        </div>
                    ))}
                </div>

                <div>
                    <img src={toyToEdit.imgUrl} />
                </div>

                <div className="actions-edit-form">
                    <button className="btn btn-save-toy">{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link className="btn" to="/">Cancel</Link>
                </div>
            </form>
        </section>
    )

}