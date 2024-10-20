const setDataUser = (dataUser) => {
    localStorage.setItem('dataUser', JSON.stringify(dataUser));

};
const getDataUser = () => {
    if(localStorage.getItem('dataUser')){
        let dataUserString = localStorage.getItem('dataUser');
        let dataUserObj = JSON.parse(dataUserString);
        return dataUserObj;

    };
    return null;

};
const deleteDataUser = () => {
    localStorage.removeItem('dataUser');

};

export {
    setDataUser,
    getDataUser,
    deleteDataUser

};