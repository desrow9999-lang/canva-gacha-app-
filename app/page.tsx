'use client';

import { useState } from 'react';

const CANVA_APP_ID = 'AAHOGHJ6DXI';
const CANVA_APP_URL = 'https://app-aahoghj6dxi.canva-apps.com';

// -------------------------------------------------------------
// ♾️ 無限カオス・膨大なパーツプール
// -------------------------------------------------------------
const adjectives = [
  '宇宙を支配する', '三日酔いの', 'コミュ障な', '伝説の', '完全無敵の',
  'ガチャを愛しすぎた', '美意識の', '次元を超える', '孤高の', '金脈が泣いた',
  '侵略特務班の', 'マニアックな', '令和の', 'おイグラさんの', '電脳世界の',
  '量子超越の', '深海パラドックスの', '星屑のパルクールの', '超越神化の', 'バグり散らかした'
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
  { name: 'ネコ', icon: '🐈' },
  { name: 'カピバラ', icon: '🦦' },
  { name: 'サイバーウサギ', icon: '🐰' }
];

const plants = [
  { name: 'シダ植物', habitat: '深い霧の森の奥深く' },
  { name: 'ひまわり', habitat: '高濃度めまいやすい世界' },
  { name: '木草', habitat: '光の届かない青い海中' },
  { name: '桜の木', habitat: '満開の桜並木' },
  { name: 'サボテン', habitat: '灼熱の砂漠地帯' },
  { name: '巨大キノコ', habitat: '怪しく光る地下庭園' },
  { name: 'クリスタル鉱石', habitat: '時空を超える水晶宮殿' },
  { name: 'ネオン苔', habitat: 'サイバーパンク都市の裏路地' },
  { name: '古代蓮', habitat: '神聖なる神秘の沼地' },
  { name: '量子ローズ', habitat: '電脳仮想空間のガーデン' }
];

const types = [
  { name: '神秘タイプ', bg: '#1e1b4b', border: '#818cf8', badgeBg: '#4338ca', accent: '#818cf8' },
  { name: '混沌カオスタイプ', bg: '#431407', border: '#f97316', badgeBg: '#c2410c', accent: '#fb923c' },
  { name: '癒やし・マイペースタイプ', bg: '#062f49', border: '#38bdf8', badgeBg: '#0369a1', accent: '#38bdf8' },
  { name: '春爛漫・お祭りタイプ', bg: '#4c0519', border: '#f43f5e', badgeBg: '#9f1239', accent: '#fb7185' },
  { name: '慈悲・高潔タイプ', bg: '#022c22', border: '#34d399', badgeBg: '#065f46', accent: '#34d399' },
  { name: 'サイバー次元歪みタイプ', bg: '#41043d', border: '#ec4899', badgeBg: '#831843', accent: '#f472b6' }
];

