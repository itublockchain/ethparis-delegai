import React, { useState, useEffect } from 'react';
import { ProgressBar } from '.';

const DashboardComponent = ({ percentage, title, description } : { percentage: number, title: string, description: string}) => {
    return <>
    <div className='flex flex-col w-72 h-48 border-2 rounded-xl items-center justify-between p-2'>
        <h1 className='text-lg'>{title}</h1>
        <ProgressBar percentage={percentage} />
        <p>{description}</p>
    </div>
    </>
}

export { DashboardComponent }