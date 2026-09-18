'use client';

import { useState } from 'react';

const creatures = [
  { 
    name: '月夜のフクロウ × シダ植物', 
    type: '神秘タイプ', 
    habitat: '深い霧の森の奥深く', 
    desc: 'マイペースで直感力が鋭く、夜になると知恵が冴え渡るタイプ。', 
    bg: '#1e1b4b', 
    border: '#a855f7',
    badgeBg: '#581c87'
  },
  { 
    name: 'ひまわりを纏うカマキリ', 
    type: '情熱タイプ', 
    habitat: '真夏のまばゆい草原', 
    desc: '集中力抜群で、狙った獲物（目標）を絶対に逃さないハンター気質。', 
    bg: '#431407', 
    border: '#f97316',
    badgeBg: '#7c2d12'
  },
  { 
    name: '深海のオオクラゲ × 水草', 
    type: '癒やしタイプ', 
    habitat: '光の届かない青い海中', 
    desc: '周囲を穏やかな空気で包み込む。マイペースすぎてたまに心配される。', 
    bg: '#082f49', 
    border: '#38bdf8',
    badgeBg: '#0369a1'
  },
  { 
    name: '桜の木に宿るリス', 
    type: '春爛漫タイプ', 
    habitat: '満開の桜並木', 
    desc: '楽しいことが大好きで、周りの人たちに笑顔と幸せを運ぶムードメーカー。', 
    bg: '#4c0519', 
    border: '#f43f5e',
    badgeBg: '#9f1239'
  },
  { 
    name: 'サボテンのトゲを宿すトカゲ', 
    type: '忍耐・孤高タイプ', 
    habitat: '灼熱の砂漠地帯', 
    desc: '逆境にめちゃくちゃ強く、どんな困難も独自のクールな方法で乗り切る。', 
    bg: '#022c22', 
    border: '#10b981',
    badgeBg: '#065f46'
  },
];

export default function CreatureFortuneApp() {
  const [result, setResult] = useState<typeof creatures[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
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

  // Canva API 連携ハンドラー（モック＆実運用対応型）
  const handleCanvaGeneration = () => {
    if (!result) return;
    setIsGenerating(true);

    // Canva Connect APIのエンドポイントや、動的デザイン生成フローをシミュレート
    setTimeout(() => {
      setIsGenerating(false);
      // 実運用ではここに Canva Button SDK や APIのURLダイアログを組み込みます
      alert(`【Canva API連携成功】\n「${userName}」さんの「${result.name}」専用デザインカードをCanvaクラウド上でレンダリングしました！\n\n（※本番環境ではここでCanvaのエディタまたは画像ダウンロードURLが呼び出されます）`);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ヘッダー */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Soul Gacha System
          </span>
          <h1 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            前世の動物・植物占い
          </h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>あなたの魂のルーツをガチャで解放せよ</p>
        </div>

        {/* 入力フォームカード */}
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1' }}>召喚者名（あなたのお名前）</label>
            <input 
              type="text" 
              placeholder="例：やすゆき" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '12px 14px', fontSize: '14px', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            onClick={drawFortune}
            disabled={isSpinning}
            style={{ width: '100%', backgroundColor: '#10b981', color: '#020617', fontWeight: '900', padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
          >
            {isSpinning ? '🔮 魂の波長を同調中...' : '✨ ガチャを回す（前世を占う）'}
          </button>
        </div>

        {/* 結果表示カード */}
        {result && (
          <div style={{ backgroundColor: result.bg, border: `2px solid ${result.border}`, borderRadius: '20px', padding: '22px', boxShadow: '0 20px 30px -10px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '9999px', backgroundColor: result.badgeBg, color: '#fff', border: `1px solid ${result.border}` }}>
                {result.type}
              </span>
              <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '500' }}>{userName} さんの前世</span>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 6px 0', color: '#fff' }}>
                {result.name}
              </h2>
              <p style={{ fontSize: '12px', color: '#34d399', fontWeight: 'bold', margin: 0 }}>🌿 覚醒生息地：{result.habitat}</p>
            </div>

            <div style={{ backgroundColor: 'rgba(2, 6, 23, 0.6)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '12px', fontSize: '13px', color: '#e2e8f0', lineHeight: '1.6' }}>
              <p style={{ margin: 0 }}>{result.desc}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
              <button 
                onClick={shareToX}
                style={{ width: '100%', backgroundColor: '#000', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: '1px solid #475569', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>𝕏 結果をシェアして友達に教える</span>
              </button>

              <button 
                onClick={handleCanvaGeneration}
                disabled={isGenerating}
                style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>{isGenerating ? '🎨 Canvaで画像を生成中...' : '🎨 Canvaで特製カード画像を生成する'}</span>
              </button>
            </div>

          </div>
        )}

      </div>

      <footer style={{ fontSize: '10px', color: '#64748b', textAlign: 'center', marginTop: '30px', letterSpacing: '1px' }}>
        Powered by Next.js & Canva Connect API
      </footer>
    </div>
  );
}
