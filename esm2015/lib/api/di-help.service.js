/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRpLWhlbHAvIiwic291cmNlcyI6WyJsaWIvYXBpL2RpLWhlbHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUV2RywwQkFHQzs7O0lBRkcsOEJBQTJCOztJQUMzQiw0QkFBWTs7O0FBR2hCLE1BQU0sT0FBTywwQkFBMEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUdqRCxNQUFNLE9BQU8sYUFBYTs7Ozs7OztJQWF0QixZQUNJLGlCQUFvQyxFQUNULFNBQWlCLEVBQ04sbUJBQTJCLEVBQ2hELElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFicEIsY0FBUyxHQUFrQyxFQUFFLENBQUM7UUFDOUMscUJBQWdCLEdBQW1ELEVBQUUsQ0FBQztRQUN0RSxlQUFVLEdBQW1DLEVBQUUsQ0FBQztRQUNoRCxzQkFBaUIsR0FBb0QsRUFBRSxDQUFDO1FBQ3hFLGVBQVUsR0FBbUMsRUFBRSxDQUFDO1FBQ2hELHNCQUFpQixHQUFvRCxFQUFFLENBQUM7UUFVckYsSUFBSSxpQkFBaUIsRUFBRTs7a0JBQ2IsUUFBUSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtZQUM1QyxJQUFJLE9BQU8sUUFB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QUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCxDQUFDLEVBQUMsRUFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7OztZQW5ISixVQUFVOzs7O1lBVEYsaUJBQWlCO3lDQXlCakIsTUFBTSxTQUFDLGlCQUFpQjt5Q0FDeEIsTUFBTSxTQUFDLDRCQUE0QjtZQTlCbkMsVUFBVTs7Ozs7OztJQWdCZixzQ0FBdUM7Ozs7O0lBRXZDLGtDQUErRDs7Ozs7SUFDL0QseUNBQXVGOzs7OztJQUN2RixtQ0FBaUU7Ozs7O0lBQ2pFLDBDQUF5Rjs7Ozs7SUFDekYsbUNBQWlFOzs7OztJQUNqRSwwQ0FBeUY7Ozs7O0lBRXpGLGtDQUErQzs7Ozs7SUFNM0MsNkJBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IsIGlzT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBjYXRjaEVycm9yLCB0YXAsIHNoYXJlLCBmaW5hbGl6ZSwgZmxhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFydGljbGVDbGllbnREdG8gfSBmcm9tICcuL2FydGljbGUtY2xpZW50LWR0byc7XG5pbXBvcnQgeyBEaUhlbHBVcmxSZXNvbHZlciwgRElfSEVMUF9VUkxfVE9LRU4sIERJX0hFTFBfQ0FDSEVfTElGRVRJTUVfVE9LRU4gfSBmcm9tICcuLi9kaS1oZWxwLmNvbmZpZyc7XG5cbmludGVyZmFjZSBJQ2FjaGVFbnRyeSB7XG4gICAgYXJ0aWNsZT86IEFydGljbGVDbGllbnREdG87XG4gICAgZXJyb3I/OiBhbnk7XG59XG5cbmV4cG9ydCBjb25zdCBjYWNoZUxpZmV0aW1lU2Vjb25kRGVmYXVsdCA9IDMwICogNjA7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEaUhlbHBTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FjaGVMaWZldGltZTogbnVtYmVyO1xuXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYWNoZUJ5SWQ6IHsgW2lkOiBudW1iZXJdOiBJQ2FjaGVFbnRyeSB9ID0ge307XG4gICAgcHJpdmF0ZSByZWFkb25seSByZXF1ZXN0Q2FjaGVCeUlkOiB7IFtpZDogbnVtYmVyXTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvPiB9ID0ge307XG4gICAgcHJpdmF0ZSByZWFkb25seSBjYWNoZUJ5VWlkOiB7IFt1aWQ6IHN0cmluZ106IElDYWNoZUVudHJ5IH0gPSB7fTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlcXVlc3RDYWNoZUJ5VWlkOiB7IFt1aWQ6IHN0cmluZ106IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4gfSA9IHt9O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FjaGVCeVVybDogeyBbdXJsOiBzdHJpbmddOiBJQ2FjaGVFbnRyeSB9ID0ge307XG4gICAgcHJpdmF0ZSByZWFkb25seSByZXF1ZXN0Q2FjaGVCeVVybDogeyBbdXJsOiBzdHJpbmddOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IH0gPSB7fTtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgZGlIZWxwVXJsOiBPYnNlcnZhYmxlPHN0cmluZz47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZGlIZWxwVXJsUmVzb2x2ZXI6IERpSGVscFVybFJlc29sdmVyLFxuICAgICAgICBASW5qZWN0KERJX0hFTFBfVVJMX1RPS0VOKSBkaUhlbHBVcmw6IHN0cmluZyxcbiAgICAgICAgQEluamVjdChESV9IRUxQX0NBQ0hFX0xJRkVUSU1FX1RPS0VOKSBjYWNoZUxpZmV0aW1lU2Vjb25kOiBudW1iZXIsXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgaHR0cDogSHR0cENsaWVudCxcbiAgICApIHtcbiAgICAgICAgaWYgKGRpSGVscFVybFJlc29sdmVyKSB7XG4gICAgICAgICAgICBjb25zdCByZXNvbHZlZCA9IGRpSGVscFVybFJlc29sdmVyLnJlc29sdmUoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzb2x2ZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaUhlbHBVcmwgPSBvZihyZXNvbHZlZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZShyZXNvbHZlZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpSGVscFVybCA9IHJlc29sdmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignTm90IHN1cHBvcnRlZCBkaUhlbHBVcmxSZXNvbHZlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGRpSGVscFVybCkge1xuICAgICAgICAgICAgdGhpcy5kaUhlbHBVcmwgPSBvZihkaUhlbHBVcmwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1BsZWFzZSwgY29uZmlndXJlIGRpSGVscFVybCBvciBkaUhlbHBVcmxSZXNvbHZlcicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYWNoZUxpZmV0aW1lID0gY2FjaGVMaWZldGltZVNlY29uZCAqIDEwMDA7XG4gICAgfVxuXG4gICAgZ2V0QXJ0aWNsZUJ5SWQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaUhlbHBVcmwucGlwZShmbGF0TWFwKGJhc2VBZGRyZXNzID0+IHRoaXMuY2FjaGVkR2V0KFxuICAgICAgICAgICAgdGhpcy5jYWNoZUJ5SWQsXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RDYWNoZUJ5SWQsXG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGAke2Jhc2VBZGRyZXNzfS9hcGkvQXJ0aWNsZXMvR2V0QXJ0aWNsZUJ5SWQvJHtpZH1gKSkpO1xuICAgIH1cblxuICAgIGdldEFydGljbGVCeVVybCh1cmw6IHN0cmluZyk6IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaUhlbHBVcmwucGlwZShmbGF0TWFwKGJhc2VBZGRyZXNzID0+IHRoaXMuY2FjaGVkR2V0KFxuICAgICAgICAgICAgdGhpcy5jYWNoZUJ5VXJsLFxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Q2FjaGVCeVVybCxcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIGAke2Jhc2VBZGRyZXNzfS9hcGkvQXJ0aWNsZXMvR2V0QXJ0aWNsZUJ5VXJsLz91cmw9JHtlbmNvZGVVUklDb21wb25lbnQodXJsKX1gKSkpO1xuICAgIH1cblxuICAgIGdldEFydGljbGVCeVVpZChzaXRlVXJsOiBzdHJpbmcsIHVpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpSGVscFVybC5waXBlKGZsYXRNYXAoYmFzZUFkZHJlc3MgPT4gdGhpcy5jYWNoZWRHZXQoXG4gICAgICAgICAgICB0aGlzLmNhY2hlQnlVaWQsXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RDYWNoZUJ5VWlkLFxuICAgICAgICAgICAgdWlkLFxuICAgICAgICAgICAgYCR7YmFzZUFkZHJlc3N9L2FwaS9BcnRpY2xlcy9HZXRBcnRpY2xlQnlVaWQvP3NpdGVVcmw9JHtlbmNvZGVVUklDb21wb25lbnQoc2l0ZVVybCl9JnVpZD0ke2VuY29kZVVSSUNvbXBvbmVudCh1aWQpfWApKSk7XG4gICAgfVxuXG4gICAgZ2V0RmFxQnlTaXRlSWQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0b1tdPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpSGVscFVybC5waXBlKGZsYXRNYXAoYmFzZUFkZHJlc3MgPT4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0KGAke2Jhc2VBZGRyZXNzfS9hcGkvQXJ0aWNsZXMvR2V0RmFxQnlTaXRlSWQvJHtpZH1gLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyBpZ25vcmVMb2FkaW5nQmFyOiAnJyB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKGEgPT4gYSBhcyBBcnRpY2xlQ2xpZW50RHRvW10pKSkpO1xuICAgIH1cblxuICAgIGdldEZhcUJ5U2l0ZVVybChzaXRlVXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG9bXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaUhlbHBVcmwucGlwZShmbGF0TWFwKGJhc2VBZGRyZXNzID0+IHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldChgJHtiYXNlQWRkcmVzc30vYXBpL0FydGljbGVzL0dldEZhcUJ5U2l0ZVVybC8/c2l0ZVVybD0ke2VuY29kZVVSSUNvbXBvbmVudChzaXRlVXJsKX1gLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyBpZ25vcmVMb2FkaW5nQmFyOiAnJyB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUobWFwKGEgPT4gYSBhcyBBcnRpY2xlQ2xpZW50RHRvW10pKSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FjaGVkR2V0KFxuICAgICAgICBjYWNoZTogeyBbaWQ6IG51bWJlcl06IElDYWNoZUVudHJ5IH0gfCB7IFt1cmw6IHN0cmluZ106IElDYWNoZUVudHJ5IH0sXG4gICAgICAgIHJlcXVlc3RDYWNoZTogeyBbaWQ6IG51bWJlcl06IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4gfSB8IHsgW2lkOiBudW1iZXJdOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IH0sXG4gICAgICAgIGtleTogbnVtYmVyIHwgc3RyaW5nLFxuICAgICAgICBodHRwVXJsOiBzdHJpbmdcbiAgICApOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IHtcbiAgICAgICAgaWYgKGNhY2hlW2tleV0pIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZVtrZXldLmVycm9yID8gdGhyb3dFcnJvcihjYWNoZVtrZXldLmVycm9yKSA6IG9mKGNhY2hlW2tleV0uYXJ0aWNsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVxdWVzdENhY2hlW2tleV0pIHJldHVybiByZXF1ZXN0Q2FjaGVba2V5XTtcblxuICAgICAgICByZXF1ZXN0Q2FjaGVba2V5XSA9IHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldChodHRwVXJsLCB7XG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyBpZ25vcmVMb2FkaW5nQmFyOiAnJyB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKGEgPT4gYSBhcyBBcnRpY2xlQ2xpZW50RHRvKSxcbiAgICAgICAgICAgICAgICB0YXAoYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0Q2FjaGVba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVba2V5XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFydGljbGU6IGEsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgY2F0Y2hFcnJvcihlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJlcXVlc3RDYWNoZVtrZXldO1xuICAgICAgICAgICAgICAgICAgICBjYWNoZVtrZXldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGUsXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGZpbmFsaXplKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWxldGUgY2FjaGVba2V5XSwgdGhpcy5jYWNoZUxpZmV0aW1lKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBzaGFyZSgpKTtcblxuICAgICAgICByZXR1cm4gcmVxdWVzdENhY2hlW2tleV07XG4gICAgfVxufVxuIl19