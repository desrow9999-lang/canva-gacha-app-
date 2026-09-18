'use client';

import { useState } from 'react';

const creatures = [
  { 
    name: '月夜のフクロウ × シダ植物', 
    type: '神秘タイプ', 
    habitat: '深い霧の森の奥深く', 
    desc: 'マイペースで直感力が鋭く、夜になると知恵が冴え渡るタイプ。', 
    bg: 'bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900',
    border: 'border-purple-500/40',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  { 
    name: 'ひまわりを纏うカマキリ', 
    type: '情熱タイプ', 
    habitat: '真夏のまばゆい草原', 
    desc: '集中力抜群で、狙った獲物（目標）を絶対に逃さないハンター気質。', 
    bg: 'bg-gradient-to-br from-amber-950 via-orange-950 to-slate-900',
    border: 'border-orange-500/40',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30'
  },
  { 
    name: '深海のオオクラゲ × 水草', 
    type: '癒やしタイプ', 
    habitat: '光の届かない青い海中', 
    desc: '周囲を穏やかな空気で包み込む。マイペースすぎてたまに心配される。', 
    bg: 'bg-gradient-to-br from-blue-950 via-teal-950 to-slate-900',
    border: 'border-blue-500/40',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  { 
    name: '桜の木に宿るリス', 
    type: '春爛漫タイプ', 
    habitat: '満開の桜並木', 
    desc: '楽しいことが大好きで、周りの人たちに笑顔と幸せを運ぶムードメーカー。', 
    bg: 'bg-gradient-to-br from-rose-950 via-pink-950 to-slate-900',
    border: 'border-pink-500/40',
    badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30'
  },
  { 
    name: 'サボテンのトゲを宿すトカゲ', 
    type: '忍耐・孤高タイプ', 
    habitat: '灼熱の砂漠地帯', 
    desc: '逆境にめちゃくちゃ強く、どんな困難も独自のクールな方法で乗り切る。', 
    bg: 'bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900',
    border: 'border-emerald-500/40',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
];

export default function CreatureFortuneApp() {
  const [result, setResult] = useState<typeof creatures[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [userName, setUserName] = useState('');

  const drawFortune = () => {
    if (!userName.trim()) {
      alert('召喚者名（お名前）を入力してください！');
      return;
    }
    setIsSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * creatures.length);
      setResult(creatures[randomIndex]);
      setIsSpinning(false);
    }, 1200);
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
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md mx-auto flex flex-col gap-6 my-auto">
        
        {/* ヘッダー */}
        <div className="text-center space-y-2 pt-2">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase">
            Soul Gacha System
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            前世の動物・植物占い
          </h1>
          <p className="text-xs text-slate-400">あなたの魂のルーツをガチャで解放せよ</p>
        </div>

        {/* 入力カード */}
        <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl shadow-xl space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">召喚者名（あなたのお名前）</label>
            <input 
              type="text" 
              placeholder="例：やすゆき" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <button 
            onClick={drawFortune}
            disabled={isSpinning}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/10 active:scale-[0.98] transition-all disabled:opacity-50 text-sm tracking-wide"
          >
            {isSpinning ? '🔮 魂の波長を同調中...' : '✨ ガチャを回す（前世を占う）'}
          </button>
        </div>

        {/* 結果表示カード */}
        {result && (
          <div className={`w-full ${result.bg} border ${result.border} p-5 sm:p-6 rounded-2xl shadow-2xl space-y-4`}>
            
            {/* 上部タグ＆名前 */}
            <div className="flex justify-between items-center">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${result.badge}`}>
                {result.type}
              </span>
              <span className="text-xs text-slate-300 font-medium">{userName} さんの前世</span>
            </div>

            {/* メインタイトル */}
            <div className="text-center space-y-1 py-1">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                {result.name}
              </h2>
              <p className="text-xs text-emerald-400 font-semibold">🌿 覚醒生息地：{result.habitat}</p>
            </div>

            {/* 解説テキスト */}
            <div className="bg-slate-950/60 border border-white/10 p-3.5 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed">
              <p>{result.desc}</p>
            </div>

            {/* シェア＆アクションボタン */}
            <div className="space-y-2 pt-2">
              <button 
                onClick={shareToX}
                className="w-full bg-black hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-xl border border-slate-700 transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <span>𝕏 結果をシェアして友達に教える</span>
              </button>

              <button 
                onClick={() => alert('Canva API連携機能を次に実装します！')}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 border border-white/5"
              >
                <span>🎨 Canvaで特製カード画像を生成する</span>
              </button>
            </div>

          </div>
        )}

      </div>

      <footer className="text-[10px] text-slate-500 text-center pt-8 tracking-wider">
        Powered by Next.js & Canva Connect API
      </footer>
    </main>
  );
}
