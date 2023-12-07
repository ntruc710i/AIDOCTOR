import React, { useState } from "react";
import axios from 'axios';


const SuccessModal = ({open, onClose}) => {
    if (!open) return null;
    return (
        <dh-component>
            
            <div class="py-1 backdrop-blur-sm bg-white/30 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
                <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlnx="http://www.w.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Successfull</h3>
                <div class="mt-2 px-7 py-3">
                <p class="text-sm text-gray-500">Result has been Successfull generated.</p>
                </div>
                                <div class="items-center px-4 py-3">
                                    <button id="ok-btn" class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300" onClick={onClose}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>

                </div>
            </div>

        </dh-component>
  );
}

export default SuccessModal;