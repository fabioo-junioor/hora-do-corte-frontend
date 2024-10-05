const formatString = string => string[0].toUpperCase() + string.substring(1);

const cleanSpecialCharacters = (string) => {
    return string.replace(/\D/g, '');

};

const getDateToday = () => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = (day < 10) ? `0${day}` : `${day}`;
    month = (month < 10) ? `0${month}` : `${month}`;

    return `${day}-${month}-${year}`;
    
}
const verifySchedulesAvailable = (dateReservation, schedules) => {
    let parts = dateReservation.split('/');
    dateReservation = new Date(parts[0], parts[1] - 1, parts[2]);
    let dayWeek = String(dateReservation).slice(0, 3);
    dayWeek = dayWeek.toLowerCase();
    
    for(let i = 0; i < schedules.length; i++){
        if(((String(Object.keys(schedules[i])) === dayWeek)) && (
            (schedules[i][dayWeek]['morning']['open'] !== null) ||
            (schedules[i][dayWeek]['morning']['close'] !== null) ||
            (schedules[i][dayWeek]['afternoon']['open'] !== null) ||
            (schedules[i][dayWeek]['afternoon']['close'] !== null) ||
            (schedules[i][dayWeek]['night']['open'] !== null) || 
            (schedules[i][dayWeek]['night']['close'] !== null))){
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

          // Verificar se 'open' e 'close' não são null
          if (open && close) {
              const [startTime, startMinute] = open.split(':').map(Number);
              const [endTime, endMinute] = close.split(':').map(Number);

              const startMinutes = startTime * 60 + startMinute;
              const endMinutes = endTime * 60 + endMinute - time; // Subtrai 'time' minutos do horário de fechamento

              for (let minutes = startMinutes; minutes <= endMinutes; minutes += time) {
                  const hour = Math.floor(minutes / 60).toString().padStart(2, '0');
                  const minute = (minutes % 60).toString().padStart(2, '0');
                  result[dayWeek].push(`${hour}:${minute}`);
              }
          }
      }
  });

  return result;
};

export {
    formatString,
    cleanSpecialCharacters,
    verifySchedulesAvailable,
    getDateToday,
    divideHoursIntoIntervals
};