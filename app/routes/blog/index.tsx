import type { Route } from "./+types";
import type { PostMeta } from "~/types";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/posts-meta.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data");

  const data = await res.json();

  return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
  const { posts } = loaderData;

  return (
    <>
      <h2 className="mb-8 text-3xl font-bold">📄 Blog</h2>
    </>
  );
};

export default BlogPage;
