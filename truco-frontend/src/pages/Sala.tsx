import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Sala = ({ nome }: { nome: string }) => {
  const { codigo } = useParams<{ codigo: string }>();
  const [sala, setSala] = useState<any>(null);

  useEffect(() => {
    const fetchSala = async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sala/${codigo}`);
      const data = await res.json();
      setSala(data);
    };
    fetchSala();
    const interval = setInterval(fetchSala, 2000);
    return () => clearInterval(interval);
  }, [codigo]);

  const iniciar = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/iniciar/${codigo}`, { method: 'POST' });
  };

  if (!sala) return <div>Carregando sala...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Sala {codigo}</h1>
      <ul className="my-4">
        {sala.jogadores.map((j: string) => (
          <li key={j}>{j}</li>
        ))}
      </ul>
      {sala.host === nome && sala.jogadores.length >= 2 && (
        <button onClick={iniciar} className="bg-red-500 text-white px-4 py-2 rounded">Iniciar Jogo</button>
      )}
    </div>
  );
};

export default Sala;