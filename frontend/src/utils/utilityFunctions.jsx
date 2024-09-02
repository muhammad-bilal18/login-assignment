import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

export const validatePhoneNumber = (phoneNumber, countryCode) => {
  try {
    const number = phoneUtil.parse(phoneNumber, countryCode);
    return phoneUtil.isValidNumber(number);
  } catch (error) {
    return false;
  }
};

export function isValidPassword(password) {
  const minLength = /.{8,}/;
  const hasNumber = /[0-9]/;
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasSymbol = /[!@-_#$%^&*(),.?":{}|<>]/;

  
  return minLength.test(password) &&
         hasNumber.test(password) &&
         hasLowercase.test(password) &&
         hasUppercase.test(password) &&
         hasSymbol.test(password);
}
