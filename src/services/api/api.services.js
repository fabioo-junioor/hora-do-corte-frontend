const url = import.meta.env.VITE_ROOT_API;
import { getDataUser } from '../storage/settingSession.js';
const dataUser = getDataUser();
const header = { "Content-Type" : "application/json", Authorization: `Bearer ${dataUser?.token}` };

const getService = async (pkProfessional) => {
    try {
        const response = await fetch(url+`services/${pkProfessional}/getService`, {
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
const createService = async (services, pkProfessional) => {
    try {
        const response = await fetch(url+`services/createService`, {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                services: services,
                pkProfessional: pkProfessional
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const updateService = async (services, pkProfessionalServices) => {
    try {
        const response = await fetch(url+`services/${pkProfessionalServices}/updateService`, {
            headers: header,
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                services: services
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};

export {
    getService,
    createService,
    updateService

};