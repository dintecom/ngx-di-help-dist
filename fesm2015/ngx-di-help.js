import { InjectionToken, Injectable, Inject, Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPopperModule } from 'ngx-popper';
import { NavigationEnd, Router } from '@angular/router';
import { flatMap, map, tap, catchError, finalize, share, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of, isObservable, throwError } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class DiHelpUrlResolver {
}
/** @type {?} */
const DI_HELP_URL_TOKEN = new InjectionToken('DI_HELP_URL');
/** @type {?} */
const DI_HELP_CACHE_LIFETIME_TOKEN = new InjectionToken('DI_HELP_CACHE_LIFETIME');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const cacheLifetimeSecondDefault = 30 * 60;
class DiHelpService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DiHelpComponent {
    /**
     * @param {?} diHelpService
     * @param {?} router
     * @param {?} changeDetector
     */
    constructor(diHelpService, router, changeDetector) {
        this.diHelpService = diHelpService;
        this.router = router;
        this.changeDetector = changeDetector;
        this.alwaysVisible = true;
        this.inline = false;
    }
    /**
     * @return {?}
     */
    get articleId() {
        return this._articleId;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set articleId(value) {
        if (this.byLocation)
            throw Error('Do not use articleId with byLocation');
        if (this.articleUid)
            throw Error('Do not use articleId with articleUid');
        if (this._articleId === value)
            return;
        this._articleId = value;
        if (!value)
            return;
        this.diHelpService.getArticleById(value)
            .subscribe((/**
         * @param {?} article
         * @return {?}
         */
        article => {
            this.article = article;
            this.changeDetector.markForCheck();
        }), (/**
         * @return {?}
         */
        () => {
            this.article = null;
            this.changeDetector.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    get articleUid() {
        return this._articleUid;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set articleUid(value) {
        if (this.byLocation)
            throw Error('Do not use articleUid with byLocation');
        if (this.articleId)
            throw Error('Do not use articleUid with article-id');
        if (this._articleUid === value)
            return;
        this._articleUid = value;
        if (!value)
            return;
        this.diHelpService.getArticleByUid(location.origin, value)
            .subscribe((/**
         * @param {?} article
         * @return {?}
         */
        article => {
            this.article = article;
            this.changeDetector.markForCheck();
        }), (/**
         * @return {?}
         */
        () => {
            this.article = null;
            this.changeDetector.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    get byLocation() {
        return this._byLocation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set byLocation(value) {
        if (this.articleId)
            throw Error('Do not use byLocation with articleId');
        if (this.articleUid)
            throw Error('Do not use byLocation with articleUid');
        if (this._byLocation === value)
            return;
        this._byLocation = value;
        if (value) {
            this.updateFromLocation();
            this.routerEventsSubscription = this.router.events
                .pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            event => event instanceof NavigationEnd)))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.updateFromLocation();
            }));
        }
        else {
            if (this.routerEventsSubscription) {
                this.routerEventsSubscription.unsubscribe();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.routerEventsSubscription) {
            this.routerEventsSubscription.unsubscribe();
        }
    }
    /**
     * @private
     * @return {?}
     */
    updateFromLocation() {
        this.diHelpService.getArticleByUrl(location.origin + location.pathname)
            .subscribe((/**
         * @param {?} article
         * @return {?}
         */
        article => {
            this.article = article;
            this.changeDetector.markForCheck();
        }), (/**
         * @return {?}
         */
        () => {
            this.article = null;
            this.changeDetector.markForCheck();
        }));
    }
}
DiHelpComponent.decorators = [
    { type: Component, args: [{
                selector: 'di-help',
                template: "<span class=\"fa-stack\"\r\n      [ngStyle]=\"{'font-size': inline ? '0.5em' : '10px'}\"\r\n      [class.invisible]=\"!(alwaysVisible || article)\"\r\n      [class.disabled]=\"!article\"\r\n      [popper]=\"flyOut\"\r\n      [popperDisabled]=\"!article\"\r\n      [popperTrigger]=\"'hover'\"\r\n      [popperPlacement]=\"'top'\"\r\n      [popperAppendTo]=\"'body'\"\r\n      [popperTimeout]=\"500\"\r\n      [popperStyles]=\"{'min-width': '150px', 'max-width': '400px'}\"\r\n      [popperHideOnMouseLeave]=\"true\"\r\n      [popperHideOnClickOutside]=\"true\"\r\n      [popperHideOnScroll]=\"true\"\r\n      [popperApplyClass]=\"'di-help-popper'\">\r\n    <i class=\"fa fa-circle fa-stack-2x\"></i>\r\n    <i class=\"fa fa-question fa-stack-1x\"></i>\r\n</span>\r\n\r\n<popper-content #flyOut>\r\n    <ng-container *ngIf=\"article\">\r\n        <h4>{{article.Name}}</h4>\r\n        <span>\r\n            {{article.ShortText}}\r\n        </span>\r\n        <hr class=\"my-1\" *ngIf=\"article.DiHelpFiles?.length\">\r\n        <a *ngFor=\"let file of article.DiHelpFiles\"\r\n           class=\"d-block\"\r\n           target=\"_blank\"\r\n           href=\"{{file.Url}}\">\r\n            {{file.Name}}\r\n        </a>\r\n        <hr class=\"my-1\" *ngIf=\"article.Links?.length\">\r\n        <a *ngFor=\"let link of article.Links\"\r\n           class=\"d-block\"\r\n           target=\"_blank\"\r\n           href=\"{{link.Url}}\">\r\n            {{link.Name}}\r\n        </a>\r\n    </ng-container>\r\n</popper-content>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host .fa-stack{cursor:help}:host .fa-stack.disabled{cursor:default;opacity:.6}:host .fa-stack .fa-stack-1x{font-size:1.5em;color:#f2be35}:host .fa-stack .fa-stack-2x{color:#007bff}:host i{vertical-align:middle}::ng-deep .di-help-popper.ngxp__container{background-color:#f9f9f9;z-index:100000000}"]
            }] }
];
/** @nocollapse */
DiHelpComponent.ctorParameters = () => [
    { type: DiHelpService },
    { type: Router },
    { type: ChangeDetectorRef }
];
DiHelpComponent.propDecorators = {
    articleId: [{ type: Input }],
    articleUid: [{ type: Input }],
    byLocation: [{ type: Input }],
    alwaysVisible: [{ type: Input }],
    inline: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DiHelpModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: DiHelpModule,
            providers: [
                config.diHelpUrlResolver || { provide: DiHelpUrlResolver, useValue: null },
                {
                    provide: DI_HELP_URL_TOKEN,
                    useValue: config.diHelpUrl,
                },
                {
                    provide: DI_HELP_CACHE_LIFETIME_TOKEN,
                    useValue: isNaN(config.cacheLifetimeSecond) ? cacheLifetimeSecondDefault : config.cacheLifetimeSecond,
                },
                DiHelpService
            ]
        };
    }
}
DiHelpModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    NgxPopperModule
                ],
                declarations: [
                    DiHelpComponent
                ],
                exports: [
                    DiHelpComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DiHelpFaqComponent {
    /**
     * @param {?} diHelpService
     */
    constructor(diHelpService) {
        this.diHelpService = diHelpService;
    }
    /**
     * @return {?}
     */
    get siteId() {
        return this._siteId;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set siteId(value) {
        if (this._siteId === value)
            return;
        this._siteId = value;
        if (!value)
            return;
        this.diHelpService.getFaqBySiteId(value).subscribe((/**
         * @param {?} articles
         * @return {?}
         */
        articles => {
            this.allArticles = articles;
            this.applyFilter();
        }), (/**
         * @return {?}
         */
        () => {
            this.allArticles = null;
            this.applyFilter();
        }));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.siteId) {
            this.diHelpService.getFaqBySiteUrl(location.origin).subscribe((/**
             * @param {?} articles
             * @return {?}
             */
            articles => {
                this.allArticles = articles;
                this.applyFilter();
            }), (/**
             * @return {?}
             */
            () => {
                this.allArticles = null;
                this.applyFilter();
            }));
        }
    }
    /**
     * @param {?=} filter
     * @return {?}
     */
    applyFilter(filter = '') {
        if (filter) {
            /** @type {?} */
            const query = filter.toLowerCase();
            this.articles = this.allArticles.filter((/**
             * @param {?} a
             * @return {?}
             */
            a => a.Name.toLowerCase().includes(query)
                || a.ShortText.toLowerCase().includes(query)
                || (a.DiHelpFiles && a.DiHelpFiles.some((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => f.Name.toLowerCase().includes(query))))
                || (a.Links && a.Links.some((/**
                 * @param {?} l
                 * @return {?}
                 */
                l => l.Name.toLowerCase().includes(query))))));
        }
        else {
            this.articles = this.allArticles;
        }
    }
}
DiHelpFaqComponent.decorators = [
    { type: Component, args: [{
                selector: 'di-help-faq',
                template: "<input type=\"search\"\r\n       class=\"form-control\"\r\n       (input)=\"applyFilter($event.target.value)\"\r\n       name=\"article-search\"\r\n       placeholder=\"Search...\"\r\n       autocomplete=\"off\">\r\n\r\n<div class=\"d-block mt-3\" *ngFor=\"let article of articles; let last = last\">\r\n    <h4>{{article.Name}}</h4>\r\n    <div class=\"d-block\" [innerHtml]=\"article.ShortText\"></div>\r\n    <div class=\"mt-3\" *ngIf=\"article.DiHelpFiles\">\r\n        <a class=\"d-block mt-1\" *ngFor=\"let file of article.DiHelpFiles\" [href]=\"file.Url\" target=\"_blank\">{{file.Name}}</a>\r\n    </div>\r\n    <div class=\"mt-3\" *ngIf=\"article.Links\">\r\n        <a class=\"d-block mt-1\" *ngFor=\"let link of article.Links\" [href]=\"link.Url\" target=\"_blank\">{{link.Name}}</a>\r\n    </div>\r\n    <hr class=\"mt-3\" *ngIf=\"!last\"/>\r\n</div>\r\n"
            }] }
];
/** @nocollapse */
DiHelpFaqComponent.ctorParameters = () => [
    { type: DiHelpService }
];
DiHelpFaqComponent.propDecorators = {
    siteId: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class DiHelpFaqModule {
}
DiHelpFaqModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    DiHelpModule
                ],
                declarations: [
                    DiHelpFaqComponent
                ],
                exports: [
                    DiHelpFaqComponent
                ],
                providers: [
                    DiHelpService
                ]
            },] }
];

export { DI_HELP_CACHE_LIFETIME_TOKEN, DI_HELP_URL_TOKEN, DiHelpComponent, DiHelpFaqComponent, DiHelpFaqModule, DiHelpModule, DiHelpUrlResolver, cacheLifetimeSecondDefault as ɵa, DiHelpService as ɵb };
//# sourceMappingURL=ngx-di-help.js.map
