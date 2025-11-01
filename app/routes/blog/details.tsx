import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta } from "~/types";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const url = new URL("/posts-meta.json", request.url);
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch data");

  const index = await res.json();

  const postMeta = index.find((post: PostMeta) => post.slug === slug);

  if (!postMeta) throw new Response("Not Found", { status: 404 });

  // Dynamically import raw markdown
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}

type BlogPostDetailsPageProps = {
  loaderData: {
    postMeta: PostMeta;
    markdown: string;
  };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
  const { postMeta, markdown } = loaderData;

  return (
    <div className="mx-auto max-w-3xl bg-gray-900 px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold text-blue-400">
        {postMeta.title}
      </h1>
      <p className="text sm mb-6 text-gray-400">
        {new Date(postMeta.date).toDateString()}
      </p>
      
      {/* 
      <img
        src={postMeta.image}
        alt={postMeta.title}
        className="mb-4 h-64 w-full object-cover"
      /> */}

      <div className="prose prose-invert mb-12 max-w-none">
        <ReactMarkdown>{markdown}</ReactMarkdown>
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
