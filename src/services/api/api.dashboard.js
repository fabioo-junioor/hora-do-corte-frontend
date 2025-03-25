const url = import.meta.env.VITE_ROOT_API;
import { getDataUser } from '../storage/settingSession.js';
const dataUser = getDataUser();
const header = { "Content-Type" : "application/json", Authorization: `Bearer ${dataUser?.token || ''}` };

const getStatsReservations = async (pkUser) => {
    try {
        const response = await fetch(url+`dashboard/${pkUser}/statsReservations`, {
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
const getLastPurchasePlan = async (pkUser) => {
    try {
        const response = await fetch(url+`dashboard/${pkUser}/lastPurchasePlan`, {
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
const getBestProfessionals = async (pkUser) => {
    try {
        const response = await fetch(url+`dashboard/${pkUser}/bestProfessionals`, {
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

export {
    getStatsReservations,
    getLastPurchasePlan,
    getBestProfessionals

};