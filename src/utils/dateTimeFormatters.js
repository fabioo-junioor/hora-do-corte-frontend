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
const divideHoursIntoIntervals = (schedules, time) => {
    const result = {};

  schedules.forEach(day => {
    const dayWeek = Object.keys(day)[0];
    result[dayWeek] = [];

    for (const period in day[dayWeek]) {
      const { open, close } = day[dayWeek][period];
      const [startTime, startMinute] = open.split(':').map(Number);
      const [endTime, endMinute] = close.split(':').map(Number);

      const startMinutes = startTime * 60 + startMinute;
      const endMinutes = endTime * 60 + endMinute - time; // Subtrai 30 minutos do horário de fechamento

      for (let minutes = startMinutes; minutes <= endMinutes; minutes += time) {
        const time = Math.floor(minutes / 60).toString().padStart(2, '0');
        const minute = (minutes % 60).toString().padStart(2, '0');
        result[dayWeek].push(`${time}:${minute}`);
      }
    }
  });

  return result;
}

export {
    verifySchedulesAvailable,
    getDateToday,
    divideHoursIntoIntervals

};