import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import 'highlight.js/styles/github-dark.css'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} - l3am.dev`,
    description: post.description,
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container max-w-3xl mx-auto px-4 py-20">
      <Link href="/blog" className="inline-flex items-center text-sm text-gray-400 hover:text-purple-400 transition-colors group mb-12">
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
        Back to blog
      </Link>

      <header className="mb-12 space-y-6">
        <div className="flex items-center gap-4">
          <time className="text-sm text-gray-500 font-mono">{post.date}</time>
          {post.draft && (
            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              Draft
            </Badge>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase">{post.title}</h1>

        {post.description && (
          <p className="text-xl text-gray-400 leading-relaxed">{post.description}</p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap pt-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/10 text-gray-500 font-mono uppercase">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
        <Separator className="bg-white/10 mt-8" />
      </header>

      <div className="prose prose-invert prose-purple max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => <h1 className="text-4xl font-extrabold tracking-tighter uppercase mt-12 mb-6">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-3">{children}</h3>,
            p: ({ children }) => <p className="mb-6 leading-relaxed text-gray-300">{children}</p>,
            code: ({ className, children }) => {
              const isInline = !className
              return isInline ? (
                <code className="px-1.5 py-0.5 bg-white/5 rounded text-sm text-purple-400 font-mono">
                  {children}
                </code>
              ) : (
                <div className="rounded-xl overflow-hidden my-8 border border-white/5 shadow-2xl">
                  <code className={`${className} block p-6 text-sm`}>{children}</code>
                </div>
              )
            },
            ul: ({ children }) => <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-300">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-300">{children}</ol>,
            li: ({ children }) => <li className="pl-2">{children}</li>,
            strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
