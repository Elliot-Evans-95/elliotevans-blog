import { extract } from "$std/front_matter/any.ts";
import { join } from "$std/path/mod.ts";

import {Post} from "../types/blog.types.ts";

export async function getPost(slug: string): Promise<Post | null> {
    const text = await Deno.readTextFile(join("./posts", `${slug}.md`));
    const { attrs, body } = extract(text);
    return {
        slug,
        title: attrs.title,
        publishedAt: new Date(attrs.published_at),
        content: body,
        snippet: attrs.snippet,
    };
}
