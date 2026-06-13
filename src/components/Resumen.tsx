type Props = {
  totales: number;
  terminadas: number;
  pendientes: number;
};
export default function Resumen({ totales, terminadas, pendientes }: Props) {
  return (
    <div className="bg-secondary rounded-2xl flex justify-around text-center items-center py-3.75">
      <div className="w-29 border-2 border-borde rounded-lg text-lg font-bold overflow-hidden">
        <h4 className=" py-1.5 bg-enfasis">Totales</h4>
        <p className="py-1.5">{totales}</p>
      </div>
      <div className="w-29 border-2 border-borde rounded-lg text-lg font-bold overflow-hidden">
        <h4 className=" py-1.5 bg-enfasis">Terminadas</h4>
        <p className="py-1.5">{terminadas}</p>
      </div>
      <div className="w-29 border-2 border-borde rounded-lg text-lg font-bold overflow-hidden">
        <h4 className=" py-1.5 bg-enfasis">Pendientes</h4>
        <p className="py-1.5">{pendientes}</p>
      </div>
    </div>
  );
}
