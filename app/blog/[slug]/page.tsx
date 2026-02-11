import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {}
  }

  return {
    title: `${post.title} - Your Name`,
    description: post.description,
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container max-w-3xl mx-auto px-4 py-16">
      <header className="mb-8">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <time>{post.date}</time>
          {post.draft && (
            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded text-xs font-medium">
              Draft
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
        {post.description && (
          <p className="text-xl text-gray-600 dark:text-gray-400">{post.description}</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
            p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-purple-600 dark:text-purple-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
            code: ({ className, children }) => {
              const isInline = !className
              return isInline ? (
                <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm">
                  {children}
                </code>
              ) : (
                <code className={className}>{children}</code>
              )
            },
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
