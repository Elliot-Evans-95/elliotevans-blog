import type { Handlers, PageProps } from "$fresh/server.ts";

import {Post} from "../types/blog.types.ts";
import {getPosts} from "../utils/getPosts.ts";
import {PostCard} from "../components/PostCard.tsx";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render!(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <main className="max-w-screen-md px-4 pt-16 mx-auto">
          <h1 className="text-5xl font-bold">Blog</h1>
          <div className="mt-8">
            {posts.map((post: Post) => <PostCard post={post} />)}
          </div>
        </main>
      </div>
    </div>
  );
}
