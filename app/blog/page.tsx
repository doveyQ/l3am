import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BlogPostCard } from '@/components/blog-post-card'

export const metadata: Metadata = {
  title: 'Blog - dovey',
  description: 'Thoughts on security, coding and health/sports',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container max-w-4xl mx-auto px-4 py-20">
      <div className="mb-16 space-y-6">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-purple-400 transition-colors group mb-4">
          <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
          Back to home
        </Link>

        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tighter">Blog</h1>
          <div className="max-w-xl text-lg text-gray-400 leading-relaxed">
            Sharing my thoughts and discoveries as a software engineering student.
            Expect deep dives into AI, coding practices, sports/nutrition and life in general.
          </div>
        </div>
        <Separator className="bg-white/10" />
      </div>

      <div className="grid gap-6">
        {posts.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="text-gray-500 text-xl font-medium">
              {">"} No blog posts found. Check back soon!
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))
        )}
      </div>
    </div>
  )
}
