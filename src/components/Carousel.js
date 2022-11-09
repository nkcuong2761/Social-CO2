import "./Carousel.css";
import React, { useContext, useState, useEffect, useMemo } from "react";
import Graph from "./Graph"
import { DayContext } from "../Context";

function Carousel() {
  const {day, setDay} = useContext(DayContext);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

  })
  // useEffect(() => {
  //   const slides = document.querySelector("[data-slides]")
  //   if(slides.querySelector("[data-active]")){
  //     const activeSlide = slides.querySelector("[data-active]")
  //     slides.children[day].dataset.active = true
  //     delete activeSlide.dataset.active
  //   }
  // },[])
//   const handleOnClick = (navigation) => {
    
//     const slides = document.querySelector("[data-carousel]")
//     console.log(slides)
//     const activeSlide = slides.querySelector("[data-active]")
//     const offset = navigation === "next" ? 1 : -1
//     let newIndex = [...slides.children].indexOf(activeSlide) + offset
//     if (newIndex < 0) newIndex = slides.children.length - 1
//     if (newIndex >= slides.children.length) newIndex = 0
//     slides.children[newIndex].dataset.active = true
//     delete activeSlide.dataset.active
//     setDay(newIndex)
// };
  // useEffect(() => {
  //   const buttons = document.querySelectorAll("[data-carousel-button]")
  //   buttons.forEach(button => {
  //   button.addEventListener("click", () => {
  //     // if click on button next
  //     const offset = button.dataset.carouselButton === "next" ? 1 : -1
  //     //go back from buttons to slides
  //     const slides = button
  //       .closest("[data-carousel]")
  //       .querySelector("[data-slides]")

  //     const activeSlide = slides.querySelector("[data-active]")
  //     let newIndex = [...slides.children].indexOf(activeSlide) + offset
  //     if (newIndex < 0) newIndex = slides.children.length - 1
  //     if (newIndex >= slides.children.length) newIndex = 0
  //   }
  //   )
  // }
  //   )
  // },[])
  
    return (
        <div className="carousel" data-carousel>
          <button className="carousel-button prev" data-carousel-button="prev">&#8656;</button>
          <button className="carousel-button next"  data-carousel-button="next">&#8658;</button>
          <ul data-slides>
            <li className="slide" data-active>
              <Graph day="Mon" />
            </li>
            <li className="slide">
              <Graph day="Tue" />
            </li>
            <li className="slide">
              <Graph day="Wed" />
            </li>
            <li className="slide">
              <Graph day="Thu" />
            </li>
            <li className="slide">
              <Graph day="Fri" />
            </li>
            <li className="slide">
              <Graph day="Sat" />
            </li>
            <li className="slide">
              <Graph day="Sun" />
            </li>
          </ul>
        </div>
    );
  }
  export default Carousel;