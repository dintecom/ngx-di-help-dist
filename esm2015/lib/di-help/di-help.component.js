/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DiHelpService } from '../api/di-help.service';
export class DiHelpComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGktaGVscC8iLCJzb3VyY2VzIjpbImxpYi9kaS1oZWxwL2RpLWhlbHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRdkQsTUFBTSxPQUFPLGVBQWU7Ozs7OztJQXVGeEIsWUFDcUIsYUFBNEIsRUFDNUIsTUFBYyxFQUNkLGNBQWlDO1FBRmpDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFSdEQsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsV0FBTSxHQUFZLEtBQUssQ0FBQztJQU1wQixDQUFDOzs7O0lBbEZMLElBQ0ksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELElBQUksU0FBUyxDQUFDLEtBQWE7UUFDdkIsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUFFLE1BQU0sS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDekUsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUFFLE1BQU0sS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFFekUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUs7WUFBRSxPQUFPO1FBRXRDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FB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RSxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7UUFBRSxHQUFHLEVBQUU7WUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO0lBQ1gsQ0FBQzs7O1lBbEhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsZ2dEQUFzQztnQkFFdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7O1lBUFEsYUFBYTtZQUpiLE1BQU07WUFEZ0QsaUJBQWlCOzs7d0JBc0IzRSxLQUFLO3lCQXVCTCxLQUFLO3lCQXVCTCxLQUFLOzRCQTBCTCxLQUFLO3FCQUdMLEtBQUs7Ozs7SUFsRk4sa0NBQTJCOzs7OztJQUUzQixtREFBK0M7Ozs7O0lBQy9DLHFDQUEyQjs7Ozs7SUFDM0Isc0NBQTRCOzs7OztJQUM1QixzQ0FBNkI7O0lBMEU3Qix3Q0FDOEI7O0lBRTlCLGlDQUN3Qjs7Ozs7SUFHcEIsd0NBQTZDOzs7OztJQUM3QyxpQ0FBK0I7Ozs7O0lBQy9CLHlDQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlciwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IElBcnRpY2xlQ2xpZW50RHRvIH0gZnJvbSAnLi4vYXBpL2FydGljbGUtY2xpZW50LWR0byc7XHJcbmltcG9ydCB7IERpSGVscFNlcnZpY2UgfSBmcm9tICcuLi9hcGkvZGktaGVscC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdkaS1oZWxwJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9kaS1oZWxwLnRlbXBsYXRlLmh0bWwnLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vZGktaGVscC5zdHlsZS5zY3NzJ10sXHJcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlIZWxwQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuXHJcbiAgICBhcnRpY2xlOiBJQXJ0aWNsZUNsaWVudER0bztcclxuXHJcbiAgICBwcml2YXRlIHJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgcHJpdmF0ZSBfYXJ0aWNsZUlkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9hcnRpY2xlVWlkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9ieUxvY2F0aW9uOiBib29sZWFuO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgYXJ0aWNsZUlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FydGljbGVJZDtcclxuICAgIH1cclxuICAgIHNldCBhcnRpY2xlSWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmJ5TG9jYXRpb24pIHRocm93IEVycm9yKCdEbyBub3QgdXNlIGFydGljbGVJZCB3aXRoIGJ5TG9jYXRpb24nKTtcclxuICAgICAgICBpZiAodGhpcy5hcnRpY2xlVWlkKSB0aHJvdyBFcnJvcignRG8gbm90IHVzZSBhcnRpY2xlSWQgd2l0aCBhcnRpY2xlVWlkJyk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9hcnRpY2xlSWQgPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX2FydGljbGVJZCA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5kaUhlbHBTZXJ2aWNlLmdldEFydGljbGVCeUlkKHZhbHVlKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGFydGljbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpY2xlID0gYXJ0aWNsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWNsZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgZ2V0IGFydGljbGVVaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXJ0aWNsZVVpZDtcclxuICAgIH1cclxuICAgIHNldCBhcnRpY2xlVWlkKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5ieUxvY2F0aW9uKSB0aHJvdyBFcnJvcignRG8gbm90IHVzZSBhcnRpY2xlVWlkIHdpdGggYnlMb2NhdGlvbicpO1xyXG4gICAgICAgIGlmICh0aGlzLmFydGljbGVJZCkgdGhyb3cgRXJyb3IoJ0RvIG5vdCB1c2UgYXJ0aWNsZVVpZCB3aXRoIGFydGljbGUtaWQnKTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2FydGljbGVVaWQgPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX2FydGljbGVVaWQgPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuZGlIZWxwU2VydmljZS5nZXRBcnRpY2xlQnlVaWQobG9jYXRpb24ub3JpZ2luLCB2YWx1ZSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZShhcnRpY2xlID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWNsZSA9IGFydGljbGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFydGljbGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGdldCBieUxvY2F0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ieUxvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgc2V0IGJ5TG9jYXRpb24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5hcnRpY2xlSWQpIHRocm93IEVycm9yKCdEbyBub3QgdXNlIGJ5TG9jYXRpb24gd2l0aCBhcnRpY2xlSWQnKTtcclxuICAgICAgICBpZiAodGhpcy5hcnRpY2xlVWlkKSB0aHJvdyBFcnJvcignRG8gbm90IHVzZSBieUxvY2F0aW9uIHdpdGggYXJ0aWNsZVVpZCcpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fYnlMb2NhdGlvbiA9PT0gdmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fYnlMb2NhdGlvbiA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGcm9tTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHNTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlci5ldmVudHNcclxuICAgICAgICAgICAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVGcm9tTG9jYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFdmVudHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKVxyXG4gICAgYWx3YXlzVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGlubGluZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgZGlIZWxwU2VydmljZTogRGlIZWxwU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgICApIHsgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZUZyb21Mb2NhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpSGVscFNlcnZpY2UuZ2V0QXJ0aWNsZUJ5VXJsKGxvY2F0aW9uLm9yaWdpbiArIGxvY2F0aW9uLnBhdGhuYW1lKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGFydGljbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnRpY2xlID0gYXJ0aWNsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWNsZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=