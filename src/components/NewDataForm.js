import Typography from "./typography";
import "./NewDataForm.scss"
import React from 'react';
import {ReactComponent as Info} from '../assets/icons/Info.svg';
import {ReactComponent as Question} from '../assets/icons/Question.svg';
import {ReactComponent as CaretDown} from '../assets/icons/CaretDown.svg';
import {ReactComponent as DividerDashed} from '../assets/icons/DividerDashed.svg';
import {ReactComponent as ChartLine} from '../assets/icons/ChartLine.svg';
import { useForm } from "react-hook-form";
import Button from "./Button";

export const NewDataForm = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
      console.log(data);
      console.log(props);
      props.bluetoothButtonPressed(0, 
                    data["location-name"], data["location-type"], data["image"], 
                    props.coords.longitude, props.coords.latitude);
    }
    // console.log(watch("example")); // watch input value by passing the name of it

    // console.log(props)
    return (
        <div className="form">
            <div id="subtitle">
                <Info/>
                <Typography variant="subheading2" color="primary">Be close to location to upload CO2</Typography>
            </div>
            <div className="form-input">
                <form onSubmit={handleSubmit(onSubmit)}>
                
                {/* include validation with required or other standard HTML validation rules */}
                <Typography variant="subheading2">
                    <input type="text" placeholder="Location Name" {...register("location-name", { required: true })} />
                    <input type="text" placeholder="Location Type" {...register("location-type", { required: true })} />
                    <input type="text" placeholder="(Optional) Image link" {...register("image", { required: false })} />
                </Typography>
                
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
                
                <Button type="submit">
                    <Typography variant="h5">Submit</Typography>
                </Button>
                </form>
            </div>
        </div>
    );
}
