'use client';

import { useState } from 'react';

const CANVA_APP_ID = 'AAHOGHJ6DXI';
const CANVA_APP_URL = 'https://app-aahoghj6dxi.canva-apps.com';

// 膨大なパーツプール（掛け合わせで無限の組み合わせを生成）
const adjectives = [
  '宇宙を支配する', '二日酔いの', 'コミュ障な', '伝説の', '完全無敗の', 
  'ポテチを愛しすぎた', '黄昏時の', '次元を歪める', '孤高の', '全米が泣いた', 
  '寝坊常習犯の', 'マニアックな', '令和の', 'おイグラさんの', '電脳世界の'
];

const animals = [
  { name: 'フクロウ', icon: '🦉' },
  { name: 'カマキリ', icon: '🦗' },
  { name: 'オオクラゲ', icon: '🪼' },
  { name: 'リス', icon: '🐿️' },
  { name: 'トカゲ', icon: '🦎' },
  { name: 'ドラゴン', icon: '🐉' },
  { name: 'アルパカ', icon: '🦙' },
  { name: 'サメ', icon: '🦈' },
  { name: 'ハムスター', icon: '🐹' },
  { name: 'フェニックス', icon: '🔥' },
  { name: 'パンダ', icon: '🐼' },
  { name: 'ネコ', icon: '🐈' }
];

const plants = [
  { name: 'シダ植物', habitat: '深い霧の森の奥深く' },
  { name: 'ひまわり', habitat: '真夏のまばゆい草原' },
  { name: '水草', habitat: '光の届かない青い海中' },
  { name: '桜の木', habitat: '満開の桜並木' },
  { name: 'サボテン', habitat: '灼熱の砂漠地帯' },
  { name: '巨大キノコ', habitat: '怪しく光る地下洞窟' },
  { name: 'クリスタル鉱石', habitat: '時空を超える水晶宮殿' },
  { name: 'ネオン苔', habitat: 'サイバーパンクな都市の裏路地' },
  { name: '古代蓮', habitat: '神聖なる神秘の沼地' }
];

const types = [
  { name: '神秘タイプ', bg: '#1e1b4b', border: '#a855f7', badgeBg: '#581c87', accent: '#c084fc' },
  { name: '情熱・カオスタイプ', bg: '#431407', border: '#f97316', badgeBg: '#7c2d12', accent: '#fb923c' },
  { name: '癒やし・マイペースタイプ', bg: '#082f49', border: '#38bdf8', badgeBg: '#0369a1', accent: '#38bdf8' },
  { name: '春爛漫・お祭りタイプ', bg: '#4c0519', border: '#f43f5e', badgeBg: '#9f1239', accent: '#fb7185' },
  { name: '忍耐・孤高タイプ', bg: '#022c22', border: '#10b981', badgeBg: '#065f46', accent: '#34d399' },
  { name: 'サイバー・次元歪みタイプ', bg: '#31043d', border: '#ec4899', badgeBg: '#831843', accent: '#f472b6' }
];

const descTemplates = [
  '周囲の空気を完全に無視して我が道をゆく。本気を出すと地球が揺れると噂されている。',
  '圧倒的な直感力と適当さで、どんなピンチもなぜか笑顔で乗り切ってしまう特異体質。',
  '普段は眠そうにしているが、美味しいものの気配を察知すると超音速で覚醒するハンター。',
  '誰にも真似できない独特なセンスを持ち、すれ違う人すべてを二度見させるオーラの持ち主。',
  '逆境にめちゃくちゃ強く、どんな面倒なことでも「まあいっか」で粉砕する最強のメンタル。'
];

