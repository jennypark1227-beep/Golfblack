// app/page.tsx
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function Home() {
  // 최신 글 목록을 가져옵니다 (생성일자 내림차순)
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  // 첫 번째 글을 메인 '히어로' 포스트로 지정합니다.
  const heroPost = posts?.[0];

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      {/* 1. 상단 히어로 섹션 (가장 최근 글) */}
      {heroPost ? (
        <section className="flex flex-col md:flex-row gap-12 items-center mb-24">
          {/* 좌측 이미지 영역 (롱블랙 스타일의 대표 이미지) */}
          <div className="w-full md:w-3/5 aspect-video bg-[#1a1a1a] rounded-sm overflow-hidden shadow-2xl relative">
            <img 
              src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop" 
              alt="Today's Golf" 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition duration-700"
            />
            {/* 이미지 위에 살짝 얹혀진 날짜 뱃지 */}
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-bold tracking-widest text-[#e67e22]">
              GOLFBLACK ORIGINAL
            </div>
          </div>

          {/* 우측 텍스트 영역 */}
          <div className="w-full md:w-2/5 space-y-6">
            <div className="inline-block font-[Montserrat] font-black text-[#e67e22] tracking-[0.3em] text-sm">TODAY</div>
            
            {/* 디자인 포인트: 디지털 시계 느낌 */}
            <div className="text-5xl font-[Montserrat] font-bold border border-white/10 py-4 px-6 w-fit rounded-lg bg-white/5">
              13:02:50
            </div>

            <h1 className="text-5xl font-black leading-[1.1] tracking-tighter text-white">
              {heroPost.title}
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed font-light line-clamp-3">
              {heroPost.content}
            </p>

            {/* [핵심] 상세 페이지로 연결되는 링크 버튼 */}
            <Link 
              href={`/post/${heroPost.id}`} 
              className="inline-block bg-[#e67e22] text-white px-10 py-5 font-bold rounded-sm hover:bg-[#d35400] transition-transform active:scale-95 shadow-lg shadow-[#e67e22]/20"
            >
              노트 읽기 →
            </Link>
          </div>
        </section>
      ) : (
        <div className="text-center py-20 text-gray-500 italic">아직 작성된 노트가 없습니다. 첫 노트를 작성해 보세요!</div>
      )}

      {/* 2. 하단 글 목록 그리드 (나머지 글들) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
        {posts?.slice(1).map((post) => (
          <Link key={post.id} href={`/post/${post.id}`} className="group cursor-pointer">
            <div className="aspect-[4/3] bg-[#1a1a1a] mb-6 overflow-hidden rounded-sm">
               <img 
                 src="https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?q=80&w=2071&auto=format&fit=crop" 
                 alt={post.title}
                 className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-100 transition duration-500" 
               />
            </div>
            <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-[#e67e22] transition decoration-[#e67e22] decoration-2 underline-offset-4 group-hover:underline">
              {post.title}
            </h3>
            <p className="text-gray-500 line-clamp-2 text-sm leading-relaxed font-light">
              {post.content}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}