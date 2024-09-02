import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ProjectContext } from '../context/ProjectContext'

export function Footer() {
    const { name } = useContext(ProjectContext);
  return (
    <div>
        <div className='my-10 mt-40 flex grid-cols-[4fr_1fr] flex-col gap-14 text-sm sm:grid'>
            <div>
                <p src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='prata-regular mb-5 w-32 text-3xl'>{name}</p>
                
            </div>

            <div>
                <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+92 325 1097017</li>
                    <li>aslammbilal@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-center text-sm'>&copy; 2024 {name}.COM</p>
        </div>
    </div>
  )
}
