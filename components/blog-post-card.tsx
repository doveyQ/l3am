import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BlogPost } from '@/lib/blog'

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="bg-black/40 border-white/5 backdrop-blur-xl group-hover:border-purple-500/50 transition-all duration-300 group-hover:translate-x-1">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-2">
            <time className="text-sm text-gray-500 font-mono ">{post.date}</time>
            {post.draft && (
              <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                Draft
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-gray-100 group-hover:text-purple-400 transition-colors uppercase tracking-tight">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {post.description && (
            <p className="text-gray-400 line-clamp-2 leading-relaxed">
              {post.description}
            </p>
          )}
          <div className="flex gap-2 flex-wrap">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="border-white/10 text-gray-500 text-xs font-mono uppercase">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
