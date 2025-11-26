'use client';

import { useState, useEffect, useCallback } from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import BlogEditor from '@/components/BlogEditor';

interface GnosisItem {
  id: number;
  title: string;
  energy: number;
  mode: string;
  subtitle: string;
  body: string;
}

interface PlanetItem {
  planet: string;
  title: string;
  energy: number;
  image: string;
  body: string;
}

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

type Item = GnosisItem | PlanetItem | BlogPost;

const EditorPage = () => {
  const [selectedFile, setSelectedFile] = useState<'gnosis' | 'planets' | 'blog'>('gnosis');
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    // Clear previous state immediately
    setItems([]);
    setSelectedItemId('');
    setSelectedItem(null);
    setEditorState(EditorState.createEmpty());
    setMessage(null);
    
    try {
      const response = await fetch(`/api/editor?file=${selectedFile}`);
      const data = await response.json();
      
      if (response.ok) {
        setItems(data.items);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to load items' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to load items' });
    } finally {
      setLoading(false);
    }
  }, [selectedFile]);

  const loadItem = useCallback(async () => {
    if (!selectedItemId) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/editor?file=${selectedFile}&id=${selectedItemId}`);
      const data = await response.json();
      
      if (response.ok) {
        setSelectedItem(data.item);
        // Initialize editor with the body content
        const contentState = ContentState.createFromText(data.item.body);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to load item' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to load item' });
    } finally {
      setLoading(false);
    }
  }, [selectedFile, selectedItemId]);

  // Load items list when file selection changes
  useEffect(() => {
    loadItems();
  }, [selectedFile, loadItems]);

  // Load specific item when selection changes
  useEffect(() => {
    if (selectedItemId) {
      loadItem();
    }
  }, [selectedItemId, selectedFile, loadItem]);

  const saveItem = async () => {
    if (!selectedItem || !selectedItemId) return;
    
    setSaving(true);
    try {
      const contentState = editorState.getCurrentContent();
      const bodyText = contentState.getPlainText();
      
      const response = await fetch('/api/editor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: selectedFile,
          id: selectedItemId,
          body: bodyText,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Item saved successfully!' });
        setSelectedItem(data.item);
        // Auto-hide success message after 3 seconds
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save item' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to save item' });
    } finally {
      setSaving(false);
    }
  };

  const saveBlogPost = async (content: BlogContentBlock[]) => {
    if (!selectedItemId) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/editor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: 'blog',
          id: selectedItemId,
          content,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Blog post saved successfully!' });
        setSelectedItem(data.item);
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save blog post' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to save blog post' });
    } finally {
      setSaving(false);
    }
  };

  const getItemDisplayName = (item: Item): string => {
    if (selectedFile === 'gnosis') {
      const gnosisItem = item as GnosisItem;
      return gnosisItem.id !== undefined ? `${gnosisItem.id} - ${gnosisItem.title}` : gnosisItem.title || 'Unknown';
    } else if (selectedFile === 'planets') {
      const planetItem = item as PlanetItem;
      return planetItem.title;
    } else {
      const blogPost = item as BlogPost;
      return `${blogPost.id} - ${blogPost.title}`;
    }
  };

  const getItemId = (item: Item): string => {
    if (selectedFile === 'gnosis') {
      const gnosisItem = item as GnosisItem;
      return gnosisItem.id !== undefined ? gnosisItem.id.toString() : 'unknown';
    } else if (selectedFile === 'planets') {
      const planetItem = item as PlanetItem;
      return planetItem.planet || 'unknown';
    } else {
      const blogPost = item as BlogPost;
      return blogPost.id;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Content Editor
          </h1>

          {/* File Selection */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Select File:
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedFile('gnosis')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFile === 'gnosis'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/20 text-white/70 hover:bg-white/30'
                }`}
              >
                Gnosis Seed
              </button>
              <button
                onClick={() => setSelectedFile('planets')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFile === 'planets'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/20 text-white/70 hover:bg-white/30'
                }`}
              >
                Planets Seed
              </button>
              <button
                onClick={() => setSelectedFile('blog')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFile === 'blog'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/20 text-white/70 hover:bg-white/30'
                }`}
              >
                Blog Posts
              </button>
            </div>
          </div>

          {/* Item Selection */}
          {items.length > 0 && (
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Select Item:
              </label>
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full px-3 py-2 bg-white/20 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose an item...</option>
                {items.map((item, index) => (
                  <option key={`${selectedFile}-${getItemId(item)}-${index}`} value={getItemId(item)} className="text-black">
                    {getItemDisplayName(item)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-white mt-2">Loading...</p>
            </div>
          )}

          {/* Editor */}
          {selectedItem && !loading && selectedFile === 'blog' && (
            <BlogEditor
              post={selectedItem as BlogPost}
              onSave={saveBlogPost}
              saving={saving}
            />
          )}

          {selectedItem && !loading && selectedFile !== 'blog' && (
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-2">
                  {selectedItem.title}
                </h3>
                <div className="text-white/70 text-sm mb-4">
                  {'energy' in selectedItem && `Energy: ${selectedItem.energy}`}
                  {selectedFile === 'gnosis' && (
                    <span className="ml-4">
                      Mode: {(selectedItem as GnosisItem).mode}
                    </span>
                  )}
                  {selectedFile === 'planets' && (
                    <span className="ml-4">
                      Planet: {(selectedItem as PlanetItem).planet}
                    </span>
                  )}
                </div>
                
                <div className="bg-white rounded-lg p-4 min-h-[400px] border border-gray-300">
                  <div className="text-black">
                    <Editor
                      editorState={editorState}
                      onChange={setEditorState}
                      placeholder="Edit the body content..."
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-center">
                <button
                  onClick={saveItem}
                  disabled={saving}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    saving
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div className={`mt-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/20 border border-green-500/50 text-green-400' 
                : 'bg-red-500/20 border border-red-500/50 text-red-400'
            }`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorPage;