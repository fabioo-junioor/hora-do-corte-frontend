const url = import.meta.env.VITE_ROOT_API;
const header = { "Content-Type" : "application/json" };

const getLastPurchasePlan = async (pkUser) => {
    try {
        const response = await fetch(url+`purchasePlan/${pkUser}/getLastPurchasePlan`, {
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
    getLastPurchasePlan

};