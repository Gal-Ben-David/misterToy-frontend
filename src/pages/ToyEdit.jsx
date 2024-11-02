import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service-local.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import DefaultImg from "../assets/img/default-pic.jpg"

import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const labels = toyService.getLabels()

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Toy name is required'),
        price: Yup.number()
            .required('Price is required')
            .positive('Price must be a positive number')
            .typeError('Price must be a number'),
    })

    const formik = useFormik({
        initialValues: toyToEdit,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            onSaveToy(values);
        },
    });

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

    function onSaveToy() {
        // ev.preventDefault()
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

            <div className="toy-edit-inputs">
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
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />

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
                        onBlur={formik.handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                    />
                </Box>

                <div className="categories-and-img">
                    <div className="filter-form-left-side">
                        <h4>Categories</h4>
                        {labels.map((label) => (
                            <div key={label} className="checkbox-item">
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

                    <div className="toy-edit-img-container">
                        <img src={!toyToEdit._id && DefaultImg} />
                    </div>
                </div>

                <div className="actions-edit-form">
                    <button type="btn button" className="btn btn-save-toy" onClick={formik.handleSubmit}>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link className="btn" to="/">Cancel</Link>
                </div>
            </div>

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
        </section>
    )

}