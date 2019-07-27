/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, throwError, isObservable } from 'rxjs';
import { map, catchError, tap, share, finalize, flatMap } from 'rxjs/operators';
import { DiHelpUrlResolver, DI_HELP_URL_TOKEN, DI_HELP_CACHE_LIFETIME_TOKEN } from '../di-help.config';
/**
 * @record
 */
function ICacheEntry() { }
if (false) {
    /** @type {?|undefined} */
    ICacheEntry.prototype.article;
    /** @type {?|undefined} */
    ICacheEntry.prototype.error;
}
/** @type {?} */
export const cacheLifetimeSecondDefault = 30 * 60;
export class DiHelpService {
    /**
     * @param {?} diHelpUrlResolver
     * @param {?} diHelpUrl
     * @param {?} cacheLifetimeSecond
     * @param {?} http
     */
    constructor(diHelpUrlResolver, diHelpUrl, cacheLifetimeSecond, http) {
        this.http = http;
        this.cacheById = {};
        this.requestCacheById = {};
        this.cacheByUid = {};
        this.requestCacheByUid = {};
        this.cacheByUrl = {};
        this.requestCacheByUrl = {};
        if (diHelpUrlResolver) {
            /** @type {?} */
            const resolved = diHelpUrlResolver.resolve();
            if (typeof resolved === 'string') {
                this.diHelpUrl = of(resolved);
            }
            else if (isObservable(resolved)) {
                this.diHelpUrl = resolved;
            }
            else {
                throw Error('Not supported diHelpUrlResolver');
            }
        }
        else if (diHelpUrl) {
            this.diHelpUrl = of(diHelpUrl);
        }
        else {
            throw Error('Please, configure diHelpUrl or diHelpUrlResolver');
        }
        this.cacheLifetime = cacheLifetimeSecond * 1000;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getArticleById(id) {
        return this.diHelpUrl.pipe(flatMap((/**
         * @param {?} baseAddress
         * @return {?}
         */
        baseAddress => this.cachedGet(this.cacheById, this.requestCacheById, id, `${baseAddress}/api/Articles/GetArticleById/${id}`))));
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getArticleByUrl(url) {
        return this.diHelpUrl.pipe(flatMap((/**
         * @param {?} baseAddress
         * @return {?}
         */
        baseAddress => this.cachedGet(this.cacheByUrl, this.requestCacheByUrl, url, `${baseAddress}/api/Articles/GetArticleByUrl/?url=${encodeURIComponent(url)}`))));
    }
    /**
     * @param {?} siteUrl
     * @param {?} uid
     * @return {?}
     */
    getArticleByUid(siteUrl, uid) {
        return this.diHelpUrl.pipe(flatMap((/**
         * @param {?} baseAddress
         * @return {?}
         */
        baseAddress => this.cachedGet(this.cacheByUid, this.requestCacheByUid, uid, `${baseAddress}/api/Articles/GetArticleByUid/?siteUrl=${encodeURIComponent(siteUrl)}&uid=${encodeURIComponent(uid)}`))));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getFaqBySiteId(id) {
        return this.diHelpUrl.pipe(flatMap((/**
         * @param {?} baseAddress
         * @return {?}
         */
        baseAddress => this.http
            .get(`${baseAddress}/api/Articles/GetFaqBySiteId/${id}`, {
            headers: { ignoreLoadingBar: '' }
        })
            .pipe(map((/**
         * @param {?} a
         * @return {?}
         */
        a => (/** @type {?} */ (a))))))));
    }
    /**
     * @param {?} siteUrl
     * @return {?}
     */
    getFaqBySiteUrl(siteUrl) {
        return this.diHelpUrl.pipe(flatMap((/**
         * @param {?} baseAddress
         * @return {?}
         */
        baseAddress => this.http
            .get(`${baseAddress}/api/Articles/GetFaqBySiteUrl/?siteUrl=${encodeURIComponent(siteUrl)}`, {
            headers: { ignoreLoadingBar: '' }
        })
            .pipe(map((/**
         * @param {?} a
         * @return {?}
         */
        a => (/** @type {?} */ (a))))))));
    }
    /**
     * @private
     * @param {?} cache
     * @param {?} requestCache
     * @param {?} key
     * @param {?} httpUrl
     * @return {?}
     */
    cachedGet(cache, requestCache, key, httpUrl) {
        if (cache[key]) {
            return cache[key].error ? throwError(cache[key].error) : of(cache[key].article);
        }
        if (requestCache[key])
            return requestCache[key];
        requestCache[key] = this.http
            .get(httpUrl, {
            headers: { ignoreLoadingBar: '' }
        })
            .pipe(map((/**
         * @param {?} a
         * @return {?}
         */
        a => (/** @type {?} */ (a)))), tap((/**
         * @param {?} a
         * @return {?}
         */
        a => {
            delete requestCache[key];
            cache[key] = {
                article: a,
            };
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            delete requestCache[key];
            cache[key] = {
                error: e,
            };
            return throwError(e);
        })), finalize((/**
         * @return {?}
         */
        () => {
            setTimeout((/**
             * @return {?}
             */
            () => delete cache[key]), this.cacheLifetime);
        })), share());
        return requestCache[key];
    }
}
DiHelpService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DiHelpService.ctorParameters = () => [
    { type: DiHelpUrlResolver },
    { type: String, decorators: [{ type: Inject, args: [DI_HELP_URL_TOKEN,] }] },
    { type: Number, decorators: [{ type: Inject, args: [DI_HELP_CACHE_LIFETIME_TOKEN,] }] },
    { type: HttpClient }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    DiHelpService.prototype.cacheLifetime;
    /**
     * @type {?}
     * @private
     */
    DiHelpService.prototype.cacheById;
    /**
     * @type {?}
     * @private
     */
    DiHelpService.prototype.requestCacheById;
    /**
     * @type {?}
     * @private
     */
    DiHelpService.prototype.cacheByUid;
    /**
     * @type {?}
     * @private
     */
    DiHelpService.prototype.requestCacheByUid;
    /**
     * @type {?}
     * @private
     */
    DiHelpService.prototype.cacheByUrl;
    /**
     * @type {?}
     * @private
     */
    DiHelpService.prototype.requestCacheByUrl;
    /**
     * @type {?}
     * @private
     */
    DiHelpService.prototype.diHelpUrl;
    /**
     * @type {?}
     * @private
     */
    DiHelpService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRpLWhlbHAvIiwic291cmNlcyI6WyJsaWIvYXBpL2RpLWhlbHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUV2RywwQkFHQzs7O0lBRkcsOEJBQTJCOztJQUMzQiw0QkFBWTs7O0FBR2hCLE1BQU0sT0FBTywwQkFBMEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUdqRCxNQUFNLE9BQU8sYUFBYTs7Ozs7OztJQWF0QixZQUNJLGlCQUFvQyxFQUNULFNBQWlCLEVBQ04sbUJBQTJCLEVBQ2hELElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFicEIsY0FBUyxHQUFrQyxFQUFFLENBQUM7UUFDOUMscUJBQWdCLEdBQW1ELEVBQUUsQ0FBQztRQUN0RSxlQUFVLEdBQW1DLEVBQUUsQ0FBQztRQUNoRCxzQkFBaUIsR0FBb0QsRUFBRSxDQUFDO1FBQ3hFLGVBQVUsR0FBbUMsRUFBRSxDQUFDO1FBQ2hELHNCQUFpQixHQUFvRCxFQUFFLENBQUM7UUFVckYsSUFBSSxpQkFBaUIsRUFBRTs7a0JBQ2IsUUFBUSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtZQUM1QyxJQUFJLE9BQU8sUUFB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QUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCxDQUFDLEVBQUMsRUFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7OztZQW5ISixVQUFVOzs7O1lBVEYsaUJBQWlCO3lDQXlCakIsTUFBTSxTQUFDLGlCQUFpQjt5Q0FDeEIsTUFBTSxTQUFDLDRCQUE0QjtZQTlCbkMsVUFBVTs7Ozs7OztJQWdCZixzQ0FBdUM7Ozs7O0lBRXZDLGtDQUErRDs7Ozs7SUFDL0QseUNBQXVGOzs7OztJQUN2RixtQ0FBaUU7Ozs7O0lBQ2pFLDBDQUF5Rjs7Ozs7SUFDekYsbUNBQWlFOzs7OztJQUNqRSwwQ0FBeUY7Ozs7O0lBRXpGLGtDQUErQzs7Ozs7SUFNM0MsNkJBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yLCBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yLCB0YXAsIHNoYXJlLCBmaW5hbGl6ZSwgZmxhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQXJ0aWNsZUNsaWVudER0byB9IGZyb20gJy4vYXJ0aWNsZS1jbGllbnQtZHRvJztcclxuaW1wb3J0IHsgRGlIZWxwVXJsUmVzb2x2ZXIsIERJX0hFTFBfVVJMX1RPS0VOLCBESV9IRUxQX0NBQ0hFX0xJRkVUSU1FX1RPS0VOIH0gZnJvbSAnLi4vZGktaGVscC5jb25maWcnO1xyXG5cclxuaW50ZXJmYWNlIElDYWNoZUVudHJ5IHtcclxuICAgIGFydGljbGU/OiBBcnRpY2xlQ2xpZW50RHRvO1xyXG4gICAgZXJyb3I/OiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjYWNoZUxpZmV0aW1lU2Vjb25kRGVmYXVsdCA9IDMwICogNjA7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBEaUhlbHBTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhY2hlTGlmZXRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhY2hlQnlJZDogeyBbaWQ6IG51bWJlcl06IElDYWNoZUVudHJ5IH0gPSB7fTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVxdWVzdENhY2hlQnlJZDogeyBbaWQ6IG51bWJlcl06IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4gfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYWNoZUJ5VWlkOiB7IFt1aWQ6IHN0cmluZ106IElDYWNoZUVudHJ5IH0gPSB7fTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVxdWVzdENhY2hlQnlVaWQ6IHsgW3VpZDogc3RyaW5nXTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvPiB9ID0ge307XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhY2hlQnlVcmw6IHsgW3VybDogc3RyaW5nXTogSUNhY2hlRW50cnkgfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSByZXF1ZXN0Q2FjaGVCeVVybDogeyBbdXJsOiBzdHJpbmddOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IH0gPSB7fTtcclxuXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IGRpSGVscFVybDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGRpSGVscFVybFJlc29sdmVyOiBEaUhlbHBVcmxSZXNvbHZlcixcclxuICAgICAgICBASW5qZWN0KERJX0hFTFBfVVJMX1RPS0VOKSBkaUhlbHBVcmw6IHN0cmluZyxcclxuICAgICAgICBASW5qZWN0KERJX0hFTFBfQ0FDSEVfTElGRVRJTUVfVE9LRU4pIGNhY2hlTGlmZXRpbWVTZWNvbmQ6IG51bWJlcixcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICApIHtcclxuICAgICAgICBpZiAoZGlIZWxwVXJsUmVzb2x2ZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBkaUhlbHBVcmxSZXNvbHZlci5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzb2x2ZWQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpSGVscFVybCA9IG9mKHJlc29sdmVkKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUocmVzb2x2ZWQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpSGVscFVybCA9IHJlc29sdmVkO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ05vdCBzdXBwb3J0ZWQgZGlIZWxwVXJsUmVzb2x2ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGlIZWxwVXJsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlIZWxwVXJsID0gb2YoZGlIZWxwVXJsKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcignUGxlYXNlLCBjb25maWd1cmUgZGlIZWxwVXJsIG9yIGRpSGVscFVybFJlc29sdmVyJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNhY2hlTGlmZXRpbWUgPSBjYWNoZUxpZmV0aW1lU2Vjb25kICogMTAwMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcnRpY2xlQnlJZChpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlIZWxwVXJsLnBpcGUoZmxhdE1hcChiYXNlQWRkcmVzcyA9PiB0aGlzLmNhY2hlZEdldChcclxuICAgICAgICAgICAgdGhpcy5jYWNoZUJ5SWQsXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdENhY2hlQnlJZCxcclxuICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgIGAke2Jhc2VBZGRyZXNzfS9hcGkvQXJ0aWNsZXMvR2V0QXJ0aWNsZUJ5SWQvJHtpZH1gKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFydGljbGVCeVVybCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpSGVscFVybC5waXBlKGZsYXRNYXAoYmFzZUFkZHJlc3MgPT4gdGhpcy5jYWNoZWRHZXQoXHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVCeVVybCxcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Q2FjaGVCeVVybCxcclxuICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICBgJHtiYXNlQWRkcmVzc30vYXBpL0FydGljbGVzL0dldEFydGljbGVCeVVybC8/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcnRpY2xlQnlVaWQoc2l0ZVVybDogc3RyaW5nLCB1aWQ6IHN0cmluZyk6IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpSGVscFVybC5waXBlKGZsYXRNYXAoYmFzZUFkZHJlc3MgPT4gdGhpcy5jYWNoZWRHZXQoXHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVCeVVpZCxcclxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Q2FjaGVCeVVpZCxcclxuICAgICAgICAgICAgdWlkLFxyXG4gICAgICAgICAgICBgJHtiYXNlQWRkcmVzc30vYXBpL0FydGljbGVzL0dldEFydGljbGVCeVVpZC8/c2l0ZVVybD0ke2VuY29kZVVSSUNvbXBvbmVudChzaXRlVXJsKX0mdWlkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVpZCl9YCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGYXFCeVNpdGVJZChpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaUhlbHBVcmwucGlwZShmbGF0TWFwKGJhc2VBZGRyZXNzID0+IHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAuZ2V0KGAke2Jhc2VBZGRyZXNzfS9hcGkvQXJ0aWNsZXMvR2V0RmFxQnlTaXRlSWQvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IGlnbm9yZUxvYWRpbmdCYXI6ICcnIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnBpcGUobWFwKGEgPT4gYSBhcyBBcnRpY2xlQ2xpZW50RHRvW10pKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEZhcUJ5U2l0ZVVybChzaXRlVXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG9bXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpSGVscFVybC5waXBlKGZsYXRNYXAoYmFzZUFkZHJlc3MgPT4gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5nZXQoYCR7YmFzZUFkZHJlc3N9L2FwaS9BcnRpY2xlcy9HZXRGYXFCeVNpdGVVcmwvP3NpdGVVcmw9JHtlbmNvZGVVUklDb21wb25lbnQoc2l0ZVVybCl9YCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyBpZ25vcmVMb2FkaW5nQmFyOiAnJyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5waXBlKG1hcChhID0+IGEgYXMgQXJ0aWNsZUNsaWVudER0b1tdKSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhY2hlZEdldChcclxuICAgICAgICBjYWNoZTogeyBbaWQ6IG51bWJlcl06IElDYWNoZUVudHJ5IH0gfCB7IFt1cmw6IHN0cmluZ106IElDYWNoZUVudHJ5IH0sXHJcbiAgICAgICAgcmVxdWVzdENhY2hlOiB7IFtpZDogbnVtYmVyXTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvPiB9IHwgeyBbaWQ6IG51bWJlcl06IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4gfSxcclxuICAgICAgICBrZXk6IG51bWJlciB8IHN0cmluZyxcclxuICAgICAgICBodHRwVXJsOiBzdHJpbmdcclxuICAgICk6IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4ge1xyXG4gICAgICAgIGlmIChjYWNoZVtrZXldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWNoZVtrZXldLmVycm9yID8gdGhyb3dFcnJvcihjYWNoZVtrZXldLmVycm9yKSA6IG9mKGNhY2hlW2tleV0uYXJ0aWNsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVxdWVzdENhY2hlW2tleV0pIHJldHVybiByZXF1ZXN0Q2FjaGVba2V5XTtcclxuXHJcbiAgICAgICAgcmVxdWVzdENhY2hlW2tleV0gPSB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLmdldChodHRwVXJsLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IGlnbm9yZUxvYWRpbmdCYXI6ICcnIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICAgICAgICBtYXAoYSA9PiBhIGFzIEFydGljbGVDbGllbnREdG8pLFxyXG4gICAgICAgICAgICAgICAgdGFwKGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0Q2FjaGVba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZVtrZXldID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnRpY2xlOiBhLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlcXVlc3RDYWNoZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZSk7XHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIGZpbmFsaXplKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRlbGV0ZSBjYWNoZVtrZXldLCB0aGlzLmNhY2hlTGlmZXRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBzaGFyZSgpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3RDYWNoZVtrZXldO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==