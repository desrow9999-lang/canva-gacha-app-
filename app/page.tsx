'use client';

import { useState } from 'react';

const creatures = [
  { name: '月夜のフクロウ × シダ植物', type: '神秘タイプ', habitat: '深い霧の森の奥深く', desc: 'マイペースで直感力が鋭く、夜になると知恵が冴え渡るタイプ。', color: 'from-indigo-600 via-purple-600 to-slate-900' },
  { name: 'ひまわりを纏うカマキリ', type: '情熱タイプ', habitat: '真夏のまばゆい草原', desc: '集中力抜群で、狙った獲物（目標）を絶対に逃さないハンター気質。', color: 'from-amber-600 via-orange-600 to-slate-900' },
  { name: '深海のオオクラゲ × 水草', type: '癒やしタイプ', habitat: '光の届かない青い海中', desc: '周囲を穏やかな空気で包み込む。マイペースすぎてたまに心配される。', color: 'from-blue-600 via-teal-600 to-slate-900' },
  { name: '桜の木に宿るリス', type: '春爛漫タイプ', habitat: '満開の桜並木', desc: '楽しいことが大好きで、周りの人たちに笑顔と幸せを運ぶムードメーカー。', color: 'from-rose-600 via-pink-600 to-slate-900' },
  { name: 'サボテンのトゲを宿すトカゲ', type: '忍耐・孤高タイプ', habitat: '灼熱の砂漠地帯', desc: '逆境にめちゃくちゃ強く、どんな困難も独自のクールな方法で乗り切る。', color: 'from-emerald-600 via-teal-700 to-slate-900' },
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
    }, 1000);
  };

  const shareToX = () => {
    if (!result) return;
    const text = encodeURIComponent(
      `【${userName}さんの前世の動物・植物占い】\n私の前世は「${result.name}」（${result.type}）でした！\n生息地：${result.habitat}\n\nあなたも魂のルーツを診断してみよう！✨\n#前世動物植物占い`
    );
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white flex flex-col justify-between p-5 font-sans">
      <div className="w-full max-w-md mx-auto flex flex-col gap-6 my-auto">
        
        {/* ヘッダー */}
        <div className="text-center space-y-2 mt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold tracking-wider uppercase mb-1">
            Soul Gacha System
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            前世の動物・植物占い
          </h1>
          <p className="text-xs text-slate-400">あなたの魂のルーツをガチャで解放せよ</p>
        </div>

        {/* 入力フォームカード */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 p-6 rounded-3xl shadow-2xl flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 ml-1 tracking-wide">召喚者名（あなたのお名前）</label>
            <input 
              type="text" 
              placeholder="例：ゆうき" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-inner"
            />
          </div>

          <button 
            onClick={drawFortune}
            disabled={isSpinning}
            className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-90 text-slate-950 font-black py-4 px-6 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all disabled:opacity-50 text-sm tracking-wider uppercase"
          >
            {isSpinning ? '🔮 魂の波長を同調中...' : '✨ ガチャを回す（前世を占う）'}
          </button>
        </div>

        {/* 結果表示カード */}
        {result && (
          <div className={`w-full bg-gradient-to-br ${result.color} p-6 rounded-3xl shadow-2xl shadow-black/50 border border-white/20 flex flex-col gap-5 relative overflow-hidden animate-in fade-in duration-500`}>
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

            <div className="flex justify-between items-center relative z-10">
              <span className="text-[10px] uppercase tracking-widest bg-black/50 px-3.5 py-1.5 rounded-full text-emerald-300 font-bold border border-white/10 shadow-sm">
                {result.type}
              </span>
              <span className="text-xs text-slate-200 font-medium">{userName} さんの前世</span>
            </div>

            <div className="text-center space-y-1.5 relative z-10">
              <h2 className="text-2xl font-black text-white tracking-wide drop-shadow-md">
                {result.name}
              </h2>
              <p className="text-xs text-emerald-200 font-bold tracking-wide">🌿 覚醒生息地：{result.habitat}</p>
            </div>

            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl text-xs sm:text-sm text-slate-100 leading-relaxed border border-white/10 shadow-inner relative z-10">
              <p>{result.desc}</p>
            </div>

            {/* アクションボタン群 */}
            <div className="flex flex-col gap-2.5 relative z-10">
              <button 
                onClick={shareToX}
                className="w-full bg-black hover:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg border border-white/10 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span>𝕏 結果をシェアして友達に教える</span>
              </button>

              <button 
                onClick={() => alert('Canva API連携による画像自動生成機能を次に実装します！')}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-xl transition-all text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/10 active:scale-[0.98]"
              >
                <span>🎨 Canvaで特製カードを生成する</span>
              </button>
            </div>
          </div>
        )}

      </div>

      <footer className="text-[10px] text-slate-600 text-center mt-8 tracking-wider">
        Powered by Next.js & Canva Connect API
      </footer>
    </main>
  );
}
