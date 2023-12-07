import axios from 'axios'
import React, { useState, useEffect } from 'react'
import RecordItem from './RecordItem'
import Pagination from './Pagination'
import { isTokenExpired, refreshToken } from '../auth/refresh_token'
function Reports() {
    // Post a todo
    const [recordList, setRecordList] = useState([{}])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(9);
    
  
    // Read all Records
    useEffect(() => {
      const fetchData = async () => {
        await refreshToken();
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          return;
        }
    
        // Gọi API với token
        axios.get('http://localhost:8000/allrecord', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then(res => {
            setRecordList(res.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
      fetchData();
    }, []);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = recordList.slice(firstPostIndex, lastPostIndex);

    return (
            <div className='flex flex-col w-full h-[87vh]' >
            
                <div className='mb-auto'> 
                <RecordItem recordList={currentPosts} />
                </div>
           
                <Pagination
                    totalPosts={recordList.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage} />
            
            </div>
    )
}
export default  Reports;