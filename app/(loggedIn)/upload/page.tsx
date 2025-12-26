import Uploadform from '@/components/upload-page/upload-form'
import Header from '@/components/upload-page/upload-header'
import React from 'react'

const page = () => {
  return (
    <div>
        {/*Header*/ }
        <Header/>
         {/*Input*/ }
        <Uploadform/>

    </div>
  )
}

export default page