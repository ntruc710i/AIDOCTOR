import React, { useState, useEffect } from "react";
import {CiImageOff} from "react-icons/ci"
import { HiDownload } from "react-icons/hi";
import { TbFlipVertical, TbFlipHorizontal } from "react-icons/tb";
import { BiRotateRight, BiRotateLeft } from "react-icons/bi";
import { MapInteractionCSS } from 'react-map-interaction';
import { isAuthenticated } from "./auth/auth";
import NewRecordModal from "./modal/newrecod";
import SuccessModal from "./modal/success";
import Header from "./header/header";
import { useNavigate } from "react-router-dom";

function fileSizetoMB(size) {
    return (size && (size / 1024 / 1024)).toFixed(2);
}


const ActionButton = ({ onClick, label, disabled, isWide }) => {
    return (
        <button
            disabled={disabled}
            className={`w-[50px] h-[50px] font-bold py-2 px-4 rounded-md ${isWide && "basis-full"} ${disabled ? "bg-gray-400 text-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white"}`}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated()) {
          // Nếu chưa đăng nhập, quay về trang đăng nhập
          navigate('/login');
        } else {
          const accessToken = localStorage.getItem('access_token');
        }
    }, [navigate]);
    const [image, setImage] = useState(null);
    const [rawimg, setrwImage] = useState(null);
    const [label, setLabel] = useState(null);
    const [pred, setPred] = useState(null);
    const [imageData, setImageData] = useState({});
    const imageDataFileSize = imageData?.target?.files[0]?.size;

    const [loading, setLoading] = useState(false);

    const [model, setModel] = useState(null);
    
    const getmodelname = e => {
        setModel(e.target.value);
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalSuccess, setSuccess] = useState(false);

    const handleOpenModal = () => {
        !label? setModalIsOpen(false):setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleOpenSuccess = () => {
        setSuccess(true);
    };
    const handleCloseSuccess = () => {
        setSuccess(false);
    };

    
    const modelList = [
        { value: "yolov8", label: "Chest Xray Abnormalities Yolov8" },
        { value: "covid19", label: "COVID19 Detection CNN" },
        { value: "brainmri", label: "Brain Tumor Segmentation" }
      ];
    const handleImageChange = async (event) => {

        !model ? setModel("yolov8") : console.log(model);
        const newmodel = !model ? "yolov8" : model;
        
        setImageData(event);
        const file = event.target.files[0];
        if (!file) return;
        const data = new FormData();
        data.append("file",file,file.name);
        const request ={method: "POST", body: data}
        const response = await fetch("http://localhost:8000/"+newmodel, request)
        const rs = await response.json()
        setImage(rs.image)
        setrwImage(rs.imageraw)
        setLabel(rs.label)
        setPred(rs.pred)
    };
    
    const handleFlipX = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.translate(img.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0);
            const flippedImage = canvas.toDataURL();
            setImage(flippedImage);
        };
        img.src = image;
    };


    const handleFlipY = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.translate(0, img.height);
            ctx.scale(1, -1);
            ctx.drawImage(img, 0, 0);
            const flippedImage = canvas.toDataURL();
            setImage(flippedImage);
        };
        img.src = image;
    };

    const handleRotateLeft = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            const boundingBoxWidth = img.height;
            const boundingBoxHeight = img.width;

            canvas.width = boundingBoxWidth;
            canvas.height = boundingBoxHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((90 * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.restore();
            const flippedImage = canvas.toDataURL();
            setImage(flippedImage);
        };
        img.src = image;
    };

    const handleRotateRight = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            const boundingBoxWidth = img.height;
            const boundingBoxHeight = img.width;

            canvas.width = boundingBoxWidth;
            canvas.height = boundingBoxHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((-90 * Math.PI) / 180);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.restore();
            const flippedImage = canvas.toDataURL();
            setImage(flippedImage);
        };
        img.src = image;
    }

    const handleDownload = () => {
        const downloadLink = document.createElement("a");
        const titleImage = 'edited_' + imageData?.target.files[0].name;
        downloadLink.href = image;
        downloadLink.download = titleImage;
        downloadLink.click();
    }

    return (
        <div >
        <Header/>
        
        <div class="flex grid grid-cols-3 gap-60 grid-flow-row-dense mt-6">
        {/* SELECT MODEL */}
        <div className="app" class="mt-6 ml-10 w-[300px]">
            <div className='title' class="text-xl font-mono font-semibold text-center mb-5">Select model</div>
            {modelList.map((x, i) =><p key={i}> 
            <button type="button" className={`text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:bg-[#050708] dark:focus:text-white mr-2 mb-2 ${model == x.value ? 'bg-neutral-950 text-slate-50 hover:bg-[#050708] focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:bg-[#050708] dark:focus:text-white mr-2 mb-2' : ''}`}  value={x.value} onClick={getmodelname} >
                <svg class="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><path fill="#2d4356" d="M44.15 43.288a3 3 0 1 0-3-3 3.003 3.003 0 0 0 3 3zm0-4.5a1.5 1.5 0 1 1-1.5 1.5 1.501 1.501 0 0 1 1.5-1.5zm114.155 29.5a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm-60-32a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm60-33a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm-141 6.798a2 2 0 1 0-2 2 2.002 2.002 0 0 0 2-2zm-3 0a1 1 0 1 1 1 1 1.001 1.001 0 0 1-1-1z"></path><path fill="#0bceb2" d="m9.915 58.554 1.487-1.956-.939-.532-.954 2.19h-.032l-.969-2.174-.956.548 1.472 1.909v.031l-2.301-.298v1.064l2.316-.297v.032l-1.487 1.908.892.564 1.018-2.207h.03l.939 2.191.986-.563-1.502-1.878v-.031l2.362.281v-1.064l-2.362.313v-.031zM66 6.442l-.856 1.099.514.324.586-1.27h.018l.54 1.261.568-.324-.865-1.082v-.018l1.36.163v-.613l-1.36.18v-.018l.856-1.126-.54-.306-.55 1.261h-.018l-.558-1.253-.551.316.848 1.099v.018l-1.325-.171v.613L66 6.424v.018zM155.305 47.002v-1.044l-2.317.307v-.03l1.458-1.919-.921-.521-.936 2.148h-.031l-.951-2.133-.937.537 1.443 1.873v.03l-2.257-.292v1.044l2.272-.291v.03l-1.458 1.872.875.553.998-2.164h.03l.921 2.148.967-.552-1.473-1.842v-.03l2.317.276zM116.748 18.874l1.258-1.654-.795-.45-.807 1.853h-.027l-.82-1.84-.809.463 1.245 1.615v.027l-1.946-.252v.9l1.959-.251v.026l-1.258 1.615.755.477.861-1.867h.026l.795 1.854.834-.477-1.271-1.589v-.026l1.998.238v-.9l-1.998.265v-.027z"></path><circle cx="2" cy="147.288" r="2" fill="#2d4356"></circle><path fill="#2d4356" d="M11 145.288H8a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4Z"></path><path fill="#0bceb2" d="M118.154 153.288h-8.308a2.006 2.006 0 0 0 0 4h8.308a2.006 2.006 0 0 0 0-4zm-60 0h-8.308a2.006 2.006 0 0 0 0 4h8.308a2.006 2.006 0 0 0 0-4zm45.846 0H64a2 2 0 0 0 0 4h15.94v2H72a2 2 0 0 0 0 4h25a2 2 0 0 0 0-4h-8.94v-2H104a2 2 0 0 0 0-4z"></path><path fill="#2d4356" d="M160 145.288h-3a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4Z"></path><circle cx="166" cy="147.288" r="2" fill="#2d4356"></circle><path fill="#2d4356" d="M150.72 145.288h-6.63a1.659 1.659 0 0 1 .14-.13c2.07-2.26 3.76-6.96 3.76-10.46v-14.2a1.476 1.476 0 0 0 0-.42v-9.57a33.73 33.73 0 0 0-.45-4.96 2.112 2.112 0 0 0-.07-.45 37.8 37.8 0 0 0-1.62-6.5l-1.5-4.05a54.798 54.798 0 0 0-5.69-10.69l-22.04-30.71a14.215 14.215 0 0 0-10.29-5.28h-6a6.997 6.997 0 0 0-7 6.98v12.26a2 2 0 0 0 4 0v-12.26a2.992 2.992 0 0 1 3-2.98h6a10.2 10.2 0 0 1 7.04 3.61l12.68 17.67 2.68 3.74 4.41 6.14 2.65 3.72a53.08 53.08 0 0 1 3.91 7.08l1.97 5.01.43 1.15a33.474 33.474 0 0 1 1.36 5.39l.53 6.94v22.38a13.82 13.82 0 0 1-2.71 7.75c-1.36 1.49-4.84 2.84-7.29 2.84h-20.33a11.045 11.045 0 0 1-7.33-3.55l-9.28-11.81a17.49 17.49 0 0 1-3.06-8.82v-17.56a2.02 2.02 0 0 0-.22-.93l-3.8-7.24v-55.87a1.618 1.618 0 0 0 .01-.22 2.005 2.005 0 0 0-4.01 0v56.58a1.97 1.97 0 0 0 .23.93l3.79 7.24v17.07a21.353 21.353 0 0 0 3.91 11.29l9.28 11.81a10.001 10.001 0 0 0 1 1.08H63.8a10.122 10.122 0 0 0 1.01-1.08l9.27-11.81a21.24 21.24 0 0 0 3.91-11.29v-17.07l3.8-7.24a1.97 1.97 0 0 0 .23-.93v-56.58a2.006 2.006 0 0 0-2-2h-.03a1.989 1.989 0 0 0-1.98 2 1.618 1.618 0 0 0 .01.22v55.87l-3.8 7.24a2.031 2.031 0 0 0-.23.93v17.56a17.477 17.477 0 0 1-3.05 8.82l-9.28 11.81a11.066 11.066 0 0 1-7.33 3.55H33.99c-2.44 0-5.92-1.35-7.28-2.84a13.827 13.827 0 0 1-2.72-7.75v-22.4l.55-6.95a32.851 32.851 0 0 1 1.35-5.36l.43-1.17 1.98-5.02a53.943 53.943 0 0 1 3.91-7.06l2.65-3.72 4.41-6.15 2.68-3.73 12.67-17.66a10.2 10.2 0 0 1 7.04-3.61h6a2.998 2.998 0 0 1 3 2.98v12.26a2 2 0 0 0 4 0v-12.26a6.997 6.997 0 0 0-7-6.98h-6a14.215 14.215 0 0 0-10.29 5.28l-22.04 30.71a54.805 54.805 0 0 0-5.69 10.69l-1.5 4.05a40.96 40.96 0 0 0-2.15 11.91v24.19c0 3.51 1.69 8.2 3.77 10.46a1.668 1.668 0 0 1 .14.13h-6.62a2.017 2.017 0 1 0 0 4h133.44a2.017 2.017 0 1 0 0-4Z"></path><path fill="#0bceb2" d="M143.99 119.918v7.2c-5.56 5.7-14.17 6.5-20.78 6.5H106.5a2.001 2.001 0 0 1-1.48-.66c-4.55-5.06-6.72-12.08-6.42-20.86.31-9.51-2.11-16.57-7.19-20.97a17.22 17.22 0 0 0-1.44-1.11v-4.67a21.7 21.7 0 0 1 3.46 2.27h11.78a21.995 21.995 0 0 0 20.61-14.06 2.058 2.058 0 0 1 .23-.41l2.68 3.74a25.958 25.958 0 0 1-23.52 14.73h-7.95a24.442 24.442 0 0 1 3.22 6h11.74a21.991 21.991 0 0 0 20.6-14.06 2.025 2.025 0 0 1 .32-.53l2.65 3.72a25.955 25.955 0 0 1-23.57 14.87h-10.54a38.17 38.17 0 0 1 .85 6h16.69a21.98 21.98 0 0 0 20.48-13.79l1.97 5.01a25.907 25.907 0 0 1-22.45 12.78H102.6c-.01.21 0 .41-.01.62a37.375 37.375 0 0 0 .34 6.38h20.28a22.005 22.005 0 0 0 20.25-13.24l.53 6.94a25.993 25.993 0 0 1-20.78 10.3H103.8a20.328 20.328 0 0 0 3.62 7h15.79c11.55 0 17.98-3 20.78-9.7zm-65.97-34.56v4.68c-.49.34-.97.7-1.43 1.09-5.07 4.4-7.49 11.46-7.18 20.97.29 8.78-1.87 15.8-6.42 20.86a2.007 2.007 0 0 1-1.49.66H44.79c-6.61 0-15.23-.8-20.8-6.51v-7.24c2.8 6.73 9.23 9.75 20.8 9.75h15.8a20.328 20.328 0 0 0 3.62-7H44.79a26.007 26.007 0 0 1-20.8-10.32l.55-6.95a22.006 22.006 0 0 0 20.25 13.27h20.29a37.375 37.375 0 0 0 .34-6.38c-.01-.21-.01-.41-.01-.62H48.79a25.937 25.937 0 0 1-22.47-12.8l1.98-5.02a21.966 21.966 0 0 0 20.49 13.82h16.69a38.17 38.17 0 0 1 .85-6H55.79a25.951 25.951 0 0 1-23.58-14.88l2.65-3.72a2.115 2.115 0 0 1 .33.54 21.991 21.991 0 0 0 20.6 14.06h11.74a24.442 24.442 0 0 1 3.22-6h-7.96a25.959 25.959 0 0 1-23.52-14.75l2.68-3.73a2.178 2.178 0 0 1 .24.42 21.991 21.991 0 0 0 20.6 14.06h11.79a20.812 20.812 0 0 1 3.44-2.26z"></path></svg>
                {x.label}
            </button></p>
            )}
        </div>
        {/* SHOW IMAGE PREDICTED */}
        <div className="flex flex-col items-center">
            <label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <div className="border-2 rounded-lg w-[600px] lg:w-[850px] h-[600px] relative cursor-pointer imagef">
                    {!image ? (
                        <div className="flex flex-col items-center justify-center h-full select-none	">
                            <CiImageOff className="text-9xl" />
                            <p className="font-bold text-xl">No Image Selected</p>
                            <p className="text-gray-500">Click here to select image</p>
                            
                        </div>
                    ) : (
                        <MapInteractionCSS>
                            <img
                            id="image"
                            src={image}
                            alt="Selected Image"
                            className="w-[600px] md:w-[850px] h-[600px] object-contain"
                            />
                        </MapInteractionCSS>
                    )}
                    <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-2 w-[250px] md:w-fit absolute left-0 right-0 bottom-4 ml-auto mr-auto [&>button]:flex [&>button]:items-center [&>button]:shadow-lg [&>button]:h-[40px] [&>button]:w-fit [&>button]:min-w-[45px] " >
                        <ActionButton
                            disabled={!image}
                            onClick={handleFlipX}
                            label={<><TbFlipVertical /></>}
                        />
                        <ActionButton
                            disabled={!image}
                            onClick={handleFlipY}
                            label={<><TbFlipHorizontal /></>}
                        />
                        <ActionButton
                            disabled={!image}
                            onClick={handleRotateLeft}
                            label={<><BiRotateLeft /></>}
                        />
                        <ActionButton
                            disabled={!image}
                            onClick={handleRotateRight}
                            label={<><BiRotateRight /></>}
                        />
                        <ActionButton
                            disabled={!image}
                            onClick={handleDownload}
                            label={
                                <>
                                    <HiDownload className="inline-block" />
                                    <p className="select-none">Download</p>
                                    {imageDataFileSize && (
                                        <sub className="ml-0.5 font-mono text-xs">{'('}{fileSizetoMB(imageDataFileSize)} MB{')'}</sub>
                                    )}
                                </>
                            }
                        />
                    </div>
                </div >
            </label>
        </div>
        {/* OUTPUT */}
        <div className="flex flex-col items-center">
            <label>
            <center class="font-sans text-2xl font-bold mb-2">OUTPUT</center>
                <div className="border-2 rounded-lg w-[300px] lg:w-[280px] h-[400px] overflow-y-scroll no-scrollbar">
                    
                    {!label ? (
                        
                        <p></p>
                    ) : ( pred=="None"?
                        <ul class="w-[245px] mt-6 ml-4 text-xl">
                        {label.map((item, index) => (
                            <li key={index}>
                                <div class="mb-1 text-base font-medium text-blue-700 dark:text-sky-500">{item}</div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-200">
                                <div class="bg-sky-500 h-2.5 rounded-full" style={{width: `${item.split(":")[1].trim()}`}}></div>
                            </div></li>
                        ))}
                    </ul>:
                     
                    <div><ul class="w-[245px] mt-6 ml-4 text-xl">
                        {label.map((item, index) => (
                            <li key={index}>
                                <div class="mb-1 text-base font-medium text-blue-700 dark:text-sky-500">{item}</div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-200">
                                <div class="bg-sky-500 h-2.5 rounded-full" style={{width: `${item.split(":")[1].trim()}`}}></div>
                            </div></li>
                        ))}
                    </ul> 
                    <div class="mb-1 mt-12 text-base text-center font-medium text-red-700 dark:text-red-500">RESULT: {pred}</div>
                    
                    </div>
                    )}
                    
                </div >
            </label>
            <div class="font-sans text-xl font-bold mt-5 ml-3"><button type="button" class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2" onClick={handleOpenModal}>
                <svg class="w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><path fill="#2d4356" d="M44.15 43.288a3 3 0 1 0-3-3 3.003 3.003 0 0 0 3 3zm0-4.5a1.5 1.5 0 1 1-1.5 1.5 1.501 1.501 0 0 1 1.5-1.5zm114.155 29.5a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm-60-32a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm60-33a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2zm0 3a1 1 0 1 1 1-1 1.001 1.001 0 0 1-1 1zm-141 6.798a2 2 0 1 0-2 2 2.002 2.002 0 0 0 2-2zm-3 0a1 1 0 1 1 1 1 1.001 1.001 0 0 1-1-1z"></path><path fill="#0bceb2" d="m9.915 58.554 1.487-1.956-.939-.532-.954 2.19h-.032l-.969-2.174-.956.548 1.472 1.909v.031l-2.301-.298v1.064l2.316-.297v.032l-1.487 1.908.892.564 1.018-2.207h.03l.939 2.191.986-.563-1.502-1.878v-.031l2.362.281v-1.064l-2.362.313v-.031zM66 6.442l-.856 1.099.514.324.586-1.27h.018l.54 1.261.568-.324-.865-1.082v-.018l1.36.163v-.613l-1.36.18v-.018l.856-1.126-.54-.306-.55 1.261h-.018l-.558-1.253-.551.316.848 1.099v.018l-1.325-.171v.613L66 6.424v.018zM155.305 47.002v-1.044l-2.317.307v-.03l1.458-1.919-.921-.521-.936 2.148h-.031l-.951-2.133-.937.537 1.443 1.873v.03l-2.257-.292v1.044l2.272-.291v.03l-1.458 1.872.875.553.998-2.164h.03l.921 2.148.967-.552-1.473-1.842v-.03l2.317.276zM116.748 18.874l1.258-1.654-.795-.45-.807 1.853h-.027l-.82-1.84-.809.463 1.245 1.615v.027l-1.946-.252v.9l1.959-.251v.026l-1.258 1.615.755.477.861-1.867h.026l.795 1.854.834-.477-1.271-1.589v-.026l1.998.238v-.9l-1.998.265v-.027z"></path><circle cx="2" cy="147.288" r="2" fill="#2d4356"></circle><path fill="#2d4356" d="M11 145.288H8a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4Z"></path><path fill="#0bceb2" d="M118.154 153.288h-8.308a2.006 2.006 0 0 0 0 4h8.308a2.006 2.006 0 0 0 0-4zm-60 0h-8.308a2.006 2.006 0 0 0 0 4h8.308a2.006 2.006 0 0 0 0-4zm45.846 0H64a2 2 0 0 0 0 4h15.94v2H72a2 2 0 0 0 0 4h25a2 2 0 0 0 0-4h-8.94v-2H104a2 2 0 0 0 0-4z"></path><path fill="#2d4356" d="M160 145.288h-3a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4Z"></path><circle cx="166" cy="147.288" r="2" fill="#2d4356"></circle><path fill="#2d4356" d="M150.72 145.288h-6.63a1.659 1.659 0 0 1 .14-.13c2.07-2.26 3.76-6.96 3.76-10.46v-14.2a1.476 1.476 0 0 0 0-.42v-9.57a33.73 33.73 0 0 0-.45-4.96 2.112 2.112 0 0 0-.07-.45 37.8 37.8 0 0 0-1.62-6.5l-1.5-4.05a54.798 54.798 0 0 0-5.69-10.69l-22.04-30.71a14.215 14.215 0 0 0-10.29-5.28h-6a6.997 6.997 0 0 0-7 6.98v12.26a2 2 0 0 0 4 0v-12.26a2.992 2.992 0 0 1 3-2.98h6a10.2 10.2 0 0 1 7.04 3.61l12.68 17.67 2.68 3.74 4.41 6.14 2.65 3.72a53.08 53.08 0 0 1 3.91 7.08l1.97 5.01.43 1.15a33.474 33.474 0 0 1 1.36 5.39l.53 6.94v22.38a13.82 13.82 0 0 1-2.71 7.75c-1.36 1.49-4.84 2.84-7.29 2.84h-20.33a11.045 11.045 0 0 1-7.33-3.55l-9.28-11.81a17.49 17.49 0 0 1-3.06-8.82v-17.56a2.02 2.02 0 0 0-.22-.93l-3.8-7.24v-55.87a1.618 1.618 0 0 0 .01-.22 2.005 2.005 0 0 0-4.01 0v56.58a1.97 1.97 0 0 0 .23.93l3.79 7.24v17.07a21.353 21.353 0 0 0 3.91 11.29l9.28 11.81a10.001 10.001 0 0 0 1 1.08H63.8a10.122 10.122 0 0 0 1.01-1.08l9.27-11.81a21.24 21.24 0 0 0 3.91-11.29v-17.07l3.8-7.24a1.97 1.97 0 0 0 .23-.93v-56.58a2.006 2.006 0 0 0-2-2h-.03a1.989 1.989 0 0 0-1.98 2 1.618 1.618 0 0 0 .01.22v55.87l-3.8 7.24a2.031 2.031 0 0 0-.23.93v17.56a17.477 17.477 0 0 1-3.05 8.82l-9.28 11.81a11.066 11.066 0 0 1-7.33 3.55H33.99c-2.44 0-5.92-1.35-7.28-2.84a13.827 13.827 0 0 1-2.72-7.75v-22.4l.55-6.95a32.851 32.851 0 0 1 1.35-5.36l.43-1.17 1.98-5.02a53.943 53.943 0 0 1 3.91-7.06l2.65-3.72 4.41-6.15 2.68-3.73 12.67-17.66a10.2 10.2 0 0 1 7.04-3.61h6a2.998 2.998 0 0 1 3 2.98v12.26a2 2 0 0 0 4 0v-12.26a6.997 6.997 0 0 0-7-6.98h-6a14.215 14.215 0 0 0-10.29 5.28l-22.04 30.71a54.805 54.805 0 0 0-5.69 10.69l-1.5 4.05a40.96 40.96 0 0 0-2.15 11.91v24.19c0 3.51 1.69 8.2 3.77 10.46a1.668 1.668 0 0 1 .14.13h-6.62a2.017 2.017 0 1 0 0 4h133.44a2.017 2.017 0 1 0 0-4Z"></path><path fill="#0bceb2" d="M143.99 119.918v7.2c-5.56 5.7-14.17 6.5-20.78 6.5H106.5a2.001 2.001 0 0 1-1.48-.66c-4.55-5.06-6.72-12.08-6.42-20.86.31-9.51-2.11-16.57-7.19-20.97a17.22 17.22 0 0 0-1.44-1.11v-4.67a21.7 21.7 0 0 1 3.46 2.27h11.78a21.995 21.995 0 0 0 20.61-14.06 2.058 2.058 0 0 1 .23-.41l2.68 3.74a25.958 25.958 0 0 1-23.52 14.73h-7.95a24.442 24.442 0 0 1 3.22 6h11.74a21.991 21.991 0 0 0 20.6-14.06 2.025 2.025 0 0 1 .32-.53l2.65 3.72a25.955 25.955 0 0 1-23.57 14.87h-10.54a38.17 38.17 0 0 1 .85 6h16.69a21.98 21.98 0 0 0 20.48-13.79l1.97 5.01a25.907 25.907 0 0 1-22.45 12.78H102.6c-.01.21 0 .41-.01.62a37.375 37.375 0 0 0 .34 6.38h20.28a22.005 22.005 0 0 0 20.25-13.24l.53 6.94a25.993 25.993 0 0 1-20.78 10.3H103.8a20.328 20.328 0 0 0 3.62 7h15.79c11.55 0 17.98-3 20.78-9.7zm-65.97-34.56v4.68c-.49.34-.97.7-1.43 1.09-5.07 4.4-7.49 11.46-7.18 20.97.29 8.78-1.87 15.8-6.42 20.86a2.007 2.007 0 0 1-1.49.66H44.79c-6.61 0-15.23-.8-20.8-6.51v-7.24c2.8 6.73 9.23 9.75 20.8 9.75h15.8a20.328 20.328 0 0 0 3.62-7H44.79a26.007 26.007 0 0 1-20.8-10.32l.55-6.95a22.006 22.006 0 0 0 20.25 13.27h20.29a37.375 37.375 0 0 0 .34-6.38c-.01-.21-.01-.41-.01-.62H48.79a25.937 25.937 0 0 1-22.47-12.8l1.98-5.02a21.966 21.966 0 0 0 20.49 13.82h16.69a38.17 38.17 0 0 1 .85-6H55.79a25.951 25.951 0 0 1-23.58-14.88l2.65-3.72a2.115 2.115 0 0 1 .33.54 21.991 21.991 0 0 0 20.6 14.06h11.74a24.442 24.442 0 0 1 3.22-6h-7.96a25.959 25.959 0 0 1-23.52-14.75l2.68-3.73a2.178 2.178 0 0 1 .24.42 21.991 21.991 0 0 0 20.6 14.06h11.79a20.812 20.812 0 0 1 3.44-2.26z"></path></svg>
                Save result
            </button></div>
            <NewRecordModal 
            open={modalIsOpen}
            onClose={handleCloseModal}
            onSuccess={handleOpenSuccess}
            im={rawimg}
            rsimage={image}
            rspred={label}
            pred={pred}
           />
           <SuccessModal open={modalSuccess} onClose={handleCloseSuccess}/>
    
            
        </div>
        </div>
        </div>
    );
};

export default Home;
