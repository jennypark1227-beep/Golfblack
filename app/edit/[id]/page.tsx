'use client';
import { useEffect, useState, use } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); // 여기서 params를 풀어줍니다.
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      // resolvedParams.id를 사용합니다.
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();
        
      if (error) console.error("데이터 불러오기 실패:", error);
      else setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [resolvedParams.id]); // 의존성 배열도 수정되었습니다.

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('posts')
      .update({ title: post.title, content: post.content, image_url: post.image_url })
      .eq('id', resolvedParams.id);
      
    if (error) alert('수정 실패: ' + error.message);
    else {
      alert('수정되었습니다!');
      router.push('/posts');
    }
  };

  if (loading) return <div className="text-white p-20">데이터를 불러오는 중입니다...</div>;
  if (!post) return <div className="text-white p-20">글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto px-8 py-20">
      <h1 className="text-3xl font-black mb-10 text-white">노트 수정하기</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input 
          value={post.title || ''} 
          onChange={(e) => setPost({...post, title: e.target.value})}
          className="w-full p-4 bg-[#1a1a1a] border border-white/10 text-white" 
        />
        <input 
          value={post.image_url || ''} 
          onChange={(e) => setPost({...post, image_url: e.target.value})}
          className="w-full p-4 bg-[#1a1a1a] border border-white/10 text-white" 
          placeholder="이미지 URL"
        />
        <textarea 
          value={post.content || ''} 
          onChange={(e) => setPost({...post, content: e.target.value})}
          className="w-full p-4 bg-[#1a1a1a] border border-white/10 h-64 text-white"
        />
        <button type="submit" className="bg-[#e67e22] text-white px-8 py-4 font-bold">수정 완료</button>
      </form>
    </div>
  );
}