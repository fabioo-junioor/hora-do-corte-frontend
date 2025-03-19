const url = import.meta.env.VITE_ROOT_API;
import { getDataUser } from '../storage/settingSession.js';
const dataUser = getDataUser();
const header = { "Content-Type" : "application/json", Authorization: `Bearer ${dataUser?.token || ''}` };

const getUserDetailsBySlug = async (slug) => {
    try {
        const response = await fetch(url+`userDetails/${slug}/getUserDetails`, {
            headers: header,
            method: 'GET',
            mode: 'cors'
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const getUserDetailsByPk = async (pkUser) => {
    try {
        const response = await fetch(url+`userDetails/${pkUser}/getUserDetailsByPk`, {
            headers: header,
            method: 'GET',
            mode: 'cors'
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const createUserDetails = async (dataUserDetails, pkUser) => {
    try {
        const response = await fetch(url+`userDetails/createUserDetails`, {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                image: dataUserDetails.image,
                name: dataUserDetails.name,
                slug: dataUserDetails.slug,
                phone: dataUserDetails.phone,
                instagram: dataUserDetails.instagram,
                cep: dataUserDetails.cep,
                state: dataUserDetails.state,
                city: dataUserDetails.city,
                street: dataUserDetails.street,
                number: dataUserDetails.number,
                pkUser: pkUser
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const updateUserDetails = async (dataUserDetails, pkUser) => {
    try {
        const response = await fetch(url+`userDetails/${pkUser}/updateUserDetails`, {
            headers: header,
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                image: dataUserDetails.image,
                name: dataUserDetails.name,
                slug: dataUserDetails.slug,
                phone: dataUserDetails.phone,
                instagram: dataUserDetails.instagram,
                cep: dataUserDetails.cep,
                state: dataUserDetails.state,
                city: dataUserDetails.city,
                street: dataUserDetails.street,
                number: dataUserDetails.number,
                pkUser: pkUser
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};

export {
    getUserDetailsBySlug,
    getUserDetailsByPk,
    createUserDetails,
    updateUserDetails

};