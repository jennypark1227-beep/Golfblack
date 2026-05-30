// app/login/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('로그인 실패: ' + error.message);
    } else {
      alert('로그인 성공!');
      router.push('/'); // 로그인 후 메인으로 이동
      router.refresh(); // 레이아웃 새로고침
    }
  };

  return (
    <div className="max-w-md mx-auto px-8 py-20">
      <h1 className="text-3xl font-black mb-10 text-white">로그인</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          type="email" 
          placeholder="이메일" 
          className="w-full p-4 bg-[#1a1a1a] border border-white/10 text-white" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="비밀번호" 
          className="w-full p-4 bg-[#1a1a1a] border border-white/10 text-white" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit" className="w-full bg-[#e67e22] text-white py-4 font-bold">
          로그인 하기
        </button>
      </form>
    </div>
  );
}