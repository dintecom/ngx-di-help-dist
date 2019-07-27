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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRpLWhlbHAvIiwic291cmNlcyI6WyJsaWIvYXBpL2RpLWhlbHAuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7OztBQUV2RywwQkFHQzs7O0lBRkcsOEJBQTJCOztJQUMzQiw0QkFBWTs7O0FBR2hCLE1BQU0sS0FBTywwQkFBMEIsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUVqRDtJQWNJLHVCQUNJLGlCQUFvQyxFQUNULFNBQWlCLEVBQ04sbUJBQTJCLEVBQ2hELElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFicEIsY0FBUyxHQUFrQyxFQUFFLENBQUM7UUFDOUMscUJBQWdCLEdBQW1ELEVBQUUsQ0FBQztRQUN0RSxlQUFVLEdBQW1DLEVBQUUsQ0FBQztRQUNoRCxzQkFBaUIsR0FBb0QsRUFBRSxDQUFDO1FBQ3hFLGVBQVUsR0FBbUMsRUFBRSxDQUFDO1FBQ2hELHNCQUFpQixHQUFvRCxFQUFFLENBQUM7UUFVckYsSUFBSSxpQkFBaUIsRUFBRTs7Z0JBQ2IsUUFBUSxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRTtZQUM1QyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFD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QUFDO2FBQ1gsQ0FBQztZQUNGLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxFQUNGLFFBQVE7OztRQUFDO1lBQ0wsVUFBVTs7O1lBQUMsY0FBTSxPQUFBLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFqQixDQUFpQixHQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCxDQUFDLEVBQUMsRUFDRixLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7O2dCQW5ISixVQUFVOzs7O2dCQVRGLGlCQUFpQjs2Q0F5QmpCLE1BQU0sU0FBQyxpQkFBaUI7NkNBQ3hCLE1BQU0sU0FBQyw0QkFBNEI7Z0JBOUJuQyxVQUFVOztJQWlJbkIsb0JBQUM7Q0FBQSxBQXBIRCxJQW9IQztTQW5IWSxhQUFhOzs7Ozs7SUFFdEIsc0NBQXVDOzs7OztJQUV2QyxrQ0FBK0Q7Ozs7O0lBQy9ELHlDQUF1Rjs7Ozs7SUFDdkYsbUNBQWlFOzs7OztJQUNqRSwwQ0FBeUY7Ozs7O0lBQ3pGLG1DQUFpRTs7Ozs7SUFDakUsMENBQXlGOzs7OztJQUV6RixrQ0FBK0M7Ozs7O0lBTTNDLDZCQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciwgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCwgY2F0Y2hFcnJvciwgdGFwLCBzaGFyZSwgZmluYWxpemUsIGZsYXRNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IEFydGljbGVDbGllbnREdG8gfSBmcm9tICcuL2FydGljbGUtY2xpZW50LWR0byc7XHJcbmltcG9ydCB7IERpSGVscFVybFJlc29sdmVyLCBESV9IRUxQX1VSTF9UT0tFTiwgRElfSEVMUF9DQUNIRV9MSUZFVElNRV9UT0tFTiB9IGZyb20gJy4uL2RpLWhlbHAuY29uZmlnJztcclxuXHJcbmludGVyZmFjZSBJQ2FjaGVFbnRyeSB7XHJcbiAgICBhcnRpY2xlPzogQXJ0aWNsZUNsaWVudER0bztcclxuICAgIGVycm9yPzogYW55O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2FjaGVMaWZldGltZVNlY29uZERlZmF1bHQgPSAzMCAqIDYwO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRGlIZWxwU2VydmljZSB7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYWNoZUxpZmV0aW1lOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYWNoZUJ5SWQ6IHsgW2lkOiBudW1iZXJdOiBJQ2FjaGVFbnRyeSB9ID0ge307XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlcXVlc3RDYWNoZUJ5SWQ6IHsgW2lkOiBudW1iZXJdOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IH0gPSB7fTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FjaGVCeVVpZDogeyBbdWlkOiBzdHJpbmddOiBJQ2FjaGVFbnRyeSB9ID0ge307XHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJlcXVlc3RDYWNoZUJ5VWlkOiB7IFt1aWQ6IHN0cmluZ106IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4gfSA9IHt9O1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjYWNoZUJ5VXJsOiB7IFt1cmw6IHN0cmluZ106IElDYWNoZUVudHJ5IH0gPSB7fTtcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgcmVxdWVzdENhY2hlQnlVcmw6IHsgW3VybDogc3RyaW5nXTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvPiB9ID0ge307XHJcblxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBkaUhlbHBVcmw6IE9ic2VydmFibGU8c3RyaW5nPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBkaUhlbHBVcmxSZXNvbHZlcjogRGlIZWxwVXJsUmVzb2x2ZXIsXHJcbiAgICAgICAgQEluamVjdChESV9IRUxQX1VSTF9UT0tFTikgZGlIZWxwVXJsOiBzdHJpbmcsXHJcbiAgICAgICAgQEluamVjdChESV9IRUxQX0NBQ0hFX0xJRkVUSU1FX1RPS0VOKSBjYWNoZUxpZmV0aW1lU2Vjb25kOiBudW1iZXIsXHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgKSB7XHJcbiAgICAgICAgaWYgKGRpSGVscFVybFJlc29sdmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVkID0gZGlIZWxwVXJsUmVzb2x2ZXIucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc29sdmVkID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaUhlbHBVcmwgPSBvZihyZXNvbHZlZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlKHJlc29sdmVkKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaUhlbHBVcmwgPSByZXNvbHZlZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdOb3Qgc3VwcG9ydGVkIGRpSGVscFVybFJlc29sdmVyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGRpSGVscFVybCkge1xyXG4gICAgICAgICAgICB0aGlzLmRpSGVscFVybCA9IG9mKGRpSGVscFVybCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ1BsZWFzZSwgY29uZmlndXJlIGRpSGVscFVybCBvciBkaUhlbHBVcmxSZXNvbHZlcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jYWNoZUxpZmV0aW1lID0gY2FjaGVMaWZldGltZVNlY29uZCAqIDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXJ0aWNsZUJ5SWQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRpSGVscFVybC5waXBlKGZsYXRNYXAoYmFzZUFkZHJlc3MgPT4gdGhpcy5jYWNoZWRHZXQoXHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVCeUlkLFxyXG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RDYWNoZUJ5SWQsXHJcbiAgICAgICAgICAgIGlkLFxyXG4gICAgICAgICAgICBgJHtiYXNlQWRkcmVzc30vYXBpL0FydGljbGVzL0dldEFydGljbGVCeUlkLyR7aWR9YCkpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcnRpY2xlQnlVcmwodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaUhlbHBVcmwucGlwZShmbGF0TWFwKGJhc2VBZGRyZXNzID0+IHRoaXMuY2FjaGVkR2V0KFxyXG4gICAgICAgICAgICB0aGlzLmNhY2hlQnlVcmwsXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdENhY2hlQnlVcmwsXHJcbiAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgYCR7YmFzZUFkZHJlc3N9L2FwaS9BcnRpY2xlcy9HZXRBcnRpY2xlQnlVcmwvP3VybD0ke2VuY29kZVVSSUNvbXBvbmVudCh1cmwpfWApKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXJ0aWNsZUJ5VWlkKHNpdGVVcmw6IHN0cmluZywgdWlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaUhlbHBVcmwucGlwZShmbGF0TWFwKGJhc2VBZGRyZXNzID0+IHRoaXMuY2FjaGVkR2V0KFxyXG4gICAgICAgICAgICB0aGlzLmNhY2hlQnlVaWQsXHJcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdENhY2hlQnlVaWQsXHJcbiAgICAgICAgICAgIHVpZCxcclxuICAgICAgICAgICAgYCR7YmFzZUFkZHJlc3N9L2FwaS9BcnRpY2xlcy9HZXRBcnRpY2xlQnlVaWQvP3NpdGVVcmw9JHtlbmNvZGVVUklDb21wb25lbnQoc2l0ZVVybCl9JnVpZD0ke2VuY29kZVVSSUNvbXBvbmVudCh1aWQpfWApKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RmFxQnlTaXRlSWQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0b1tdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlIZWxwVXJsLnBpcGUoZmxhdE1hcChiYXNlQWRkcmVzcyA9PiB0aGlzLmh0dHBcclxuICAgICAgICAgICAgLmdldChgJHtiYXNlQWRkcmVzc30vYXBpL0FydGljbGVzL0dldEZhcUJ5U2l0ZUlkLyR7aWR9YCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyBpZ25vcmVMb2FkaW5nQmFyOiAnJyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5waXBlKG1hcChhID0+IGEgYXMgQXJ0aWNsZUNsaWVudER0b1tdKSkpKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRGYXFCeVNpdGVVcmwoc2l0ZVVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxBcnRpY2xlQ2xpZW50RHRvW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaUhlbHBVcmwucGlwZShmbGF0TWFwKGJhc2VBZGRyZXNzID0+IHRoaXMuaHR0cFxyXG4gICAgICAgICAgICAuZ2V0KGAke2Jhc2VBZGRyZXNzfS9hcGkvQXJ0aWNsZXMvR2V0RmFxQnlTaXRlVXJsLz9zaXRlVXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNpdGVVcmwpfWAsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgaWdub3JlTG9hZGluZ0JhcjogJycgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAucGlwZShtYXAoYSA9PiBhIGFzIEFydGljbGVDbGllbnREdG9bXSkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYWNoZWRHZXQoXHJcbiAgICAgICAgY2FjaGU6IHsgW2lkOiBudW1iZXJdOiBJQ2FjaGVFbnRyeSB9IHwgeyBbdXJsOiBzdHJpbmddOiBJQ2FjaGVFbnRyeSB9LFxyXG4gICAgICAgIHJlcXVlc3RDYWNoZTogeyBbaWQ6IG51bWJlcl06IE9ic2VydmFibGU8QXJ0aWNsZUNsaWVudER0bz4gfSB8IHsgW2lkOiBudW1iZXJdOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IH0sXHJcbiAgICAgICAga2V5OiBudW1iZXIgfCBzdHJpbmcsXHJcbiAgICAgICAgaHR0cFVybDogc3RyaW5nXHJcbiAgICApOiBPYnNlcnZhYmxlPEFydGljbGVDbGllbnREdG8+IHtcclxuICAgICAgICBpZiAoY2FjaGVba2V5XSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVba2V5XS5lcnJvciA/IHRocm93RXJyb3IoY2FjaGVba2V5XS5lcnJvcikgOiBvZihjYWNoZVtrZXldLmFydGljbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlcXVlc3RDYWNoZVtrZXldKSByZXR1cm4gcmVxdWVzdENhY2hlW2tleV07XHJcblxyXG4gICAgICAgIHJlcXVlc3RDYWNoZVtrZXldID0gdGhpcy5odHRwXHJcbiAgICAgICAgICAgIC5nZXQoaHR0cFVybCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyBpZ25vcmVMb2FkaW5nQmFyOiAnJyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgICAgICAgbWFwKGEgPT4gYSBhcyBBcnRpY2xlQ2xpZW50RHRvKSxcclxuICAgICAgICAgICAgICAgIHRhcChhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgcmVxdWVzdENhY2hlW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGVba2V5XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aWNsZTogYSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0Q2FjaGVba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZVtrZXldID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICBmaW5hbGl6ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWxldGUgY2FjaGVba2V5XSwgdGhpcy5jYWNoZUxpZmV0aW1lKTtcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgc2hhcmUoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXF1ZXN0Q2FjaGVba2V5XTtcclxuICAgIH1cclxufVxyXG4iXX0=