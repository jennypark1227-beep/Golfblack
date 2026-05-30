'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase'; // 선생님 프로젝트의 supabase 연결 파일 경로에 맞게 수정하세요

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 핵심 수정 부분: options 객체(redirectTo 포함)를 완전히 삭제했습니다.
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(`로그인 실패: ${error.message}`);
    } else {
      // 로그인 성공 시 메인 페이지로 이동
      window.location.href = '/';
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-8">로그인</h1>
      <form onSubmit={handleLogin} className="w-80 flex flex-col gap-4">
        <input
          type="email"
          placeholder="이메일"
          className="p-2 bg-gray-800 border border-gray-700 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="p-2 bg-gray-800 border border-gray-700 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-[#e67e22] hover:bg-[#d35400] transition rounded font-bold"
        >
          {loading ? '로그인 중...' : '로그인 하기'}
        </button>
      </form>
    </div>
  );
}