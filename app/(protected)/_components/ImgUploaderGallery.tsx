import React, { ReactNode, useState } from 'react';

type ImgUploaderGalleryProps = {
    imageUser: Array<string>;
    children?: ReactNode; 
}

export default function ImgUploaderGallery({ imageUser, children }: ImgUploaderGalleryProps) {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUser.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUser.length) % imageUser.length);
    };

    return (
        <div className='relative w-full h-full'>
            {imageUser.length > 0 && (
                <>
                    <img src={imageUser[currentImageIndex]} alt="User Image" className="w-full h-full object-cover  blur-md opacity-70" />
                    {imageUser.length > 1 && (<>
                        <div className="absolute inset-y-0 left-0 flex items-center justify-center w-1/12 bg-opacity-50 cursor-pointer z-50" onClick={nextImage}>
                            &lt;
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center justify-center w-1/12 bg-opacity-50 cursor-pointer z-50" onClick={prevImage}>
                            &gt;
                        </div></>)}

                </>
            )}
            {children && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[85%] h-[85%] transition-all duration-500 hover:scale-110 ">
                        {imageUser.length > 0 && (<>
                            <img src={imageUser[currentImageIndex]} alt="User Image" className=" w-full h-full object-cover rounded-xl shadow-lg" />
                        </>)}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
