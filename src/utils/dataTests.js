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

function dividirHorariosEmIntervalos(schedules) {
    const resultado = {};

  schedules.forEach(dia => {
    const diaSemana = Object.keys(dia)[0];
    resultado[diaSemana] = [];

    for (const periodo in dia[diaSemana]) {
      const { open, close } = dia[diaSemana][periodo];
      const [horaInicio, minutoInicio] = open.split(':').map(Number);
      const [horaFim, minutoFim] = close.split(':').map(Number);

      const minutosInicio = horaInicio * 60 + minutoInicio;
      const minutosFim = horaFim * 60 + minutoFim - 30; // Subtrai 30 minutos do horário de fechamento

      for (let minutos = minutosInicio; minutos <= minutosFim; minutos += 30) {
        const hora = Math.floor(minutos / 60).toString().padStart(2, '0');
        const minuto = (minutos % 60).toString().padStart(2, '0');
        resultado[diaSemana].push(`${hora}:${minuto}`);
      }
    }
  });

  return resultado;
  }

export {
    dataServicesTest,
    dividirHorariosEmIntervalos
};