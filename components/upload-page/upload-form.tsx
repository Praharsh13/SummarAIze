"use client"
import React from 'react'
import UploadInput from './upload-form-input'
import { z } from 'zod'
import { useUploadThing } from '@/utils/uploadthing'
import { toast } from 'sonner'


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

    const {startUpload,routeConfig}=useUploadThing('pdfUploader',{
        onClientUploadComplete:()=>{
            console.log('uploaded successfully')
            toast.success("File uploaded successfully");
        },
        onUploadError:(err)=>{
            console.log('error occured while loading',err)
            toast.error("Upload failed", { description: "Please try again." });
        },
        onUploadBegin:({file})=>{
            toast.message("Uploading started", { description: file });
        }

    })

    let handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData=new FormData(e.currentTarget)
        const file=formData.get('file') as File


        //Validate file with Zod
        const validatedFeilds=schema.safeParse({file})
        if(!validatedFeilds.success){
            console.log(
                validatedFeilds.error.flatten().fieldErrors.file?.[0]?? 'Invalid File'
            );

            toast.error("Something went wrong", { description: validatedFeilds.error.flatten().fieldErrors.file?.[0]?? 'Invalid File' });
            return;
        }

        toast.message("Processing PDF", {
            description: "Hang tight! Our AI is reading through your document.",
          });

        console.log(`clicked`)

        const resp=await startUpload([file])
        if(!resp){
            toast.error("Something went wrong", {
                description: "Please use a different file.",
              });
            return
        }
        toast.success("Uploaded", {
            description: "Your PDF is uploaded. Generating summary now.",
          });
       
    }

   
  return (
    <div>
        <UploadInput onSubmit={handleSubmit}/>
    </div>
  )
}

export default Uploadform