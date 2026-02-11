import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description?: string
  tags?: string[]
  draft?: boolean
  content: string
}

// Ensure the blog directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug,
          content,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString().split('T')[0],
          description: data.description,
          tags: data.tags,
          draft: data.draft || false,
        } as BlogPost
      })
      // Filter out drafts in production
      .filter((post) => {
        if (process.env.NODE_ENV === 'production') {
          return !post.draft
        }
        return true
      })
      // Sort by date
      .sort((a, b) => (a.date < b.date ? 1 : -1))

    return allPostsData
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const post: BlogPost = {
      slug,
      content,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description,
      tags: data.tags,
      draft: data.draft || false,
    }

    // Don't show drafts in production
    if (process.env.NODE_ENV === 'production' && post.draft) {
      return null
    }

    return post
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}
