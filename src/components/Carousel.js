import "./Carousel.scss";
import React, { useContext, useState, useEffect, useMemo } from "react";
import Graph from "./Graph"
import { DayContext } from "../Context";
import {ReactComponent as CaretLeft} from '../assets/icons/CaretLeft.svg';
import {ReactComponent as CaretRight} from '../assets/icons/CaretRight.svg';
import Button from "./Button";

function Carousel(props) {
  const {day, setDay} = useContext(DayContext);

  // useEffect(() => {
  //   const slides = document.querySelector("[data-slides]")
  //   if(slides.querySelector("[data-active]")){
  //     const activeSlide = slides.querySelector("[data-active]")
  //     slides.children[day].dataset.active = true
  //     delete activeSlide.dataset.active
  //   }
  // },[day])
  
  useEffect(() => {

    const buttons = document.querySelectorAll("[data-carousel-button]")
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        console.log('vai lon luon')
        // if click on button next
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        //go back from buttons to slides
        const slides = button
          .closest("[data-carousel]")
          .querySelector("[data-slides]")
    
        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0
        setDay(newIndex)
        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
      })
    })
  },[])
  
  return (
    <div className="carousel" data-carousel>
      <div data-carousel-button="prev" className='prevButton'>
      <Button variant='icon-only' zIndex={100} width={32} height={32} >
        <CaretLeft/>
      </Button>
      </div>
      <div data-carousel-button="next" className='nextButton'>
      <Button variant='icon-only' zIndex={100} width={32} height={32} >
        <CaretRight/>
      </Button>
      </div>
      <ul data-slides>
        <li className="slide" data-active>
          <Graph day="Mon" graphInfo={props.graphInfo}/>
        </li>
        <li className="slide">
          <Graph day="Tue" graphInfo={props.graphInfo}/>
        </li>
        <li className="slide">
          <Graph day="Wed" graphInfo={props.graphInfo}/>
        </li>
        <li className="slide">
          <Graph day="Thu" graphInfo={props.graphInfo}/>
        </li>
        <li className="slide">
          <Graph day="Fri" graphInfo={props.graphInfo}/>
        </li>
        <li className="slide">
          <Graph day="Sat" graphInfo={props.graphInfo}/>
        </li>
        <li className="slide">
          <Graph day="Sun" graphInfo={props.graphInfo}/>
        </li>
      </ul>
    </div>
  );
}
export default Carousel;