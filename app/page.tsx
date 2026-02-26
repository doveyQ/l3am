import { getAllPosts } from '@/lib/blog'
import { HomeHero } from '@/components/home-hero'
import { BlogPostCard } from '@/components/blog-post-card'
import { SocialLinks } from '@/components/social-links'
import Link from 'next/link'



export default async function Home() {
  const posts = await getAllPosts()
  const latestPost = posts[0]

  return (
    <div className="container max-w-5xl mx-auto px-4 py-6 md:py-20">
      <HomeHero />

      {latestPost && (
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-xl font-bold tracking-tighter uppercase text-gray-100">
              Recent Post
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors uppercase flex items-center gap-2 group"
            >
              More posts
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <BlogPostCard post={latestPost} />

          <SocialLinks />
        </div>
      )}
    </div>
  )
}