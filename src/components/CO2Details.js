import React, { useState, useRef, useEffect } from "react";
import Modal from '@mui/material/Modal';
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

export const CO2Details = (props) => {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.setPopupInfo);
    console.log(props)
return (
    // <Modal
    //     open={props.isOpen}
    //     // onClose={handleClose}
    //   >
        <div ref={wrapperRef} class="card bg-[#FFFFFF] w-80 h-[50rem] p-3 space-y-4 absolute left-0 top-0 z-10">
                <a href="#">
                    <img class="w-full h-64 transition rounded hover:bg-cyan-300"
                        src={props.img}
                        alt="" />
                </a>
                <div id="description" class="space-y-4">
                    <a href="#">
                        <h2 class="text-black font-semibold text-xl font-sans text-center">
                            Library
                        </h2>
                    </a>
                    <p class="text-slate-500 text-sm select-none">Our Equilibrium collection promotes balance and calm.</p>
                    <div class="flex items-center justify-between font-semibold text-sm border-b border-slate-500 pb-6">
                        <span id="price" class="text-cyan-300 flex justify-between items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 320 512" fill="#67E7F9">
                                <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                            </svg>
                            0.041 ETH
                        </span>
                        <span class="text-slate-500 flex justify-between items-center select-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clip-rule="evenodd" />
                            </svg>
                            3 days left
                        </span>
                    </div>
                    <div class="flex text-sm items-center">
                        <img src="https://i.pravatar.cc/30?img=56" alt="avatar" class="rounded-full border border-white"/>
                        <span class="ml-2 text-slate-500">
                            Creation of
                            <a href="#" class="text-gray-300 transition hover:text-cyan-300">
                                d855
                            </a>
                        </span>
                    </div>
                </div>
        </div>
    // </Modal>
  );
}
