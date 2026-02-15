import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - dovey',
  description: 'Thoughts on security, coding and health/sports',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16">
      <Link href="/" className="ml-auto hover:text-purple-300 transition-colors group animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      </Link>
      <div className="space-y-8">
        {posts.length === 0 ? (
          <div className="py-12">
            <p className="text-gray-600 text-xl md:text-2xl font-semibold dark:text-gray-400 mb-4">
              {">"} Nothing to read yet ...
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <article
              key={post.slug}
              className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <time>{post.date}</time>
                    {post.draft && (
                      <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded text-xs font-medium">
                        Draft
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
