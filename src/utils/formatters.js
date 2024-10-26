const formatString = string => string[0].toUpperCase() + string.substring(1);

const cleanSpecialCharacters = (string) => {
    return string.replace(/\D/g, '');

};
const formatPhoneNumber = (phone) => {
    const ddd = phone.slice(0, 2);
    const part1 = phone.slice(2, 6);
    const part2 = phone.slice(6);

    return `(${ddd}) ${part1} - ${part2}`;

};
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

};
const divideHoursIntoIntervals = (schedules, time, dataIsReserved, dayWeek) => { 
    const result = [];

    const isTimeReserved = (currentStartMinutes, currentEndMinutes) => {
        return dataIsReserved.some(reserved => {
            const [reservedStartHour, reservedStartMinute] = reserved.timeStart.split(':').map(Number);
            const [reservedEndHour, reservedEndMinute] = reserved.timeEnd.split(':').map(Number);
            
            const reservedStartMinutes = reservedStartHour * 60 + reservedStartMinute;
            const reservedEndMinutes = reservedEndHour * 60 + reservedEndMinute;

            return (
                (currentStartMinutes < reservedEndMinutes && currentEndMinutes > reservedStartMinutes)
            );
        });
    };

    schedules.forEach(day => {
        //const dayWeek = Object.keys(day)[0];

        for (const period in day[dayWeek]) {
            const { open, close } = day[dayWeek][period];

            if (open && close) {
                const [startTime, startMinute] = open.split(':').map(Number);
                const [endTime, endMinute] = close.split(':').map(Number);

                const startMinutes = startTime * 60 + startMinute;
                const endMinutes = endTime * 60 + endMinute - time;

                for (let minutes = startMinutes; minutes <= endMinutes; minutes += time) {
                    const hour = Math.floor(minutes / 60).toString().padStart(2, '0');
                    const minute = (minutes % 60).toString().padStart(2, '0');
                    const timeSlot = `${hour}:${minute}`;
                    
                    const isReserved = isTimeReserved(minutes, minutes + time);

                    result.push({ time: timeSlot, isReserved: isReserved });
                }
            }
        }
    });

    return result;
};

const orderSchedules = (schedules) => {
    return schedules.map(schedule => {
        const day = Object.keys(schedule)[0];
        const shifts = schedule[day];
        
        // Define a ordem dos turnos
        const orderedShifts = {
            "morning": shifts.morning,
            "afternoon": shifts.afternoon,
            "night": shifts.night
        };
        
        return { [day]: orderedShifts };
    });
};
const sumTimeService = (time, minutesToAdd) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutesToAdd = parseInt(minutesToAdd, 10);
    let totalMinutes = minutes + totalMinutesToAdd;
    let totalHours = hours + Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
    totalHours = totalHours % 24;

    return `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}`;

};

export {
    formatString,
    cleanSpecialCharacters,
    formatPhoneNumber,
    verifySchedulesAvailable,
    divideHoursIntoIntervals,
    orderSchedules,
    sumTimeService
};