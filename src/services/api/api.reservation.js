const url = import.meta.env.VITE_ROOT_API;
import { getDataUser } from '../storage/settingSession.js';
const dataUser = getDataUser();
const header = { "Content-Type" : "application/json", Authorization: `Bearer ${dataUser?.token || ''}` };

const getReservation = async (pkUser) => {
    try {
        const response = await fetch(url+`reservation/${pkUser}/getAllReservation`, {
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
const getReservationByProfessional = async (pkProfessional, dateReservation) => {
    try {
        const response = await fetch(url+`reservation/${pkProfessional}/getAllReservationByProfessional`, {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                dateReservation: dateReservation
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const createReservation = async (pkUser, dataReservation, dataFormReservation) => {
    try {
        const response = await fetch(url+`reservation/createReservation`, {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                pkUser: pkUser,
                pkProfessional: dataReservation.pkProfessional,
                services: dataReservation.services,
                dateReservation: dataReservation.dateReservation,
                timeReservation: dataReservation.timeReservation,
                price: dataReservation.price,
                duration: dataReservation.duration,
                name: dataFormReservation.name,
                email: dataFormReservation.email,
                phone: dataFormReservation.phone,
                observation: dataFormReservation.observation
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};

const deleteReservation = async (pkReservation, pkUser) => {
    try {
        const response = await fetch(url+`reservation/${pkReservation}/deleteReservation`, {
            headers: header,
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify({
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
    getReservation,
    getReservationByProfessional,
    createReservation,
    deleteReservation

};