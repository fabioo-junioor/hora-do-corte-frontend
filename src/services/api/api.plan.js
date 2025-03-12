const url = import.meta.env.VITE_ROOT_API;
const header = { "Content-Type" : "application/json" };

const getAllPlans = async () => {
    try {
        const response = await fetch(url+'plan/allPlans', {
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
    getAllPlans

};