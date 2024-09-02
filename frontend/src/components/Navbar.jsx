import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';

export function Navbar() {

    const navigate = useNavigate();

    const { name } = useContext(ProjectContext);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'>
            <p className='prata-regular w-36 text-3xl'>{name}</p>
        </Link>

        <div className='flex items-center gap-6'>
            <div className="group relative">
                <Link to='/login'><img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" /></Link>
                <div className='absolute right-0 hidden pt-4 group-hover:block'>
                    <div className='flex w-36 flex-col gap-2 rounded bg-slate-100 px-5 py-3 text-gray-500'>
                        <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>
                    </div>

                </div>
            </div>
        </div>
        
    </div>
  )
}
