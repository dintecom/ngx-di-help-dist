(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('ngx-popper'), require('@angular/router'), require('rxjs/operators'), require('@angular/common/http'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('ngx-di-help', ['exports', '@angular/core', '@angular/common', 'ngx-popper', '@angular/router', 'rxjs/operators', '@angular/common/http', 'rxjs'], factory) :
    (global = global || self, factory(global['ngx-di-help'] = {}, global.ng.core, global.ng.common, global.ngxPopper, global.ng.router, global.rxjs.operators, global.ng.common.http, global.rxjs));
}(this, function (exports, core, common, ngxPopper, router, operators, http, rxjs) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    DiHelpUrlResolver = /** @class */ (function () {
        function DiHelpUrlResolver() {
        }
        return DiHelpUrlResolver;
    }());
    /** @type {?} */
    var DI_HELP_URL_TOKEN = new core.InjectionToken('DI_HELP_URL');
    /** @type {?} */
    var DI_HELP_CACHE_LIFETIME_TOKEN = new core.InjectionToken('DI_HELP_CACHE_LIFETIME');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var cacheLifetimeSecondDefault = 30 * 60;
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
                    this.diHelpUrl = rxjs.of(resolved);
                }
                else if (rxjs.isObservable(resolved)) {
                    this.diHelpUrl = resolved;
                }
                else {
                    throw Error('Not supported diHelpUrlResolver');
                }
            }
            else if (diHelpUrl) {
                this.diHelpUrl = rxjs.of(diHelpUrl);
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
            return this.diHelpUrl.pipe(operators.flatMap((/**
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
            return this.diHelpUrl.pipe(operators.flatMap((/**
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
            return this.diHelpUrl.pipe(operators.flatMap((/**
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
            return this.diHelpUrl.pipe(operators.flatMap((/**
             * @param {?} baseAddress
             * @return {?}
             */
            function (baseAddress) { return _this.http
                .get(baseAddress + "/api/Articles/GetFaqBySiteId/" + id, {
                headers: { ignoreLoadingBar: '' }
            })
                .pipe(operators.map((/**
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
            return this.diHelpUrl.pipe(operators.flatMap((/**
             * @param {?} baseAddress
             * @return {?}
             */
            function (baseAddress) { return _this.http
                .get(baseAddress + "/api/Articles/GetFaqBySiteUrl/?siteUrl=" + encodeURIComponent(siteUrl), {
                headers: { ignoreLoadingBar: '' }
            })
                .pipe(operators.map((/**
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
                return cache[key].error ? rxjs.throwError(cache[key].error) : rxjs.of(cache[key].article);
            }
            if (requestCache[key])
                return requestCache[key];
            requestCache[key] = this.http
                .get(httpUrl, {
                headers: { ignoreLoadingBar: '' }
            })
                .pipe(operators.map((/**
             * @param {?} a
             * @return {?}
             */
            function (a) { return (/** @type {?} */ (a)); })), operators.tap((/**
             * @param {?} a
             * @return {?}
             */
            function (a) {
                delete requestCache[key];
                cache[key] = {
                    article: a,
                };
            })), operators.catchError((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                delete requestCache[key];
                cache[key] = {
                    error: e,
                };
                return rxjs.throwError(e);
            })), operators.finalize((/**
             * @return {?}
             */
            function () {
                setTimeout((/**
                 * @return {?}
                 */
                function () { return delete cache[key]; }), _this.cacheLifetime);
            })), operators.share());
            return requestCache[key];
        };
        DiHelpService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        DiHelpService.ctorParameters = function () { return [
            { type: DiHelpUrlResolver },
            { type: String, decorators: [{ type: core.Inject, args: [DI_HELP_URL_TOKEN,] }] },
            { type: Number, decorators: [{ type: core.Inject, args: [DI_HELP_CACHE_LIFETIME_TOKEN,] }] },
            { type: http.HttpClient }
        ]; };
        return DiHelpService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DiHelpComponent = /** @class */ (function () {
        function DiHelpComponent(diHelpService, router, changeDetector) {
            this.diHelpService = diHelpService;
            this.router = router;
            this.changeDetector = changeDetector;
            this.alwaysVisible = true;
            this.inline = false;
        }
        Object.defineProperty(DiHelpComponent.prototype, "articleId", {
            get: /**
             * @return {?}
             */
            function () {
                return this._articleId;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                if (this.byLocation)
                    throw Error('Do not use article-id with by-location');
                if (this.articleUid)
                    throw Error('Do not use article-id with article-uid');
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
                function (article) {
                    _this.article = article;
                    _this.changeDetector.markForCheck();
                }), (/**
                 * @return {?}
                 */
                function () {
                    _this.article = null;
                    _this.changeDetector.markForCheck();
                }));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiHelpComponent.prototype, "articleUid", {
            get: /**
             * @return {?}
             */
            function () {
                return this._articleUid;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                if (this.byLocation)
                    throw Error('Do not use article-uid with by-location');
                if (this.articleId)
                    throw Error('Do not use article-uid with article-id');
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
                function (article) {
                    _this.article = article;
                    _this.changeDetector.markForCheck();
                }), (/**
                 * @return {?}
                 */
                function () {
                    _this.article = null;
                    _this.changeDetector.markForCheck();
                }));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DiHelpComponent.prototype, "byLocation", {
            get: /**
             * @return {?}
             */
            function () {
                return this._byLocation;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                if (this.articleId)
                    throw Error('Do not use by-location with article-id');
                if (this.articleUid)
                    throw Error('Do not use by-location with article-uid');
                if (this._byLocation === value)
                    return;
                this._byLocation = value;
                if (value) {
                    this.updateFromLocation();
                    this.routerEventsSubscription = this.router.events
                        .pipe(operators.filter((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) { return event instanceof router.NavigationEnd; })))
                        .subscribe((/**
                     * @return {?}
                     */
                    function () {
                        _this.updateFromLocation();
                    }));
                }
                else {
                    if (this.routerEventsSubscription) {
                        this.routerEventsSubscription.unsubscribe();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DiHelpComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.routerEventsSubscription) {
                this.routerEventsSubscription.unsubscribe();
            }
        };
        /**
         * @private
         * @return {?}
         */
        DiHelpComponent.prototype.updateFromLocation = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.diHelpService.getArticleByUrl(location.origin + location.pathname)
                .subscribe((/**
             * @param {?} article
             * @return {?}
             */
            function (article) {
                _this.article = article;
                _this.changeDetector.markForCheck();
            }), (/**
             * @return {?}
             */
            function () {
                _this.article = null;
                _this.changeDetector.markForCheck();
            }));
        };
        DiHelpComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'di-help',
                        template: "<span class=\"fa-stack\"\r\n      [ngStyle]=\"{'font-size': inline ? '0.5em' : '10px'}\"\r\n      [class.invisible]=\"!(alwaysVisible || article)\"\r\n      [class.disabled]=\"!article\"\r\n      [popper]=\"flyOut\"\r\n      [popperDisabled]=\"!article\"\r\n      [popperTrigger]=\"'hover'\"\r\n      [popperPlacement]=\"'top'\"\r\n      [popperAppendTo]=\"'body'\"\r\n      [popperTimeout]=\"500\"\r\n      [popperStyles]=\"{'min-width': '150px', 'max-width': '400px'}\"\r\n      [popperHideOnMouseLeave]=\"true\"\r\n      [popperHideOnClickOutside]=\"true\"\r\n      [popperHideOnScroll]=\"true\"\r\n      [popperApplyClass]=\"'di-help-popper'\">\r\n    <i class=\"fa fa-circle fa-stack-2x\"></i>\r\n    <i class=\"fa fa-question fa-stack-1x\"></i>\r\n</span>\r\n\r\n<popper-content #flyOut>\r\n    <ng-container *ngIf=\"article\">\r\n        <h4>{{article.Name}}</h4>\r\n        <span>\r\n            {{article.ShortText}}\r\n        </span>\r\n        <hr class=\"my-1\" *ngIf=\"article.DiHelpFiles?.length\">\r\n        <a *ngFor=\"let file of article.DiHelpFiles\"\r\n           class=\"d-block\"\r\n           target=\"_blank\"\r\n           href=\"{{file.Url}}\">\r\n            {{file.Name}}\r\n        </a>\r\n        <hr class=\"my-1\" *ngIf=\"article.Links?.length\">\r\n        <a *ngFor=\"let link of article.Links\"\r\n           class=\"d-block\"\r\n           target=\"_blank\"\r\n           href=\"{{link.Url}}\">\r\n            {{link.Name}}\r\n        </a>\r\n    </ng-container>\r\n</popper-content>\r\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [":host .fa-stack{cursor:help}:host .fa-stack.disabled{cursor:default;opacity:.6}:host .fa-stack .fa-stack-1x{font-size:1.5em;color:#f2be35}:host .fa-stack .fa-stack-2x{color:#007bff}:host i{vertical-align:middle}::ng-deep .di-help-popper.ngxp__container{background-color:#f9f9f9;z-index:100000000}"]
                    }] }
        ];
        /** @nocollapse */
        DiHelpComponent.ctorParameters = function () { return [
            { type: DiHelpService },
            { type: router.Router },
            { type: core.ChangeDetectorRef }
        ]; };
        DiHelpComponent.propDecorators = {
            articleId: [{ type: core.Input }],
            articleUid: [{ type: core.Input }],
            byLocation: [{ type: core.Input }],
            alwaysVisible: [{ type: core.Input }],
            inline: [{ type: core.Input }]
        };
        return DiHelpComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DiHelpModule = /** @class */ (function () {
        function DiHelpModule() {
        }
        /**
         * @param {?} config
         * @return {?}
         */
        DiHelpModule.forRoot = /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
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
        };
        DiHelpModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            ngxPopper.NgxPopperModule
                        ],
                        declarations: [
                            DiHelpComponent
                        ],
                        exports: [
                            DiHelpComponent
                        ]
                    },] }
        ];
        return DiHelpModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DiHelpFaqComponent = /** @class */ (function () {
        function DiHelpFaqComponent(diHelpService) {
            this.diHelpService = diHelpService;
        }
        Object.defineProperty(DiHelpFaqComponent.prototype, "siteId", {
            get: /**
             * @return {?}
             */
            function () {
                return this._siteId;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                if (this._siteId === value)
                    return;
                this._siteId = value;
                if (!value)
                    return;
                this.diHelpService.getFaqBySiteId(value).subscribe((/**
                 * @param {?} articles
                 * @return {?}
                 */
                function (articles) {
                    _this.allArticles = articles;
                    _this.applyFilter();
                }), (/**
                 * @return {?}
                 */
                function () {
                    _this.allArticles = null;
                    _this.applyFilter();
                }));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        DiHelpFaqComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this.siteId) {
                this.diHelpService.getFaqBySiteUrl(location.origin).subscribe((/**
                 * @param {?} articles
                 * @return {?}
                 */
                function (articles) {
                    _this.allArticles = articles;
                    _this.applyFilter();
                }), (/**
                 * @return {?}
                 */
                function () {
                    _this.allArticles = null;
                    _this.applyFilter();
                }));
            }
        };
        /**
         * @param {?=} filter
         * @return {?}
         */
        DiHelpFaqComponent.prototype.applyFilter = /**
         * @param {?=} filter
         * @return {?}
         */
        function (filter) {
            if (filter === void 0) { filter = ''; }
            if (filter) {
                /** @type {?} */
                var query_1 = filter.toLowerCase();
                this.articles = this.allArticles.filter((/**
                 * @param {?} a
                 * @return {?}
                 */
                function (a) {
                    return a.Name.toLowerCase().includes(query_1)
                        || a.ShortText.toLowerCase().includes(query_1)
                        || (a.DiHelpFiles && a.DiHelpFiles.some((/**
                         * @param {?} f
                         * @return {?}
                         */
                        function (f) { return f.Name.toLowerCase().includes(query_1); })))
                        || (a.Links && a.Links.some((/**
                         * @param {?} l
                         * @return {?}
                         */
                        function (l) { return l.Name.toLowerCase().includes(query_1); })));
                }));
            }
            else {
                this.articles = this.allArticles;
            }
        };
        DiHelpFaqComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'di-help-faq',
                        template: "<input type=\"search\"\r\n       class=\"form-control\"\r\n       (input)=\"applyFilter($event.target.value)\"\r\n       name=\"article-search\"\r\n       placeholder=\"Search...\"\r\n       autocomplete=\"off\">\r\n\r\n<div class=\"d-block mt-3\" *ngFor=\"let article of articles; let last = last\">\r\n    <h4>{{article.Name}}</h4>\r\n    <div class=\"d-block\" [innerHtml]=\"article.ShortText\"></div>\r\n    <div class=\"mt-3\" *ngIf=\"article.DiHelpFiles\">\r\n        <a class=\"d-block mt-1\" *ngFor=\"let file of article.DiHelpFiles\" [href]=\"file.Url\" target=\"_blank\">{{file.Name}}</a>\r\n    </div>\r\n    <div class=\"mt-3\" *ngIf=\"article.Links\">\r\n        <a class=\"d-block mt-1\" *ngFor=\"let link of article.Links\" [href]=\"link.Url\" target=\"_blank\">{{link.Name}}</a>\r\n    </div>\r\n    <hr class=\"mt-3\" *ngIf=\"!last\"/>\r\n</div>\r\n"
                    }] }
        ];
        /** @nocollapse */
        DiHelpFaqComponent.ctorParameters = function () { return [
            { type: DiHelpService }
        ]; };
        DiHelpFaqComponent.propDecorators = {
            siteId: [{ type: core.Input }]
        };
        return DiHelpFaqComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DiHelpFaqModule = /** @class */ (function () {
        function DiHelpFaqModule() {
        }
        DiHelpFaqModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
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
        return DiHelpFaqModule;
    }());

    exports.DI_HELP_CACHE_LIFETIME_TOKEN = DI_HELP_CACHE_LIFETIME_TOKEN;
    exports.DI_HELP_URL_TOKEN = DI_HELP_URL_TOKEN;
    exports.DiHelpComponent = DiHelpComponent;
    exports.DiHelpFaqComponent = DiHelpFaqComponent;
    exports.DiHelpFaqModule = DiHelpFaqModule;
    exports.DiHelpModule = DiHelpModule;
    exports.DiHelpUrlResolver = DiHelpUrlResolver;
    exports.ɵa = cacheLifetimeSecondDefault;
    exports.ɵb = DiHelpService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-di-help.umd.js.map
