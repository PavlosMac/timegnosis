import { BlogPost, BlogParagraph, BlogImage} from '@/lib/blog-blueprint';
import { readFile } from 'fs/promises';
import path from 'path';

interface BlogContentBlock {
  type: 'paragraph' | 'image';
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
}

interface BlogPostData {
  id: string;
  title: string;
  author?: string;
  date?: string;
  category?: string;
  readTime?: number;
  content: BlogContentBlock[];
}

export default async function Blog22() {
  const filePath = path.join(process.cwd(), 'src', 'app', 'blog-json', '222.json');
  const fileContent = await readFile(filePath, 'utf8');
  const blogPosts: BlogPostData[] = JSON.parse(fileContent);
  const post = blogPosts.find((p) => p.id === '22');
  
  if (!post) {
    return <div>Post not found</div>;
  }

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
                size={20}
              />
            );
          }
          return null;
        })}
      </BlogPost>
    </div>
  );
}