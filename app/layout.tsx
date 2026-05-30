// app/layout.tsx
import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-black text-white">
        {/* 상단 파란색 바를 딥 포레스트 그린으로 변경 */}
        <div className="bg-[#1a3c34] text-white py-2 text-center text-sm font-medium">
          골프블랙에서 만나는 골프 지식노트
          <p className="text-xs opacity-70">매일 5분을 투자하여 골프 인사이트를 얻어가세요</p>
        </div>

        {/* 헤더 영역 */}
        <header className="bg-[#fcfaf5] border-b border-black/10 py-6">
          <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
            <Link href="/" className="text-2xl font-black text-black">GolfBLACK</Link>
            <nav className="flex space-x-8 text-sm font-bold text-black">
              <Link href="/">오늘의 노트</Link>
              <Link href="/posts">전체 노트</Link>
              <Link href="/write">글쓰기</Link>
              <Link href="/mypage">마이페이지</Link>
              <Link href="/login">로그인</Link>
            </nav>
          </div>
        </header>

        {/* 메인 콘텐츠 영역 */}
        <main>{children}</main>
      </body>
    </html>
  );
}