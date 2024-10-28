const scheduleFormatter = [
    {
        mon: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        tue: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        wed: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        thu: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        fri: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        sat: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    },
    {
        sun: {
            morning: { open: null, close: null },
            afternoon: { open: null, close: null },
            night: { open: null, close: null }
        }
    }
];
const dateCompare = (dateValidity, timeValidity, dateToday, timeToday) => {
    // Separação da data e horário de validade
    const [dayValidity, monthValidity, yearValidity] = dateValidity.split('-').map(Number);
    const [hourValidity, minuteValidity] = timeValidity.split(':').map(Number);

    // Separação da data e horário de hoje
    const [dayToday, monthToday, yearToday] = dateToday.split('-').map(Number);
    const [hourToday, minuteToday] = timeToday.split(':').map(Number);

    // Criação dos objetos Date para data e horário completos
    const dateTimeValidity = new Date(yearValidity, monthValidity - 1, dayValidity, hourValidity, minuteValidity);
    const dateTimeToday = new Date(yearToday, monthToday - 1, dayToday, hourToday, minuteToday);

    // Comparação entre data e horário
    return dateTimeValidity > dateTimeToday;

};
const getDateToday = () => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    day = (day < 10) ? `0${day}` : `${day}`;
    month = (month < 10) ? `0${month}` : `${month}`;

    return `${day}-${month}-${year}`;
    
};
const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;

};
const getDayWeekFromDate = (date) => {
    let parts = date.split('-');
    date = new Date(parts[2], parts[1] - 1, parts[0]);
    let dayWeek = String(date).slice(0, 3);
    dayWeek = dayWeek.toLowerCase();
    return dayWeek;

};
const sumMinutes = (data) => {
    return data.reduce((acc, minutes) => acc + Number(minutes.time), 0);

};
const calculePriceTotal = (data) => {
    return data.reduce((acc, value) => acc + Number(value.price), 0);
    
};

export {
    scheduleFormatter,
    dateCompare,
    getDateToday,
    getCurrentTime,
    getDayWeekFromDate,
    sumMinutes,
    calculePriceTotal

};