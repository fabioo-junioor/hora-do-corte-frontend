const url = import.meta.env.VITE_ROOT_API;
import { getDataUser } from '../storage/settingSession.js';
const dataUser = getDataUser();
const header = { "Content-Type" : "application/json", Authorization: `Bearer ${dataUser?.token || 'notToken'}` };

const authUser = async (token) => {
    try {
        const response = await fetch(url+'auth/authUser', {
            headers: header,
            method: 'GET',
            mode: 'cors'
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return null;

    };
};
const loginUser = async (dataUser) => {
    try {
        const response = await fetch(url+'auth/login', {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: dataUser.email,
                password: dataUser.password
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};

export {
    authUser,
    loginUser

};