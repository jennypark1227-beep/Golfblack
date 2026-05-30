// app/posts/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const ADMIN_EMAIL = "jennypark1227@gmail.com"; // 본인의 이메일로 확인

  useEffect(() => {
    // 1. 게시글 가져오기
    const fetchPosts = async () => {
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      setPosts(data || []);
    };
    // 2. 로그인 정보 가져오기
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    fetchPosts();
    checkUser();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-black mb-10 text-white">전체 노트</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          /* 카드 전체를 클릭하면 수정 페이지로 이동하도록 Link로 감쌈 */
          <Link 
            href={`/edit/${post.id}`} 
            key={post.id} 
            className="bg-[#1a1a1a] p-4 rounded-sm border border-white/10 block hover:border-white/30 transition"
          >
            <img 
              src={post.image_url || 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb'} 
              className="w-full h-48 object-cover mb-4 rounded-sm" 
              alt={post.title}
            />
            <h3 className="text-xl font-bold mb-2 text-white">{post.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.content}</p>
            
            {/* 관리자일 때만 수정 버튼 노출 */}
            {user?.email === ADMIN_EMAIL && (
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs text-blue-400 hover:underline font-bold">
                  수정하기
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}