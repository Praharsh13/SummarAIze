"use client"
import React from 'react'
import UploadInput from './upload-form-input'
import { z } from 'zod'


const schema=z.object({
    file:z.
    instanceof(File,{message:'Invalid file'})
    .refine(
        (file)=>file.size<=20*1024*1024,
        'File size must be less than 20MB'
    )
    .refine(
        (file)=>file.type.startsWith('application/pdf'),
        'File must be a PDF'
    )
})

const Uploadform = () => {

    let handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData=new FormData(e.currentTarget)
        const file=formData.get('file') as File


        //Validate file with Zod
        const validatedFeilds=schema.safeParse({file})
        if(!validatedFeilds.success){
            console.log(
                validatedFeilds.error.flatten().fieldErrors.file?.[0]?? 'Invalid File'
            )
        }
        console.log(`clicked`)
        return;
    }
  return (
    <div>
        <UploadInput onSubmit={handleSubmit}/>
    </div>
  )
}

export default Uploadform