const url = import.meta.env.VITE_ROOT_API;
import { getDataUser } from '../storage/settingSession.js';
const dataUser = getDataUser();
const header = { "Content-Type" : "application/json", Authorization: `Bearer ${dataUser?.token}` };

const getSchedules = async (pkProfessional) => {
    try {
        const response = await fetch(url+`schedules/${pkProfessional}/getSchedule`, {
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
const createSchedules = async (schedules, pkProfessional) => {
    try {
        const response = await fetch(url+`schedules/createSchedule`, {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                schedules: schedules,
                pkProfessional: pkProfessional
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const updateSchedules = async (schedules, pkProfessionalSchedule) => {
    try {
        const response = await fetch(url+`schedules/${pkProfessionalSchedule}/updateSchedule`, {
            headers: header,
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                schedules: schedules
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};

export {
    getSchedules,
    createSchedules,
    updateSchedules

};