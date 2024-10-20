'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';









  function Admin () {


const [data , setData] = useState(null)




async function calling() {
    try{
        const response = await axios('/api/admin/getPendingApplications')
        if (response) {
            console.log(response)
        setData(response?.data)
        }else{
          console.log("getting error into response")
        }

      }catch(err : any){
         console.log(err)
      }
    
}

useEffect( () => {
calling()
}, [])
   

  return (
    <div>
     
<div>{data}</div>

        
        
         </div>
  )
}

export default Admin;