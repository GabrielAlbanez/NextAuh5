"use client"
import { Button } from '@/components/ui/button';
import React, { useState, useTransition } from 'react'
import ExampleImg from "@/assets/img/9a53eda3cf0ebe3c4220360a7a140e95.jpg"
import Image from 'next/image';
import ImgUploaderGallery from '../_components/ImgUploaderGallery';
import { CldUploadWidget } from 'next-cloudinary';
import { FaEdit } from 'react-icons/fa';
import { UpdateImgYourGallery } from '@/actions/updateImgGalerry';
import { toast } from 'react-toastify';

type valuesData = {
    takeImg: Array<string> | undefined
}
export default function page() {

    const [takeImg, setTakeImg] = useState<Array<string>>([])

    const [isPending, startTransition] = useTransition()


    const handleSubmitSendingImages = (values: valuesData) => {

        console.log("img recebidas",values)

        startTransition(() => {
            UpdateImgYourGallery(values).then((data) => {
                if (data?.error) {
                    toast.error(data.error, {
                        position: "bottom-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                if (data?.success) {
                    toast.success("add img", {
                        position: "bottom-right",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }

                setTakeImg([])
            })
        })
    }


    return (
        <div className="flex items-center justify-between  w-full h-full ">
            <div className="w-full h-full flex items-center justify-center ">
                <div
                    className=" flex flex-col gap-3 items-center justify-between py-2   text-white w-1/2 rounded-md h-1/2 border-[1px] "
                >

                    <label className="text-center">
                        Select an Image to Upload
                    </label>
                    <ImgUploaderGallery imageUser={takeImg}>
                        <CldUploadWidget
                            onSuccess={(results: any) => {
                                setTakeImg((prevImages) => {
                                    const newImages = Array.isArray(results.info.url) ? results.info.url : [results.info.url];
                                    return [...prevImages, ...newImages];
                                });
                                console.log(results.info.url)


                            }}
                            signatureEndpoint={"/api/sign-image"}
                        >
                            {({ open }) => {
                                return (
                                    <button className=" flex items-center justify-center w-[100px] py-2 px-2 bg-transparent rounded-md text-white" onClick={() => open()}>
                                        <FaEdit />
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                    </ImgUploaderGallery>

                    <Button onClick={() => { handleSubmitSendingImages({takeImg}) }} disabled={isPending}>Submit</Button>
                </div>
            </div>

            <div className="h-full w-[90%] flex flex-col items-center  gap-4 pt-16">
                <h2 className="text-xl font-bold mb-4">Your images</h2>
                {/* <ul className=" w-full flex gap-4 flex-wrap items-center ">
              {sneakers.map((sneaker: CloudinaryResource) => {
                return (
           
                    <div className="relative" key={sneaker.public_id}>
                      <CldImage
                        width={300}
                        height={200}
                        src={sneaker.public_id}
                        alt={sneaker.context?.alt || ""}
                        className="rounded-lg"
                      />
                    </div>
          
                );
              })}
            </ul> */}
            </div>
        </div>
    );
};
