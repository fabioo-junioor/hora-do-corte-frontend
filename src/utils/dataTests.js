const dataServicesTest = [
    {
        idProfessional: 1,
        professional: 'maria',
        image: 'https://cdn.quasar.dev/img/avatar.png',
        services: [
            { name: 'corte', time: '30', price: '20' },
            { name: 'barba', time: '20', price: '15' }
        ],
        schedules: [
            {
                mon: {
                    morning: { open: '09:00', close: '12:00' },
                    afternoon: { open: '14:00', close: '17:00' },
                    night: { open: '19:00', close: '22:00' }
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
                    morning: { open: '09:00', close: '12:00' },
                    afternoon: { open: '12:00', close: '17:00' },
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
                    night: { open: '17:00', close: '23:00' }
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
        ]
    },
    {
        idProfessional: 2,
        professional: 'joao',
        image: '',
        services: [
            { name: 'cabelo', time: '30', price: '50' },
            { name: 'barba', time: '10', price: '15' },
            { name: 'pintura', time: '80', price: '100' }
        ],
        schedules: [
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
        ]
    }
];

export {
    dataServicesTest
};