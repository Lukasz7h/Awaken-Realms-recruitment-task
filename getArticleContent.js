import { extract } from '@extractus/article-extractor'
import { load } from 'cheerio';

export async function fetchArticleContent(url) {
    try {
        let text = await extract(url); // feature get article from dedicated url
        text = load(text.content).root().text(); // Get rid html code from our text

        text = text.replace(/\n+/g, '. ');
        return {text};

    } catch (error) {
        return {code: 404, data: 'Article could not be found.', error: true};
    }
}