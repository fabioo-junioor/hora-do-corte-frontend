const url = import.meta.env.VITE_ROOT_API;
const header = { "Content-Type" : "application/json" };

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
/*
const create = async (dataUser) => {
    try {
        const response = await fetch(url+'user/create', {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: dataUser.email,
                password: dataUser.password,
                confirmPassword: dataUser.confirmPassword
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const update = async (dataUser) => {
    try {
        const response = await fetch(url+`user/${1}/update`, {
            headers: header,
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                password: dataUser.password,
                newPassword: dataUser.newPassword,
                confirmPassword: dataUser.confirmPassword
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
*/
export {
    getUserDetailsBySlug

};