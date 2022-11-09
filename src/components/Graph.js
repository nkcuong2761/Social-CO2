import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ResponsiveContainer,
	ComposedChart,
	Line
} from "recharts";
import Colors from "./colors";
import { useState } from "react";

const theme = {
    // "color": [
    //     "#00ab6f",
    //     "#ffaa15",
    //     "#ff4040",
    //     "#b3eed9",
    //     "#ffe6b9",
    //     "#ffc6c6"
    // ],
    "backgroundColor": "rgba(0,0,0,0)",
    "textStyle": {},
    "title": {
        "textStyle": {
            "color": Colors.dark
        },
        "subtextStyle": {
            "color": Colors.dark_2
        }
    },
    "valueAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": Colors.dark_3
            }
        },
        "axisTick": {
            "show": true,
            "lineStyle": {
                "color": Colors.dark_3
            }
        },
        "axisLabel": {
            "show": true,
            "color": Colors.dark_2
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    Colors.white_3
                ]
            }
        },
    },
    "logAxis": {
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": Colors.dark_3
            }
        },
        "axisTick": {
            "show": true,
            "lineStyle": {
                "color": Colors.dark_3
            }
        },
        "axisLabel": {
            "show": true,
            "color": Colors.dark_2
        },
        "splitLine": {
            "show": true,
            "lineStyle": {
                "color": [
                    Colors.white_3
                ]
            }
        },
    },
    "toolbox": {
        "iconStyle": {
            "borderColor": Colors.dark_3
        },
        "emphasis": {
            "iconStyle": {
                "borderColor": Colors.dark_2
            }
        }
    },
    "legend": {
        "textStyle": {
            "color": Colors.dark
        }
    },
    "tooltip": {
        "axisPointer": {
            "lineStyle": {
                "color": Colors.dark_3,
                "width": 1
            },
            "crossStyle": {
                "color": Colors.dark_3,
                "width": 1
            }
        }
    },
    "markPoint": {
        "label": {
            "color": Colors.white
        },
        "emphasis": {
            "label": {
                "color": Colors.white
            }
        }
    }
}

let days = {Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: []}

const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
function addDataToEachDay(input) {// Add data from input to days
    for (const prop in input) {
        let time_arr = prop.split('-')
        let dayOfWeek = parseInt(time_arr[0])
        let hour = parseInt(time_arr[1])
		if (hour >= 8 && hour <=23) {
			days[dayMap[dayOfWeek]].push({
				hour: hour,
				co2: Math.round(input[prop])
			})
		}
    }
}

