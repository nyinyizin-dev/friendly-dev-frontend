import { Outlet, } from "react-router";
import type { Route } from "./+types/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev " },
    { name: "description", content: "Welcome to my development website" },
  ];
}

const MainLayout = () => {
    return (
      <section className="max-w-6xl mx-auto px-6 my-8">
        <Outlet />
      </section>
    );
}
 
export default MainLayout;