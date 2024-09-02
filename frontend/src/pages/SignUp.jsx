import React from 'react';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';
import { registerUser } from '../utils/backendRequests';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

export function SignUp() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('pk');
    const [phone, setPhone] = useState('');
    const [img, setImg] = useState(assets.user2);
    const [profile, setProfile] = useState({});
    const [selected, setSelected] = useState(false);

    const submitHandler = async (event) => {
        event.preventDefault();
        const data = { firstName, lastName, email, dob, password, country, phone };
        const res = await registerUser(data, profile, 'POST');
        if(res.success) {
          alert(res.message);
          navigate('/login');
        }
        else alert(res.message);
    }    
  return (
    <form onSubmit={submitHandler} className='m-auto mt-10 flex w-[90%] flex-col items-center gap-4 text-gray-800 sm:max-w-96'>
  
      <div className='relative flex items-center justify-center gap-0'>
        <img className={`w-2/6 rounded-full border border-gray-800 ${selected ? 'opacity-100' : 'opacity-50'}`} src={img} alt="" />      
        <input 
          type="file"
          id="file-input"
          accept="image/*" 
          className='absolute size-0 opacity-0' 
          onChange={e => { setImg(URL.createObjectURL(e.target.files[0])); setProfile(e.target.files[0]); setSelected(true)}} 
        />
        <img
          className={`absolute mt-20 size-7 cursor-pointer ${selected ? 'opacity-50' : 'opacity-100'}`}
          src={assets.camera} alt="" 
          onClick={() => document.getElementById('file-input').click()}
          />
      </div>



      <div className='mb-2 mt-5 inline-flex items-center gap-2'>
        <p className='prata-regular text-3xl'>Sign Up</p>
      </div>

      <div className='flex gap-1'>

        <input 
            type="text" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
            className="w-1/2 border border-gray-800 px-3 py-2 focus:border-gray-800 focus:ring-0" 
            placeholder='First name' 
            required 
        />

        <input 
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-1/2 border border-gray-800 px-3 py-2 focus:border-gray-800 focus:ring-0"
            placeholder='Last name'
            required
        />
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

      <div className='flex w-full items-center bg-black'>
        <p className='w-1/3 pl-4 text-white'>Datebirth :</p>
        <input
            type="date"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
            className="w-2/3 cursor-text border border-gray-800 px-3 py-2 focus:border-gray-800 focus:ring-0" 
            required
        />
      </div>

      <PhoneInput
        required
        country={country}
        value={phone}
        autoFormat={true}
        onCountryChange={(c) => setCountry(c)}
        onChange={phone => setPhone(phone)}
        enableSearch={true}
        disableSearchIcon
        placeholder='Phone'
        buttonStyle={{
          border: 'none',
          padding: 0,
        }}
        searchStyle={{
          borderRadius: '0px',
        }}
        countryCodeEditable={true}
        enableAreaCodes={true}
        inputStyle={{
          width: '100%',
          height: '40px',
          borderRadius: '0px',
          border: '0px',
        }}
        containerClass="border border-gray-800"
        inputClass="border border-gray-800 invalid:text-red-500 focus:border-gray-800 focus:ring-0"
      />


        
      <div className='mt-[-8px] flex w-full justify-between text-sm'>
        <p className='cursor-pointer'>Forgot your password?</p>
        <p onClick={() => navigate('/login')} className='cursor-pointer'>Login here</p>
      </div>
      <button className='mt-4 bg-black px-8 py-2 font-light text-white'>Sign up</button>
    </form>
  )
}