import React from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface formErrorProps {
 message? : string;
}

export const FormError = ({message} : formErrorProps) => {
  
    if(!message) return null

    return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center justify-center gap-x-2 text-sm text-destructive'>
     <ExclamationTriangleIcon className='h-4 w-4'/>
     <p>{message}</p>
    </div>
  )
}
