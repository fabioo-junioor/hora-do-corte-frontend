const url = import.meta.env.VITE_ROOT_API;
import { getDataUser } from '../storage/settingSession.js';
const dataUser = getDataUser();
const header = { "Content-Type" : "application/json", Authorization: `Bearer ${dataUser?.token || 'notToken'}` };

const createUser = async (dataUser) => {
    try {
        const response = await fetch(url+'user/create', {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: dataUser.email,
                password: dataUser.password,
                confirmPassword: dataUser.confirmPassword
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const updateUser = async (dataUser) => {
    try {
        const response = await fetch(url+`user/${1}/update`, {
            headers: header,
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                password: dataUser.password,
                newPassword: dataUser.newPassword,
                confirmPassword: dataUser.confirmPassword
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const recoverPassUser = async (email) => {
    try {
        const response = await fetch(url+`user/recoverPassUser`, {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: email
            })
        });
        const data = await response.json();
        return data;

    } catch(error){
        return error;

    };
};

export {
    createUser,
    updateUser,
    recoverPassUser

};