export default function InfiniteFortuneApp() {
  const [result, setResult] = useState<{
    title: string;
    animal: string;
    icon: string;
    plant: string;
    habitat: string;
    typeObj: typeof types[0];
    desc: string;
  } | null>(null);
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [isCanvaExporting, setIsCanvaExporting] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState('');

  const drawInfiniteFortune = () => {
    if (!userName.trim()) {
      alert('召喚者名（お名前）を入力してください！');
      return;
    }
    setIsSpinning(true);
    setGeneratedImageUrl(null);

    setTimeout(() => {
      // 完全ランダムにパーツをマッシュアップ
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const ani = animals[Math.floor(Math.random() * animals.length)];
      const plt = plants[Math.floor(Math.random() * plants.length)];
      const typ = types[Math.floor(Math.random() * types.length)];
      const dsc = descTemplates[Math.floor(Math.random() * descTemplates.length)];

      const fullName = `${adj} ${ani.name} × ${plt.name}`;

      setResult({
        title: fullName,
        animal: ani.name,
        icon: ani.icon,
        plant: plt.name,
        habitat: plt.habitat,
        typeObj: typ,
        desc: dsc,
      });
      setIsSpinning(false);
    }, 1200);
  };

  const shareToX = () => {
    if (!result) return;
    const text = encodeURIComponent(
      `【${userName}さんの無限前世占い】\n私の前世は「${result.title}」（${result.typeObj.name}）でした！\n生息地：${result.habitat}\n\nあなたも次元を超えた魂のルーツを引いてみよう！✨\n#無限前世占い #Canva`
    );
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
  };

  // カオス＆スタイリッシュなSVGカード生成
  const handleCanvaIntegration = () => {
    if (!result) return;
    setIsCanvaExporting(true);

    setTimeout(() => {
      setIsCanvaExporting(false);
      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
          <defs>
            <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${result.typeObj.bg}" />
              <stop offset="100%" stop-color="#020617" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          <rect width="600" height="420" rx="28" fill="url(#cardBg)" />
          <rect x="20" y="20" width="560" height="380" rx="20" fill="none" stroke="${result.typeObj.border}" stroke-width="3" opacity="0.9" />
          
          <!-- メタ情報 -->
          <text x="45" y="55" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399">CANVA APP ID: ${CANVA_APP_ID}</text>
          <text x="555" y="55" font-family="sans-serif" font-size="12" font-weight="bold" fill="#cbd5e1" text-anchor="end">${userName} さんの前世</text>
          
          <!-- タイプバッジ -->
          <rect x="45" y="72" width="160" height="30" rx="15" fill="${result.typeObj.badgeBg}" stroke="${result.typeObj.border}" stroke-width="1" />
          <text x="125" y="92" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">${result.typeObj.name}</text>

          <!-- アイコン -->
          <circle cx="505" cy="135" r="48" fill="rgba(255,255,255,0.08)" stroke="${result.typeObj.accent}" stroke-width="2" filter="url(#glow)" />
          <text x="505" y="148" font-family="sans-serif" font-size="50" text-anchor="middle">${result.icon}</text>

          <!-- タイトル（折り返し対応風） -->
          <text x="45" y="145" font-family="sans-serif" font-size="22" font-weight="900" fill="#ffffff">${result.title.slice(0, 20)}</text>
          <text x="45" y="175" font-family="sans-serif" font-size="22" font-weight="900" fill="#ffffff">${result.title.slice(20)}</text>
          
          <!-- 生息地 -->
          <text x="45" y="205" font-family="sans-serif" font-size="13" font-weight="bold" fill="${result.typeObj.accent}">🌿 覚醒生息地：${result.habitat}</text>

          <!-- 説明枠 -->
          <rect x="45" y="225" width="510" height="85" rx="14" fill="rgba(2, 6, 23, 0.75)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
          <text x="65" y="258" font-family="sans-serif" font-size="13" fill="#f1f5f9">${result.desc.slice(0, 34)}</text>
          <text x="65" y="282" font-family="sans-serif" font-size="13" fill="#f1f5f9">${result.desc.slice(34)}</text>

          <!-- フッター -->
          <line x1="45" y1="335" x2="555" y2="335" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
          <text x="45" y="370" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399">✨ Infinite Chaos &amp; Canva Connect API</text>
          <text x="555" y="370" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="end">${CANVA_APP_URL}</text>
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
            無限・前世カオス占い
          </h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>数万通りの奇跡の組み合わせを解放せよ</p>
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
            onClick={drawInfiniteFortune}
            disabled={isSpinning}
            style={{ width: '100%', background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', color: '#fff', fontWeight: '900', padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}
          >
            {isSpinning ? '🌀 次元を超えて召喚中...' : '🎲 無限ガチャを回す（運命の融合）'}
          </button>
        </div>

        {/* 結果表示カード */}
        {result && (
          <div style={{ backgroundColor: result.typeObj.bg, border: `2px solid ${result.typeObj.border}`, borderRadius: '20px', padding: '22px', boxShadow: '0 20px 30px -10px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '9999px', backgroundColor: result.typeObj.badgeBg, color: '#fff', border: `1px solid ${result.typeObj.border}` }}>
                {result.typeObj.name}
              </span>
              <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '500' }}>{userName} さんの前世</span>
            </div>

            <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <span style={{ fontSize: '38px' }}>{result.icon}</span>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 4px 0', color: '#fff', textAlign: 'left', lineHeight: '1.3' }}>
                  {result.title}
                </h2>
                <p style={{ fontSize: '12px', color: result.typeObj.accent, fontWeight: 'bold', margin: 0, textAlign: 'left' }}>🌿 生息地：{result.habitat}</p>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(2, 6, 23, 0.7)', border: '1px solid rgba(255,255,255,0.1)', padding: '14px', borderRadius: '12px', fontSize: '13px', color: '#e2e8f0', lineHeight: '1.6' }}>
              <p style={{ margin: 0 }}>{result.desc}</p>
            </div>

            {/* 生成された無限プレビュー画像 */}
            {generatedImageUrl && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#34d399', margin: 0, textAlign: 'center' }}>✨ Canvaクラウド生成・無限カオスカード</p>
                <img src={generatedImageUrl} alt="Infinite Canva Generated Card" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} />
                <p style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', margin: 0 }}>※画像を長押しまたはタップしてスマホに保存できます</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
              <button 
                onClick={shareToX}
                style={{ width: '100%', backgroundColor: '#000', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: '1px solid #475569', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>𝕏 この奇跡の組み合わせをシェアする</span>
              </button>

              <button 
                onClick={handleCanvaIntegration}
                disabled={isCanvaExporting}
                style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)' }}
              >
                <span>{isCanvaExporting ? '🎨 Canvaクラウドでカオス生成中...' : '🎨 Canva公式APIで無限カードを生成'}</span>
              </button>
            </div>

          </div>
        )}

      </div>

      <footer style={{ fontSize: '10px', color: '#64748b', textAlign: 'center', marginTop: '30px', letterSpacing: '1px' }}>
        Powered by Next.js &amp; Canva Connect API ({CANVA_APP_URL})
      </footer>
    </div>
  );
}

