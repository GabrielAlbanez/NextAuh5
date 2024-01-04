"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardFooter } from '../../components/ui/card';
import { HeaderComponent } from './Header';
import { Social } from './Social';
import { BackButton } from './Back-Button';

interface CardWrapperProps {

    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: Boolean

}

export const CardWrapper = ({ backButtonHref, children, backButtonLabel, headerLabel, showSocial }: CardWrapperProps) => {
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <HeaderComponent label={headerLabel} />
            </CardHeader>

            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                  <Social/>
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref}/>
            </CardFooter>


        </Card>
    )
}
