import React, { useState, useEffect } from "react";
import axios from 'axios';


const ReportModal = (props) => {

    
    const [record, setRecord] = useState(null);
    useEffect(() => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        return;
      }
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/record/${props._id}`,{
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            setRecord(response.data);
          } catch (error) {
            console.error('Error fetching record:', error);
          }
        };
    
        fetchData();
      }, [props._id]);
    
    if (!props.open) return null;
    if (!record) return null;
    return (
      <dh-component>
        <div>
          {console.log(props._id)}
        </div>
          <div class="py-1 backdrop-blur-sm bg-white/30 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" class="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                    <div class="inline-flex">
                          <a class="_o6689fn flex items-center">
                                  <svg width="64" height="64" fill="currentcolor" styles="display: block">
                                    <path d="M38.96,16.56c-2.62,0-5.1-0.35-5.63-0.43c-0.27-0.04-0.45-0.29-0.41-0.56c0.04-0.27,0.29-0.45,0.56-0.41
                                    c3.86,0.58,10.32,0.8,11.27-1.08c0.42-0.84-0.29-2.22-2.07-4c-0.19-0.19-0.19-0.5,0-0.7c0.19-0.19,0.5-0.19,0.7,0
                                    c2.17,2.16,2.9,3.84,2.25,5.14C44.81,16.14,41.8,16.56,38.96,16.56z"></path><path d="M41.17,21.13c-3.37,0-6.55-0.35-7.24-0.43c-0.27-0.03-0.46-0.28-0.43-0.55c0.03-0.27,0.28-0.46,0.55-0.43
                                    c5.39,0.63,14.24,0.81,15.06-1.35c0.22-0.57-0.02-1.94-4.05-4.76c-0.22-0.16-0.28-0.46-0.12-0.69c0.16-0.22,0.46-0.28,0.69-0.12
                                    c3.54,2.47,4.98,4.41,4.41,5.91C49.29,20.65,45.11,21.13,41.17,21.13z"></path><path d="M44.62,25.88c-4.69,0-10.07-1.12-11.02-1.33c-0.27-0.06-0.43-0.32-0.38-0.59c0.06-0.26,0.31-0.44,0.59-0.38
                                    c4.09,0.89,15.1,2.56,16.89-0.32c0.59-0.95,0.08-2.45-1.52-4.45c-0.17-0.21-0.14-0.52,0.08-0.69c0.21-0.17,0.52-0.13,0.69,0.08
                                    c1.89,2.36,2.42,4.24,1.59,5.58C50.55,25.39,47.74,25.88,44.62,25.88z"></path><path d="M45.73 31.07c-5.04 0-12.13-2.79-12.53-2.95-.25-.1-.38-.39-.28-.64.1-.25.39-.38.64-.27 3.49 1.39 13.11 4.45 15.61 1.94.81-.82.81-2.26 0-4.28-.1-.25.02-.54.27-.64.25-.1.54.02.64.27.98 2.42.9 4.22-.21 5.35C48.98 30.73 47.47 31.07 45.73 31.07zM47.98 44.04c-.04 0-.09-.01-.14-.02-.26-.07-.41-.35-.34-.61.69-2.43 1.1-5.06 1.12-7.22 0-.27.22-.49.49-.49 0 0 0 0 0 0 .27 0 .49.22.49.5-.02 2.25-.44 4.98-1.16 7.49C48.39 43.9 48.19 44.04 47.98 44.04z"></path><path d="M41.78 49.29c-.1 0-.2-.03-.28-.09-4.5-3.19-8.21-13.76-8.25-13.87-.07-.2 0-.42.16-.55.17-.13.4-.14.57-.02.91.6 8.87 5.74 12.72 4.1 1.04-.44 1.67-1.34 1.93-2.76.12-.67.16-1.47.1-2.38-.02-.27.19-.5.46-.52.29-.01.5.19.52.46.06.99.02 1.87-.12 2.62-.32 1.74-1.17 2.91-2.51 3.49-3.53 1.5-9.6-1.71-12.4-3.4 1.16 2.92 4.11 9.71 7.37 12.02.22.16.27.46.12.69C42.08 49.22 41.93 49.29 41.78 49.29zM29.63 27.55h-1.2c-.53 0-1.01-.36-1.16-.87-.39-1.35-1.26-4.83-.96-7.88.08-.85.23-1.54.35-2.14.21-1 .36-1.73.11-2.64-.08-.28-.41-.6-.66-.64-1.14-.18-1.85-.87-2-1.93-.23-1.59.87-3.56 1.92-4.06.52-.25 1.02-.16 1.39.24C28.3 8.58 29.16 8.9 29.51 9c.35-.1 1.21-.41 2.09-1.37.36-.39.87-.48 1.39-.24 1.05.5 2.15 2.47 1.93 4.06-.15 1.06-.86 1.75-1.99 1.93-.28.05-.53.26-.64.57-.34.94-.73 2-.51 4.28.3 3.06-.58 6.91-.97 8.42C30.65 27.18 30.18 27.55 29.63 27.55zM26.6 8.24c-.03 0-.08.01-.14.04-.64.3-1.54 1.84-1.37 3.03.09.63.48.99 1.18 1.1.63.1 1.27.69 1.45 1.35.31 1.14.13 2.05-.09 3.1-.12.58-.26 1.23-.33 2.03-.28 2.88.55 6.21.93 7.51.03.09.11.16.21.16h1.2c.1 0 .19-.06.21-.16.38-1.46 1.23-5.17.95-8.08-.25-2.5.2-3.73.57-4.72.23-.64.77-1.1 1.41-1.2.7-.11 1.09-.47 1.18-1.1.17-1.19-.74-2.73-1.37-3.03-.16-.08-.2-.03-.24.01-.93 1.02-1.87 1.44-2.4 1.61-.1.08-.24.12-.37.11 0 0-.02 0-.03-.01-.02 0-.03 0-.03.01-.14.01-.27-.02-.38-.11-.53-.17-1.47-.59-2.4-1.61C26.67 8.27 26.65 8.24 26.6 8.24z"></path><path d="M20.07,16.56c-2.85,0-5.85-0.41-6.67-2.04c-0.65-1.29,0.08-2.97,2.25-5.14c0.19-0.19,0.5-0.19,0.7,0
                                    c0.19,0.19,0.19,0.5,0,0.7c-1.78,1.77-2.49,3.16-2.07,4c0.95,1.88,7.42,1.66,11.27,1.08c0.27-0.03,0.52,0.14,0.56,0.41
                                    c0.04,0.27-0.14,0.52-0.41,0.56C25.17,16.21,22.69,16.56,20.07,16.56z"></path><path d="M17.85,21.13c-3.94,0-8.12-0.48-8.85-2.41c-0.57-1.5,0.87-3.44,4.41-5.91c0.22-0.15,0.53-0.1,0.69,0.12
                                    c0.16,0.22,0.1,0.53-0.12,0.69c-4.03,2.82-4.27,4.19-4.05,4.76c0.82,2.16,9.67,1.98,15.06,1.35c0.27-0.03,0.51,0.16,0.55,0.43
                                    c0.03,0.27-0.16,0.51-0.43,0.55C24.41,20.78,21.22,21.13,17.85,21.13z"></path><path d="M14.41,25.88c-3.12,0-5.93-0.5-6.91-2.09c-0.83-1.34-0.3-3.22,1.59-5.58c0.17-0.21,0.48-0.25,0.69-0.08
                                    c0.21,0.17,0.25,0.48,0.08,0.69c-1.6,2-2.11,3.5-1.52,4.45c1.78,2.88,12.8,1.21,16.89,0.32c0.27-0.06,0.53,0.11,0.59,0.38
                                    c0.06,0.27-0.11,0.53-0.38,0.59C24.48,24.76,19.09,25.88,14.41,25.88z"></path><path d="M13.3 31.07c-1.75 0-3.25-.34-4.14-1.23-1.12-1.12-1.19-2.92-.21-5.34.1-.25.39-.37.64-.27.25.1.38.39.27.64-.82 2.02-.82 3.46 0 4.28 2.5 2.51 12.12-.55 15.61-1.94.25-.1.54.02.64.27.1.25-.02.54-.28.64C25.43 28.28 18.34 31.07 13.3 31.07zM45.64 35.85c-4.91 0-12.19-3.74-12.57-3.94-.24-.13-.34-.42-.21-.66.13-.24.42-.33.66-.21 3.14 1.63 11.9 5.38 14.69 3.16.95-.76 1.15-2.23.6-4.38-.07-.26.09-.53.35-.6.26-.07.53.09.6.35.66 2.56.34 4.37-.94 5.39C48.03 35.6 46.92 35.85 45.64 35.85z"></path><path d="M13.38,35.85c-1.28,0-2.39-0.25-3.19-0.88c-1.28-1.02-1.6-2.83-0.94-5.39c0.07-0.26,0.34-0.42,0.6-0.35
                                      c0.26,0.07,0.42,0.34,0.35,0.6c-0.55,2.15-0.35,3.62,0.6,4.38c2.79,2.22,11.55-1.53,14.69-3.16c0.24-0.12,0.54-0.03,0.66,0.21
                                      c0.13,0.24,0.03,0.54-0.21,0.66C25.57,32.1,18.3,35.85,13.38,35.85z"></path><path d="M14.94 50.15c-2.99 0-5.48-8.4-5.53-13.91-.13-.76-.17-1.62-.11-2.57.02-.27.22-.48.52-.46.27.02.48.25.46.52-.05.89-.02 1.68.1 2.37 0 0 0 .01 0 .01.26 1.41.89 2.31 1.93 2.75 3.87 1.64 11.82-3.51 12.71-4.1l0 0c.18-.13.44-.12.61.03.11.1.17.23.17.37 0 .07-.01.14-.04.2C25.42 36.36 20.45 50.14 14.94 50.15zM10.58 38.82c.63 5.02 2.74 10.35 4.36 10.35 3.66-.01 7.64-8.28 9.41-12.8-2.8 1.7-8.86 4.92-12.41 3.41C11.41 39.55 10.95 39.23 10.58 38.82zM29.74 32.05h-.46c-1.19 0-2.16-.97-2.16-2.16v-.2c0-.27.22-.49.49-.49h3.79c.27 0 .49.22.49.49v.2C31.9 31.09 30.93 32.05 29.74 32.05zM28.15 30.19c.13.51.59.88 1.14.88h.46c.55 0 1.01-.38 1.14-.88H28.15zM29.74 36.21h-.46c-1.19 0-2.16-.97-2.16-2.16v-.2c0-.27.22-.49.49-.49h3.79c.27 0 .49.22.49.49v.2C31.9 35.25 30.93 36.21 29.74 36.21zM28.15 34.35c.13.51.59.88 1.14.88h.46c.55 0 1.01-.38 1.14-.88H28.15zM29.74 40.37h-.46c-1.19 0-2.16-.97-2.16-2.16v-.2c0-.27.22-.49.49-.49h3.79c.27 0 .49.22.49.49v.2C31.9 39.41 30.93 40.37 29.74 40.37zM28.15 38.51c.13.51.59.88 1.14.88h.46c.55 0 1.01-.38 1.14-.88H28.15zM29.74 44.53h-.46c-1.19 0-2.16-.97-2.16-2.16v-.2c0-.27.22-.49.49-.49h3.79c.27 0 .49.22.49.49v.2C31.9 43.57 30.93 44.53 29.74 44.53zM28.15 42.67c.13.51.59.88 1.14.88h.46c.55 0 1.01-.38 1.14-.88H28.15zM29.74 48.69h-.46c-1.19 0-2.16-.97-2.16-2.16v-.2c0-.27.22-.49.49-.49h3.79c.27 0 .49.22.49.49v.2C31.9 47.73 30.93 48.69 29.74 48.69zM28.15 46.83c.13.51.59.88 1.14.88h.46c.55 0 1.01-.38 1.14-.88H28.15z"></path><path d="M41.38,57.4H2.87c-0.27,0-0.49-0.22-0.49-0.49V0.49C2.38,0.22,2.6,0,2.87,0h53.28c0.27,0,0.49,0.22,0.49,0.49v44.06
                                  c0,0.27-0.22,0.49-0.49,0.49c-0.27,0-0.49-0.22-0.49-0.49V0.98H3.37v55.44h38.02c0.27,0,0.49,0.22,0.49,0.49
                                  C41.88,57.18,41.66,57.4,41.38,57.4z"></path><path d="M8.93 54.06H6.21c-.27 0-.49-.22-.49-.49v-2.72c0-.27.22-.49.49-.49s.49.22.49.49v2.23h2.23c.27 0 .49.22.49.49C9.42 53.84 9.2 54.06 8.93 54.06zM6.21 7.05c-.27 0-.49-.22-.49-.49V3.84c0-.27.22-.49.49-.49h2.72c.27 0 .49.22.49.49S9.2 4.33 8.93 4.33H6.7v2.23C6.7 6.83 6.48 7.05 6.21 7.05zM52.81 7.04c-.27 0-.49-.22-.49-.49V4.33H50.1c-.27 0-.49-.22-.49-.49s.22-.49.49-.49h2.72c.27 0 .49.22.49.49v2.72C53.31 6.82 53.09 7.04 52.81 7.04zM50.93 64c-5.9 0-10.69-4.8-10.69-10.69 0-5.9 4.8-10.69 10.69-10.69 5.9 0 10.69 4.8 10.69 10.69C61.62 59.2 56.82 64 50.93 64zM50.93 43.6c-5.35 0-9.71 4.35-9.71 9.71s4.35 9.71 9.71 9.71 9.71-4.35 9.71-9.71S56.28 43.6 50.93 43.6z"></path><path d="M48.67,58.54c-0.38,0-0.73-0.15-0.99-0.41l-3.17-3.17c-0.55-0.55-0.55-1.43,0-1.98c0.53-0.53,1.45-0.53,1.98,0l2.18,2.18
                                l6.69-6.69c0.54-0.55,1.43-0.55,1.98,0c0.55,0.55,0.55,1.43,0,1.98l-7.67,7.67C49.4,58.4,49.05,58.54,48.67,58.54z M45.5,53.56
                                c-0.11,0-0.21,0.04-0.29,0.12c-0.16,0.16-0.16,0.42,0,0.59l3.17,3.17c0.16,0.16,0.43,0.16,0.58,0l7.67-7.68
                                c0.16-0.16,0.16-0.42,0-0.59c-0.16-0.16-0.42-0.16-0.58,0l-7.03,7.03c-0.19,0.19-0.5,0.19-0.7,0l-2.53-2.53
                                C45.72,53.6,45.61,53.56,45.5,53.56z"></path>
                                  </svg>
                                  <label class="text-xl font-mono font-semibold">Chest Xray Abnormalities</label>
                          </a>
                      </div> 
                      <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight text-center mb-5">DIAGNOSTIC REPORT</h1>
                        <div class="relative mb-2">
                        <div class="grid grid-cols-3 gap-0">
                            <label for="name" class="flex justify-start text-gray-800 text-sm font-bold leading-tight tracking-normal col-span-2">Name: {record.name} </label>
                            <label for="name" class="flex justify-start text-gray-800 text-sm font-bold leading-tight tracking-normal ">Gender: {record.gender} </label>
                        </div>
                        </div>
                        <div class="relative mb-2">
                            <label for="birthday" class="flex justify-start text-gray-800 text-sm font-bold leading-tight tracking-normal">Birth Day: {record.birthday}</label>
                        </div>
                        <div class="relative mb-2">
                            <label for="ID" class="flex justify-start text-gray-800 text-sm font-bold leading-tight tracking-normal">Identification Number: {record.idnumber}</label>
                        </div>
                        <div class="relative mb-2">
                            <label for="phone" class="flex justify-start text-gray-800 text-sm font-bold leading-tight tracking-normal">Phone: {record.phone}</label>
                        </div>
                        <div class="relative mb-2">
                            <label for="exday" class="flex justify-start text-gray-800 text-sm font-bold leading-tight tracking-normal">Execution Day: {record.exday}</label>
                        </div>
                        <div class="relative mb-2">
                            <label for="pred" class="flex justify-start text-gray-800 text-sm font-bold leading-tight tracking-normal">Predict Result: {record.pred}</label>
                        </div>
                        {record.label !="[]" ?
                        <div class="relative mb-2">
                          <div class="grid grid-cols-8 gap-0">
                            <label for="result" class="flex justify-start text-gray-800 text-sm font-bold leading-tight tracking-normal ">Result:  </label>
                            {JSON.parse(record.label).map((label) => (
                              <p class="flex justify-start text-gray-800 text-sm font-bold leading-tight tracking-normal col-start-2 col-span-7 ">{label} </p>
                            ))}
                            </div>
                        </div>
                        :<label for="result" class="flex justify-start text-gray-800 text-sm font-bold leading-tight tracking-normal">Result: Nomal</label>}
                        <div class="relative mb-2">
                            <label for="image" class="flex justify-start float text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">Chest X-ray Image</label>
                            <div class="grid grid-cols-2 gap-0">
                            <img
                            id="image"
                            src={record.image}
                            alt="Selected Image"
                            className="w-[160px] md:w-[200px] h-[200px] object-contain"
                            />
                            <img
                            id="image"
                            src={record.rsimage}
                            alt="Selected Image"
                            className="w-[160px] md:w-[200px] h-[200px] object-contain"
                            />
                          </div>
                        </div>

                        <div class="flex items-center justify-start w-full">
                            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" >Print</button>
                            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={props.onClose}>Close</button>
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

export default ReportModal;