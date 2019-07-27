/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    template: "<span class=\"fa-stack\"\r\n      [ngStyle]=\"{'font-size': inline ? '0.5em' : '10px'}\"\r\n      [class.invisible]=\"!(alwaysVisible || article)\"\r\n      [class.disabled]=\"!article\"\r\n      [popper]=\"flyOut\"\r\n      [popperDisabled]=\"!article\"\r\n      [popperTrigger]=\"'hover'\"\r\n      [popperPlacement]=\"'top'\"\r\n      [popperAppendTo]=\"'body'\"\r\n      [popperTimeout]=\"500\"\r\n      [popperStyles]=\"{'min-width': '150px', 'max-width': '400px'}\"\r\n      [popperHideOnMouseLeave]=\"true\"\r\n      [popperHideOnClickOutside]=\"true\"\r\n      [popperHideOnScroll]=\"true\"\r\n      [popperApplyClass]=\"'di-help-popper'\">\r\n    <i class=\"fa fa-circle fa-stack-2x\"></i>\r\n    <i class=\"fa fa-question fa-stack-1x\"></i>\r\n</span>\r\n\r\n<popper-content #flyOut>\r\n    <ng-container *ngIf=\"article\">\r\n        <h4>{{article.Name}}</h4>\r\n        <span>\r\n            {{article.ShortText}}\r\n        </span>\r\n        <hr class=\"my-1\" *ngIf=\"article.DiHelpFiles?.length\">\r\n        <a *ngFor=\"let file of article.DiHelpFiles\"\r\n           class=\"d-block\"\r\n           target=\"_blank\"\r\n           href=\"{{file.Url}}\">\r\n            {{file.Name}}\r\n        </a>\r\n        <hr class=\"my-1\" *ngIf=\"article.Links?.length\">\r\n        <a *ngFor=\"let link of article.Links\"\r\n           class=\"d-block\"\r\n           target=\"_blank\"\r\n           href=\"{{link.Url}}\">\r\n            {{link.Name}}\r\n        </a>\r\n    </ng-container>\r\n</popper-content>\r\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGktaGVscC8iLCJzb3VyY2VzIjpbImxpYi9kaS1oZWxwL2RpLWhlbHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQ7SUE2RkkseUJBQ3FCLGFBQTRCLEVBQzVCLE1BQWMsRUFDZCxjQUFpQztRQUZqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsbUJBQWMsR0FBZCxjQUFjLENBQW1CO1FBUnRELGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBRzlCLFdBQU0sR0FBWSxLQUFLLENBQUM7SUFNcEIsQ0FBQztJQWxGTCxzQkFDSSxzQ0FBUzs7OztRQURiO1lBRUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7Ozs7O1FBQ0QsVUFBYyxLQUFhO1lBQTNCLGlCQWlCQztZQWhCRyxJQUFJLElBQUksQ0FBQyxVQUFVO2dCQUFFLE1BQU0sS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDM0UsSUFBSSxJQUFJLENBQUMsVUFBVTtnQkFBRSxNQUFNLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBRTNFLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLO2dCQUFFLE9BQU87WUFFdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFeEIsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUNu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QUFhLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQzthQUNsRSxTQUFTOzs7O1FBQUMsVUFBQSxPQUFPO1lBQ2QsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7UUFBRTtZQUNDLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdkMsQ0FBQyxFQUFDLENBQUM7SUFDWCxDQUFDOztnQkFsSEosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO29CQUNuQixnZ0RBQXNDO29CQUV0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2xEOzs7O2dCQVBRLGFBQWE7Z0JBSmIsTUFBTTtnQkFEZ0QsaUJBQWlCOzs7NEJBc0IzRSxLQUFLOzZCQXVCTCxLQUFLOzZCQXVCTCxLQUFLO2dDQTBCTCxLQUFLO3lCQUdMLEtBQUs7O0lBeUJWLHNCQUFDO0NBQUEsQUFuSEQsSUFtSEM7U0E3R1ksZUFBZTs7O0lBRXhCLGtDQUEyQjs7Ozs7SUFFM0IsbURBQStDOzs7OztJQUMvQyxxQ0FBMkI7Ozs7O0lBQzNCLHNDQUE0Qjs7Ozs7SUFDNUIsc0NBQTZCOztJQTBFN0Isd0NBQzhCOztJQUU5QixpQ0FDd0I7Ozs7O0lBR3BCLHdDQUE2Qzs7Ozs7SUFDN0MsaUNBQStCOzs7OztJQUMvQix5Q0FBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBJQXJ0aWNsZUNsaWVudER0byB9IGZyb20gJy4uL2FwaS9hcnRpY2xlLWNsaWVudC1kdG8nO1xyXG5pbXBvcnQgeyBEaUhlbHBTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2RpLWhlbHAuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAnZGktaGVscCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGktaGVscC50ZW1wbGF0ZS5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2RpLWhlbHAuc3R5bGUuc2NzcyddLFxyXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcclxufSlcclxuZXhwb3J0IGNsYXNzIERpSGVscENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gICAgYXJ0aWNsZTogSUFydGljbGVDbGllbnREdG87XHJcblxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFdmVudHNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIHByaXZhdGUgX2FydGljbGVJZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYXJ0aWNsZVVpZDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfYnlMb2NhdGlvbjogYm9vbGVhbjtcclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGFydGljbGVJZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcnRpY2xlSWQ7XHJcbiAgICB9XHJcbiAgICBzZXQgYXJ0aWNsZUlkKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5ieUxvY2F0aW9uKSB0aHJvdyBFcnJvcignRG8gbm90IHVzZSBhcnRpY2xlLWlkIHdpdGggYnktbG9jYXRpb24nKTtcclxuICAgICAgICBpZiAodGhpcy5hcnRpY2xlVWlkKSB0aHJvdyBFcnJvcignRG8gbm90IHVzZSBhcnRpY2xlLWlkIHdpdGggYXJ0aWNsZS11aWQnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FydGljbGVJZCA9PT0gdmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fYXJ0aWNsZUlkID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLmRpSGVscFNlcnZpY2UuZ2V0QXJ0aWNsZUJ5SWQodmFsdWUpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoYXJ0aWNsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFydGljbGUgPSBhcnRpY2xlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpY2xlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgYXJ0aWNsZVVpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcnRpY2xlVWlkO1xyXG4gICAgfVxyXG4gICAgc2V0IGFydGljbGVVaWQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmJ5TG9jYXRpb24pIHRocm93IEVycm9yKCdEbyBub3QgdXNlIGFydGljbGUtdWlkIHdpdGggYnktbG9jYXRpb24nKTtcclxuICAgICAgICBpZiAodGhpcy5hcnRpY2xlSWQpIHRocm93IEVycm9yKCdEbyBub3QgdXNlIGFydGljbGUtdWlkIHdpdGggYXJ0aWNsZS1pZCcpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYXJ0aWNsZVVpZCA9PT0gdmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fYXJ0aWNsZVVpZCA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5kaUhlbHBTZXJ2aWNlLmdldEFydGljbGVCeVVpZChsb2NhdGlvbi5vcmlnaW4sIHZhbHVlKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGFydGljbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpY2xlID0gYXJ0aWNsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWNsZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGJ5TG9jYXRpb24oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J5TG9jYXRpb247XHJcbiAgICB9XHJcbiAgICBzZXQgYnlMb2NhdGlvbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLmFydGljbGVJZCkgdGhyb3cgRXJyb3IoJ0RvIG5vdCB1c2UgYnktbG9jYXRpb24gd2l0aCBhcnRpY2xlLWlkJyk7XHJcbiAgICAgICAgaWYgKHRoaXMuYXJ0aWNsZVVpZCkgdGhyb3cgRXJyb3IoJ0RvIG5vdCB1c2UgYnktbG9jYXRpb24gd2l0aCBhcnRpY2xlLXVpZCcpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYnlMb2NhdGlvbiA9PT0gdmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fYnlMb2NhdGlvbiA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGcm9tTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHNTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlci5ldmVudHNcclxuICAgICAgICAgICAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGcm9tTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgYWx3YXlzVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGlubGluZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZGlIZWxwU2VydmljZTogRGlIZWxwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUZyb21Mb2NhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpSGVscFNlcnZpY2UuZ2V0QXJ0aWNsZUJ5VXJsKGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGFydGljbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpY2xlID0gYXJ0aWNsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWNsZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=