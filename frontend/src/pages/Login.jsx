import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { login } from '../utils/backendRequests';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(ProjectContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const res = await login({ email, password });
    if(!res.success) alert(res.message);
    else {
      setUser(res.user);
      navigate('/', { state: { user: res.user } });
    }
  }

  return (
    <form onSubmit={submitHandler} className='m-auto mt-14 flex w-[90%] flex-col items-center gap-4 text-gray-800 sm:max-w-96'>
  
      <img className='w-2/6 rounded-full border border-gray-800' src={assets.user2} alt="" />

      <div className='mb-2 mt-10 inline-flex items-center gap-2'>
        <p className='prata-regular text-3xl'>Login</p>
      </div>
      
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-800 px-3 py-2 invalid:text-red-500 focus:border-gray-800 focus:ring-0" 
        placeholder='Email' 
        required
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-800 px-3 py-2 focus:border-gray-800 focus:ring-0"
        placeholder='Password'
        required 
      />
      <div className='mt-[-8px] flex w-full justify-between text-sm'>
        <p className='cursor-pointer'>Forgot your password?</p>
        <p onClick={() => navigate('/register')} className='cursor-pointer'>Create new account</p>
      </div>
      <button className='mt-4 bg-black px-8 py-2 font-light text-white'>Login</button>
    </form>
  )
}