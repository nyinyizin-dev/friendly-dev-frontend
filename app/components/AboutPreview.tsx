import { Link } from "react-router";

const AboutPreview = () => {
  return (
    <section className="mt-12 flex flex-col items-center gap-8 bg-gray-900 p-10 md:flex-row">
      <img
        src="/images/profile.jpg"
        alt="profile"
        className="size-32 rounded-full border-4 border-blue-500 object-cover shadow-md"
      />
      <div>
        <h2 className="mb-2 text-2xl font-bold"> Hey, I'm Nyi Nyi 👋</h2>
        <p className="mb-4 max-w-4xl text-gray-200">
          I'm a self-taught developer passionate about building friendly digital
          experiences and helping others grow into confident modern developers.
          I create web and mobile apps that make life easier.
        </p>
        <Link
          to="/about"
          className="inline-block text-sm text-blue-400 hover:underline"
        >
          Learn More About Me
        </Link>
      </div>
    </section>
  );
};

export default AboutPreview;
