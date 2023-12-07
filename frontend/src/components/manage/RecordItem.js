import axios from 'axios'
import React, { useState } from "react";
import DeleteModal from '../modal/delete';
import UpdateRecordModal from '../modal/update';
import SuccessModal from '../modal/success';
import ReportModal  from '../modal/viewreport'
import Header from '../header/header';
function RecordItem(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [updateOpen, setUpdateModalIsOpen] = useState(false);
    const [reportOpen, setReportModalIsOpen] = useState(false);
    const [_id, set_id] = useState(null);
    const [_id_update, set_idUpdate] = useState(null);
    const [_id_view, set_idView] = useState(null);
    const handleOpenModal = (id) => {
        setModalIsOpen(true);
        set_id(id);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    
    const handleOpenReportModal = (id) => {
        setReportModalIsOpen(true);
        set_idView(id);
    };

    const handleCloseReportModal = () => {
        setReportModalIsOpen(false);
    };
    
    const handleOpenUpdateModal = (id) => {
        setUpdateModalIsOpen(true);
        set_idUpdate(id);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalIsOpen(false);
    };
    const [modalSuccess, setSuccess] = useState(false);
    const handleOpenSuccess = () => {
        setSuccess(true);
    };
    const handleCloseSuccess = () => {
        setSuccess(false);
    };

    const deleteRecordHandler = async (id) => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return;
        }
        axios.delete(`http://localhost:8000/deleterecord/${id}`,{
            headers: {
            Authorization: `Bearer ${accessToken}`,
            },
      }).then(res => console.log(res.data)) 
        setModalIsOpen(false);}

    
  
    return (
    <div>
      <Header/>
      <div className='h-[79vh]'>
      <div className='flex flex-col w-full' >
            <div class="pt-4 relative mx-auto text-gray-600">
            <input class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search" name="search" placeholder="Search"/>
            <button type="submit" class="absolute right-0 top-0 mt-7 mr-4">
            <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                version="1.1" id="Capa_1" x="0px" y="0px"
                viewBox="0 0 56.966 56.966" styles="enable-background:new 0 0 56.966 56.966;"
                width="512px" height="512px">
                <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
            </button>
        </div>       
    </div>
      <div class="min-w-screen flex justify-center font-sans overflow-hidden">
          <div class="w-full lg:w-5/6">
              <div class="bg-white shadow-md rounded my-3">
                  <table class="min-w-max w-full table-auto">
                      <thead>
                          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                              <th class="py-3 px-6 text-left">Name</th>
                              <th class="py-3 px-6 text-center">Identification</th>
                              <th class="py-3 px-6 text-center">Birthday</th>
                              <th class="py-3 px-6 text-center">Execution date</th>
                              <th class="py-3 px-6 text-center">Phone</th>
                              <th class="py-3 px-6 text-center">Status</th>
                              <th class="py-3 px-6 text-center">Actions</th>
                          </tr>
                      </thead>
                      <tbody class="text-gray-600 text-sm font-light">
                      {props.recordList.map(record => 
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                         width="24" height="24"
                                         viewBox="0 0 48 48"
                                         styles={{ fill: '#000000' }}>
                                        <path fill="#80deea" d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"></path><path fill="#80deea" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"></path><path fill="#80deea" d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"></path><circle cx="24" cy="24" r="4" fill="#80deea"></circle>
                                    </svg>
                                </div>
                                <span class="font-medium">{record.name}</span>
                            </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                          <span class="py-1 px-3 rounded-full text-xs font-medium">{record.idnumber}</span>
                      </td>
                        <td class="py-3 px-6 text-center">
                          <span class=" py-1 px-3 rounded-full text-xs font-medium">{record.birthday}</span>
                      </td>
                      <td class="py-3 px-6 text-center">
                        <span class="py-1 px-3 rounded-full text-xs font-medium">{record.exday}</span>
                      </td>
                        <td class="py-3 px-6 text-center">
                            <span class="py-1 px-3 rounded-full text-xs font-medium">{record.phone}</span>
                        </td>
                        {record.label !="[]" ? record.pred!="NORMAL"?
                        <td class="py-3 px-6 text-center">
                            <span class="bg-red-200 text-red-600 py-1 px-3 rounded-full text-xs">Abnormal</span>
                        </td>:
                        <td class="py-3 px-6 text-center">
                            <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Normal</span>
                        </td>:
                        <td class="py-3 px-6 text-center">
                            <span class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs">Normal</span>
                        </td>
                         }
                        
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center">
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={()=>handleOpenReportModal(record._id)}>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" onClick={()=>handleOpenUpdateModal(record._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" onClick={()=>handleOpenModal(record._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <DeleteModal open={modalIsOpen} onClose={handleCloseModal} onDelete={()=>deleteRecordHandler(_id)}/>
                                <UpdateRecordModal open={updateOpen} onSuccess={handleOpenSuccess} onClose={handleCloseUpdateModal} _id={_id_update} />
                                <SuccessModal open={modalSuccess} onClose={handleCloseSuccess}/>
                                <ReportModal open={reportOpen} onClose={handleCloseReportModal} _id={_id_view} />
                                
                            </div>
                        </td>
                    </tr>
                        )}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
      </div>
      </div>
    )
}

export default RecordItem;