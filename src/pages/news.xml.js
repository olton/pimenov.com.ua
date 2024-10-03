import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    const news = await getCollection('news');
    return rss({
        title: 'Новини проектів Сергія Піменова',
        description: '',
        site: context.site,
        items: news.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            link: post.data.url || context.site,
        })),
    });
}