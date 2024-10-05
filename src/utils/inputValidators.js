const regexCharactersSpaces = /[!@#\$%\^\&*\)\(+=._-\s]/g;

const fielsRequired = value =>
    (value != '') || false;

const fielsCheckSize = value =>
    (value.length >= 3) || false;

const emailValidator = email =>
    (/.+@.+\..+/.test(email)) || false;

const phoneValidator = phone =>
    ((phone.replace(/\D/g, '')).length === 11) || false;

const charactersAndSpaces = (string) => {
    return regexCharactersSpaces.test(string);

};
const isAnyShiftOpen = (schedules) => {
    return schedules.some(day => {
        const daySchedules = Object.values(day)[0];
        return Object.values(daySchedules).some(shift => shift.open !== null && shift.close !== null);
    });
};


export {
    fielsRequired,
    emailValidator,
    phoneValidator,
    charactersAndSpaces,
    fielsCheckSize,
    isAnyShiftOpen
}