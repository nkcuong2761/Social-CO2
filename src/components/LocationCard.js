import Typography from "./typography";
import "./LocationCard.scss"
import React from 'react';
import {ReactComponent as MagnifyingGlass} from '../assets/icons/MagnifyingGlass.svg';
import {ReactComponent as SeperatorH} from '../assets/icons/SeperatorH.svg';
import {ReactComponent as X} from '../assets/icons/X.svg';
import {ReactComponent as Info} from '../assets/icons/Info.svg';
import {ReactComponent as Question} from '../assets/icons/Question.svg';
import {ReactComponent as CaretDown} from '../assets/icons/CaretDown.svg';
import {ReactComponent as DividerDashed} from '../assets/icons/DividerDashed.svg';
import Colors from "./colors";
import Divider from "./Divider";
import Tag from "./Tag";
import Button from "./Button";
import Carousel from "./Carousel";
import DayDropDown from "./DayDropDown";

export const LocationCard = (props) => {
console.log(props)
return (
    <div className="card">
        <div className="search-box-wrap">
            <Typography variant="subheading2">
                <input type="text" className="searchTerm" defaultValue={props.name} />
            </Typography>
            <div>
                <button type="submit" className="iconButton" id="search">
                    <MagnifyingGlass fill={Colors.white} stroke={Colors.dark}/>
                </button>
                <SeperatorH stroke={Colors.white_2}/>
                <button type="submit" className="iconButton" id="close">
                    <X stroke={Colors.dark}/>
                </button>
            </div>
        </div>

        <div className="card-image">
            <img src={props.img} alt={props.name} />
        </div>

        <div className="card-body">
            <div id="title">
                <Typography variant="h2">{props.name}</Typography>
                <Typography variant="body">{props.type}</Typography>
            </div>
            <Divider />
            <div id="subtitle">
                <div>
                	<Info />
                    <Typography variant="subheading2" color="primary">This data is not real-time</Typography>
                </div>
                <Question/>
            </div>
            <div id="co2-frame">
                <Typography variant='h3'>CO<sub>2</sub></Typography>
                <Typography variant='h1' color='warning'>{props.CO2}<sub>ppm</sub></Typography>
            </div>
            <Divider/>

            <div id="graph-filter">
                <div id='filter'>
                    <div id='frame1'>
                        <Typography variant='subheading1'>CO<sub>2</sub> throughout the day</Typography>
                        <div id='dropdown'>
                            {/* <Typography variant='subtitle1'>Monday</Typography>
							<CaretDown/> */}
                            <DayDropDown />
                        </div>
                    </div>
                    <Question/>
                </div>
                <div id='info'>
					<Tag value='2:45pm'/>
                    <Typography variant='subtitle1'>Somewhat crowded</Typography>
                </div>
				<DividerDashed/>
            </div>
            <div id="graph">
                <Carousel />
            </div>
            {/* <div id="button">
				<Button icon="ChartLine" value='See full graph'/>
			</div> */}
        </div>
    </div>
  );
}
