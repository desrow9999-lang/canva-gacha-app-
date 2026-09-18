'use client';

import { useState } from 'react';

const creatures = [
  { name: '月夜のフクロウ × シダ植物', type: '神秘タイプ', habitat: '深い霧の森の奥深く', desc: 'マイペースで直感力が鋭く、夜になると知恵が冴え渡るタイプ。', color: 'from-indigo-900 via-purple-900 to-slate-900' },
  { name: 'ひまわりを纏うカマキリ', type: '情熱タイプ', habitat: '真夏のまばゆい草原', desc: '集中力抜群で、狙った獲物（目標）を絶対に逃さないハンター気質。', color: 'from-amber-800 via-orange-900 to-slate-900' },
  { name: '深海のオオクラゲ × 水草', type: '癒やしタイプ', habitat: '光の届かない青い海中', desc: '周囲を穏やかな空気で包み込む。マイペースすぎてたまに心配される。', color: 'from-blue-900 via-teal-900 to-slate-900' },
  { name: '桜の木に宿るリス', type: '春爛漫タイプ', habitat: '満開の桜並木', desc: '楽しいことが大好きで、周りの人たちに笑顔と幸せを運ぶムードメーカー。', color: 'from-rose-900 via-pink-900 to-slate-900' },
  { name: 'サボテンのトゲを宿すトカゲ', type: '忍耐・孤高タイプ', habitat: '灼熱の砂漠地帯', desc: '逆境にめちゃくちゃ強く、どんな困難も独自のクールな方法で乗り切る。', color: 'from-emerald-900 via-yellow-900 to-slate-900' },
];

export default function CreatureFortuneApp() {
  const [result, setResult] = useState<typeof creatures[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [userName, setUserName] = useState('');

  const drawFortune = () => {
    if (!userName.trim()) {
      alert('名前を入力してください！');
      return;
    }
    setIsSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * creatures.length);
      setResult(creatures[randomIndex]);
      setIsSpinning(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto flex flex-col gap-6 my-auto">
        
        {/* ヘッダー */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            前世の動物・植物占い
          </h1>
          <p className="text-xs text-slate-400">あなたの魂のルーツを解き明かすガチャ</p>
        </div>

        {/* 入力フォームカード */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 p-5 rounded-3xl shadow-2xl flex flex-col gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 ml-1">あなたの名前（またはニックネーム）</label>
            <input 
              type="text" 
              placeholder="例：ゆうき" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <button 
            onClick={drawFortune}
            disabled={isSpinning}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-900/30 active:scale-[0.98] transition-all disabled:opacity-50 text-sm tracking-wide"
          >
            {isSpinning ? '魂のルーツを探索中...' : '✨ 前世を占う（ガチャを引く）'}
          </button>
        </div>

        {/* 結果表示カード */}
        {result && (
          <div className={`w-full bg-gradient-to-br ${result.color} p-6 rounded-3xl shadow-2xl border border-white/10 flex flex-col gap-4`}>
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-wider bg-black/40 px-3 py-1 rounded-full text-emerald-300 font-semibold border border-white/5">
                {result.type}
              </span>
              <span className="text-xs text-slate-300">{userName}さんの前世</span>
            </div>

            <div className="text-center my-1 space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide drop-shadow">
                {result.name}
              </h2>
              <p className="text-xs text-emerald-300/90 font-medium">🌿 生息地: {result.habitat}</p>
            </div>

            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl text-xs sm:text-sm text-slate-200 leading-relaxed border border-white/5">
              <p>{result.desc}</p>
            </div>

            <button 
              onClick={() => alert('Canva API連携による画像生成をここに接続します！')}
              className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md transition-colors text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              <span>🎨 Canvaでカード画像を生成する</span>
            </button>
          </div>
        )}

      </div>

      <footer className="text-[10px] text-slate-600 text-center mt-6">
        Powered by Next.js & Canva Connect API
      </footer>
    </main>
  );
}
