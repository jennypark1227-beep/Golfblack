// app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3); // 최신 노트 3개만 메인에 표시

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 bg-black min-h-screen text-white">
      {/* 히어로 섹션 */}
      <div className="mb-16 border-b border-white/10 pb-12">
        <span className="text-[#e67e22] font-bold text-sm tracking-widest uppercase">TODAY'S NOTE</span>
        <h1 className="text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight">
          골프블랙이 제안하는<br />오늘의 골프 인사이트
        </h1>
        <p className="text-gray-400 max-w-xl">
          매일 배달되는 깊이 있는 골프 트렌드와 테크니컬 노트를 통해 당신의 플레이를 한 단계 업그레이드 하세요.
        </p>
      </div>

      {/* 최신 노트 목록 */}
      <div>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-xl font-bold border-l-4 border-[#1a3c34] pl-3">최근 발행된 지식 노트</h2>
          <Link href="/posts" className="text-sm text-gray-400 hover:text-white transition">
            전체 보기 &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="text-gray-500 py-12">노트를 구성 중입니다...</div>
        ) : posts.length === 0 ? (
          <div className="text-gray-500 py-12 bg-[#1a1a1a] text-center rounded border border-white/5">
            발행된 지식 노트가 없습니다. 관리자 페이지나 글쓰기에서 첫 노트를 등록해 보세요!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/posts`} key={post.id} className="group block bg-[#1a1a1a] rounded overflow-hidden border border-white/5 hover:border-white/20 transition">
                {post.image_url && (
                  <div className="h-48 overflow-hidden bg-gray-800">
                    <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-[#e67e22] transition line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {post.content}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}