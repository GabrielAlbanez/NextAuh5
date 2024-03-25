import React, { ReactNode } from 'react';
import { CldImage } from 'next-cloudinary';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { FaUser } from 'react-icons/fa';

export default function ImguploadSettings({ imageUser, children }: { imageUser: string, children: ReactNode }) {
  console.log("imgnnocom", imageUser)

  return (
    <div className='relative w-[100px] h-[100px]'>
      {imageUser ? (
        <img src={imageUser} alt="" className='w-full h-full object-cover rounded-full' />
      ) : (
        <Avatar className="absolute inset-0 bg-sky-500 flex items-center justify-center rounded-full">
          <FaUser className="text-white w-1/2 h-1/2" />
        </Avatar>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
