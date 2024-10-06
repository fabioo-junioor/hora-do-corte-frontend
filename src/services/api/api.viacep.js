const url = import.meta.env.VITE_API_VIACEP;

const getCepUser = async (cep) => {
    try {
        const response = await fetch(url+cep+'/json/', {});
        const data = await response.json();
        if(data.cep){
            return data;

        }
        return false;

    } catch(error){
        return null;

    };
};

export {
    getCepUser

};