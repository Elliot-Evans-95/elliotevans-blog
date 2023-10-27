import {Post} from "../types/blog.types.ts";
import {getPost} from "./getPost.ts";

export async function getPosts(): Promise<Post[]> {
    const files = Deno.readDir("./posts");
    const promises = [];
    for await (const file of files) {
        const slug = file.name.replace(".md", "");
        promises.push(getPost(slug));
    }
    const posts = await Promise.all(promises) as Post[];
    posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    return posts;
}