const averageHourlyCo2 = {
    "0-0": 599.4333333333333,
    "0-1": 649.1,
    "0-2": 736.3333333333334,
    "0-3": 807.9666666666667,
    "0-4": 709.9,
    "0-5": 746.4,
    "0-6": 672.5333333333333,
    "0-7": 663.3333333333334,
    "0-8": 648.8333333333334,
    "0-9": 1062.4666666666667,
    "0-10": 682.5666666666667,
    "0-11": 695.6,
    "0-12": 779.2333333333333,
    "0-13": 632.0666666666667,
    "0-14": 542.9333333333333,
    "0-15": 710.7333333333333,
    "0-16": 800.8333333333334,
    "0-17": 774.3333333333334,
    "0-18": 1092.1,
    "0-19": 768.3,
    "0-20": 730.5,
    "0-21": 734.6666666666666,
    "0-22": 746.3,
    "0-23": 741.5666666666667,
    "1-0": 751.9666666666667,
    "1-1": 767.8666666666667,
    "1-2": 783.6666666666666,
    "1-3": 808.2333333333333,
    "1-4": 646.3666666666667,
    "1-5": 881,
    "1-6": 826.3,
    "1-7": 619.6666666666666,
    "1-8": 556.1333333333333,
    "1-9": 652.0333333333333,
    "1-10": 465.53333333333336,
    "1-11": 588.6666666666666,
    "1-12": 670.8,
    "1-13": 709.3333333333334,
    "1-14": 505.1333333333333,
    "1-15": 478.23333333333335,
    "1-16": 493.6,
    "1-17": 534.1666666666666,
    "1-18": 675.8333333333334,
    "1-19": 698.6666666666666,
    "1-20": 664.5,
    "1-21": 643.9666666666667,
    "1-22": 627.2333333333333,
    "1-23": 641.5333333333333,
    "2-0": 657.2333333333333,
    "2-1": 709.1,
    "2-2": 745.4,
    "2-3": 759.7333333333333,
    "2-4": 753.4,
    "2-5": 693.5,
    "2-6": 544.2333333333333,
    "2-7": 456.8666666666667,
    "2-8": 547.7,
    "2-9": 909.3333333333334,
    "2-10": 646.3333333333334,
    "2-11": 721.1666666666666,
    "2-12": 801.9,
    "2-13": 691.7666666666667,
    "2-14": 646.4333333333333,
    "2-15": 587.3,
    "2-16": 682.7,
    "2-17": 622.5666666666667,
    "2-18": 619.3333333333334,
    "2-19": 597.0333333333333,
    "2-20": 599.2,
    "2-21": 600.0666666666667,
    "2-22": 612.9,
    "2-23": 611.3,
    "3-0": 616.0666666666667,
    "3-1": 627.9,
    "3-2": 673.3,
    "3-3": 702.3333333333334,
    "3-4": 719.8666666666667,
    "3-5": 716.1,
    "3-6": 696.0333333333333,
    "3-7": 652.8333333333334,
    "3-8": 564.6333333333333,
    "3-9": 553.2,
    "3-10": 584.2,
    "3-11": 546.0666666666667,
    "3-12": 505.8333333333333,
    "3-13": 476.76666666666665,
    "3-14": 476.6333333333333,
    "3-15": 579.1,
    "3-16": 642.8666666666667,
    "3-17": 690.7333333333333,
    "3-18": 709.9333333333333,
    "3-19": 710.1,
    "3-20": 714.8333333333334,
    "3-21": 720.9,
    "3-22": 745.3,
    "3-23": 777.2333333333333,
    "4-0": 822.4,
    "4-1": 884.2333333333333,
    "4-2": 892.1666666666666,
    "4-3": 860.6,
    "4-4": 851.8,
    "4-5": 1010.8,
    "4-6": 919.3666666666667,
    "4-7": 806.1333333333333,
    "4-8": 626.9333333333333,
    "4-9": 607.2666666666667,
    "4-10": 565.6333333333333,
    "4-11": 571.7333333333333,
    "4-12": 605.3333333333334,
    "4-13": 659.0666666666667,
    "4-14": 662.9666666666667,
    "4-15": 608.6,
    "4-16": 607.2,
    "4-17": 696.6,
    "4-18": 690.8666666666667,
    "4-19": 686.6333333333333,
    "4-20": 657.2,
    "4-21": 616.5666666666667,
    "4-22": 564.7333333333333,
    "4-23": 537.3333333333334,
    "5-0": 747.3,
    "5-1": 1041,
    "5-2": 811.8,
    "5-3": 653,
    "5-4": 616.0666666666667,
    "5-5": 564.8666666666667,
    "5-6": 583.8666666666667,
    "5-7": 582.1666666666666,
    "5-8": 552.0666666666667,
    "5-9": 607.6333333333333,
    "5-10": 617.2666666666667,
    "5-11": 501.26666666666665,
    "5-12": 675.0333333333333,
    "5-13": 652,
    "5-14": 559.5666666666667,
    "5-15": 596.4333333333333,
    "5-16": 812.9666666666667,
    "5-17": 815.9,
    "5-18": 579,
    "5-19": 522.3666666666667,
    "5-20": 511.7,
    "5-21": 530.3,
    "5-22": 523.2333333333333,
    "5-23": 530.5666666666667,
    "6-0": 565.4333333333333,
    "6-1": 610.7,
    "6-2": 698,
    "6-3": 778.2666666666667,
    "6-4": 637.5333333333333,
    "6-5": 498.53333333333336,
    "6-6": 524,
    "6-7": 691.4333333333333,
    "6-8": 684.3666666666667,
    "6-9": 648.4333333333333,
    "6-10": 554.3666666666667,
    "6-11": 724.5,
    "6-12": 722.8,
    "6-13": 608.6,
    "6-14": 553.4,
    "6-15": 575.5333333333333,
    "6-16": 588.6666666666666,
    "6-17": 580.0333333333333,
    "6-18": 598.4,
    "6-19": 590.6666666666666,
    "6-20": 583.0333333333333,
    "6-21": 563.6333333333333,
    "6-22": 581.7,
    "6-23": 584.7333333333333
}
addDataToEachDay(averageHourlyCo2)

function Graph(props) {
	const [ activeIndex, setActiveIndex ] = useState();
	const handleMouseOver = (data, index) => {
		setActiveIndex(index)
	}
	const handleMouseLeave = (data, index) => {
		setActiveIndex(null)
	}

    return (
        <ResponsiveContainer width="100%" height="90%">
            <BarChart
            data={days[props.day]}
			barCategoryGap={1}
			margin={ {top: 0, right: 40, bottom: 0, left: 40} }>
            <CartesianGrid strokeDasharray="2 5" />
            <XAxis dataKey="hour" ticks={[9,12,15,18,21]} scale='point'/>
			<YAxis type="number" domain={[0, 1400]} hide={true}/>
            <Tooltip />
            <Bar dataKey="co2"
			onMouseOver={handleMouseOver}
			onMouseLeave={handleMouseLeave}>
                {
                days[props.day].map((entry,index) => {
					const d = new Date()
					let currentHour = d.getHours()
					let fillColor;
					if (entry.hour == currentHour || index == activeIndex)
						fillColor = entry.co2 >= 1400 ? Colors.critical : entry.co2 >= 1000 ? Colors.warning : Colors.okbro
					else
						fillColor = entry.co2 >= 1400 ? Colors.criticalLight : entry.co2 >= 1000 ? Colors.warningLight : Colors.okbroLight
					return(
					<Cell fill={fillColor} key={`cell-${index}`}/>
					)
				})
                }
            </Bar>
			{/* <Line dataKey="co2" type="monotone" stroke={Colors.primary}>
			</Line> */}
            </BarChart>
        </ResponsiveContainer>
    );
}
export default Graph;