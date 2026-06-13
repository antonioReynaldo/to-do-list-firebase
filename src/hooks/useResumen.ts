import type { Tarea } from "../types/tarea";

export default function useResumen(tareas: Tarea[]) {
  const resumen = tareas.reduce(
    (acc, tarea) => {
      acc.totales++;

      if (tarea.completada) {
        acc.terminadas++;
      } else {
        acc.pendientes++;
      }

      return acc;
    },
    { totales: 0, terminadas: 0, pendientes: 0 },
  );

  return resumen;
}
