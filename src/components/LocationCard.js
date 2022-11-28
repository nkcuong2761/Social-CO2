import Typography from "./typography";
import "./LocationCard.scss"
import React from 'react';
import {ReactComponent as Info} from '../assets/icons/Info.svg';
import {ReactComponent as Question} from '../assets/icons/Question.svg';
import {ReactComponent as CaretDown} from '../assets/icons/CaretDown.svg';
import {ReactComponent as DividerDashed} from '../assets/icons/DividerDashed.svg';
import {ReactComponent as ChartLine} from '../assets/icons/ChartLine.svg';
import Colors from "./colors";
import Divider from "./Divider";
import Tag from "./Tag";
import Button from "./Button";
import ReactTooltip from "react-tooltip";
import Carousel from "./Carousel";
import DayDropDown from "./DayDropDown";

export const LocationCard = (props) => {
const d = new Date();
let currentHour = d.getHours();
const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let today = dayMap[d.getDay()];
let button = null;
if (props.isClose) {
    button = 
    <Button onClick={async () => {
        await props.bluetoothButtonPressed(props.lastUpdated, props.name)
    }} variant='with-icon' icon="ChartLine"><Typography variant='h4'>Update CO2</Typography>
    </Button>;
}
console.log(`Is close: ${props.isClose}`);
console.log(props);
// TODO: Beautify lastUpdated
return (
    <div className="card">

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
                	<Info/>
                    <Typography variant="subheading2" color="primary">This data is not real-time</Typography>
                </div>
                <Question
                data-tip data-for='questionTip' data-multiline={true}/>
                <ReactTooltip id="questionTip" place="top" type="dark" effect="solid">
                    <Typography variant="subtitle2">
                        <div style={{padding: '8px'}}>
                        This data is a prediction of the CO2 level <br/> at your current time based on past data<br/>
                        Last updated: {Math.floor((Date.now()-props.lastUpdated)/1000)} seconds ago<br/>
                        </div>
                    </Typography>
                </ReactTooltip>
            </div>
            <div id="co2-frame">
                <Typography variant='h3'>CO<sub>2</sub></Typography>
                <Typography variant='h1' color='warning'>{props.graphInfo[today][currentHour-8]}<sub>ppm</sub></Typography>
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
                    <Question
                    data-tip data-for='graphTip' data-multiline={true}/>
                    <ReactTooltip id="graphTip" place="top" type="dark" effect="solid">
                    <Typography variant="subtitle2">
                        Each bar in the graph represents the predicted, average CO2 level during the 1-hour time frame.
                    </Typography>
                </ReactTooltip>
                </div>
                <div id='info'>
					<Tag value='2:45pm'/>
                    <Typography variant='subtitle1'>Somewhat crowded</Typography>
                </div>
				<DividerDashed/>
            </div>
            <div id="graph">
                <Carousel graphInfo={props.graphInfo}/>
            </div>
            {/* <div id="button">
			</div> */}
        </div>
    </div>
  );
}
