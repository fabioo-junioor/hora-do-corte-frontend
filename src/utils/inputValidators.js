const regexCharactersSpaces = /[!@#\$%\^\&*\)\(+=._-\s]/g;

const fielsRequired = value =>
    (value != '') || false;

const emailValidator = email =>
    (/.+@.+\..+/.test(email)) || false;

const phoneValidator = phone =>
    ((phone.replace(/\D/g, '')).length === 11) || false;

const charactersAndSpaces = (string) => {
    return regexCharactersSpaces.test(string);

};


export {
    fielsRequired,
    emailValidator,
    phoneValidator,
    charactersAndSpaces
}