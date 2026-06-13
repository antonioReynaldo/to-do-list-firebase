import AgregarTarea from "./AgregarTarea";
import ListaTareas from "./ListaTareas";
import Resumen from "./Resumen";
import useResumen from "../hooks/useResumen";
import useTareas from "../hooks/useTareas";

export default function ToDo() {
  const { tareas, agregarTarea, toggleCompletada, eliminarTarea, editarTarea } =
    useTareas();
  const { totales, terminadas, pendientes } = useResumen(tareas);

  return (
    <div className="w-190 border-2 border-bordes rounded-2xl">
      <h1 className="text-4xl font-bold text-center my-5">Gestor de Tareas</h1>
      <div className="px-5 mb-5">
        <AgregarTarea agregarTarea={agregarTarea} />
      </div>
      <div className="px-5 mb-5">
        <ListaTareas
          tareas={tareas}
          toggleCompletada={toggleCompletada}
          eliminarTarea={eliminarTarea}
          editarTarea={editarTarea}
        />
      </div>
      <div className="px-5 mb-5">
        <Resumen
          totales={totales}
          terminadas={terminadas}
          pendientes={pendientes}
        />
      </div>
    </div>
  );
}
