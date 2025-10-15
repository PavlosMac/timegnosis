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

// Demo Usage
export default function Blog22() {
  return (
    <div className="min-h-screen bg-gray-900">
      <BlogPost
        title="The Mystery of Mercury Retrograde"
        author="Luna Starweaver"
        date="October 14, 2025"
        category="Astrology"
        readTime="8"
      >
        <BlogParagraph>
          Mercury retrograde has long been a source of fascination and concern for astrology enthusiasts. 
          This celestial phenomenon occurs three to four times per year, when the planet Mercury appears 
          to move backward in its orbit from our perspective on Earth.
        </BlogParagraph>

        <BlogImage 
          src="/images/mercury-retrograde.jpg"
          alt="Mercury Retrograde Illustration"
          caption="The apparent backward motion of Mercury in the night sky"
        />

        <BlogHeading level={2}>What Actually Happens?</BlogHeading>

        <BlogParagraph>
          During Mercury retrograde, communication, technology, and travel can seem to go awry. 
          While skeptics dismiss these correlations, many astrologers and practitioners have documented 
          fascinating patterns during these periods.
        </BlogParagraph>

        <BlogQuote author="Ancient Hermetic Text">
          As above, so below; as within, so without. The movements of the heavens reflect 
          the patterns of our earthly existence.
        </BlogQuote>

        <BlogHeading level={3}>Common Effects</BlogHeading>

        <BlogList items={[
          'Miscommunications and misunderstandings become more frequent',
          'Technology malfunctions and digital glitches increase',
          'Travel delays and disruptions are more common',
          'Old friends and past situations resurface',
          'Contracts and agreements may need revision'
        ]} />

        <BlogParagraph>
          Rather than fearing these periods, we can use them as opportunities for reflection, 
          revision, and reconnection. The retrograde invites us to slow down and reconsider 
          our paths forward.
        </BlogParagraph>

        <BlogHeading level={2}>Working With the Energy</BlogHeading>

        <BlogParagraph>
          The key to navigating Mercury retrograde successfully lies in understanding its energy 
          rather than resisting it. This is a time for the "re-" words: reflect, review, revise, 
          reconnect, and reconsider.
        </BlogParagraph>

        <BlogImage 
          src="/images/meditation.jpg"
          alt="Person meditating under stars"
          caption="Use retrograde periods for introspection and spiritual practice"
        />

        <BlogParagraph>
          By aligning our activities with the retrograde energy, we can make this period 
          productive and even enjoyable. Remember, the universe isn't working against you—
          it's simply offering a different rhythm to dance to.
        </BlogParagraph>
      </BlogPost>
    </div>
  );
}