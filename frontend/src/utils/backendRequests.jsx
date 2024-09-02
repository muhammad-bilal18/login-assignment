import { isValidPassword, validatePhoneNumber } from "./utilityFunctions";

export async function registerUser(data, img, req) {
    const { password, country, phone } = data;
    if(req === 'POST') {
        if(!isValidPassword(password)) return 'Invalid password';
        if(!validatePhoneNumber(phone, country)) return 'Invalid phone number';
    }
    const link = (req === 'POST') ? 'http://localhost:3000/api/register' : `http://localhost:3000/api/user/update`;
    try
    {
        const formData = new FormData();
        formData.append('img', img);
        formData.append('data', JSON.stringify(data));
        const response = await fetch(link, {
            method: req,
            body: formData
        })
        const res = await response.json();
        if(response.status === 200 && req === 'POST') return { success: true, message: res.message};
        else if(response.status === 200 && req === 'PUT') return { success: true, message: res.message, user: res.user};
        else return { success: false, message: res.message};
    }
    catch(error)
    {
        return error;
    }
}

export async function login(data) {
    try
    {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await response.json();
        if(response.status === 200) return { success: true, user: res.User};
        else return { success: false, message: res.message};
    }
    catch(error)
    {
        return error;
    }
}