import axios from 'axios';
import { PassThrough } from 'stream';

import { fetchArticleContent } from './getArticleContent.js';

const host = 'https://api-inference.huggingface.co/models/';
const apiURL = ['suriya7/bart-finetuned-text-summarization', 'Azma-AI/bart-large-text-summarizer', 'Falconsai/text_summarization'];

const axiosInstance = axios.create();
Object.freeze(apiURL);

export async function getSummarizeOfArticle({url, summaryLength, LLModel}, res) {
    try {
        const fetchArticle = await fetchArticleContent(url);

        // article could not be fetch
        if(fetchArticle.error) {
            res.writeHead(fetchArticle.code, fetchArticle.data);
            return res.end();
        };

        // user send wrong kind of LLM model
        if(LLModel && !apiURL.indexOf(`${LLModel}`)) {
            res.writeHead(400, {error: "Does not exist model with that name."});
            return res.end();
        }

        const passThrough = new PassThrough();

        const LLM = apiURL.find((model) => model == LLModel);
        const useModel = LLM? LLM: apiURL[0];

        const data = {
            inputs: fetchArticle.text,
            parameters: {
                max_length: summaryLength? summaryLength: 250
            }
        };

        // fetch and return summary of text
        const response = await axiosInstance.post(host + useModel, data, {
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            },
            responseType: 'stream'
        });
        
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        // stream summary into response object
        response.data.pipe(passThrough).pipe(res);

        response.data.on('error', (err) => {
            res.end(JSON.stringify({error: "Something gone wrong, please try again later."}));
        });

    } catch (err) {

        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Internal Server Error." }));
    }
}
