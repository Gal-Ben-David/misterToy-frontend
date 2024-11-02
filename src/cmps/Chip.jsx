import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { toyService } from '../services/toy.service-local.js'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

// const names = toyService.getLabels()

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    }
}

export function MultipleSelectChip({ setFilterByToEdit, names, filterBy }) {
    const theme = useTheme()
    const [personName, setPersonName] = React.useState([])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event

        setPersonName(typeof value === 'string' ? value.split(',') : value)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: value }))
    }

    return (
        <div>
            <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={filterBy.labels || []}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Categories" sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: 'rgb(219, 219, 219)'
                        }
                    }} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
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
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}