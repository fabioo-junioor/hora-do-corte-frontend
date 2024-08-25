const getDateToday = () => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    if(day < 10 && month < 10){
        return `0${day}-0${month}-${year}`;

    }
    if(day < 10 && month > 10){
        return `0${day}-${month}-${year}`;

    }
    if(day > 10 && month < 10){
        return `${day}-0${month}-${year}`;
        
    }
    return `${day}-${month}-${year}`;
   
    
}
const verifySchedulesAvailable = (dateReservation, schedules) => {
    let parts = dateReservation.split('/');
    dateReservation = new Date(parts[0], parts[1] - 1, parts[2]);
    let dayWeek = String(dateReservation).slice(0, 3);
    dayWeek = dayWeek.toLowerCase();
    
    for(let i = 0; i < schedules.length; i++){
        if(String(Object.keys(schedules[i])) === dayWeek){
            return true;

        }
    }
    return false;

}

export {
    verifySchedulesAvailable,
    getDateToday

};