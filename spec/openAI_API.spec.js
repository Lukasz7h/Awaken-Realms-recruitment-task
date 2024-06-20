import { PassThrough } from 'stream';
import { getSummarizeOfArticle } from '../openAI_API.js';

describe('getSummarizeOfArticle', () => {

    //check if function return relevant data in response object
    it('should fetch article and return summary correctly', async () => {
        const mockParams = {
            url: 'https://brilliant.org/wiki/rsa-encryption/',
            summaryLength: 200,
            LLModel: 'suriya7/bart-finetuned-text-summarization'
        };

        const mockResponse = new PassThrough();

        const header = {};
        mockResponse.writeHead = (code, data) => {header.code = code, header.data = data};

        function waitForData(callback) {
            mockResponse.on('data', callback);
        }
            
        const onDataReceived = data => {
            data = JSON.parse(data.toString());

            expect(data).toEqual(jasmine.any(Array));
            expect(data[0].summary_text).toBeDefined();
            expect(typeof data[0].summary_text).toBe('string');

            expect(header.code).toEqual(200);
            expect(header.data).toEqual({'Content-Type': 'application/json'});
        };
            
        waitForData(onDataReceived);
        await getSummarizeOfArticle(mockParams, mockResponse);
    });

    // check error handle (wrong LLM model)
    it('should handle exception with incorrect LLM model', async () => {
        const mockParams = {
            url: 'https://brilliant.org/wiki/rsa-encryption/',
            summaryLength: 200,
            LLModel: 'xyz'
        };

        const mockResponse = new PassThrough();

        const header = {};
        mockResponse.writeHead = (code, data) => {header.code = code};

        function waitForData(callback) {
            mockResponse.on('data', callback);
        }
            
        const onDataReceived = data => {
            data = JSON.parse(data.toString());

            expect(header.code).toEqual(400);
            expect(data).toEqual({ error: 'Does not exist model with that name.' });
        };
            
        waitForData(onDataReceived);
        await getSummarizeOfArticle(mockParams, mockResponse);

    });
});
