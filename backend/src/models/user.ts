import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import config from 'config';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dob: String,
    country: String,
    phone: String,
    profileUrl: String
})

export const User = mongoose.model('User', userSchema);

import Joi from 'joi';

export function validateNames(data: any) {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(3).required()
    });

    return schema.validate(data).error;
}

userSchema.methods.genrateToken = function() {
    const token = jwt.sign({ _id: this._id, firstName: this.firstName, lastName: this.lastName, email: this.email }, config.get('jwtPrivateKey'));
    return token;
}