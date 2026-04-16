'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Trophy,
  MapPin,
  Calendar,
  CheckCircle2,
  LayoutDashboard,
  ArrowRight,
  Clock,
  Activity,
  HelpCircle,
  Sparkles,
  Zap,
  Users,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const initialCandidates = [
  { id: 1, operator: '7 Wings', category: 'Atividades' },
  { id: 2, operator: 'E-velo', category: 'Atividades' },
  { id: 3, operator: 'Classic Drivers', category: 'Atividades' },
  { id: 4, operator: 'Keen Tours', category: 'Natureza' },
  { id: 5, operator: 'Oz Natura', category: 'Aventura' },
  { id: 6, operator: 'Quest Tours', category: 'Cultura' },
  { id: 7, operator: 'Spiritus Tours', category: 'Cultura' },
  { id: 8, operator: 'Braga Tours', category: 'Tours' },
  { id: 9, operator: 'Destino4all – Turismo para Todos', category: 'Inclusão' },
  { id: 10, operator: 'Picoto Park', category: 'Aventura' },
  { id: 11, operator: 'Cerveja Letra', category: 'Gastronomia' },
  { id: 12, operator: 'Doçaria Cruz da Pedra', category: 'Gastronomia' },
  { id: 13, operator: 'Restaurante O Gato do Rio', category: 'Gastronomia' },
  { id: 14, operator: 'Quinta Cova da Raposa', category: 'Enoturismo' },
  { id: 15, operator: 'Solar das Bouças', category: 'Enoturismo' },
  { id: 16, operator: 'Inato Bistrô', category: 'Gastronomia' },
  { id: 17, operator: 'Brucelle', category: 'Cultura' },
  { id: 18, operator: 'Meliá Braga Hotel & Spa', category: 'Alojamento' },
  { id: 19, operator: 'Innside by Meliá Braga', category: 'Alojamento' },
  { id: 20, operator: 'Porta Nova Collection House', category: 'Alojamento' },
  {
    id: 21,
    operator: 'Centro de Juventude de Braga',
    category: 'Institucional',
  },
  { id: 22, operator: 'Museu dos Biscainhos', category: 'Institucional' },
  {
    id: 23,
    operator: 'Museu de Arqueologia D. Diogo de Sousa',
    category: 'Institucional',
  },
];

