export const generarHorarios = (horarios: string[]) => {
  const horasEnDia = 24;
  const minutosPorHora = 60;
  const intervaloEnMinutos = 30;

  for (let hora = 0; hora < horasEnDia; hora++) {
    for (
      let minuto = 0;
      minuto < minutosPorHora;
      minuto += intervaloEnMinutos
    ) {
      const horaStr = hora.toString().padStart(2, '0');
      const minutoStr = minuto.toString().padStart(2, '0');
      const horario = `${horaStr}:${minutoStr}`;
      horarios.push(horario);
    }
  }
};

export interface Lodging {
  id?: string;
  name: string;
  guestCapacity: string;
  category: string;
  description: string;
  address: string;
  city: string;
  country: string;
  checkInHour: string;
  checkOutHour: string;
  priceNight: string;
  images: string[];
}
