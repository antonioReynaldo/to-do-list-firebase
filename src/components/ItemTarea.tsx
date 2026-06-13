import { MdDelete, MdEdit, MdBookmark, MdSave } from "react-icons/md";
import type { Tarea } from "../types/tarea";
import { useEffect, useRef, useState } from "react";

type Props = {
  tarea: Tarea;
  toggleCompletada: (id: string) => void;
  eliminarTarea: (id: string) => void;
  editarTarea: (
    id: string,
    nuevoTexto: string,
    fecha: string,
    hora: string,
  ) => void;
};

export default function ItemTarea({
  tarea,
  toggleCompletada,
  eliminarTarea,
  editarTarea,
}: Props) {
  const [editando, setEditando] = useState<boolean>(false);
  const [valorEditado, setValorEditado] = useState<string>(tarea.texto);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editando && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editando]);

  const guardarCambios = () => {
    const valorFinal = valorEditado.trim();

    if (valorFinal === "" || valorFinal === tarea.texto) {
      setValorEditado(tarea.texto);
      setEditando(false);
      return;
    }

    const nuevaFecha = new Date().toLocaleDateString("es-PE");
    const nuevaHora = new Date().toLocaleTimeString("es-PE", { hour12: false });

    editarTarea(tarea.id, valorFinal, nuevaFecha, nuevaHora);

    setEditando(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      guardarCambios();
    } else if (e.key === "Escape") {
      setValorEditado(tarea.texto);
      setEditando(false);
    }
  };

  return (
    <li className="text-lg flex justify-around items-center gap-7.5 px-2 py-4 rounded-lg bg-enfasis">
      <div className="text-3xl w-6 shrink-0">
        <MdBookmark />
      </div>
      <div className="w-full grid grid-cols-12 gap-3 items-center">
        {editando ? (
          <input
            title="input_edicion"
            type="text"
            ref={inputRef}
            value={valorEditado}
            onChange={(e) => setValorEditado(e.target.value)}
            onBlur={guardarCambios}
            onKeyDown={handleKeyDown}
            className="col-span-6 border-2 border-body text-body px-2 py-0 rounded outline-none w-full"
          />
        ) : (
          <span
            onClick={() => toggleCompletada(tarea.id)}
            className={`col-span-6 wrap-break-word whitespace-normal cursor-pointer ${tarea.completada ? "line-through decoration-4 decoration-red-700" : ""}`}
          >
            {tarea.texto}
          </span>
        )}

        <span className="col-span-3 wrap-break-word whitespace-normal text-center">
          {tarea.fecha}
        </span>
        <span className="col-span-3 wrap-break-word whitespace-normal text-center">
          {tarea.hora}
        </span>
      </div>
      <div className=" text-3xl flex gap-2.5 w-17.5 shrink-0">
        {editando ? (
          <button
            className="cursor-pointer hover:text-black"
            title="Guardar"
            type="button"
            onMouseDown={(e) => {
              // Evita el bug de concurrencia entre blur y click
              e.preventDefault();
              guardarCambios();
            }}
          >
            <MdSave />
          </button>
        ) : (
          <button
            onClick={() => setEditando(true)}
            className="cursor-pointer hover:text-black"
            title="editar"
          >
            <MdEdit />
          </button>
        )}

        <button
          onClick={() => eliminarTarea(tarea.id)}
          className="cursor-pointer hover:text-black"
          title="Eliminar"
          type="button"
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
}
