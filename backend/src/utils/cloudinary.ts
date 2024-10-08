import cloudinary_pkg  from 'cloudinary';
import config from 'config';
export function cloudinary() {

    const cloudinary = cloudinary_pkg.v2;

    cloudinary.config({
        cloud_name: config.get('cloud_name'),
        api_key: config.get('api_key'),
        api_secret: config.get('api_secret'),
    });

    return cloudinary;
}