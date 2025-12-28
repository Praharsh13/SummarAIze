"use client"
import React, { useRef, useState } from 'react'
import UploadInput from './upload-form-input'
import { z } from 'zod'
import { useUploadThing } from '@/utils/uploadthing'
import { toast } from 'sonner'
import { generatePdfSummary } from '@/actions/upload-actions'


// const schema=z.object({
//     file:z.
//     instanceof(File,{message:'Invalid file'})
//     .refine(
//         (file)=>file.size<=20*1024*1024,
//         'File size must be less than 20MB'
//     )
//     .refine(
//         (file)=>file.type.startsWith('application/pdf'),
//         'File must be a PDF'
//     )
// })

export const schema = z.object({
    file: z
      .instanceof(File, { message: "Invalid file" })
      .refine((file) => file.size > 0, "Please select a file")
      .refine((file) => file.size <= 20 * 1024 * 1024, "File size must be less than 20MB")
      .refine((file) => file.type === "application/pdf", "File must be a PDF"),
  });

const Uploadform = () => {

    const formRef=useRef<HTMLFormElement>(null)
    const [isLoading, setLoading]=useState(false)

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
            toast.message("Uploading started", { description: file});
        }

    })

    let handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        try {

            setLoading(true)

        const formData=new FormData(e.currentTarget)
        const file=formData.get('file') as File


        //Validate file with Zod
        const validatedFeilds=schema.safeParse({file})
        if(!validatedFeilds.success){
            console.log(
                validatedFeilds.error.flatten().fieldErrors.file?.[0]?? 'Invalid File'
            );

            toast.error("Something went wrong", { description: validatedFeilds.error.flatten().fieldErrors.file?.[0]?? 'Invalid File' });
            setLoading(false)
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
              setLoading(false)
            return
        }
        toast.success("Uploaded", {
            description: "Your PDF is uploaded. Generating summary now.",
          });


          //parse the pdf using langChain

          const res = await generatePdfSummary(resp);
          console.log("summary", res);
          console.log(res.data?.text);
          setLoading(false)

          //Get summary
          const {data=null,message=null}=res || {}

          if(data){
            toast.success("Saving PDF...", {
                description: "Hang tight! We are saving your summary!",
              });
          }

          formRef.current?.reset()
            
        } catch (error) {
            setLoading(false)
            console.log(error)
            formRef.current?.reset()
        }
        

      
    }

   
  return (
    <div>
        <UploadInput 
        ref={formRef} 
        onSubmit={handleSubmit}
        isLoading={isLoading}
        />
    </div>
  )
}

export default Uploadform