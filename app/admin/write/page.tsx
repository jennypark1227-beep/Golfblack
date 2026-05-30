'use client'; 

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    // Supabase에 데이터를 넣는 부분입니다
    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content, status: 'published', publish_date: new Date().toISOString() }]);

    if (error) {
      alert('저장 실패: ' + error.message);
    } else {
      alert('저장 성공!');
      setTitle(''); // 저장 후 제목 입력창 초기화
      setContent(''); // 저장 후 내용 입력창 초기화
    }
  };

  return (
    <main style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>새 글 작성하기</h1>
      <input 
        placeholder="제목을 입력하세요" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '10px' }}
      />
      <textarea 
        placeholder="내용을 입력하세요" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        style={{ display: 'block', marginBottom: '1rem', width: '100%', height: '200px', padding: '10px' }}
      />
      <button 
        onClick={handleSubmit}
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        글 저장하기
      </button>
    </main>
  );
}