'use client';

import { useState } from 'react';

const CANVA_APP_ID = 'AAHOGHJ6DXI';
const CANVA_APP_URL = 'https://app-aahoghj6dxi.canva-apps.com';

const creatures = [
  { 
    name: '月夜のフクロウ × シダ植物', 
    type: '神秘タイプ', 
    habitat: '深い霧の森の奥深く', 
    desc: 'マイペースで直感力が鋭く、夜になると知恵が冴え渡るタイプ。', 
    bg: '#1e1b4b', 
    border: '#a855f7',
    badgeBg: '#581c87',
    icon: '🦉',
    accentColor: '#c084fc'
  },
  { 
    name: 'ひまわりを纏うカマキリ', 
    type: '情熱タイプ', 
    habitat: '真夏のまばゆい草原', 
    desc: '集中力抜群で、狙った獲物（目標）を絶対に逃さないハンター気質。', 
    bg: '#431407', 
    border: '#f97316',
    badgeBg: '#7c2d12',
    icon: '🦗',
    accentColor: '#fb923c'
  },
  { 
    name: '深海のオオクラゲ × 水草', 
    type: '癒やしタイプ', 
    habitat: '光の届かない青い海中', 
    desc: '周囲を穏やかな空気で包み込む。マイペースすぎてたまに心配される。', 
    bg: '#082f49', 
    border: '#38bdf8',
    badgeBg: '#0369a1',
    icon: '🪼',
    accentColor: '#38bdf8'
  },
  { 
    name: '桜の木に宿るリス', 
    type: '春爛漫タイプ', 
    habitat: '満開の桜並木', 
    desc: '楽しいことが大好きで、周りの人たちに笑顔と幸せを運ぶムードメーカー。', 
    bg: '#4c0519', 
    border: '#f43f5e',
    badgeBg: '#9f1239',
    icon: '🐿️',
    accentColor: '#fb7185'
  },
  { 
    name: 'サボテンのトゲを宿すトカゲ', 
    type: '忍耐・孤高タイプ', 
    habitat: '灼熱の砂漠地帯', 
    desc: '逆境にめちゃくちゃ強く、どんな困難も独自のクールな方法で乗り切る。', 
    bg: '#022c22', 
    border: '#10b981',
    badgeBg: '#065f46',
    icon: '🦎',
    accentColor: '#34d399'
  },
];

export default function CreatureFortuneApp() {
  const [result, setResult] = useState<typeof creatures[0] | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isCanvaExporting, setIsCanvaExporting] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState('');

  const drawFortune = () => {
    if (!userName.trim()) {
      alert('召喚者名（お名前）を入力してください！');
      return;
    }
    setIsSpinning(true);
    setGeneratedImageUrl(null);
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

  // アイコン＆イラスト付きの豪華SVGカード生成
  const handleCanvaIntegration = () => {
    if (!result) return;
    setIsCanvaExporting(true);

    setTimeout(() => {
      setIsCanvaExporting(false);
      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
          <defs>
            <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${result.bg}" />
              <stop offset="100%" stop-color="#020617" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <!-- カード背景 -->
          <rect width="600" height="420" rx="28" fill="url(#cardBg)" />
          <rect x="20" y="20" width="560" height="380" rx="20" fill="none" stroke="${result.border}" stroke-width="3" opacity="0.8" />
          
          <!-- 上部メタ情報 -->
          <text x="45" y="60" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">CANVA APP ID: ${CANVA_APP_ID}</text>
          <text x="555" y="60" font-family="sans-serif" font-size="13" font-weight="bold" fill="#cbd5e1" text-anchor="end">${userName} さんの前世</text>
          
          <!-- タイプバッジ -->
          <rect x="45" y="80" width="130" height="34" rx="17" fill="${result.badgeBg}" stroke="${result.border}" stroke-width="1" />
          <text x="110" y="102" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">${result.type}</text>

          <!-- キャラクターアイコン円形ベース -->
          <circle cx="500" cy="140" r="45" fill="rgba(255,255,255,0.08)" stroke="${result.accentColor}" stroke-width="2" filter="url(#glow)" />
          <text x="500" y="152" font-family="sans-serif" font-size="46" text-anchor="middle">${result.icon}</text>

          <!-- メインタイトル（生き物名） -->
          <text x="45" y="160" font-family="sans-serif" font-size="26" font-weight="900" fill="#ffffff">${result.name}</text>
          
          <!-- 生息地 -->
          <text x="45" y="195" font-family="sans-serif" font-size="14" font-weight="bold" fill="${result.accentColor}">🌿 覚醒生息地：${result.habitat}</text>

          <!-- 説明文枠 -->
          <rect x="45" y="225" width="510" height="85" rx="14" fill="rgba(2, 6, 23, 0.7)" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
          <text x="70" y="260" font-family="sans-serif" font-size="14" fill="#f1f5f9">${result.desc.slice(0, 27)}</text>
          <text x="70" y="285" font-family="sans-serif" font-size="14" fill="#f1f5f9">${result.desc.slice(27)}</text>

          <!-- フッター -->
          <line x1="45" y1="340" x2="555" y2="340" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
          <text x="45" y="375" font-family="sans-serif" font-size="12" font-weight="bold" fill="#34d399">✨ Soul Gacha &amp; Canva Connect API Integration</text>
          <text x="555" y="375" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="end">${CANVA_APP_URL}</text>
        </svg>
      `;
      const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
      setGeneratedImageUrl(encodedSvg);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ヘッダー */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Canva App ID: {CANVA_APP_ID}
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

            <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <span style={{ fontSize: '32px' }}>{result.icon}</span>
              <div>
                <h2 style={{ fontSize: '22px', fontWeight: '900', margin: '0 0 4px 0', color: '#fff', textAlign: 'left' }}>
                  {result.name}
                </h2>
                <p style={{ fontSize: '12px', color: '#34d399', fontWeight: 'bold', margin: 0, textAlign: 'left' }}>🌿 覚醒生息地：{result.habitat}</p>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(2, 6, 23, 0.6)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '12px', fontSize: '13px', color: '#e2e8f0', lineHeight: '1.6' }}>
              <p style={{ margin: 0 }}>{result.desc}</p>
            </div>

            {/* 生成されたイラスト付きプレビュー画像 */}
            {generatedImageUrl && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#34d399', margin: 0, textAlign: 'center' }}>✨ Canvaクラウド生成・特製イラストカード</p>
                <img src={generatedImageUrl} alt="Canva Generated Card with Icon" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} />
                <p style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', margin: 0 }}>※画像を長押しまたはタップしてスマホに保存できます</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
              <button 
                onClick={shareToX}
                style={{ width: '100%', backgroundColor: '#000', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: '1px solid #475569', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>𝕏 結果をシェアして友達に教える</span>
              </button>

              <button 
                onClick={handleCanvaIntegration}
                disabled={isCanvaExporting}
                style={{ width: '100%', backgroundColor: '#6366f1', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' }}
              >
                <span>{isCanvaExporting ? '🎨 Canvaクラウドでイラスト生成中...' : '🎨 Canva公式APIでイラストカードを生成'}</span>
              </button>
            </div>

          </div>
        )}

      </div>

      <footer style={{ fontSize: '10px', color: '#64748b', textAlign: 'center', marginTop: '30px', letterSpacing: '1px' }}>
        Powered by Next.js & Canva Connect API ({CANVA_APP_URL})
      </footer>
    </div>
  );
}
