import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { Post, StrapiPost, StrapiResponse } from "~/types";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  // const url = new URL("/posts-meta.json", request.url);
  // const res = await fetch(url.href);

  const res = await fetch(`${import.meta.env.VITE_API_URL}/posts?filters[slug][$eq]=${slug}&populate=image`)

  if (!res.ok) throw new Error("Failed to fetch data");

  // const index = await res.json();
  // const postMeta = index.find((post: Post) => post.slug === slug);
  const json:StrapiResponse<StrapiPost> = await res.json();

  if (!json.data.length) throw new Response("Not Found", { status: 404 });

  // Dynamically import raw markdown
  // const markdown = await import(`../../posts/${slug}.md?raw`);
  const item = json.data[0];

  const post = {
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    slug: item.slug,
    date: item.date,
    body: item.body,
    image: item.image?.url
      ? `${item.image.url}`
      : "/images/no-image.png",
  };

  return {
    // postMeta,
    // markdown: markdown.default,
    post
  };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    post: Post;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { post } = loaderData;

  return (
    <div className="mx-auto max-w-3xl bg-gray-900 px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-blue-400">
        {post.title}
      </h1>
      <p className="text sm mb-6 text-gray-400">
        {new Date(post.date).toDateString()}
      </p>
      
      
      <img
        src={post.image}
        alt={post.title}
        className="mb-4 h-64 w-full object-cover"
      />

      <div className="prose prose-invert mb-12 max-w-none">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>

      <Link
        to="/blog"
        className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
      >
        ← Back To Posts
      </Link>
    </div>
  );
};

export default BlogPostDetailsPage;
