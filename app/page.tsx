'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Trophy, MapPin, Calendar, Activity,
  Users, ShieldCheck, Award, Sparkles,
  Clock, ChevronRight, Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
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
  { id: 9, operator: 'Destino4all - Turismo para Todos', category: 'Inclusão' },
  { id: 10, operator: 'Picoto Park', category: 'Aventura' },
  { id: 11, operator: 'Cerveja Letra', category: 'Gastronomia' },
  { id: 12, operator: 'Docaria Cruz da Pedra', category: 'Gastronomia' },
  { id: 13, operator: 'Restaurante O Gato do Rio', category: 'Gastronomia' },
  { id: 14, operator: 'Quinta Cova da Raposa', category: 'Enoturismo' },
  { id: 15, operator: 'Solar das Bouças', category: 'Enoturismo' },
  { id: 16, operator: 'Inato Bistro', category: 'Gastronomia' },
  { id: 17, operator: 'Brucelle', category: 'Cultura' },
  { id: 18, operator: 'Melia Braga Hotel & Spa', category: 'Alojamento' },
  { id: 19, operator: 'Innside by Melia Braga', category: 'Alojamento' },
  { id: 20, operator: 'Porta Nova Collection House', category: 'Alojamento' },
  { id: 21, operator: 'Centro de Juventude de Braga', category: 'Institucional' },
  { id: 22, operator: 'Museu dos Biscainhos', category: 'Institucional' },
  { id: 23, operator: 'Museu de Arqueologia D. Diogo de Sousa', category: 'Institucional' },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function SorteioBraga() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayStep, setDisplayStep] = useState('');
  const [spinIntensity, setSpinIntensity] = useState(1);
  const [winner, setWinner] = useState(null as any);
  const [history, setHistory] = useState([] as any[]);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(null as Date | null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const runLottery = () => {
    if (candidates.length === 0 || history.length >= 5) return;
    setIsSpinning(true);
    setWinner(null);
    setSpinIntensity(1);

    const totalDuration = 3800;
    const startTime = performance.now();
    let lastChangeTime = 0;
    let lastIndex = -1;

    const snapshot = [...candidates];

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      const eased = easeOutCubic(progress);

      setSpinIntensity(1 - eased);

      const interval = 50 + eased * 280;

      if (now - lastChangeTime >= interval) {
        let idx = Math.floor(Math.random() * snapshot.length);
        if (idx === lastIndex && snapshot.length > 1) {
          idx = (idx + 1) % snapshot.length;
        }
        lastIndex = idx;
        setDisplayStep(snapshot[idx].operator);
        lastChangeTime = now;
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        const randomIndex = Math.floor(Math.random() * snapshot.length);
        const selected = snapshot[randomIndex];
        setDisplayStep(selected.operator);

        setTimeout(() => {
          setWinner(selected);
          setHistory((prev) => [selected, ...prev]);
          setCandidates((prev) => prev.filter((c) => c.id !== selected.id));
          setIsSpinning(false);

          const colors = ['#ef4444', '#dc2626', '#0f172a', '#ffffff', '#fbbf24'];
          const duration = 1400;
          const end = Date.now() + duration;

          (function frame() {
            confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors });
            confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
            if (Date.now() < end) requestAnimationFrame(frame);
          })();

          confetti({
            particleCount: 180,
            spread: 100,
            origin: { y: 0.5 },
            colors,
            scalar: 1.3,
            startVelocity: 45,
          });
        }, 350);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-[#F1F5F9] text-slate-900 font-sans overflow-hidden selection:bg-red-100 relative">

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-[20%] w-[600px] h-[600px] bg-slate-900/[0.02] rounded-full blur-3xl" />
      </div>

      {/* SIDEBAR */}
      <aside className="w-80 bg-gradient-to-b from-[#0F172A] via-[#0B1120] to-[#090E1A] flex flex-col z-30 shadow-[15px_0_40px_rgba(0,0,0,0.25)] relative">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60" />

        <div className="p-8 bg-white border-b border-slate-100 flex justify-center items-center h-24 relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-red-600 rounded-full" />
          <div className="relative w-48 h-14">
            <Image src="/marca-visit-braga.png" alt="Logo Visit Braga" fill className="object-contain" priority />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          <div className="flex items-center gap-3 px-2 border-l-4 border-red-600 pl-4 mb-8 relative">
            <div className="absolute -left-1 top-0 bottom-0 w-[4px] bg-red-500 blur-sm opacity-60" />
            <Hash size={14} className="text-red-500" />
            <span className="text-[11px] font-black text-white uppercase tracking-[0.25em]">Experiências Turísticas</span>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {history.map((h, i) => (
                <motion.div
                  key={h.id}
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="relative p-5 bg-gradient-to-br from-slate-800/70 via-slate-800/40 to-slate-900/30 backdrop-blur-sm border border-slate-700/60 rounded-2xl flex items-center gap-4 group hover:border-red-500/70 transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(239,68,68,0.3)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center text-xs font-black italic shadow-[0_5px_20px_rgba(239,68,68,0.4)] ring-2 ring-red-500/20 relative z-10">
                    {history.length - i}
                  </div>
                  <div className="flex flex-col min-w-0 relative z-10">
                    <p className="font-bold text-white text-[11px] uppercase truncate tracking-tight">{h.operator}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1 group-hover:text-red-300/80 transition-colors">{h.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {history.length === 0 && (
              <div className="text-center py-12 opacity-40">
                <Sparkles size={24} className="text-slate-600 mx-auto mb-3" />
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Aguarda Extração</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-t from-black/60 to-transparent border-t border-slate-800/50 relative">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-slate-950/70 to-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-inner">
            <div className="p-2.5 bg-gradient-to-br from-red-600/20 to-red-700/10 rounded-lg ring-1 ring-red-500/20">
              <ShieldCheck className="text-red-500" size={20} />
            </div>
            <div>
              <p className="text-[10px] text-white font-black uppercase tracking-wider">Município de Braga</p>
              <p className="text-[8px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Sorteio Público</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative overflow-hidden z-10">
        {/* HEADER */}
        <header className="h-24 bg-white/85 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-12 z-20 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] relative">
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />

          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.5)]" />
              <h1 className="text-2xl font-black text-slate-950 uppercase tracking-tighter italic leading-none">
                Sorteio Operadores <span className="text-red-600 ml-1">Experiências Turísticas</span>
              </h1>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2 mt-2.5 ml-4">
              <MapPin size={12} className="text-red-500" /> Auditório Posto de Turismo • Braga, PT
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-gradient-to-br from-slate-950 to-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl border-b-2 border-red-600 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <Clock size={18} className="text-red-500" />
                <div className="absolute inset-0 bg-red-500 blur-md opacity-50 animate-pulse -z-10" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Tempo Real</span>
                <span className="text-2xl font-black tabular-nums tracking-tighter italic text-red-50">
                  {time ? time.toLocaleTimeString('pt-PT', { hour12: false }) : '--:--:--'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gradient-to-br from-white to-slate-50 px-6 py-3 rounded-2xl border border-slate-200 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.08)]">
              <Calendar size={18} className="text-red-600" />
              <div className="flex flex-col leading-none">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Data Evento</span>
                <span className="text-sm font-black text-slate-900 uppercase tracking-widest italic">06 MAIO 2026</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-10 space-y-10 overflow-y-auto relative">
          {/* STATS */}
          <div className="grid grid-cols-3 gap-8">
            {[
              { label: 'Universo Inscritos', val: initialCandidates.length, icon: <Users size={20} /> },
              { label: 'Urna em Jogo', val: candidates.length, icon: <Activity size={20} /> },
              { label: 'Vagas Sorteio', val: `${history.length} / 5`, icon: <Trophy size={20} />, active: true },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`relative overflow-hidden p-8 rounded-[2rem] border shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] flex items-center justify-between transition-all duration-500 group
                ${stat.active
                    ? 'bg-gradient-to-br from-white via-red-50/40 to-red-50/80 border-red-200/60 ring-2 ring-red-500/10 hover:ring-red-500/20 hover:shadow-[0_25px_50px_-15px_rgba(239,68,68,0.25)]'
                    : 'bg-gradient-to-br from-white via-white to-slate-50 border-slate-200/80 hover:border-slate-300'
                  }`}>

                {stat.active && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-[4rem]" />
                )}

                <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
                  backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />

                <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                    {stat.active && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                    {stat.label}
                  </p>
                  <p className={`text-4xl font-black italic tracking-tighter transition-all duration-500 ${stat.active ? 'text-red-600 drop-shadow-[0_4px_12px_rgba(239,68,68,0.2)]' : 'text-slate-950'}`}>
                    {stat.val}
                  </p>
                </div>
                <div className={`p-4 rounded-2xl relative z-10 transition-all duration-500 ${stat.active
                  ? 'bg-gradient-to-br from-red-500/15 to-red-600/5 text-red-500 ring-1 ring-red-500/20'
                  : 'bg-slate-100/60 text-slate-300 group-hover:text-slate-400'
                  }`}>
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>

          {/* =========================================================
              ARENA + LISTA
              FIX CRÍTICO: arena sem overflow-hidden, sem max-w no winner card.
              O winner card ocupa TODA a largura disponível da arena.
          ========================================================= */}
          <div className="grid grid-cols-12 gap-10">
            {/* ARENA CENTRAL */}
            <div className="col-span-8">
              <div className="bg-gradient-to-br from-white via-white to-slate-50/70 rounded-[3rem] border border-slate-200/80 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.15)] min-h-[680px] relative flex flex-col items-center justify-center p-10 group">

                {/* Decorative glow — fica por baixo com pointer-events-none */}
                <div className="absolute inset-0 rounded-[3rem] overflow-hidden pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]" style={{
                    background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 60%)'
                  }} />

                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] grayscale select-none">
                    <div className="relative w-[500px] h-[500px]">
                      <Image src="/marca-visit-braga.png" alt="" fill className="object-contain" />
                    </div>
                  </div>
                </div>

                {/* Corner brackets */}
                <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-red-500/20 rounded-tl-2xl pointer-events-none" />
                <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-red-500/20 rounded-tr-2xl pointer-events-none" />
                <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-red-500/20 rounded-bl-2xl pointer-events-none" />
                <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-red-500/20 rounded-br-2xl pointer-events-none" />

                {/* CONTEÚDO — ocupa a largura total da arena */}
                <div className="relative w-full flex flex-col items-center z-10">
                  <AnimatePresence mode="wait">
                    {isSpinning ? (
                      <motion.div
                        key="spinning"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center py-8 w-full"
                      >
                        <div className="relative mb-10">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.8 + (1 - spinIntensity) * 2.5,
                              ease: 'linear',
                              repeat: Infinity,
                            }}
                            className="w-28 h-28 border-[7px] border-slate-100 border-t-red-600 rounded-full mx-auto shadow-2xl"
                          />
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{
                              duration: 1.2 + (1 - spinIntensity) * 3,
                              ease: 'linear',
                              repeat: Infinity,
                            }}
                            className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-24 border-[3px] border-transparent border-b-red-400/40 rounded-full"
                          />
                          <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-500/20 rounded-full blur-3xl -z-10"
                            style={{ opacity: 0.3 + spinIntensity * 0.5 }}
                          />
                        </div>

                        <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.6em] mb-6 block opacity-70">A Selecionar</span>

                        <div
                          className="relative h-16 flex items-center justify-center overflow-hidden px-4"
                          style={{
                            filter: `blur(${spinIntensity * 2.5}px)`,
                            transition: 'filter 0.1s linear',
                          }}
                        >
                          <AnimatePresence mode="popLayout">
                            <motion.span
                              key={displayStep}
                              initial={{ y: spinIntensity > 0.3 ? 40 : 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: spinIntensity > 0.3 ? -40 : -20, opacity: 0 }}
                              transition={{ duration: 0.15, ease: 'easeOut' }}
                              className="absolute text-[2.4rem] leading-tight font-black text-slate-950 uppercase italic tracking-tighter whitespace-nowrap"
                            >
                              {displayStep}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    ) : winner ? (
                      // ======== WINNER CARD — ocupa largura total, sem max-w ========
                      <motion.div
                        key="winner"
                        initial={{ y: 30, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                        className="w-full pt-10"
                      >
                        <div className="bg-gradient-to-br from-white via-white to-slate-50/80 border border-white px-12 py-14 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] relative text-center ring-1 ring-slate-200/50">

                          {/* Shine sweep — contido dentro do card */}
                          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3rem]">
                            <motion.div
                              initial={{ x: '-100%' }}
                              animate={{ x: '200%' }}
                              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12"
                            />
                          </div>

                          {/* Glow aura — contido */}
                          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[3rem]">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl" />
                          </div>

                          {/* Trophy floating badge */}
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gradient-to-br from-red-500 to-red-700 text-white p-5 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(239,68,68,0.5)] border-[6px] border-white"
                          >
                            <Trophy size={40} />
                            <div className="absolute -inset-1 bg-red-500 blur-xl opacity-40 -z-10 rounded-[2rem]" />
                          </motion.div>

                          <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.8em] mb-6 block opacity-70 mt-6 relative z-10">Operador Selecionado</span>

                          <motion.h4
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            className="text-5xl font-black text-slate-950 uppercase tracking-tighter italic leading-[1.05] mb-10 relative z-10 break-words"
                          >
                            {winner.operator}
                          </motion.h4>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.45 }}
                            className="inline-flex items-center gap-4 bg-gradient-to-br from-slate-950 to-slate-900 text-white px-10 py-4 rounded-full shadow-[0_15px_35px_-10px_rgba(15,23,42,0.5)] border-b-4 border-red-700 relative z-10"
                          >
                            <div className="relative">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                              <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.5em]">{winner.category}</span>
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center space-y-8 py-10"
                      >
                        <div className="relative">
                          <div className="w-28 h-28 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] relative">
                            <Award className="text-red-600" size={48} />
                            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-red-500/0 via-red-500/5 to-red-500/10" />
                          </div>
                          <div className="absolute inset-0 bg-red-500/10 blur-2xl -z-10 animate-pulse" />
                        </div>
                        <p className="text-slate-900 font-black uppercase tracking-[0.8em] text-[13px] italic">Sorteio Pronto</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-10 relative z-10">
                    {!isSpinning && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: winner ? 0.6 : 0 }}
                        whileHover={{ scale: 1.04, y: -3 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={runLottery}
                        disabled={history.length >= 5}
                        className={`group relative overflow-hidden px-20 py-7 rounded-[2rem] font-black text-[13px] uppercase tracking-[0.6em] transition-all italic
                          ${history.length >= 5
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                            : 'bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white shadow-[0_20px_40px_-10px_rgba(239,68,68,0.5)] hover:shadow-[0_25px_50px_-10px_rgba(239,68,68,0.7)] border-b-4 border-red-800'
                          }`}
                      >
                        {history.length < 5 && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                          </>
                        )}
                        <span className="relative z-10 flex items-center gap-3">
                          {history.length >= 5 ? 'Sorteio Finalizado' : winner ? 'Nova Extração' : 'Começar Sorteio'}
                          {history.length < 5 && <Sparkles size={14} className="opacity-80" />}
                        </span>
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* LISTA OPERADORES */}
            <div className="col-span-4">
              <div className="bg-gradient-to-b from-white to-slate-50 rounded-[3rem] border border-slate-200/80 shadow-[0_25px_50px_-15px_rgba(15,23,42,0.12)] h-[680px] flex flex-col overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-gradient-to-br from-white to-slate-50/50 flex justify-between items-center relative">
                  <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-5 bg-gradient-to-b from-red-500 to-red-700 rounded-full" />
                    <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 italic">Operadores</h3>
                  </div>
                  <div className="bg-gradient-to-br from-red-500 to-red-700 text-white text-xs font-black w-12 h-12 rounded-2xl flex items-center justify-center shadow-[0_8px_20px_-5px_rgba(239,68,68,0.5)] italic ring-2 ring-red-500/20">
                    {candidates.length}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar bg-gradient-to-b from-slate-50/30 to-slate-50/60">
                  {candidates.map((c) => (
                    <motion.div
                      layout
                      key={c.id}
                      whileHover={{ x: 4 }}
                      className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group cursor-default hover:border-red-200 hover:shadow-[0_8px_20px_-8px_rgba(239,68,68,0.15)] transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />

                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-red-500 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all" />
                        <div className="flex flex-col min-w-0">
                          <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight truncate group-hover:text-slate-950 transition-colors">{c.operator}</span>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 group-hover:text-red-500/70 transition-colors">{c.category}</span>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-200 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: linear-gradient(to bottom, #E2E8F0, #CBD5E1); 
          border-radius: 10px; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
          background: linear-gradient(to bottom, #ef4444, #dc2626); 
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}