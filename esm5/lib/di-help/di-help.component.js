/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DiHelpService } from '../api/di-help.service';
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
                function (event) { return event instanceof NavigationEnd; })))
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
        { type: Component, args: [{
                    selector: 'di-help',
                    template: "<span class=\"fa-stack\"\n      [ngStyle]=\"{'font-size': inline ? '0.5em' : '10px'}\"\n      [class.invisible]=\"!(alwaysVisible || article)\"\n      [class.disabled]=\"!article\"\n      [popper]=\"flyOut\"\n      [popperDisabled]=\"!article\"\n      [popperTrigger]=\"'hover'\"\n      [popperPlacement]=\"'top'\"\n      [popperAppendTo]=\"'body'\"\n      [popperTimeout]=\"500\"\n      [popperStyles]=\"{'min-width': '150px', 'max-width': '400px'}\"\n      [popperHideOnMouseLeave]=\"true\"\n      [popperHideOnClickOutside]=\"true\"\n      [popperHideOnScroll]=\"true\"\n      [popperApplyClass]=\"'di-help-popper'\">\n    <i class=\"fa fa-circle fa-stack-2x\"></i>\n    <i class=\"fa fa-question fa-stack-1x\"></i>\n</span>\n\n<popper-content #flyOut>\n    <ng-container *ngIf=\"article\">\n        <h4>{{article.Name}}</h4>\n        <span>\n            {{article.ShortText}}\n        </span>\n        <hr class=\"my-1\" *ngIf=\"article.DiHelpFiles?.length\">\n        <a *ngFor=\"let file of article.DiHelpFiles\"\n           class=\"d-block\"\n           target=\"_blank\"\n           href=\"{{file.Url}}\">\n            {{file.Name}}\n        </a>\n        <hr class=\"my-1\" *ngIf=\"article.Links?.length\">\n        <a *ngFor=\"let link of article.Links\"\n           class=\"d-block\"\n           target=\"_blank\"\n           href=\"{{link.Url}}\">\n            {{link.Name}}\n        </a>\n    </ng-container>\n</popper-content>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [":host .fa-stack{cursor:help}:host .fa-stack.disabled{cursor:default;opacity:.6}:host .fa-stack .fa-stack-1x{font-size:1.5em;color:#f2be35}:host .fa-stack .fa-stack-2x{color:#007bff}:host i{vertical-align:middle}::ng-deep .di-help-popper.ngxp__container{background-color:#f9f9f9;z-index:100000000}"]
                }] }
    ];
    /** @nocollapse */
    DiHelpComponent.ctorParameters = function () { return [
        { type: DiHelpService },
        { type: Router },
        { type: ChangeDetectorRef }
    ]; };
    DiHelpComponent.propDecorators = {
        articleId: [{ type: Input }],
        articleUid: [{ type: Input }],
        byLocation: [{ type: Input }],
        alwaysVisible: [{ type: Input }],
        inline: [{ type: Input }]
    };
    return DiHelpComponent;
}());
export { DiHelpComponent };
if (false) {
    /** @type {?} */
    DiHelpComponent.prototype.article;
    /**
     * @type {?}
     * @private
     */
    DiHelpComponent.prototype.routerEventsSubscription;
    /**
     * @type {?}
     * @private
     */
    DiHelpComponent.prototype._articleId;
    /**
     * @type {?}
     * @private
     */
    DiHelpComponent.prototype._articleUid;
    /**
     * @type {?}
     * @private
     */
    DiHelpComponent.prototype._byLocation;
    /** @type {?} */
    DiHelpComponent.prototype.alwaysVisible;
    /** @type {?} */
    DiHelpComponent.prototype.inline;
    /**
     * @type {?}
     * @private
     */
    DiHelpComponent.prototype.diHelpService;
    /**
     * @type {?}
     * @private
     */
    DiHelpComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    DiHelpComponent.prototype.changeDetector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGktaGVscC8iLCJzb3VyY2VzIjpbImxpYi9kaS1oZWxwL2RpLWhlbHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQ7SUE2RkkseUJBQ3FCLGFBQTRCLEVBQzVCLE1BQWMsRUFDZCxjQUFpQztRQUZqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBUnRELGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFNcEIsQ0FBQztJQWxGTCxzQkFDSSxzQ0FBUzs7OztRQURiO1lBRUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7Ozs7O1FBQ0QsVUFBYyxLQUFhO1lBQTNCLGlCQWlCQztZQWhCRyxJQUFJLElBQUksQ0FBQyxVQUFVO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7WUFDekUsSUFBSSxJQUFJLENBQUMsVUFBVTtnQkFBRSxNQUFNLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1lBRXpFLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLO2dCQUFFLE9BQU87WUFFdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFeEIsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUNu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QUFhLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNsRSxTQUFTOzs7O1FBQUMsVUFBQSxPQUFPO1lBQ2QsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7UUFBRTtZQUNDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkMsQ0FBQyxFQUFDLENBQUM7SUFDWCxDQUFDOztnQkFsSEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO29CQUNuQiw4NkNBQXNDO29CQUV0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2xEOzs7O2dCQVBRLGFBQWE7Z0JBSmIsTUFBTTtnQkFEZ0QsaUJBQWlCOzs7NEJBc0IzRSxLQUFLOzZCQXVCTCxLQUFLOzZCQXVCTCxLQUFLO2dDQTBCTCxLQUFLO3lCQUdMLEtBQUs7O0lBeUJWLHNCQUFDO0NBQUEsQUFuSEQsSUFtSEM7U0E3R1ksZUFBZTs7O0lBRXhCLGtDQUEyQjs7Ozs7SUFFM0IsbURBQStDOzs7OztJQUMvQyxxQ0FBMkI7Ozs7O0lBQzNCLHNDQUE0Qjs7Ozs7SUFDNUIsc0NBQTZCOztJQTBFN0Isd0NBQzhCOztJQUU5QixpQ0FDd0I7Ozs7O0lBR3BCLHdDQUE2Qzs7Ozs7SUFDN0MsaUNBQStCOzs7OztJQUMvQix5Q0FBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUFydGljbGVDbGllbnREdG8gfSBmcm9tICcuLi9hcGkvYXJ0aWNsZS1jbGllbnQtZHRvJztcbmltcG9ydCB7IERpSGVscFNlcnZpY2UgfSBmcm9tICcuLi9hcGkvZGktaGVscC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdkaS1oZWxwJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGktaGVscC50ZW1wbGF0ZS5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9kaS1oZWxwLnN0eWxlLnNjc3MnXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBEaUhlbHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgYXJ0aWNsZTogSUFydGljbGVDbGllbnREdG87XG5cbiAgICBwcml2YXRlIHJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgX2FydGljbGVJZDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2FydGljbGVVaWQ6IHN0cmluZztcbiAgICBwcml2YXRlIF9ieUxvY2F0aW9uOiBib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgYXJ0aWNsZUlkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcnRpY2xlSWQ7XG4gICAgfVxuICAgIHNldCBhcnRpY2xlSWQodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5ieUxvY2F0aW9uKSB0aHJvdyBFcnJvcignRG8gbm90IHVzZSBhcnRpY2xlSWQgd2l0aCBieUxvY2F0aW9uJyk7XG4gICAgICAgIGlmICh0aGlzLmFydGljbGVVaWQpIHRocm93IEVycm9yKCdEbyBub3QgdXNlIGFydGljbGVJZCB3aXRoIGFydGljbGVVaWQnKTtcblxuICAgICAgICBpZiAodGhpcy5fYXJ0aWNsZUlkID09PSB2YWx1ZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX2FydGljbGVJZCA9IHZhbHVlO1xuXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICAgICAgdGhpcy5kaUhlbHBTZXJ2aWNlLmdldEFydGljbGVCeUlkKHZhbHVlKVxuICAgICAgICAgICAgLnN1YnNjcmliZShhcnRpY2xlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFydGljbGUgPSBhcnRpY2xlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpY2xlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgYXJ0aWNsZVVpZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXJ0aWNsZVVpZDtcbiAgICB9XG4gICAgc2V0IGFydGljbGVVaWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5ieUxvY2F0aW9uKSB0aHJvdyBFcnJvcignRG8gbm90IHVzZSBhcnRpY2xlVWlkIHdpdGggYnlMb2NhdGlvbicpO1xuICAgICAgICBpZiAodGhpcy5hcnRpY2xlSWQpIHRocm93IEVycm9yKCdEbyBub3QgdXNlIGFydGljbGVVaWQgd2l0aCBhcnRpY2xlLWlkJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FydGljbGVVaWQgPT09IHZhbHVlKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fYXJ0aWNsZVVpZCA9IHZhbHVlO1xuXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICAgICAgdGhpcy5kaUhlbHBTZXJ2aWNlLmdldEFydGljbGVCeVVpZChsb2NhdGlvbi5vcmlnaW4sIHZhbHVlKVxuICAgICAgICAgICAgLnN1YnNjcmliZShhcnRpY2xlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFydGljbGUgPSBhcnRpY2xlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpY2xlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBnZXQgYnlMb2NhdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J5TG9jYXRpb247XG4gICAgfVxuICAgIHNldCBieUxvY2F0aW9uKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLmFydGljbGVJZCkgdGhyb3cgRXJyb3IoJ0RvIG5vdCB1c2UgYnlMb2NhdGlvbiB3aXRoIGFydGljbGVJZCcpO1xuICAgICAgICBpZiAodGhpcy5hcnRpY2xlVWlkKSB0aHJvdyBFcnJvcignRG8gbm90IHVzZSBieUxvY2F0aW9uIHdpdGggYXJ0aWNsZVVpZCcpO1xuXG4gICAgICAgIGlmICh0aGlzLl9ieUxvY2F0aW9uID09PSB2YWx1ZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX2J5TG9jYXRpb24gPSB2YWx1ZTtcblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRnJvbUxvY2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbiA9IHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgICAgICAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUZyb21Mb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMucm91dGVyRXZlbnRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgYWx3YXlzVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKVxuICAgIGlubGluZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZGlIZWxwU2VydmljZTogRGlIZWxwU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcixcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgICApIHsgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlRnJvbUxvY2F0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpSGVscFNlcnZpY2UuZ2V0QXJ0aWNsZUJ5VXJsKGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lKVxuICAgICAgICAgICAgLnN1YnNjcmliZShhcnRpY2xlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFydGljbGUgPSBhcnRpY2xlO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpY2xlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19