"use client"
import { Button } from '@/components/ui/button';
import React, { useEffect, useState, useTransition } from 'react'
import ExampleImg from "@/assets/img/9a53eda3cf0ebe3c4220360a7a140e95.jpg"
import Image from 'next/image';
import ImgUploaderGallery from '../_components/ImgUploaderGallery';
import { CldUploadWidget } from 'next-cloudinary';
import { FaEdit } from 'react-icons/fa';
import { UpdateImgYourGallery } from '@/actions/updateImgGalerry';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userCurrentUser } from '@/hooks/user-current-user';
import { useSession } from 'next-auth/react';
import ShowPicturesGalleryUser from '../_components/ShowPicturesGalleryUser';

type valuesData = {
    takeImg: Array<string> | undefined
}
export default function page() {

    const user = userCurrentUser()



    const [takeImg, setTakeImg] = useState<Array<string>>([])

    const [isPending, startTransition] = useTransition()

    const { update } = useSession()



    const handleSubmitSendingImages = (values: valuesData) => {

        console.log("img recebidas", values)

        if (values.takeImg!.length == 0) {
            toast.error("tem que escolher uma imagen antes de fazer o upload", {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } else {

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

                        update()
                    }

                    setTakeImg([])
                })
            })
        }


    }


    return (
        <div className="flex items-center justify-between  w-full h-full ">
            <div className="w-full h-full flex flex-col items-center gap-10 justify-center  ">


                <div className='w-1/2 h-1/2 border-[1px] rounded-xl flex flex-col items-center justify-center'>
                    <ImgUploaderGallery imageUser={takeImg}>
                        <div className=' flex flex-col items-center justify-center  w-1/2 h-1/2  '>
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
                        </div>
                    </ImgUploaderGallery>
                </div>


                <Button onClick={() => { handleSubmitSendingImages({ takeImg }) }} disabled={isPending}>Submit</Button>
            </div>

            <div className="h-full w-[90%] flex flex-col items-center justify-center  gap-4 ">
                <h2 className="text-xl font-bold mb-4">Your images</h2>
                {user!.gallery[0].length == 0 ? (<div className='w-full h-full flex justify-center items-center'><h1>vc nao tem nehuma img ainda</h1></div>) : (<>
                    <div className='w-[50%] h-[80%] border-[1px] border-white rounded-2xl flex justify-center   items-center'>

                        <ShowPicturesGalleryUser pictures={user?.gallery[0]} />

                    </div></>)}

            </div>
        </div>
    );
};