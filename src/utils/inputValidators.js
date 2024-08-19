const fielsRequired = value =>
    (value != '') || false;

const emailValidator = email =>
    (/.+@.+\..+/.test(email)) || false;

const phoneValidator = phone =>
    ((phone.replace(/\D/g, '')).length === 11) || false;


export {
    fielsRequired,
    emailValidator,
    phoneValidator
}