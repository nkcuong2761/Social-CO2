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

function Graph(props) {
	const [ activeIndex, setActiveIndex ] = useState();

    const handleMouseOver = (data, index) => {
        setActiveIndex(index)
    }
    const handleMouseLeave = (data, index) => {
        setActiveIndex(null)
    }

    let graphInfo = props.graphInfo;
    let days = {};
    for (const day in graphInfo) {
        days[day] = [];
        for (let i=8; i<graphInfo[day].length; i++) {
            days[day].push({
                hour: i,
                co2: graphInfo[day][i]
            })
            
        }
    }
    // console.log(`props.graphInfo: ${JSON.stringify(props.graphInfo)}`)
    // console.log(`days: ${JSON.stringify(days)}`)

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
                    // console.log(`entry hour: ${entry.hour}, entry.co2: ${entry.co2}`);
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