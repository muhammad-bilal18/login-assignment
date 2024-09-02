import { User } from '../models/user';
import { upload } from '../middlewares/multer';
import { cloudinary } from '../utils/cloudinary';
import { validateNames } from '../models/user';

import express from 'express';
const router = express.Router();

const cloud = cloudinary();

router.put('/', upload.single('img'), async (req, res) => {
    const img = req.file;
    const data = JSON.parse(req.body.data);
    const { id, firstName, lastName, email, dob, country, phone } = data;

    const user = await User.findOne({
        email: data.email,
        _id: { $ne: data.id }
    });

    if(user) return res.status(400).send({message: 'Email already exist'})
        

    const error = validateNames({ firstName, lastName });
    if (error) return res.status(400).send({ message: error.details[0].message });

    let updateData: any = { firstName, lastName, email, dob, country, phone };

    if (img) {
        const result = await cloud.uploader.upload(img.path, {
            upload_preset: 'images_preset',
            resource_type: 'image'
        });
        updateData.profileUrl = result.secure_url;
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { $set: updateData },
        { new: true }
    );

    if (!updatedUser) return res.status(404).send({ message: 'User not found' });

    return res.status(200).send({ message: 'User updated successfully', user: updatedUser });
});

export default router;