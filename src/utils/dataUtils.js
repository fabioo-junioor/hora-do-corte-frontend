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
const checkDaysUntilDate = (date, time, days) => {
    let [day, month, year] = date.split('-').map(Number);
    let [hour, minute] = time.split(':').map(Number);

    let target = new Date(year, month - 1, day, hour, minute);
    let today = new Date();

    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    let differenceTime = target - today;
    let differenceDays = differenceTime / (1000 * 60 * 60 * 24);
    return differenceDays >= 0 && differenceDays <= days;

};
const sumMinutes = (data) => {
    return data.reduce((acc, minutes) => acc + Number(minutes.time), 0);

};
const calculePriceTotal = (data) => {
    return data.reduce((acc, value) => acc + Number(value.price), 0);
    
};
const firstCaracterName = (name) => {
    return `${name.charAt(0).toUpperCase()}${name.at(1)}`;

};
const numberRandom = (size) => {
     return Math.floor(Math.random() * size);

};
const mainColors = [
    { color: "#FFFFFFB3", colorContrast: "#000000" }, // Branco e Preto
    { color: "#000000B3", colorContrast: "#FFFFFF" }, // Preto e Branco
    { color: "#FF0000B3", colorContrast: "#FFFFFF" }, // Vermelho e Branco
    { color: "#00FF00B3", colorContrast: "#000000" }, // Verde e Preto
    { color: "#0000FFB3", colorContrast: "#FFFFFF" }, // Azul e Branco
    { color: "#FFFF00B3", colorContrast: "#000000" }, // Amarelo e Preto
    { color: "#FFA500B3", colorContrast: "#000000" }, // Laranja e Preto
    { color: "#800080B3", colorContrast: "#FFFFFF" }, // Roxo e Branco
    { color: "#FFC0CBB3", colorContrast: "#000000" }, // Rosa e Preto
    { color: "#00FFFFB3", colorContrast: "#000000" }, // Ciano e Preto
    { color: "#A52A2AB3", colorContrast: "#FFFFFF" }, // Marrom e Branco
    { color: "#808080B3", colorContrast: "#FFFFFF" }, // Cinza e Branco
    { color: "#FFD700B3", colorContrast: "#000000" }, // Dourado e Preto
    { color: "#008000B3", colorContrast: "#FFFFFF" }, // Verde Escuro e Branco
    { color: "#00008BB3", colorContrast: "#FFFFFF" }  // Azul Escuro e Branco
];

export {
    scheduleFormatter,
    mainColors,
    dateCompare,
    getDateToday,
    getCurrentTime,
    getDayWeekFromDate,
    checkDaysUntilDate,
    sumMinutes,
    calculePriceTotal,
    firstCaracterName,
    numberRandom

};