import { useEffect, useState } from "react";
// FIREBASE/ FIRESTORE
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

import type { Tarea } from "../types/tarea";

export default function useTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = async () => {
    const q = query(collection(db, "tareas"), orderBy("fecha", "desc"));

    const snapshot = await getDocs(q);

    const tareasFirebase: Tarea[] = snapshot.docs.map((documento) => ({
      id: documento.id,
      ...documento.data(),
    })) as Tarea[];

    setTareas(tareasFirebase);
  };

  const agregarTarea = async (tarea: Tarea) => {
    const docRef = await addDoc(collection(db, "tareas"), {
      texto: tarea.texto,
      completada: tarea.completada,
      fecha: tarea.fecha,
      hora: tarea.hora,
    });

    setTareas((prev) => [...prev, { ...tarea, id: docRef.id }]);
  };

  const toggleCompletada = async (id: string) => {
    const tareaActual = tareas.find((t) => t.id === id);

    if (!tareaActual) return;

    const nuevoEstado = !tareaActual.completada;

    await updateDoc(doc(db, "tareas", id), {
      completada: nuevoEstado,
    });

    setTareas((prev) =>
      prev.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: nuevoEstado } : tarea,
      ),
    );
  };

  const eliminarTarea = async (id: string) => {
    await deleteDoc(doc(db, "tareas", id));

    setTareas((prev) => prev.filter((tarea) => tarea.id !== id));
  };

  const editarTarea = async (
    id: string,
    nuevoTexto: string,
    fecha: string,
    hora: string,
  ) => {
    await updateDoc(doc(db, "tareas", id), {
      texto: nuevoTexto,
      fecha,
      hora,
    });

    setTareas((prev) =>
      prev.map((tarea) =>
        tarea.id === id ? { ...tarea, texto: nuevoTexto, fecha, hora } : tarea,
      ),
    );
  };

  return {
    tareas,
    agregarTarea,
    toggleCompletada,
    editarTarea,
    eliminarTarea,
  };
}
