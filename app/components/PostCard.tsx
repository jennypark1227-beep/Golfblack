export default function PostCard({ title, content }: { title: string, content: string }) {
  return (
    <div className="group border-b border-gray-200 py-8 transition-all hover:bg-gray-50 cursor-pointer">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold leading-tight group-hover:underline decoration-2 underline-offset-4">
          {title}
        </h2>
        <span className="text-sm font-medium text-gray-400">TODAY</span>
      </div>
      <p className="mt-4 text-gray-600 leading-relaxed line-clamp-2">
        {content}
      </p>
    </div>
  );
}