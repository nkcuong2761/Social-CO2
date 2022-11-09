import React, {useContext, useState} from 'react';
import { DayContext } from '../Context';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function DayDropDown() {
    const {day, setDay} = useContext(DayContext);

    const handleChange = (event) => {
        setDay(event.target.value);
        const slides = document.querySelector("[data-slides]")
        const activeSlide = slides.querySelector("[data-active]")
        slides.children[day].dataset.active = true
        delete activeSlide.dataset.active
  };

    // useEffect(() => {
    //     const slides = document.querySelector("[data-slides]")
    //     const activeSlide = slides.querySelector("[data-active]")
    //     slides.children[day].dataset.active = true
    //     delete activeSlide.dataset.active
    // },[day])

  return (
    <DayContext.Provider value={day}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
            value={day}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
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