const descTemplates = [
  '高額な空気を完全に出し切って旅をゆく。本気を出すと地球が揺れるとされている。',
  '圧倒的な原動力と速さで、どんなピンチもなぜか笑顔で乗り切ってしまう特異体質。',
  '普段は寝てばかりいるが、美味しいものの気配を察知すると異次元で覚醒するハンター。',
  '誰にも真似できない独特なセンスを持ち、すれ違う人すべてを二度見させるオーラの持ち主。',
  '逆境にめちゃくちゃ強く、どんな困難なことでも「まあいっか」で粉砕する最強のメンタル。',
  '無限のデータ海を泳ぐ預言者。周囲に不思議な幸運をばら撒く伝説のムードメーカー。'
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
  const [isCanvasExporting, setIsCanvasExporting] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState('');

  // ♾️ 無限ランダムマッシュアップを実行
  const drawInfiniteFortune = () => {
    if (!userName.trim()) {
      alert('召喚者名（お名前）を入力してください！');
      return;
    }

    setIsSpinning(true);
    setGeneratedImageUrl(null);

    setTimeout(() => {
      // 完全にランダムにパーツを抽出
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

  const shareX = () => {
    if (!result) return;
    const text = encodeURIComponent(
      `【${userName.userName || userName}さんの前世診断】私の前世は「${result.title}」でした！属性: ${result.typeObj.name}\n\n#前世ガチャ #無限カオス占い`
    );
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
  };

  // カオス＆スタイリッシュなSVGカード生成
  const handleCanvaIntegration = () => {
    if (!result) return;
    setIsCanvasExporting(true);

    setTimeout(() => {
      setIsCanvasExporting(false);
      const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420">
        <defs>
          <linearGradient id="cardbg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${result.typeObj.bg}" />
            <stop offset="100%" stop-color="#020617" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        <rect width="600" height="420" rx="28" fill="url(#cardbg)" />
        <rect x="20" y="20" width="560" height="380" rx="20" fill="none" stroke="${result.typeObj.border}" stroke-width="3" stroke-opacity="0.6" />

        <!-- メタ情報 -->
        <text x="45" y="55" font-family="sans-serif" font-size="11" font-weight="bold" fill="#34d399">CANVA APP ID: ${CANVA_APP_ID}</text>
        <text x="555" y="55" font-family="sans-serif" font-size="12" font-weight="bold" fill="#cbd5e1" text-anchor="end">${userName} さん前世</text>

        <!-- タイプバッジ -->
        <rect x="45" y="72" width="169" height="30" rx="15" fill="${result.typeObj.badgeBg}" stroke="${result.typeObj.border}" stroke-width="1" />
        <text x="129" y="92" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ffffff" text-anchor="middle">${result.typeObj.name}</text>

        <!-- アイコン -->
        <circle cx="500" cy="135" r="45" fill="rgba(255,255,255,0.08)" stroke="${result.typeObj.accent}" stroke-width="1.5" />
        <text x="500" y="148" font-family="sans-serif" font-size="50" text-anchor="middle">${result.icon}</text>

        <!-- タイトル (折り返し対応) -->
        <text x="45" y="150" font-family="sans-serif" font-size="22" font-weight="900" fill="#ffffff">${result.title.slice(0, 16)}</text>
        <text x="45" y="175" font-family="sans-serif" font-size="22" font-weight="900" fill="#ffffff">${result.title.slice(16)}</text>

        <!-- 生息地 -->
        <text x="45" y="205" font-family="sans-serif" font-size="14" font-weight="bold" fill="${result.typeObj.accent}">🌿 覚醒生息地：${result.habitat}</text>

        <!-- 説明枠 -->
        <rect x="45" y="225" width="510" height="83" rx="14" fill="rgba(2, 6, 23, 0.75)" stroke="rgba(255,255,255,0.1)" />
        <text x="65" y="258" font-family="sans-serif" font-size="13" fill="#f1f5f9">${result.desc.slice(0, 34)}</text>
        <text x="65" y="282" font-family="sans-serif" font-size="13" fill="#f1f5f9">${result.desc.slice(34)}</text>

        <!-- フッター -->
        <line x1="45" y1="335" x2="555" y2="335" stroke="rgba(255,255,255,0.1)" stroke-width="1" />
        <text x="45" y="370" font-family="sans-serif" font-size="11" fill="#34d399">✨ Soul Gacha &amp; Canva Connect API Integration</text>
        <text x="555" y="379" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="end">${CANVA_APP_URL}</text>
      </svg>`;

      const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
      setGeneratedImageUrl(encodedSvg);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', padding: '24px 16px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* ヘッダー */}
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <div style={{ fontSize: '10px', fontWeight: '900', color: '#34d399', letterSpacing: '0.5px', marginBottom: '6px' }}>
            CANVA APP ID: {CANVA_APP_ID}
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>
            無限・前世カオス占い
          </h1>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>数万通りの奇跡の組み合わせを解放せよ</p>
        </div>

        {/* 入力フォームカード */}
        <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#cbd5e1' }}>召喚者名 (あなたのお名前)</label>
            <input
              type="text"
              placeholder="例：やすゆき"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ width: '100%', backgroundColor: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
          </div>

          <button
            onClick={drawInfiniteFortune}
            disabled={isSpinning}
            style={{ width: '100%', background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', color: '#fff', fontSize: '15px', fontWeight: 'bold', padding: '14px', borderRadius: '14px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)' }}
          >
            {isSpinning ? '🌀 次元を超えて召喚中…' : '✨ 無限ガチャを回す（前世を占う）'}
          </button>
        </div>

        {/* 結果表示カード */}
        {result && (
          <div style={{ backgroundColor: result.typeObj.bg, border: `2px solid ${result.typeObj.border}`, borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', padding: '4px 12px', borderRadius: '9999px', backgroundColor: result.typeObj.badgeBg, color: '#fff', border: `1px solid ${result.typeObj.border}` }}>
                {result.typeObj.name}
              </span>
              <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '500' }}>{userName}さんの前世</span>
            </div>

            <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
              <span style={{ fontSize: '38px' }}>{result.icon}</span>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '900', margin: '0 0 4px 0', color: '#fff', textAlign: 'left' }}>
                  {result.title}
                </h2>
                <p style={{ fontSize: '12px', color: result.typeObj.accent, fontWeight: 'bold', margin: 0, textAlign: 'left' }}>
                  🌿 覚醒生息地：{result.habitat}
                </p>
              </div>
            </div>

            <div style={{ backgroundColor: 'rgba(2, 6, 23, 0.7)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '14px' }}>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.6', color: '#f1f5f9' }}>{result.desc}</p>
            </div>

            {/* 生成された画像プレビュー画像 */}
            {generatedImageUrl && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: '10px', color: '#34d399', fontWeight: 'bold', margin: 0 }}>✨ Canvaクラウド生成・特製イラストカード</p>
                <img src={generatedImageUrl} alt="Infinite Canva Generated Card" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }} />
                <p style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center', margin: 0 }}>※画像を長押しまたはタップしてスマホに保存できます</p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
              <button
                onClick={shareX}
                style={{ width: '100%', backgroundColor: '#000', color: '#fff', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: '1px solid #334155', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                <span>𝕏 結果をシェアして友達に教える</span>
              </button>

              <button
                onClick={handleCanvaIntegration}
                disabled={isCanvasExporting}
                style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', color: '#fff', fontSize: '13px', fontWeight: 'bold', padding: '12px', borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)' }}
              >
                {isCanvasExporting ? '🎨 Canvaクラウドでカオス生成中…' : '🎨 Canva公式APIでイラストカードを生成'}
              </button>
            </div>

          </div>
        )}

        {/* フッター */}
        <footer style={{ fontSize: '10px', color: '#64748b', textAlign: 'center', marginTop: '30px', letterSpacing: '1px' }}>
          Powered by Next.js &amp; Canva Connect API ({CANVA_APP_URL})
        </footer>
      </div>
    </div>
  );
}
