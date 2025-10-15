import { ReactNode } from 'react';

// Mock Image component for demo
const Image = ({ src, alt, width, height, className }: { src: string; alt: string; width: number; height: number; className: string }) => (
  <div className={`${className} bg-gray-700 flex items-center justify-center text-xs text-gray-400`} style={{width, height}}>
    {alt}
  </div>
);

// Types
interface BlogPostProps {
  children: ReactNode;
  title: string;
  author?: string;
  date?: string;
  category?: string;
  readTime?: number;
}

interface BlogParagraphProps {
  children: ReactNode;
}

interface BlogHeadingProps {
  children: ReactNode;
  level?: 2 | 3 | 4;
}

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface BlogQuoteProps {
  children: ReactNode;
  author?: string;
}

interface BlogListProps {
  items: string[];
  ordered?: boolean;
}

// Blog Content Wrapper Component
export function BlogPost({ children, title, author, date, category, readTime }: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8 border-b border-gray-700 pb-6">
        {category && (
          <span className="inline-block px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm mb-4">
            {category}
          </span>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          {title}
        </h1>
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          {author && <span>By {author}</span>}
          {date && <span>•</span>}
          {date && <time>{date}</time>}
          {readTime && <span>•</span>}
          {readTime && <span>{readTime} min read</span>}
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        {children}
      </div>
    </article>
  );
}

// Reusable content components
export function BlogParagraph({ children }: BlogParagraphProps) {
  return <p className="text-gray-300 leading-relaxed mb-6">{children}</p>;
}

export function BlogHeading({ children, level = 2 }: BlogHeadingProps) {
  const Tag = `h${level}`;
  const sizes = {
    2: 'text-3xl mt-12 mb-6',
    3: 'text-2xl mt-10 mb-5',
    4: 'text-xl mt-8 mb-4'
  };
  
  return (
    <Tag className={`${sizes[level]} font-bold text-white`}>
      {children}
    </Tag>
  );
}

export function BlogImage({ src, alt, caption, width = 800, height = 500 }: BlogImageProps) {
  return (
    <figure className="my-8">
      <div className="rounded-lg overflow-hidden shadow-xl">
        <Image 
          src={src} 
          alt={alt} 
          width={width} 
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-400 mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function BlogQuote({ children, author }: BlogQuoteProps) {
  return (
    <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-8 italic text-gray-300 bg-gray-800/50 rounded-r-lg">
      <p className="mb-2">{children}</p>
      {author && <cite className="text-sm text-gray-400 not-italic">— {author}</cite>}
    </blockquote>
  );
}

export function BlogList({ items, ordered = false }: BlogListProps) {
  const Tag = ordered ? 'ol' : 'ul';
  const listStyle = ordered ? 'list-decimal' : 'list-disc';
  
  return (
    <Tag className={`${listStyle} pl-6 mb-6 space-y-2 text-gray-300`}>
      {items.map((item, index) => (
        <li key={index} className="leading-relaxed">{item}</li>
      ))}
    </Tag>
  );
}
