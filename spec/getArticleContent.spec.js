import { fetchArticleContent } from '../getArticleContent.js';

describe('fetchArticleContent function', () => {

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 150000;
  });

  // examine correct url
  it('should fetch article content correctly', async () => {

    const url = 'https://brilliant.org/wiki/rsa-encryption/';

    const result = await fetchArticleContent(url);
    expect(result).toEqual(jasmine.any(Object));

    expect(result.text).toBeDefined();
    expect(result.text).toEqual(jasmine.any(String));
  });

  // examine wrong url
  it('should handle errors for invalid URL', async () => {
    const url = 'https://wrong-url.com';

    const result = await fetchArticleContent(url);
    expect(result).toEqual(jasmine.any(Object));

    expect(result.error).toBeDefined();
    expect(result.error).toEqual(true);

    expect(result.data).toBeDefined();
    expect(result.data).toEqual('Article could not be found.');

    expect(result.code).toBeDefined();
    expect(result.code).toEqual(404);
  });
});
