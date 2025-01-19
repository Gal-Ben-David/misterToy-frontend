import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import DefaultImg from "../assets/img/default-pic.jpg"

import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

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

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            showErrorMsg('Cannot load toy')
            console.log('Had issues in toy edit', err)
            navigate('/')
        }
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

    function loadImageFromInput(ev) {
        const reader = new FileReader()

        reader.onload = async (event) => {
            const base64Img = event.target.result
            const fileName = ev.target.files[0].name

            try {
                showSuccessMsg('Uploading in progress...')
                const uploadedImgUrl = await toyService.uploadImg(base64Img)
                const img = new Image()
                img.crossOrigin = 'Anonymous'
                img.src = uploadedImgUrl
                img.onload = () => {
                    setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, imgUrl: uploadedImgUrl }))
                    showSuccessMsg('Image uploaded successfully!')
                }
            } catch (error) {
                console.error('Image upload failed:', error)
                showErrorMsg('Failed to upload image')
            }
        }

        reader.readAsDataURL(ev.target.files[0])
    }

    async function onSaveToy() {
        // ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 100

        try {
            const savedToy = await saveToy(toyToEdit)
            showSuccessMsg('Toy Saved!')
            navigate('/')
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Had issues in toy details')
        }
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
                        <img src={toyToEdit.imgUrl} />
                        <label htmlFor="file-upload" className="btn-edit-toy-img">
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#5f6368">
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                            </svg>
                        </label>
                        <input type="file" id="file-upload" className="file-input btn" name="file-upload"
                            onChange={(ev) => loadImageFromInput(ev)}></input>
                    </div>
                </div>

                <Box sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Stock</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Stock"
                            name="inStock"
                            className="toy-inStock"
                            value={toyToEdit.inStock}
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
                            <MenuItem value={true}>Available</MenuItem>
                            <MenuItem value={false}>Not Available</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <div className="actions-edit-form">
                    <button type="btn button" className="btn btn-light btn-save-toy" onClick={formik.handleSubmit}>{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link className="btn" to="/">Cancel</Link>
                </div>
            </div>
        </section>
    )

}