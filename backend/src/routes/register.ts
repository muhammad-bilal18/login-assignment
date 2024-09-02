import { User } from '../models/user';
import { upload } from '../middlewares/multer';
import { cloudinary } from '../utils/cloudinary';
import { validateNames } from '../models/user';

import express from 'express';
const router = express.Router();

const cloud = cloudinary();


router.post('/', upload.single('img'), async (req, res) => {

    const img = req.file;
    const data = JSON.parse(req.body.data);
    const { firstName, lastName, email, password, dob, country, phone } = data;

    const user = await User.findOne({email: data.email});
    if(user) return res.status(400).send({message: 'Email already exist'})

    const error = validateNames({firstName, lastName});
    if(error) return res.status(400).send({message: error.details[0].message});
    
    let imgUrl = '';
    if(img) {
        const result = await cloud.uploader.upload(img.path, {
            upload_preset: 'images_preset',
            resource_type: 'image'
        });
            
        imgUrl = result.secure_url;
    }

    const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        dob,
        country,
        phone,
        profileUrl: imgUrl
    })

    const respond = await newUser.save();
    if(respond) return res.status(200).send({ message: 'Registered successfully' });
    else return res.status(500).send({ message: 'Internal db error' });
});

export default router;