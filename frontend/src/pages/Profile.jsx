import React, { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../context/ProjectContext";
import PhoneInput from "react-phone-input-2";
import { assets } from "../assets/assets";
import { registerUser } from "../utils/backendRequests";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { user, setUser } = useContext(ProjectContext);
  const [state, setState] = useState("Edit");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDOB] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");
  const [img, setImg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setDOB(user.dob);
      setCountry(user.country);
      setPhone(user.phone);
      setProfile(user.profileUrl);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  async function handleClick() {
    if (state === "Edit") {
      setState("Save");
    } else {
      const id = user._id;
      const data = { id, firstName, lastName, email, dob, country, phone };
      const res = await registerUser(data, img, 'PUT');
      if(res.success) {
        setUser(res.user)
        setState("Edit");
      }
      alert(res.message);
    }
  }

  return user ? (
    <div className="border-t-2 pt-10 opacity-100 transition-opacity duration-500 ease-in">
      <div className="flex flex-col gap-12 sm:flex-row sm:gap-12">
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="relative flex w-full items-center justify-center gap-0 sm:w-4/5">
            <img className="h-auto w-3/5 rounded-full border border-gray-800" src={profile} alt="" />
            <input
              disabled={state === 'Edit'}
              type="file"
              id="file-input"
              accept="image/*" 
              className='absolute size-0 opacity-0' 
              onChange={e => { setProfile(URL.createObjectURL(e.target.files[0])); setImg(e.target.files[0]); }} 
            />
            <img
              className={`absolute mt-56 size-7 cursor-pointer ${state === 'Edit' ? 'opacity-0' : 'opacity-100'}`}
              src={assets.camera} alt="" 
              onClick={() => document.getElementById('file-input').click()}
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex gap-1">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 border border-gray-800 px-3 py-2 focus:border-gray-800 focus:ring-0"
              placeholder="First name"
              disabled={state === 'Edit'}
              required
            />

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 border border-gray-800 px-3 py-2 focus:border-gray-800 focus:ring-0"
              placeholder="Last name"
              disabled={state === 'Edit'}
              required
            />
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-gray-800 px-3 py-2 invalid:text-red-500 focus:border-gray-800 focus:ring-0"
            placeholder="Email"
            disabled={state === 'Edit'}
            required
          />
          <div className="mt-2 flex w-full items-center bg-black">
            <p className="w-1/3 pl-4 text-white">Datebirth :</p>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
              className="w-2/3 cursor-text border border-gray-800 px-3 py-2 focus:border-gray-800 focus:ring-0"
              disabled={state === 'Edit'}
              required
            />
          </div>

          <PhoneInput
            disabled={state === 'Edit'}
            required
            country={country}
            value={phone}
            autoFormat={true}
            onCountryChange={(c) => setCountry(c)}
            onChange={(phone) => setPhone(phone)}
            enableSearch={true}
            disableSearchIcon
            placeholder="Phone"
            buttonStyle={{
              border: "none",
              padding: 0,
            }}
            searchStyle={{
              borderRadius: "0px",
            }}
            countryCodeEditable={true}
            enableAreaCodes={true}
            inputStyle={{
              width: "100%",
              height: "40px",
              borderRadius: "0px",
              border: "0px",
            }}
            containerClass="mt-2 border border-gray-800"
            inputClass="border border-gray-800 invalid:text-red-500 focus:border-gray-800 focus:ring-0"
          />

          <button
            onClick={handleClick}
            className="mt-5 bg-black px-8 py-3 text-sm text-white active:bg-gray-700"
          >
            {state}
          </button>
          <hr className="mt-8 sm:w-4/5" />
        </div>
      </div>
    </div>
  ) : <></>
}
