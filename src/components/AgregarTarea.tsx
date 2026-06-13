import { useState } from "react";
import type { Tarea } from "../types/tarea";

type Props = {
  agregarTarea: (tarea: Tarea) => void;
};
export default function AgregarTarea({ agregarTarea }: Props) {
  const [texto, setTexto] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTexto(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!texto.trim()) return;

    const nuevaTarea: Tarea = {
      id: crypto.randomUUID(),
      texto,
      fecha: new Date().toLocaleDateString("es-PE"),
      hora: new Date().toLocaleTimeString("es-PE", { hour12: false }),
      completada: false,
    };

    agregarTarea(nuevaTarea);

    setTexto("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-between items-center gap-5"
    >
      <input
        className="w-full border-2 border-borde rounded-4xl py-2 px-3 focus:outline-none"
        type="text"
        title="tarea"
        placeholder="Ingrese la tarea"
        value={texto}
        onChange={handleChange}
      />
      <button
        className="bg-enfasis px-5 py-2 rounded-4xl cursor-pointer hover:bg-[#413dff]"
        type="submit"
      >
        Agregar
      </button>
    </form>
  );
}
