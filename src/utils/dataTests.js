const dataServicesTest = [
    {
        idProfessional: 1,
        professional: 'fabio',
        image: 'https://cdn.quasar.dev/img/avatar.png',
        services: [
            { name: 'corte', time: '30', price: '20' },
            { name: 'barba', time: '20', price: '15' }
        ],
        schedules: [
            {
                sun: {
                    manha: { open: '10:00', close: '14:00' },
                    tarde: { open: '17:00', close: '19:00' },
                    noite: { open: '19:00', close: '22:00' }
                }
            },
            {
                mon: {
                    manha: { open: '08:00', close: '12:00' },
                    tarde: { open: '14:00', close: '17:00' },
                    noite: { open: '19:00', close: '23:00' }
                }
            },
            {
                sat: {
                    manha: { open: '08:00', close: '11:00' },
                    tarde: { open: '13:00', close: '14:00' },
                    noite: { open: '19:00', close: '23:00' }
                }
            }
        ]
    },
    {
        idProfessional: 2,
        professional: 'joao',
        image: '',
        services: [
            { name: 'cabelo', time: '30', price: '50' },
            { name: 'barba', time: '10', price: '15' },
            { name: 'pintura', time: '01:20', price: '100' }
        ],
        schedules: [
            {
                sun: {
                    manha: { open: '10:00', close: '14:00' },
                    tarde: { open: '17:00', close: '19:00' },
                    noite: { open: '19:00', close: '22:00' }
                }
            },
            {
                mon: {
                    manha: { open: '08:00', close: '12:00' },
                    tarde: { open: '14:00', close: '17:00' },
                    noite: { open: '19:00', close: '23:00' }
                }
            }
        ]
    }
];

export {
    dataServicesTest
};