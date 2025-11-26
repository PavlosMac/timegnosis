# Blog Post Editing System

## Overview

Blog posts are now stored in a structured JSON format (`blog-posts.json`) that can be edited through the web-based editor interface at `/editor`.

## Architecture

### 1. Data Storage (`blog-posts.json`)

Blog posts are stored as JSON with this structure:

```json
{
  "id": "22",
  "title": "The Mystery of 222",
  "author": "Godhar",
  "date": "October 14, 2025",
  "category": "Astrology",
  "readTime": 8,
  "content": [
    {
      "type": "paragraph",
      "text": "Your paragraph text here..."
    },
    {
      "type": "image",
      "src": "/blog/222.jpg",
      "alt": "Image description",
      "caption": "Optional caption"
    }
  ]
}
```

### 2. Blog Page Component (`src/app/blog/[id]/page.tsx`)

The blog page reads from `blog-posts.json` and renders content dynamically:

```tsx
import blogPosts from '@/../blog-posts.json';

export default function BlogPage() {
  const post = blogPosts.find(p => p.id === '22');
  
  return (
    <BlogPost {...post}>
      {post.content.map((block, index) => {
        if (block.type === 'paragraph') {
          return <BlogParagraph key={index}>{block.text}</BlogParagraph>;
        }
        if (block.type === 'image') {
          return <BlogImage key={index} {...block} />;
        }
      })}
    </BlogPost>
  );
}
```

### 3. Web Editor (`/editor`)

The editor provides a visual interface to:
- Select blog posts
- Edit paragraphs with text areas
- Add/remove/reorder content blocks
- Edit image metadata (src, alt, caption)
- Save changes back to JSON

## How to Edit Blog Posts

### Option 1: Web Editor (Recommended)

1. Navigate to `/editor` in your browser
2. Click "Blog Posts" tab
3. Select the blog post from dropdown
4. Edit content blocks:
   - **Paragraphs**: Edit text directly in textarea
   - **Images**: Update src, alt, caption fields
5. Use controls to:
   - ↑↓ Move blocks up/down
   - ✕ Remove blocks
   - + Add new paragraphs or images
6. Click "Save Blog Post"

### Option 2: Direct JSON Editing

Edit `blog-posts.json` directly:

```json
[
  {
    "id": "22",
    "title": "Your Title",
    "content": [
      { "type": "paragraph", "text": "..." },
      { "type": "image", "src": "/blog/image.jpg", "alt": "..." }
    ]
  }
]
```

## Content Block Types

### Paragraph Block
```json
{
  "type": "paragraph",
  "text": "Your paragraph content with full text..."
}
```

### Image Block
```json
{
  "type": "image",
  "src": "/blog/image.jpg",
  "alt": "Descriptive alt text",
  "caption": "Optional caption text"
}
```

## Adding New Blog Posts

1. Add entry to `blog-posts.json`:
```json
{
  "id": "23",
  "title": "New Post Title",
  "author": "Author Name",
  "date": "November 20, 2025",
  "category": "Category",
  "readTime": 5,
  "content": []
}
```

2. Create page file: `src/app/blog/23/page.tsx`
```tsx
import { BlogPost, BlogParagraph, BlogImage } from '@/lib/blog-blueprint';
import blogPosts from '@/../blog-posts.json';

export default function Blog23() {
  const post = blogPosts.find(p => p.id === '23');
  if (!post) return <div>Post not found</div>;

  return (
    <div className="min-h-screen bg-gray-900">
      <BlogPost
        title={post.title}
        author={post.author}
        date={post.date}
        category={post.category}
        readTime={post.readTime}
      >
        {post.content.map((block, index) => {
          if (block.type === 'paragraph') {
            return <BlogParagraph key={index}>{block.text}</BlogParagraph>;
          }
          if (block.type === 'image') {
            return (
              <BlogImage
                key={index}
                src={block.src || ''}
                alt={block.alt || ''}
                caption={block.caption}
              />
            );
          }
          return null;
        })}
      </BlogPost>
    </div>
  );
}
```

3. Edit content via `/editor`

## Benefits

✅ **No code changes needed** - Edit content without touching TSX files
✅ **Visual editor** - User-friendly interface for non-technical editors
✅ **Structured content** - Consistent format across all blog posts
✅ **Version control friendly** - JSON diffs are clean and readable
✅ **Type-safe** - TypeScript interfaces ensure data integrity
✅ **Flexible** - Easy to add new content block types

## Future Enhancements

Potential additions:
- Heading blocks (`<BlogHeading>`)
- Quote blocks (`<BlogQuote>`)
- List blocks (`<BlogList>`)
- Code blocks
- Video embeds
- Rich text formatting (bold, italic, links)
- Markdown support
- Image upload interface
- Draft/publish workflow
- Preview mode

## Troubleshooting

**Editor not showing blog posts?**
- Check `blog-posts.json` exists in project root
- Verify JSON is valid (no syntax errors)
- Check browser console for errors

**Changes not appearing?**
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)
- Check if JSON was saved correctly
- Restart dev server if needed

**TypeScript errors?**
- Ensure all required fields are present in JSON
- Check that content blocks have correct `type` field
- Verify image blocks have `src` and `alt` fields
