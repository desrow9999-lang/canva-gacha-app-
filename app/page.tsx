'use client';

import { useState } from 'react';

// 生息する生き物・植物のデータリスト
const creatures = [
  { name: '月夜のフクロウ × シダ植物', type: '神秘タイプ', habitat: '深い霧の森の奥深く', desc: 'マイペースで直感力が鋭く、夜になると知恵が冴え渡るタイプ。', color: 'from-indigo-900 to-purple-800' },
  { name: 'ひまわりを纏うカマキリ', type: '情熱タイプ', habitat: '真夏のまばゆい草原', desc: '集中力抜群で、狙った獲物（目標）を絶対に逃さないハンター気質。', color: 'from-amber-500 to-emerald-700' },
  { name: '深海のオオクラゲ × 水草', type: '癒やしタイプ', habitat: '光の届かない青い海中', desc: '周囲を穏やかな空気で包み込む。マイペースすぎてたまに心配される。', color: 'from-blue-600 to-teal-400' },
  { name: '桜の木に宿るリス', type: '春爛漫タイプ', habitat: '満開の桜並木', desc: '楽しいことが大好きで、周りの人たちに笑顔と幸せを運ぶムードメーカー。', color: 'from-pink-400 to-amber-600' },
  { name: 'サボテンのトゲを宿すトカゲ', type: '忍耐・孤高タイプ', habitat: '灼熱の砂漠地帯', desc: '逆境にめちゃくちゃ強く、どんな困難も独自のクールな方法で乗り切る。', color: 'from-yellow-600 to-green-800' },
];

export default function CreatureFortuneApp() {
  const [result, setResult] = useState<typeof creatures[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [userName, setUserName] = useState('');

  // ガチャ（占い）を回す関数
  const drawFortune = () => {
    if (!userName.trim()) {
      alert('あなたの名前（またはニックネーム）を入力してね！');
      return;
    }

    setIsSpinning(true);
    
    // ガチャを回している演出（0.8秒後に結果を表示）
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * creatures.length);
      setResult(creatures[randomIndex]);
      setIsSpinning(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-md flex flex-col items-center gap-6 my-auto">
        
        {/* タイトル */}
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            前世の生き物・植物 占い
          </h1>
          <p className="text-xs text-slate-400 mt-1">あなたの魂のルーツを解き明かすガチャ</p>
        </div>

        {/* 入力フォーム */}
        <div className="w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3 shadow-xl">
          <label className="text-sm text-slate-300">あなたの名前を入力</label>
          <input 
            type="text" 
            placeholder="例：ゆうき" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
          />
          <button 
            onClick={drawFortune}
            disabled={isSpinning}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-all disabled:opacity-50"
          >
            {isSpinning ? '魂のルーツを探索中...' : '✨ 前世を占う（ガチャを引く）'}
          </button>
        </div>

        {/* 結果表示カード */}
        {result && (
          <div className={`w-full bg-gradient-to-br ${result.color} p-6 rounded-3xl shadow-2xl border border-white/20 flex flex-col gap-4 animate-fade-in`}>
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full text-white/90">
                {result.type}
              </span>
              <span className="text-xs text-white/80">{userName}さんの前世</span>
            </div>

            <div className="text-center my-2">
              <h2 className="text-xl font-black text-white drop-shadow-md">
                {result.name}
              </h2>
              <p className="text-xs text-white/90 mt-1">🌿 生息地: {result.habitat}</p>
            </div>

            <div className="bg-black/30 backdrop-blur-sm p-4 rounded-2xl text-sm text-white/95 leading-relaxed">
              <p>{result.desc}</p>
            </div>

            <button 
              onClick={() => alert('スマホのスクリーンショットや、Canva API連携による画像保存機能をここに組み込めます！')}
              className="w-full bg-white text-slate-950 font-bold py-3 rounded-xl shadow hover:bg-slate-100 transition-colors text-sm"
            >
              📥 このカード結果を保存する
            </button>
          </div>
        )}

      </div>

      <footer className="text-xs text-slate-600 text-center">
        Powered by Next.js & Canva Idea
      </footer>
    </main>
  );
}

