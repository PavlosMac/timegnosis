'use client';

import { useState, useEffect } from 'react';

interface BlogContentBlock {
  type: 'paragraph' | 'image';
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  content: BlogContentBlock[];
}

interface BlogEditorProps {
  post: BlogPost;
  onSave: (content: BlogContentBlock[]) => Promise<void>;
  saving: boolean;
}

export default function BlogEditor({ post, onSave, saving }: BlogEditorProps) {
  const [content, setContent] = useState<BlogContentBlock[]>(post.content);

  // Re-sync local content when post.content changes (e.g., after save or re-fetch)
  useEffect(() => {
    setContent(post.content);
  }, [post.content]);

  const updateBlock = (index: number, updates: Partial<BlogContentBlock>) => {
    const newContent = [...content];
    newContent[index] = { ...newContent[index], ...updates };
    setContent(newContent);
  };

  const addParagraph = () => {
    setContent([...content, { type: 'paragraph', text: '' }]);
  };

  const addImage = () => {
    setContent([...content, { type: 'image', src: '', alt: '', caption: '' }]);
  };

  const removeBlock = (index: number) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === content.length - 1)
    ) {
      return;
    }

    const newContent = [...content];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newContent[index], newContent[targetIndex]] = [newContent[targetIndex], newContent[index]];
    setContent(newContent);
  };

  const handleSave = async () => {
    await onSave(content);
  };

  return (
    <div className="space-y-6">
      {/* Post Metadata */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/20">
        <h3 className="text-white text-lg font-semibold mb-2">{post.title}</h3>
        <div className="text-white/70 text-sm">
          <span>Author: {post.author}</span>
          <span className="ml-4">Date: {post.date}</span>
          <span className="ml-4">Category: {post.category}</span>
          <span className="ml-4">Read Time: {post.readTime} min</span>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="space-y-4">
        {content.map((block, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white/70 text-sm font-medium">
                {block.type === 'paragraph' ? '📝 Paragraph' : '🖼️ Image'}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                  className="px-2 py-1 text-xs bg-white/10 text-white rounded hover:bg-white/20 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === content.length - 1}
                  className="px-2 py-1 text-xs bg-white/10 text-white rounded hover:bg-white/20 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeBlock(index)}
                  className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                >
                  ✕
                </button>
              </div>
            </div>

            {block.type === 'paragraph' ? (
              <textarea
                value={block.text || ''}
                onChange={(e) => updateBlock(index, { text: e.target.value })}
                className="w-full px-3 py-2 bg-white text-black rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter paragraph text..."
              />
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={block.src || ''}
                  onChange={(e) => updateBlock(index, { src: e.target.value })}
                  className="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Image path (e.g., /blog/image.jpg)"
                />
                <input
                  type="text"
                  value={block.alt || ''}
                  onChange={(e) => updateBlock(index, { alt: e.target.value })}
                  className="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Alt text"
                />
                <input
                  type="text"
                  value={block.caption || ''}
                  onChange={(e) => updateBlock(index, { caption: e.target.value })}
                  className="w-full px-3 py-2 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Caption (optional)"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Block Buttons */}
      <div className="flex gap-3">
        <button
          onClick={addParagraph}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
        >
          + Add Paragraph
        </button>
        <button
          onClick={addImage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          + Add Image
        </button>
      </div>

      {/* Save Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            saving
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {saving ? 'Saving...' : 'Save Blog Post'}
        </button>
      </div>
    </div>
  );
}
