import React, { useState } from "react";
import axios from 'axios';
import SuccessModal from "./success";
import RecordItem from "../manage/RecordItem";

const NewRecordModal = (props) => {
    const [name, setName] = useState(null);
    const [gender, setGender] = useState(null);
    const [idnumber, setID] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [phone, setPhone] = useState(null);

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const exday = `${day}/${month}/${year}`;

    const [validationMsg, setValidationMsg] = useState({})
    const phonevalidate = /^(\+84|0)?[1-9][0-9]{8}$/;
    const namevalidate = /^[^0-9!@#$%^&*(),.?":{}|<>_+=\[\]\\/'~`]+$/;
    const idvalidate = /^\d{9}$|^\d{12}$/;
    
    const validateAll = () => {
        const msg = {}
        if (!name) {
            msg.name = "Please input your Name"
        }else if(!namevalidate.test(name)){
            msg.name = "Please input valid Name"
        }
        if (!idnumber) {
            msg.idnumber = "Please input your ID Number"
        }else if(!idvalidate.test(idnumber)){
            msg.idnumber = "Please input valid ID Number"
        }
        if (!birthday) {
            msg.birthday = "Please input your Birthday"
        }
        if (!phone) {
            msg.phone = "Please input your Phone Number"
        }else if(!phonevalidate.test(phone)){
            msg.phone = "Please input valid Phone Number "
        }

        
        setValidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }
    
    const addnewRecord = () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return;
        }
        const isValid = validateAll()
        if (!isValid) return
        axios.post('http://127.0.0.1:8000/addrecord/', {
            "name": name,
            "gender": gender,
            "idnumber": idnumber,
            "birthday": birthday,
            "phone":    phone,
            "exday": exday,
            "image": props.im,
            "rsimage":props.rsimage,
            "label":JSON.stringify(props.rspred),
            "pred": props.pred

        },{
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        .then(res => {
            props.onClose();
            props.onSuccess();
        }).catch(error => console.log(error))
        
    };
    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };


    if (!props.open) return null;
    return (
      <dh-component>
            <div class="py-1 backdrop-blur-sm bg-white/30 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight text-center mb-2">GENERATE REPORT</h1>
                        <div class="w-full flex justify-start text-gray-600 ">
                        <svg xmlns="http://www.w3.org/2000/svg" height="52" width="52" enable-background="new 0 0 64 64" viewBox="0 0 64 64" id="cv-analysis"><path d="M18.11 3.69H9.17c-.79 0-1.44.64-1.44 1.44v10.49c0 .79.64 1.44 1.44 1.44h8.94c.03 0 .05-.01.08-.01.01 0 .01 0 .02 0 .02 0 .03-.01.05-.01.73-.07 1.3-.68 1.3-1.42V5.12C19.55 4.33 18.91 3.69 18.11 3.69zM9.17 16.06C9.17 16.06 9.17 16.06 9.17 16.06c.21-1.84 1.6-3.39 3.44-3.73.54-.1 1.06-.1 1.61 0 1.86.35 3.24 1.88 3.45 3.73H9.17zM11.57 9.69c0-1.02.83-1.84 1.84-1.84 1.02 0 1.85.83 1.85 1.84 0 .72-.42 1.35-1.07 1.66-.53-.08-1.04-.08-1.57 0C11.99 11.04 11.57 10.4 11.57 9.69zM18.57 15.43c-.37-1.69-1.54-3.09-3.14-3.75.52-.52.83-1.23.83-1.99 0-1.56-1.27-2.83-2.83-2.83-1.56 0-2.83 1.27-2.83 2.83 0 .77.31 1.47.83 1.99-1.18.49-2.12 1.39-2.69 2.51V5.12c0-.25.2-.45.45-.45h8.94c.25 0 .45.2.45.45V15.43zM15.03 19.81H9.57c-.27 0-.49.22-.49.49v5.45c0 .27.22.49.49.49h5.45c.27 0 .49-.22.49-.49v-5.45C15.52 20.03 15.3 19.81 15.03 19.81zM14.54 25.27h-4.47V20.8h4.47V25.27zM15.03 29.67H9.57c-.27 0-.49.22-.49.49v5.45c0 .27.22.49.49.49h5.45c.27 0 .49-.22.49-.49v-5.45C15.52 29.89 15.3 29.67 15.03 29.67zM14.54 35.13h-4.47v-4.47h4.47V35.13zM21.02 23.53h15.5c.27 0 .49-.22.49-.49 0-.27-.22-.49-.49-.49h-15.5c-.27 0-.49.22-.49.49C20.52 23.31 20.74 23.53 21.02 23.53zM37.01 32.89c0-.27-.22-.49-.49-.49h-15.5c-.27 0-.49.22-.49.49s.22.49.49.49h15.5C36.79 33.39 37.01 33.17 37.01 32.89zM41.19 36.27c-4.94 0-8.96 4.02-8.96 8.96 0 4.94 4.02 8.96 8.96 8.96 4.94 0 8.96-4.02 8.96-8.96C50.15 40.29 46.13 36.27 41.19 36.27zM41.19 53.21c-4.4 0-7.97-3.58-7.97-7.97 0-4.4 3.58-7.97 7.97-7.97s7.97 3.58 7.97 7.97C49.16 49.63 45.59 53.21 41.19 53.21z"></path><path d="M59.15,59.1l-5.45-5.45c-0.19-0.19-0.5-0.19-0.7,0l-1.33,1.33l-2.13-2.13c1.84-2.01,2.98-4.69,2.98-7.62
                            c0-5.95-4.62-10.84-10.46-11.28V2.4c0-1.33-1.08-2.4-2.4-2.4H6.41c-1.32,0-2.4,1.08-2.4,2.4v42.56c0,1.33,1.08,2.4,2.4,2.4h23.67
                            c1,5.22,5.6,9.19,11.11,9.19c2.95,0,5.64-1.15,7.65-3l2.13,2.13l-1.33,1.33c-0.09,0.09-0.14,0.22-0.14,0.35s0.05,0.26,0.14,0.35
                            l5.45,5.45c0.56,0.56,1.29,0.84,2.03,0.84s1.47-0.28,2.03-0.84C60.27,62.04,60.27,60.22,59.15,59.1z M29.93,46.38H6.41
                            C5.63,46.38,5,45.75,5,44.96V2.4c0-0.78,0.63-1.42,1.41-1.42h33.24c0.78,0,1.42,0.64,1.42,1.42v31.51
                            c-6.19,0.07-11.2,5.11-11.2,11.32C29.87,45.62,29.89,46,29.93,46.38z M41.19,55.57c-5.7,0-10.34-4.64-10.34-10.34
                            c0-5.7,4.64-10.34,10.34-10.34c5.7,0,10.34,4.64,10.34,10.34C51.53,50.93,46.89,55.57,41.19,55.57z M58.45,62.46
                            c-0.73,0.74-1.93,0.74-2.67,0l-5.1-5.1l2.67-2.67l5.1,5.1C59.19,60.53,59.19,61.73,58.45,62.46z"></path><path d="M43.19,44.96c0.51-0.52,0.82-1.22,0.82-1.98c0-1.56-1.27-2.82-2.83-2.82c-1.56,0-2.82,1.27-2.82,2.82
                            c0,0.76,0.31,1.47,0.82,1.99c-1.87,0.77-3.19,2.59-3.26,4.67c0,0.13,0.04,0.26,0.14,0.36c0.09,0.1,0.22,0.15,0.35,0.15l9.55,0.17
                            c0,0,0.01,0,0.01,0c0.13,0,0.25-0.05,0.35-0.14c0.09-0.09,0.15-0.22,0.15-0.35C46.46,47.65,45.13,45.75,43.19,44.96z M41.18,41.13
                            c1.02,0,1.84,0.82,1.84,1.84c0,0.72-0.42,1.35-1.06,1.65c-0.53-0.08-1.04-0.08-1.57,0c-0.64-0.3-1.06-0.94-1.06-1.65
                            C39.35,41.96,40.17,41.13,41.18,41.13z M36.95,49.17c0.27-1.77,1.65-3.22,3.43-3.56c0.55-0.1,1.05-0.1,1.6,0
                            c1.85,0.35,3.24,1.87,3.46,3.71L36.95,49.17z"></path></svg>
                            
                        </div>
                        <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-2">Enter Patient Details</h1>
                        <div class="relative mb-5">
                            <label for="name" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Name</label>
                            <input id="name" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James"  onChange={event => setName(event.target.value)}/>
                            <p className="text-red-400 text-xs italic">{validationMsg.name}</p>
                        </div>
                        <div class="relative mb-5">
                            <label for="gender" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Gender</label>
                            <select id="gender" className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={event => setGender(event.target.value)}>
                                <option value="None">None</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <label for="idnumber" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Identification Number</label>
                        <div class="relative mb-5 mt-2">
                            <div class="absolute text-gray-600 flex items-center px-4 border-r h-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-credit-card" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <rect x="3" y="5" width="18" height="14" rx="3" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                    <line x1="7" y1="15" x2="7.01" y2="15" />
                                    <line x1="11" y1="15" x2="13" y2="15" />
                                </svg>
                            </div>
                            <input id="idnumber" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border" placeholder="Enter a 9 or 12 digit ID" onChange={event => setID(event.target.value)} />
                            <p className="text-red-400 text-xs italic">{validationMsg.idnumber}</p>
                        </div>
                        <label for="expiry" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Birthday</label>
                        <div class="relative mb-5 mt-2">
                            <div class="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-event" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <rect x="4" y="5" width="16" height="16" rx="2" />
                                    <line x1="16" y1="3" x2="16" y2="7" />
                                    <line x1="8" y1="3" x2="8" y2="7" />
                                    <line x1="4" y1="11" x2="20" y2="11" />
                                    <rect x="8" y="15" width="2" height="2" />
                                </svg>
                            </div>
                            <input id="birthday" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="DD/MM/YY" onChange={event => setBirthday(event.target.value)}/>
                            <p className="text-red-400 text-xs italic">{validationMsg.birthday}</p>
                        </div>
                        <label for="phone" class="text-gray-800 text-sm font-bold leading-tight tracking-normal">Phone Number</label>
                        <div class="relative mb-10 mt-2">
                            <div class="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                            </div>
                            <input id="phone" class="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter a 10 digit" onChange={event => setPhone(event.target.value)}/>
                            <p className="text-red-400 text-xs italic">{validationMsg.phone}</p>
                        </div>
                        <input type="hidden" name="im" value={props.im}/>
                        <input type="hidden" name="rsimage" value={props.rsimage}/>
                        <input type="hidden" name="rspred" value={props.rspred}/>
                        <div class="flex items-center justify-start w-full">
                            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"  onClick={addnewRecord}>Submit</button>
                            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={props.onClose}>Cancel</button>
                        </div>
                        <button class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={props.onClose} aria-label="close modal" role="button">
                            <svg  xmlns="http://www.w3.org/2000/svg"  class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </dh-component>
  );
}

export default NewRecordModal;