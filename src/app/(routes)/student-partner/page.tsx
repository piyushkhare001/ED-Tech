'use client'
import React, { useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';








  function Partner () {




    const router = useRouter()


async function calling() {
    try{
        const response = await axios('/api/student-partner/register')
        if (response) {
          console.log(response , "applied for  partner ")
          router.push('/student-partner')
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
     
<Button >ok</Button>

        
        
         </div>
  )
}

export default Partner;