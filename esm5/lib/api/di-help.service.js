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
export var cacheLifetimeSecondDefault = 30 * 60;
var DiHelpService = /** @class */ (function () {
    function DiHelpService(diHelpUrlResolver, diHelpUrl, cacheLifetimeSecond, http) {
        this.http = http;
        this.cacheById = {};
        this.requestCacheById = {};
        this.cacheByUid = {};
        this.requestCacheByUid = {};
        this.cacheByUrl = {};
        this.requestCacheByUrl = {};
        if (diHelpUrlResolver) {
            /** @type {?} */
            var resolved = diHelpUrlResolver.resolve();
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
    DiHelpService.prototype.getArticleById = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        return this.diHelpUrl.pipe(flatMap((/**
         * @param {?} baseAddress
         * @return {?}
         */
        function (baseAddress) { return _this.cachedGet(_this.cacheById, _this.requestCacheById, id, baseAddress + "/api/Articles/GetArticleById/" + id); })));
    };
    /**
     * @param {?} url
     * @return {?}
     */
    DiHelpService.prototype.getArticleByUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        return this.diHelpUrl.pipe(flatMap((/**
         * @param {?} baseAddress
         * @return {?}
         */
        function (baseAddress) { return _this.cachedGet(_this.cacheByUrl, _this.requestCacheByUrl, url, baseAddress + "/api/Articles/GetArticleByUrl/?url=" + encodeURIComponent(url)); })));
    };
    /**
     * @param {?} siteUrl
     * @param {?} uid
     * @return {?}
     */
    DiHelpService.prototype.getArticleByUid = /**
     * @param {?} siteUrl
     * @param {?} uid
     * @return {?}
     */
    function (siteUrl, uid) {
        var _this = this;
        return this.diHelpUrl.pipe(flatMap((/**
         * @param {?} baseAddress
         * @return {?}
         */
        function (baseAddress) { return _this.cachedGet(_this.cacheByUid, _this.requestCacheByUid, uid, baseAddress + "/api/Articles/GetArticleByUid/?siteUrl=" + encodeURIComponent(siteUrl) + "&uid=" + encodeURIComponent(uid)); })));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    DiHelpService.prototype.getFaqBySiteId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        return this.diHelpUrl.pipe(flatMap((/**
         * @param {?} baseAddress
         * @return {?}
         */
        function (baseAddress) { return _this.http
            .get(baseAddress + "/api/Articles/GetFaqBySiteId/" + id, {
            headers: { ignoreLoadingBar: '' }
        })
            .pipe(map((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return (/** @type {?} */ (a)); }))); })));
    };
    /**
     * @param {?} siteUrl
     * @return {?}
     */
    DiHelpService.prototype.getFaqBySiteUrl = /**
     * @param {?} siteUrl
     * @return {?}
     */
    function (siteUrl) {
        var _this = this;
        return this.diHelpUrl.pipe(flatMap((/**
         * @param {?} baseAddress
         * @return {?}
         */
        function (baseAddress) { return _this.http
            .get(baseAddress + "/api/Articles/GetFaqBySiteUrl/?siteUrl=" + encodeURIComponent(siteUrl), {
            headers: { ignoreLoadingBar: '' }
        })
            .pipe(map((/**
         * @param {?} a
         * @return {?}
         */
        function (a) { return (/** @type {?} */ (a)); }))); })));
    };
    /**
     * @private
     * @param {?} cache
     * @param {?} requestCache
     * @param {?} key
     * @param {?} httpUrl
     * @return {?}
     */
    DiHelpService.prototype.cachedGet = /**
     * @private
     * @param {?} cache
     * @param {?} requestCache
     * @param {?} key
     * @param {?} httpUrl
     * @return {?}
     */
    function (cache, requestCache, key, httpUrl) {
        var _this = this;
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
        function (a) { return (/** @type {?} */ (a)); })), tap((/**
         * @param {?} a
         * @return {?}
         */
        function (a) {
            delete requestCache[key];
            cache[key] = {
                article: a,
            };
        })), catchError((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            delete requestCache[key];
            cache[key] = {
                error: e,
            };
            return throwError(e);
        })), finalize((/**
         * @return {?}
         */
        function () {
            setTimeout((/**
             * @return {?}
             */
            function () { return delete cache[key]; }), _this.cacheLifetime);
        })), share());
        return requestCache[key];
    };
    DiHelpService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DiHelpService.ctorParameters = function () { return [
        { type: DiHelpUrlResolver },
        { type: String, decorators: [{ type: Inject, args: [DI_HELP_URL_TOKEN,] }] },
        { type: Number, decorators: [{ type: Inject, args: [DI_HELP_CACHE_LIFETIME_TOKEN,] }] },
        { type: HttpClient }
    ]; };
    return DiHelpService;
}());
export { DiHelpService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRpLWhlbHAvIiwic291cmNlcyI6WyJsaWIvYXBpL2RpLWhlbHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUV2RywwQkFHQzs7O0lBRkcsOEJBQTJCOztJQUMzQiw0QkFBWTs7O0FBR2hCLE1BQU0sS0FBTywwQkFBMEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUVqRDtJQWNJLHVCQUNJLGlCQUFvQyxFQUNULFNBQWlCLEVBQ04sbUJBQTJCLEVBQ2hELElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFicEIsY0FBUyxHQUFrQyxFQUFFLENBQUM7UUFDOUMscUJBQWdCLEdBQW1ELEVBQUUsQ0FBQztRQUN0RSxlQUFVLEdBQW1DLEVBQUUsQ0FBQztRQUNoRCxzQkFBaUIsR0FBb0QsRUFBRSxDQUFDO1FBQ3hFLGVBQVUsR0FBbUMsRUFBRSxDQUFDO1FBQ2hELHNCQUFpQixHQUFvRCxFQUFFLENBQUM7UUFVckYsSUFBSSxpQkFBaUIsRUFBRTs7Z0JBQ2IsUUFBUSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtZQUM1QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFD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QUFDO2FBQ1gsQ0FBQztZQUNGLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxFQUNGLFFBQVE7OztRQUFDO1lBQ0wsVUFBVTs7O1lBQUMsY0FBTSxPQUFBLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFqQixDQUFpQixHQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCxDQUFDLEVBQUMsRUFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7O2dCQW5ISixVQUFVOzs7O2dCQVRGLGlCQUFpQjs2Q0F5QmpCLE1BQU0sU0FBQyxpQkFBaUI7NkNBQ3hCLE1BQU0sU0FBQyw0QkFBNEI7Z0JBOUJuQyxVQUFVOztJQWlJbkIsb0JBQUM7Q0FBQSxBQXBIRCxJQW9IQztTQW5IWSxhQUFhOzs7Ozs7SUFFdEIsc0NBQXVDOzs7OztJQUV2QyxrQ0FBK0Q7Ozs7O0lBQy9ELHlDQUF1Rjs7Ozs7SUFDdkYsbUNBQWlFOzs7OztJQUNqRSwwQ0FBeUY7Ozs7O0lBQ3pGLG1DQUFpRTs7Ozs7SUFDakUsMENBQXlGOzs7OztJQUV6RixrQ0FBK0M7Ozs7O0lBTTNDLDZCQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yLCBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciwgdGFwLCBzaGFyZSwgZmluYWxpemUsIGZsYXRNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBcnRpY2xlQ2xpZW50RHRvIH0gZnJvbSAnLi9hcnRpY2xlLWNsaWVudC1kdG8nO1xuaW1wb3J0IHsgRGlIZWxwVXJsUmVzb2x2ZXIsIERJX0hFTFBfVVJMX1RPS0VOLCBESV9IRUxQX0NBQ0hFX0xJRkVUSU1FX1RPS0VOIH0gZnJvbSAnLi4vZGktaGVscC5jb25maWcnO1xuXG5pbnRlcmZhY2UgSUNhY2hlRW50cnkge1xuICAgIGFydGljbGU/OiBBcnRpY2xlQ2xpZW50RHRvO1xuICAgIGVycm9yPzogYW55O1xufVxuXG5leHBvcnQgY29uc3QgY2FjaGVMaWZldGltZVNlY29uZERlZmF1bHQgPSAzMCAqIDYwO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGlIZWxwU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhY2hlTGlmZXRpbWU6IG51bWJlcjtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FjaGVCeUlkOiB7IFtpZDogbnVtYmVyXTogSUNhY2hlRW50cnkgfSA9IHt9O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVxdWVzdENhY2hlQnlJZDogeyBbaWQ6IG51bWJlcl06IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4gfSA9IHt9O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FjaGVCeVVpZDogeyBbdWlkOiBzdHJpbmddOiBJQ2FjaGVFbnRyeSB9ID0ge307XG4gICAgcHJpdmF0ZSByZWFkb25seSByZXF1ZXN0Q2FjaGVCeVVpZDogeyBbdWlkOiBzdHJpbmddOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IH0gPSB7fTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhY2hlQnlVcmw6IHsgW3VybDogc3RyaW5nXTogSUNhY2hlRW50cnkgfSA9IHt9O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVxdWVzdENhY2hlQnlVcmw6IHsgW3VybDogc3RyaW5nXTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvPiB9ID0ge307XG5cbiAgICBwcml2YXRlIHJlYWRvbmx5IGRpSGVscFVybDogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGRpSGVscFVybFJlc29sdmVyOiBEaUhlbHBVcmxSZXNvbHZlcixcbiAgICAgICAgQEluamVjdChESV9IRUxQX1VSTF9UT0tFTikgZGlIZWxwVXJsOiBzdHJpbmcsXG4gICAgICAgIEBJbmplY3QoRElfSEVMUF9DQUNIRV9MSUZFVElNRV9UT0tFTikgY2FjaGVMaWZldGltZVNlY29uZDogbnVtYmVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGh0dHA6IEh0dHBDbGllbnQsXG4gICAgKSB7XG4gICAgICAgIGlmIChkaUhlbHBVcmxSZXNvbHZlcikge1xuICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBkaUhlbHBVcmxSZXNvbHZlci5yZXNvbHZlKCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc29sdmVkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlIZWxwVXJsID0gb2YocmVzb2x2ZWQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc09ic2VydmFibGUocmVzb2x2ZWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaUhlbHBVcmwgPSByZXNvbHZlZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ05vdCBzdXBwb3J0ZWQgZGlIZWxwVXJsUmVzb2x2ZXInKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChkaUhlbHBVcmwpIHtcbiAgICAgICAgICAgIHRoaXMuZGlIZWxwVXJsID0gb2YoZGlIZWxwVXJsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdQbGVhc2UsIGNvbmZpZ3VyZSBkaUhlbHBVcmwgb3IgZGlIZWxwVXJsUmVzb2x2ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2FjaGVMaWZldGltZSA9IGNhY2hlTGlmZXRpbWVTZWNvbmQgKiAxMDAwO1xuICAgIH1cblxuICAgIGdldEFydGljbGVCeUlkKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlIZWxwVXJsLnBpcGUoZmxhdE1hcChiYXNlQWRkcmVzcyA9PiB0aGlzLmNhY2hlZEdldChcbiAgICAgICAgICAgIHRoaXMuY2FjaGVCeUlkLFxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Q2FjaGVCeUlkLFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBgJHtiYXNlQWRkcmVzc30vYXBpL0FydGljbGVzL0dldEFydGljbGVCeUlkLyR7aWR9YCkpKTtcbiAgICB9XG5cbiAgICBnZXRBcnRpY2xlQnlVcmwodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlIZWxwVXJsLnBpcGUoZmxhdE1hcChiYXNlQWRkcmVzcyA9PiB0aGlzLmNhY2hlZEdldChcbiAgICAgICAgICAgIHRoaXMuY2FjaGVCeVVybCxcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdENhY2hlQnlVcmwsXG4gICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICBgJHtiYXNlQWRkcmVzc30vYXBpL0FydGljbGVzL0dldEFydGljbGVCeVVybC8/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHVybCl9YCkpKTtcbiAgICB9XG5cbiAgICBnZXRBcnRpY2xlQnlVaWQoc2l0ZVVybDogc3RyaW5nLCB1aWQ6IHN0cmluZyk6IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaUhlbHBVcmwucGlwZShmbGF0TWFwKGJhc2VBZGRyZXNzID0+IHRoaXMuY2FjaGVkR2V0KFxuICAgICAgICAgICAgdGhpcy5jYWNoZUJ5VWlkLFxuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0Q2FjaGVCeVVpZCxcbiAgICAgICAgICAgIHVpZCxcbiAgICAgICAgICAgIGAke2Jhc2VBZGRyZXNzfS9hcGkvQXJ0aWNsZXMvR2V0QXJ0aWNsZUJ5VWlkLz9zaXRlVXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVVcmwpfSZ1aWQ9JHtlbmNvZGVVUklDb21wb25lbnQodWlkKX1gKSkpO1xuICAgIH1cblxuICAgIGdldEZhcUJ5U2l0ZUlkKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG9bXT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaUhlbHBVcmwucGlwZShmbGF0TWFwKGJhc2VBZGRyZXNzID0+IHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldChgJHtiYXNlQWRkcmVzc30vYXBpL0FydGljbGVzL0dldEZhcUJ5U2l0ZUlkLyR7aWR9YCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgaWdub3JlTG9hZGluZ0JhcjogJycgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChhID0+IGEgYXMgQXJ0aWNsZUNsaWVudER0b1tdKSkpKTtcbiAgICB9XG5cbiAgICBnZXRGYXFCeVNpdGVVcmwoc2l0ZVVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlIZWxwVXJsLnBpcGUoZmxhdE1hcChiYXNlQWRkcmVzcyA9PiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQoYCR7YmFzZUFkZHJlc3N9L2FwaS9BcnRpY2xlcy9HZXRGYXFCeVNpdGVVcmwvP3NpdGVVcmw9JHtlbmNvZGVVUklDb21wb25lbnQoc2l0ZVVybCl9YCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgaWdub3JlTG9hZGluZ0JhcjogJycgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKG1hcChhID0+IGEgYXMgQXJ0aWNsZUNsaWVudER0b1tdKSkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhY2hlZEdldChcbiAgICAgICAgY2FjaGU6IHsgW2lkOiBudW1iZXJdOiBJQ2FjaGVFbnRyeSB9IHwgeyBbdXJsOiBzdHJpbmddOiBJQ2FjaGVFbnRyeSB9LFxuICAgICAgICByZXF1ZXN0Q2FjaGU6IHsgW2lkOiBudW1iZXJdOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IH0gfCB7IFtpZDogbnVtYmVyXTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvPiB9LFxuICAgICAgICBrZXk6IG51bWJlciB8IHN0cmluZyxcbiAgICAgICAgaHR0cFVybDogc3RyaW5nXG4gICAgKTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvPiB7XG4gICAgICAgIGlmIChjYWNoZVtrZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVba2V5XS5lcnJvciA/IHRocm93RXJyb3IoY2FjaGVba2V5XS5lcnJvcikgOiBvZihjYWNoZVtrZXldLmFydGljbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcXVlc3RDYWNoZVtrZXldKSByZXR1cm4gcmVxdWVzdENhY2hlW2tleV07XG5cbiAgICAgICAgcmVxdWVzdENhY2hlW2tleV0gPSB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQoaHR0cFVybCwge1xuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgaWdub3JlTG9hZGluZ0JhcjogJycgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChhID0+IGEgYXMgQXJ0aWNsZUNsaWVudER0byksXG4gICAgICAgICAgICAgICAgdGFwKGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVxdWVzdENhY2hlW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlW2tleV0gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnRpY2xlOiBhLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0Q2FjaGVba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVba2V5XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGVsZXRlIGNhY2hlW2tleV0sIHRoaXMuY2FjaGVMaWZldGltZSk7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSk7XG5cbiAgICAgICAgcmV0dXJuIHJlcXVlc3RDYWNoZVtrZXldO1xuICAgIH1cbn1cbiJdfQ==