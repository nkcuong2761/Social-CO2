import React, {useContext, useState} from 'react';
import { DayContext } from '../Context';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function DayDropDown() {
    const {day, setDay} = useContext(DayContext);

    const handleChange = (event) => {
        setDay(event.target.value)
        const slides = document.querySelector("[data-slides]")
        console.log(slides)
        const activeSlide = document.querySelector("[data-active]")
        console.log(day)
        console.log(event.target.value)
        slides.children[event.target.value].dataset.active = true
        delete activeSlide.dataset.active
    }

  return (
    <DayContext.Provider value={day}>
        <FormControl sx={{ minWidth: 120, borderBottom: "0px solid red !important",
            "&:hover": {
              borderBottom: "0px solid rgba(0,0,0,0)"
            } }}>
            <Select
            value={day}
            onChange={handleChange}
            >
                <MenuItem value={0}>Monday</MenuItem>
                <MenuItem value={1}>Tuesday</MenuItem>
                <MenuItem value={2}>Wednesday</MenuItem>
                <MenuItem value={3}>Thursday</MenuItem>
                <MenuItem value={4}>Friday</MenuItem>
                <MenuItem value={5}>Saturday</MenuItem>
                <MenuItem value={6}>Sunday</MenuItem>
            </Select>
        </FormControl>
    </DayContext.Provider>
  )
}

export default DayDropDown