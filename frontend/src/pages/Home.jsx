import React, { useContext, useEffect } from 'react'
import { ProjectContext } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const { user } = useContext(ProjectContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) navigate('/login');
  }, [navigate, user])

  return user ? (
    <div className='mt-10 flex w-3/4 flex-col border border-gray-400 sm:flex-row'>
        <div className='flex w-full items-center justify-center py-10 sm:w-1/2 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='h-[2px] w-8 bg-[#414141] md:w-11'></p>
                    <p className='text-sm font-medium md:text-base'>{user.email}</p>
                </div>
                <h1 className='prata-regular text-3xl leading-relaxed sm:py-2 lg:text-5xl'>{user.firstName} {user.lastName}</h1>
                <div className='flex items-center gap-2'>
                    <p className='text-sm font-semibold md:text-base'>Phone: {user.phone}</p>
                    <p className='h-[2px] w-8 bg-[#414141] md:w-11'></p>
                </div>
            </div>

        </div>
        <img src={user.profileUrl} className='w-full sm:w-1/2' alt="" />
    </div>
  ) : <></>
}