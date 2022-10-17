import React, { useState, useRef, useEffect } from 'react';
import Sheet from "react-modal-sheet";
import { LocationCard } from './LocationCard';
import './CardContainer.scss'

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
	console.log(props.isMobile)

	const canvas = document.querySelector("canvas");
	const canvasDocument = canvas?.contentWindow?.document;
	
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, props.setPopupInfo);
	const [open, setOpen] = useState(false)

	if (!props.isMobile) {
		console.log('dcm desktop')
		return (
			<div className='container' ref={wrapperRef}>
				<LocationCard img={props.img} name={props.name} type={props.type} CO2={props.CO2}/>
			</div>
		)
	}
	else {
		console.log('dcm mobile')
		return (
			<Sheet doc={canvasDocument} ref={wrapperRef} isOpen={true} onClose={() => setOpen(false)}>
				<Sheet.Container>
					<Sheet.Header>
						<Sheet.Content>
							<LocationCard img={props.img} name={props.name} type={props.type} CO2={props.CO2}/>
						</Sheet.Content>
					</Sheet.Header>
				</Sheet.Container>
			</Sheet>
		)
	}
}
