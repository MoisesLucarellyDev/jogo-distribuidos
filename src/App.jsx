import { useState, useEffect } from 'react'; // Adicionamos o useEffect aqui

export default function App() {
  // 1. Coloque o nome do arquivo que você quer que toque ao abrir o site
  const audioInicial = '/audio-de-fundo.mp3';

  // O useEffect roda automaticamente quando a página carrega
  useEffect(() => {
    const audio = new Audio('/audio-de-fundo.mp3');
    
    // Tenta dar o play automático
    audio.play().catch(err => {
      console.warn("Navegador bloqueou o autoplay (normal antes do primeiro clique).", err);
    });
  }, []);

  const sounds = [
    { id: 1, name: 'Áudio 1', file: '/audio1.mp3', color: 'bg-rose-500' },
    { id: 2, name: 'Áudio 2', file: '/audio2.mp3', color: 'bg-blue-500' },
    { id: 3, name: 'Áudio 3', file: '/audio3.mp3', color: 'bg-emerald-500' },
    { id: 4, name: 'Áudio 4', file: '/audio4.mp3', color: 'bg-purple-500' },
  ];

  const playAudio = (file) => {
    const audio = new Audio(file);
    audio.play().catch(err => {
      console.error("Erro ao reproduzir:", err);
      alert(`Não foi possível tocar ${file}. Verifique se o arquivo está na pasta public.`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-white font-sans">
      <h1 className="text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 text-center uppercase tracking-wider">
        Soundboard
      </h1>
      <p className="mb-10 text-gray-400 text-center max-w-md">
        Clique nos botões para disparar os áudios. Múltiplos cliques acumulam o som!
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        {sounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => playAudio(sound.file)}
            className={`
              h-32 rounded-2xl text-2xl font-bold shadow-[0_8px_0_rgba(0,0,0,0.5)] 
              transition-all active:shadow-[0_0px_0_rgba(0,0,0,0)] active:translate-y-[8px]
              ${sound.color} hover:brightness-110 text-white
            `}
          >
            {sound.name}
          </button>
        ))}
      </div>
    </div>
  );
}