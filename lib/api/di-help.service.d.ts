import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleClientDto } from './article-client-dto';
import { DiHelpUrlResolver } from '../di-help.config';
export declare const cacheLifetimeSecondDefault: number;
export declare class DiHelpService {
    private readonly http;
    private readonly cacheLifetime;
    private readonly cacheById;
    private readonly requestCacheById;
    private readonly cacheByUid;
    private readonly requestCacheByUid;
    private readonly cacheByUrl;
    private readonly requestCacheByUrl;
    private readonly diHelpUrl;
    constructor(diHelpUrlResolver: DiHelpUrlResolver, diHelpUrl: string, cacheLifetimeSecond: number, http: HttpClient);
    getArticleById(id: number): Observable<ArticleClientDto>;
    getArticleByUrl(url: string): Observable<ArticleClientDto>;
    getArticleByUid(siteUrl: string, uid: string): Observable<ArticleClientDto>;
    getFaqBySiteId(id: number): Observable<ArticleClientDto[]>;
    getFaqBySiteUrl(siteUrl: string): Observable<ArticleClientDto[]>;
    private cachedGet;
}
