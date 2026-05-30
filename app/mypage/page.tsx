// app/mypage/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function MyPage() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const ADMIN_EMAIL = "jennypark1227@gmail.com";

  useEffect(() => {
    // 1. 사용자 정보 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. 관리자용 전체 게시글 가져오기
    const fetchPosts = async () => {
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      setPosts(data || []);
    };
    fetchPosts();
  }, []);

  // 삭제 함수
  const deletePost = async (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) alert('삭제 실패: ' + error.message);
      else {
        alert('삭제되었습니다!');
        setPosts(posts.filter(post => post.id !== id)); // 목록 즉시 갱신
      }
    }
  };

  if (!user) return <div className="p-20 text-center text-white">로그인이 필요합니다.</div>;

  // 관리자 전용 대시보드
  if (user.email === ADMIN_EMAIL) {
    return (
      <div className="max-w-5xl mx-auto px-8 py-16 text-white">
        <h1 className="text-3xl font-black mb-8">관리자 대시보드</h1>
        
        {/* 요약 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#e67e22] p-8 rounded-lg">
            <p className="text-white/80">오늘 방문자</p>
            <p className="text-4xl font-black mt-2">1,240명</p>
          </div>
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/10">
            <p className="text-gray-400">총 게시글 수</p>
            <p className="text-4xl font-black mt-2">{posts.length}개</p>
          </div>
        </div>

        {/* 게시글 관리 목록 */}
        <h2 className="text-xl font-bold mb-4">최근 등록된 노트 관리</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-[#1a1a1a] p-6 rounded flex justify-between items-center border border-white/10">
              <div>
                <h3 className="font-bold text-lg">{post.title}</h3>
                <p className="text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => deletePost(post.id)} 
                className="text-red-500 hover:text-red-700 font-bold bg-white/5 px-4 py-2 rounded"
              >
                삭제하기
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 일반 사용자용 마이페이지
  return (
    <div className="max-w-5xl mx-auto px-8 py-16 text-white">
      <h1 className="text-2xl font-bold mb-2">안녕하세요! {user.email.split('@')[0]}님</h1>
      <p className="text-gray-400 mb-8">{user.email}</p>
      <div className="bg-[#1a1a1a] p-8 rounded-lg">
        <p>일반 사용자 서비스 영역입니다.</p>
      </div>
    </div>
  );
}