// app/post/[id]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

// params를 비동기로 받아오도록 수정합니다 (Next.js 15+ 대응)
export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params; // params를 await 하여 id를 추출

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id) // 추출한 id 사용
    .single();

  if (!post) notFound();

  return (
    <article className="max-w-3xl mx-auto px-8 py-20">
      <h1 className="text-5xl font-black mb-8 leading-tight tracking-tighter text-white">
        {post.title}
      </h1>
      <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
        {post.content}
      </div>
      <div className="mt-12 pt-8 border-t border-white/10">
        <a href="/" className="text-sm text-gray-500 hover:text-white transition">
          ← 목록으로 돌아가기
        </a>
      </div>
    </article>
  );
}