export default function SorteioBraga() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayStep, setDisplayStep] = useState('');
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(null);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const runLottery = () => {
    if (candidates.length === 0 || history.length >= 5) return;
    setIsSpinning(true);
    setWinner(null);

    let spinCount = 0;
    const spinInterval = setInterval(() => {
      const tempIndex = Math.floor(Math.random() * candidates.length);
      setDisplayStep(candidates[tempIndex].operator);
      spinCount++;
    }, 80);

    setTimeout(() => {
      clearInterval(spinInterval);
      const randomIndex = Math.floor(Math.random() * candidates.length);
      const selected = candidates[randomIndex];
      setWinner(selected);
      setHistory((prev) => [selected, ...prev]);
      setCandidates((prev) => prev.filter((c) => c.id !== selected.id));
      setIsSpinning(false);

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#ffffff', '#000000'],
      });
    }, 3500);
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden font-sans text-slate-900">
      {/* SIDEBAR ESQUERDA - AGORA COM OS RESULTADOS */}
      <aside className="w-80 bg-white border-r border-slate-200 hidden xl:flex flex-col shadow-xl z-30">
        <div className="p-8 border-b border-slate-100">
          <div className="relative w-full h-16">
            <Image
              src="/marca-visit-braga.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Sorteados
            </h3>
            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
              {history.length}/5
            </span>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {history.map((h, i) => (
                <motion.div
                  key={h.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 group hover:bg-white hover:shadow-lg transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black italic">
                    {history.length - i}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <p className="font-bold text-slate-800 text-xs uppercase truncate leading-tight">
                      {h.operator}
                    </p>
                    <p className="text-[9px] font-medium text-slate-400 uppercase tracking-tighter">
                      {h.category}
                    </p>
                  </div>
                </motion.div>
              ))}
              {history.length === 0 && (
                <div className="py-20 text-center opacity-20 flex flex-col items-center gap-4">
                  <Award size={40} />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Aguardando Seleção
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100">
          <div className="bg-slate-900 rounded-2xl p-4 flex items-center gap-3">
            <ShieldCheck className="text-red-600" size={20} />
            <p className="text-[10px] text-slate-400 font-bold leading-tight">
              Verificado por <br />
              <span className="text-white">Município de Braga</span>
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* HEADER INSTITUCIONAL */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-12 h-20 flex items-center justify-between z-10">
          <div className="flex items-center gap-6">
            <div className="h-8 w-[2px] bg-red-600" />
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
                Sorteio Oficial{' '}
                <span className="text-red-600">Experiências Turísticas</span>
              </h2>
              <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                <MapPin size={10} className="text-red-600" />
                <span>Braga, Portugal</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                Sessão Oficial
              </p>
              <div className="text-lg font-black tabular-nums text-slate-800 leading-none">
                {mounted ? time?.toLocaleTimeString() : '--:--:--'}
              </div>
            </div>
            <div className="bg-slate-100 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-200">
              <Calendar size={14} className="text-slate-500" />
              <span className="text-[10px] font-black text-slate-700 tracking-widest">
                06 MAI 2026
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-10 flex flex-col gap-10 max-w-[1600px] mx-auto w-full overflow-y-auto">
          {/* DASHBOARD GRID */}
          <div className="grid grid-cols-12 gap-10">
            {/* ARENA DE SORTEIO - REDIMENSIONADA E IMERSIVA */}
            <div className="col-span-12 lg:col-span-8">
              <div className="relative bg-slate-950 rounded-[4rem] p-2 shadow-2xl overflow-hidden group">
                <div className="bg-gradient-to-tr from-[#020617] via-[#0f172a] to-[#1e293b] rounded-[3.8rem] min-h-[550px] flex flex-col items-center justify-center relative">
                  {/* LOGO IMERSIVO NO FUNDO */}
                  <div
                    className={`absolute inset-0 transition-all duration-1000 flex items-center justify-center 
                    ${
                      isSpinning
                        ? 'opacity-20 scale-125'
                        : winner
                        ? 'opacity-5 scale-90'
                        : 'opacity-10'
                    }`}
                  >
                    <div className="relative w-[400px] h-[400px]">
                      <Image
                        src="/marca-visit-braga.png"
                        alt="Watermark"
                        fill
                        className="object-contain grayscale invert"
                      />
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {isSpinning ? (
                      <motion.div
                        key="spinning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center z-10"
                      >
                        <div className="mb-10 relative">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: 'linear',
                            }}
                            className="w-32 h-32 border-[2px] border-white/5 border-t-red-600 rounded-full mx-auto shadow-[0_0_30px_rgba(220,38,38,0.3)]"
                          />
                          <Zap
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600"
                            size={32}
                          />
                        </div>
                        <div className="h-20 flex items-center justify-center">
                          <motion.h3
                            key={displayStep}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-3xl font-black text-white uppercase italic tracking-tighter"
                          >
                            {displayStep}
                          </motion.h3>
                        </div>
                        <div className="mt-6 px-4 py-1.5 border border-white/10 rounded-full inline-block">
                          <p className="text-red-500 font-black uppercase tracking-[0.4em] text-[8px] animate-pulse">
                            Processando Aleatoriedade...
                          </p>
                        </div>
                      </motion.div>
                    ) : winner ? (
                      <motion.div
                        key="winner"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="z-10 text-center px-10"
                      >
                        <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl border-b-[8px] border-red-600 max-w-xl mx-auto">
                          <div className="inline-flex p-4 bg-yellow-500 rounded-2xl mb-6 -mt-20 shadow-xl">
                            <Trophy className="text-white" size={32} />
                          </div>
                          <h4 className="text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-6">
                            {winner.operator}
                          </h4>
                          <div className="flex items-center justify-center gap-3">
                            <span className="h-[1px] w-8 bg-slate-100" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              {winner.category}
                            </span>
                            <span className="h-[1px] w-8 bg-slate-100" />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center z-10">
                        <p className="text-white/20 font-black uppercase tracking-[0.8em] text-xs italic">
                          Aguardando Início da Extração
                        </p>
                      </div>
                    )}
                  </AnimatePresence>

                  {!isSpinning && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={runLottery}
                      disabled={history.length >= 5}
                      className={`absolute bottom-12 px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-[0.3em] transition-all z-20 
                        ${
                          history.length >= 5
                            ? 'bg-slate-800 text-slate-500'
                            : 'bg-red-600 text-white shadow-2xl shadow-red-900/40 hover:bg-red-500'
                        }`}
                    >
                      {history.length >= 5
                        ? 'Extrações Concluídas'
                        : winner
                        ? 'Próximo Operador'
                        : 'Iniciar Sorteio'}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>

            {/* LISTA DE CANDIDATOS RESTANTES - DIREITA */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white rounded-[3rem] p-8 border border-slate-200 h-[550px] flex flex-col shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-tighter italic">
                      Candidatos Ativos
                    </h3>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                      Operadores em Pool
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-xs font-black">
                    {candidates.length}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  {candidates.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between group"
                    >
                      <span className="text-[10px] font-bold text-slate-600 uppercase truncate pr-4">
                        {c.operator}
                      </span>
                      <CheckCircle2
                        size={12}
                        className="text-slate-200 group-hover:text-green-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RODAPÉ E MÉTRICAS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10">
            {[
              {
                label: 'Total Base',
                val: initialCandidates.length,
                icon: <Users size={16} />,
              },
              {
                label: 'Em Processo',
                val: candidates.length,
                icon: <Activity size={16} />,
              },
              {
                label: 'Sorteados',
                val: history.length,
                icon: <Trophy size={16} />,
              },
              { label: 'Meta', val: '05', icon: <ArrowRight size={16} /> },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-black text-slate-900 italic">
                    {stat.val}
                  </p>
                </div>
                <div className="text-red-600 opacity-20">{stat.icon}</div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
}
