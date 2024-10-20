const url = import.meta.env.VITE_ROOT_API;
const header = { "Content-Type" : "application/json" };

const loginUser = async (dataUser) => {
    try {
        const response = await fetch(url+'user/login', {
            headers: header,
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                email: dataUser.email,
                password: dataUser.password
            })
        });
        const data = await response.json();
        return data;       

    } catch(error){
        return error;

    };
};
const createUser = async (dataUser) => {
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
const updateUser = async (dataUser) => {
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

export {
    loginUser,
    createUser,
    updateUser

};