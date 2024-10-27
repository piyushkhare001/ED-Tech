import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

const StudentPartner = () => {
  const router = useRouter()
  return (
    <div>  
 <Button onClick = { () => {router.push('/dsp/signup')}}>Want to become student partner </Button>

    </div>
  )
}

export default StudentPartner