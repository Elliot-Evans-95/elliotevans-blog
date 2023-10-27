import type { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { CSS, render } from "$gfm";
import type {Post} from "../types.ts";

import {getPost} from "../../utils/getPost.ts";

export const handler: Handlers<Post[]> = {
    async GET(req, ctx) {
        const post = await getPost(ctx.params.slug);

        if (post === null) return ctx.renderNotFound();

        return ctx.render!(post);
    },
};


export default function PostPage(props: PageProps<Post>) {
    const post = props.data;
    return (
        <>
            <Head>
                <style dangerouslySetInnerHTML={{ __html: CSS }} />
            </Head>
            <main className="max-w-screen-md px-4 pt-16 mx-auto">
                <h1 className="text-5xl font-bold">{post.title}</h1>
                <time className="text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString("en-gb", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    })}
                </time>
                <div
                    class="mt-8 markdown-body"
                    dangerouslySetInnerHTML={{ __html: render(post.content) }}
                />
            </main>
        </>
    )
}
