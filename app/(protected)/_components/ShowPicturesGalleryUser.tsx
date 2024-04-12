"use client"
import React, { useState } from 'react';

type typepropsShowPicture = {
    pictures: any
};

export default function ShowPicturesGalleryUser({ pictures }: typepropsShowPicture) {
    console.log("show pictures", pictures);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % pictures!.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + pictures!.length) % pictures!.length);
    };

    return (
        <div className='relative w-full h-full'>
            {pictures && pictures.length > 0 && (
                <>
                    <img src={pictures[currentImageIndex]} alt="User Image" className="w-full h-full object-cover blur-md opacity-70 rounded-lg border-[1px]" />
                    {pictures.length > 1 && (
                        <>
                            <div className="absolute inset-y-0 left-0 flex items-center justify-center w-1/12 bg-opacity-50 cursor-pointer z-50" onClick={nextImage}>
                                &lt;
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center justify-center w-1/12 bg-opacity-50 cursor-pointer z-50" onClick={prevImage}>
                                &gt;
                            </div>
                        </>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 hover:scale-110">
                        <img src={pictures[currentImageIndex]} alt="User Image" className="w-[80%] h-[80%] object-cover rounded-xl shadow-lg" />
                    </div>
                </>
            )}
        </div>
    );
}
