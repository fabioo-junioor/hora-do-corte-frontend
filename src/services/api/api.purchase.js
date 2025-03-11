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
const createPurchasePlan = async (pkUser, pkPlan, dateToday, timeToday) => {
    try {
        const response = await fetch(url+`purchasePlan/${pkUser}/createPurchasePlan`, {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                pkPlan: pkPlan,
                purchaseDate: dateToday,
                purchaseTime: timeToday
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};

export {
    getLastPurchasePlan,
    createPurchasePlan

};