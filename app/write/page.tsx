// app/write/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('posts').insert([
      { title, content, image_url: imageUrl }
    ]);
    
    if (error) {
      alert('저장 실패: ' + error.message);
    } else {
      alert('등록 완료!');
      router.push('/posts');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-8 py-20">
      <h1 className="text-3xl font-black mb-10 text-white">글쓰기</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          placeholder="제목" 
          className="w-full p-4 bg-black border border-white/10 text-white" 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          placeholder="이미지 URL" 
          className="w-full p-4 bg-black border border-white/10 text-white" 
          onChange={(e) => setImageUrl(e.target.value)} 
        />
        
        {/* 여기서 에러가 났던 부분입니다. form 태그 안쪽으로 위치를 옮겼습니다 */}
        {imageUrl && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">이미지 미리보기</p>
            <img src={imageUrl} alt="preview" className="h-40 object-cover rounded-sm" />
          </div>
        )}

        <textarea 
          rows={10} 
          className="w-full p-4 bg-black border border-white/10 text-white" 
          onChange={(e) => setContent(e.target.value)} 
        />
        <button type="submit" className="bg-[#e67e22] text-white px-8 py-4 font-bold">
          발행하기
        </button>
      </form>
    </div>
  );
}