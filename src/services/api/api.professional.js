const url = import.meta.env.VITE_ROOT_API;
import { getDataUser } from '../storage/settingSession.js';
const dataUser = getDataUser();
const header = { "Content-Type" : "application/json", Authorization: `Bearer ${dataUser?.token || ''}` };

const getAll = async (pkUser) => {
    try {
        const response = await fetch(url+`professional/${pkUser}/getAllProfessional`, {
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
const create = async (dataProfessional, pkUser) => {
    try {
        const response = await fetch(url+'professional/createProfessional', {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                name: dataProfessional.name,
                image: dataProfessional.image,
                instagram: dataProfessional.instagram,
                isUnavailable: dataProfessional.isUnavailable,
                pkUser: pkUser
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const update = async (dataProfessional, pkProfessional) => {
    try {
        const response = await fetch(url+`professional/${pkProfessional}/updateProfessional`, {
            headers: header,
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                name: dataProfessional.name,
                image: dataProfessional.image,
                instagram: dataProfessional.instagram,
                isUnavailable: dataProfessional.isUnavailable
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const deleteProf = async (pkProfessional) => {
    try {
        const response = await fetch(url+`professional/${pkProfessional}/deleteProfessional`, {
            headers: header,
            method: 'DELETE',
            mode: 'cors'
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};

export {
    getAll,
    create,
    update,
    deleteProf

};