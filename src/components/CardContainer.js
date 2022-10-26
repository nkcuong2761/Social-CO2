import React, { useState, useRef, useEffect, ElementRef } from 'react';
import { LocationCard } from './LocationCard';
import './CardContainer.scss'
import { motion, useAnimation } from "framer-motion";
import CaretWide from '../assets/icons/CaretWide';

function useOutsideAlerter(ref, setPopupInfo) {
	useEffect(() => {
	/**
	 * Alert if clicked on outside of element
	 */
	function handleClickOutside(event) {
		if (ref.current && !ref.current.contains(event.target)) {
			setPopupInfo(null)
		}
	}
	// Bind the event listener
	document.addEventListener("mousedown", handleClickOutside);
	return () => {
		// Unbind the event listener on clean up
		document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
}



export const CardContainer = (props) => {
	const controls = useAnimation();
	let isFullScreen = false
	
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, props.setPopupInfo);

	function onToggle() {
		if (!isFullScreen) {
			console.log("toggle full screen")
			controls.start("fullscreen");
			isFullScreen = true
		} else {
			console.log("toggle half screen")
			controls.start("halfscreen");
			isFullScreen = false
		}
	}

	return (
		<motion.div
			animate={controls}
			transition={{type: "string", damping: 40, stiffness: 400}}
			variants={{fullscreen: {top:30}, halfscreen: {top: 400}}}
			className='container' ref={wrapperRef}
		>
			<div className='handler' onClick={onToggle}>
				<CaretWide width="500" />
			</div>
			<LocationCard img={props.img} name={props.name} type={props.type} CO2={props.CO2}/>
		</motion.div>
	)
}
