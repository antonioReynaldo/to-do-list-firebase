import ItemTarea from "./ItemTarea";
import type { Tarea } from "../types/tarea";

type Props = {
  tareas: Tarea[];
  toggleCompletada: (id: string) => void;
  eliminarTarea: (id: string) => void;
  editarTarea: (
    id: string,
    nuevoTexto: string,
    fecha: string,
    hora: string,
  ) => void;
};

export default function ListaTareas({
  tareas,
  toggleCompletada,
  eliminarTarea,
  editarTarea,
}: Props) {
  return (
    <ul
      className={`bg-secondary min-h-82 rounded-2xl ${tareas.length ? "flex flex-col gap-5 p-3.75" : "grid place-content-center"} `}
    >
      {tareas.length ? (
        tareas.map((tarea) => (
          <ItemTarea
            key={tarea.id}
            tarea={tarea}
            toggleCompletada={toggleCompletada}
            eliminarTarea={eliminarTarea}
            editarTarea={editarTarea}
          />
        ))
      ) : (
        <li>
          <h3 className="text-2xl font-light italic">Ho hay tareas 🖊️</h3>
        </li>
      )}
    </ul>
  );
}
