import './globals.css';

export const metadata = {
  title: '前世の生き物・植物 占い',
  description: 'あなたの魂のルーツを解き明かすガチャアプリ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

