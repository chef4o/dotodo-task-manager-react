import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllNews, getAllArticlesSorted, getArticleById, addArticle, editArticle } from './newsService';
import { ServiceError } from './serviceErrorMessages';
import { url } from '../api/url';
import { processData } from '../util/dataUtils';
import * as request from '../api/request';

vi.mock('../api/request', () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
}));
vi.mock('../util/dataUtils', () => ({
  processData: vi.fn(({ data, sortKey, sortOrder }) => {
    if (sortKey && typeof data[0][sortKey] === 'number') {
      return data.sort((a, b) => (sortOrder === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]));
    }
    return data;
  }),
}));

describe('newsService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getAllNews returns response when request.get is successful', async () => {
    const data = [{ id: 1, title: 'Article 1' }];
    request.get.mockResolvedValue(data);
    const result = await getAllNews();
    expect(request.get).toHaveBeenCalledWith(url.news);
    expect(result).toEqual(data);
  });

  it('getAllNews handles error correctly', async () => {
    request.get.mockRejectedValue(new Error('fail'));
    const result = await getAllNews();
    expect(result).toEqual({ error: ServiceError.ERROR_GETTING_ELEMENT });
  });

  it('getAllArticlesSorted returns empty array when rawData is empty or not an array', async () => {
    request.get.mockResolvedValue([]);
    const result = await getAllArticlesSorted('title', 'asc');
    expect(result).toEqual([]);
  });

  it('getAllArticlesSorted returns sorted articles using processData', async () => {
    const rawData = [{ id: 2 }, { id: 1 }];
    request.get.mockResolvedValue(rawData);
    processData.mockImplementation(({ data, sortKey, sortOrder }) => data.sort((a, b) => a.id - b.id));
    const result = await getAllArticlesSorted('id', 'asc');
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('getArticleById returns error when articleId is missing', async () => {
    const result = await getArticleById(null);
    expect(result).toEqual({ error: ServiceError.ELEMENT_ID_REQUIRED });
  });

  it('getArticleById returns article with sorted comments', async () => {
    const articleId = '123';
    const articleResponse = { id: articleId, comments: [{ createdAt: '2020' }, { createdAt: '2021' }] };
    request.get.mockResolvedValue(articleResponse);
    processData.mockImplementation(({ data }) => data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
    const result = await getArticleById(articleId);
    expect(request.get).toHaveBeenCalledWith(`${url.news}/${articleId}`);
    expect(result.comments).toEqual([{ createdAt: '2021' }, { createdAt: '2020' }]);
  });

  it('addArticle returns error when required field (ownerId) is missing', async () => {
    const invalidData = { title: "Title", content: "Content" };
    const result = await addArticle(invalidData);
    expect(result).toEqual({ error: ServiceError.MISSING_FIELDS });
  });

  it('addArticle calls request.post when fields are valid', async () => {
    const validData = { ownerId: 'u1', title: "Title", content: "Content" };
    const responseData = { success: true };
    request.post.mockResolvedValue(responseData);
    const result = await addArticle(validData);
    expect(request.post).toHaveBeenCalledWith(url.addArticle, validData);
    expect(result).toEqual(responseData);
  });

  it('editArticle returns error when articleId or updatedData is missing', async () => {
    let result = await editArticle(null, { title: 'New Title' });
    expect(result).toEqual({ error: ServiceError.MISSING_FIELDS });
    result = await editArticle('123', null);
    expect(result).toEqual({ error: ServiceError.MISSING_FIELDS });
  });

  it('editArticle calls request.put when valid parameters provided', async () => {
    const articleId = '123';
    const updatedData = { title: 'New Title' };
    const responseData = { success: true };
    request.put.mockResolvedValue(responseData);
    const result = await editArticle(articleId, updatedData);
    expect(request.put).toHaveBeenCalledWith(`${url.editArticle}/${articleId}`, updatedData);
    expect(result).toEqual(responseData);
  });
});
