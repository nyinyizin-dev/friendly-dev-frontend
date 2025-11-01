import type { Route } from "./+types";
import type { Post, StrapiPost, StrapiResponse } from "~/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import { useState } from "react";
import PostFilter from "~/components/PostFilter";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: Post[] }> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`)
  
  if (!res.ok) throw new Error("Failed to fetch data");

  const json:StrapiResponse<StrapiPost> = await res.json();

  const posts = json.data.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    image:item.image?.url ?
     `${item.image.url}` : '/images/no-image.png'
  }))

  return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const { posts } = loaderData;

  const filterPosts = posts.filter((post) => {
    const query = searchQuery.toLocaleLowerCase();
    return (
      post.title.toLocaleLowerCase().includes(query) ||
      post.excerpt.toLocaleLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filterPosts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="mx-auto mt-10 max-w-3xl bg-gray-900 px-6 py-6">
      <h2 className="mb-8 text-3xl font-bold">📄 Blog</h2>

      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
        }}
      />

      <div className="space-y-8">
        {currentPosts.length === 0 ? (
          <p className="text-center text-gray-400">No Posts found</p>
        ) : (
          currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default BlogPage;
