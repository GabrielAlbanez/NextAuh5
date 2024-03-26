import React, { ReactNode } from 'react';
import { FaUser } from 'react-icons/fa';
import { userCurrentUser } from '@/hooks/user-current-user';

export default function ImguploadSettings({ imageUser, children }: { imageUser: string, children: ReactNode }) {
  const user = userCurrentUser();

  return (
    <div className='relative w-[100px] h-[100px]'>
      {user && user.image ? (
        <img src={user.image} alt="User Image" className="w-full h-full object-cover rounded-full" />
      ) : imageUser ? (
        <img src={imageUser} alt="Uploaded Image" className="w-full h-full object-cover rounded-full" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-sky-500 rounded-full">
          <FaUser className="text-white w-1/2 h-1/2" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
