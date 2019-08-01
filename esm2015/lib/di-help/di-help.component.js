/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                template: "<span class=\"fa-stack\"\n      [ngStyle]=\"{'font-size': inline ? '0.5em' : '10px'}\"\n      [class.invisible]=\"!(alwaysVisible || article)\"\n      [class.disabled]=\"!article\"\n      [popper]=\"flyOut\"\n      [popperDisabled]=\"!article\"\n      [popperTrigger]=\"'hover'\"\n      [popperPlacement]=\"'top'\"\n      [popperAppendTo]=\"'body'\"\n      [popperTimeout]=\"500\"\n      [popperStyles]=\"{'min-width': '150px', 'max-width': '400px'}\"\n      [popperHideOnMouseLeave]=\"true\"\n      [popperHideOnClickOutside]=\"true\"\n      [popperHideOnScroll]=\"true\"\n      [popperApplyClass]=\"'di-help-popper'\">\n    <i class=\"fa fa-circle fa-stack-2x\"></i>\n    <i class=\"fa fa-question fa-stack-1x\"></i>\n</span>\n\n<popper-content #flyOut>\n    <ng-container *ngIf=\"article\">\n        <h4>{{article.Name}}</h4>\n        <span>\n            {{article.ShortText}}\n        </span>\n        <hr class=\"my-1\" *ngIf=\"article.DiHelpFiles?.length\">\n        <a *ngFor=\"let file of article.DiHelpFiles\"\n           class=\"d-block\"\n           target=\"_blank\"\n           href=\"{{file.Url}}\">\n            {{file.Name}}\n        </a>\n        <hr class=\"my-1\" *ngIf=\"article.Links?.length\">\n        <a *ngFor=\"let link of article.Links\"\n           class=\"d-block\"\n           target=\"_blank\"\n           href=\"{{link.Url}}\">\n            {{link.Name}}\n        </a>\n    </ng-container>\n</popper-content>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGktaGVscC8iLCJzb3VyY2VzIjpbImxpYi9kaS1oZWxwL2RpLWhlbHAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBYSx1QkFBdUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFRdkQsTUFBTSxPQUFPLGVBQWU7Ozs7OztJQXVGeEIsWUFDcUIsYUFBNEIsRUFDNUIsTUFBYyxFQUNkLGNBQWlDO1FBRmpDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBbUI7UUFSdEQsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFHOUIsV0FBTSxHQUFZLEtBQUssQ0FBQztJQU1wQixDQUFDOzs7O0lBbEZMLElBQ0ksU0FBUztRQUNULE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDOzs7OztJQUNELElBQUksU0FBUyxDQUFDLEtBQWE7UUFDdkIsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUFFLE1BQU0sS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDekUsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUFFLE1BQU0sS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFFekUsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLEtBQUs7WUFBRSxPQUFPO1FBRXRDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXhCLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FB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RSxTQUFTOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QyxDQUFDOzs7UUFBRSxHQUFHLEVBQUU7WUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDO0lBQ1gsQ0FBQzs7O1lBbEhKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsODZDQUFzQztnQkFFdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2xEOzs7O1lBUFEsYUFBYTtZQUpiLE1BQU07WUFEZ0QsaUJBQWlCOzs7d0JBc0IzRSxLQUFLO3lCQXVCTCxLQUFLO3lCQXVCTCxLQUFLOzRCQTBCTCxLQUFLO3FCQUdMLEtBQUs7Ozs7SUFsRk4sa0NBQTJCOzs7OztJQUUzQixtREFBK0M7Ozs7O0lBQy9DLHFDQUEyQjs7Ozs7SUFDM0Isc0NBQTRCOzs7OztJQUM1QixzQ0FBNkI7O0lBMEU3Qix3Q0FDOEI7O0lBRTlCLGlDQUN3Qjs7Ozs7SUFHcEIsd0NBQTZDOzs7OztJQUM3QyxpQ0FBK0I7Ozs7O0lBQy9CLHlDQUFrRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25FbmQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJQXJ0aWNsZUNsaWVudER0byB9IGZyb20gJy4uL2FwaS9hcnRpY2xlLWNsaWVudC1kdG8nO1xuaW1wb3J0IHsgRGlIZWxwU2VydmljZSB9IGZyb20gJy4uL2FwaS9kaS1oZWxwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2RpLWhlbHAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kaS1oZWxwLnRlbXBsYXRlLmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2RpLWhlbHAuc3R5bGUuc2NzcyddLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIERpSGVscENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBhcnRpY2xlOiBJQXJ0aWNsZUNsaWVudER0bztcblxuICAgIHByaXZhdGUgcm91dGVyRXZlbnRzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgcHJpdmF0ZSBfYXJ0aWNsZUlkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBfYXJ0aWNsZVVpZDogc3RyaW5nO1xuICAgIHByaXZhdGUgX2J5TG9jYXRpb246IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBhcnRpY2xlSWQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FydGljbGVJZDtcbiAgICB9XG4gICAgc2V0IGFydGljbGVJZCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmJ5TG9jYXRpb24pIHRocm93IEVycm9yKCdEbyBub3QgdXNlIGFydGljbGVJZCB3aXRoIGJ5TG9jYXRpb24nKTtcbiAgICAgICAgaWYgKHRoaXMuYXJ0aWNsZVVpZCkgdGhyb3cgRXJyb3IoJ0RvIG5vdCB1c2UgYXJ0aWNsZUlkIHdpdGggYXJ0aWNsZVVpZCcpO1xuXG4gICAgICAgIGlmICh0aGlzLl9hcnRpY2xlSWQgPT09IHZhbHVlKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fYXJ0aWNsZUlkID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmRpSGVscFNlcnZpY2UuZ2V0QXJ0aWNsZUJ5SWQodmFsdWUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGFydGljbGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWNsZSA9IGFydGljbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFydGljbGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBhcnRpY2xlVWlkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hcnRpY2xlVWlkO1xuICAgIH1cbiAgICBzZXQgYXJ0aWNsZVVpZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLmJ5TG9jYXRpb24pIHRocm93IEVycm9yKCdEbyBub3QgdXNlIGFydGljbGVVaWQgd2l0aCBieUxvY2F0aW9uJyk7XG4gICAgICAgIGlmICh0aGlzLmFydGljbGVJZCkgdGhyb3cgRXJyb3IoJ0RvIG5vdCB1c2UgYXJ0aWNsZVVpZCB3aXRoIGFydGljbGUtaWQnKTtcblxuICAgICAgICBpZiAodGhpcy5fYXJ0aWNsZVVpZCA9PT0gdmFsdWUpIHJldHVybjtcblxuICAgICAgICB0aGlzLl9hcnRpY2xlVWlkID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmRpSGVscFNlcnZpY2UuZ2V0QXJ0aWNsZUJ5VWlkKGxvY2F0aW9uLm9yaWdpbiwgdmFsdWUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGFydGljbGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWNsZSA9IGFydGljbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFydGljbGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBieUxvY2F0aW9uKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnlMb2NhdGlvbjtcbiAgICB9XG4gICAgc2V0IGJ5TG9jYXRpb24odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMuYXJ0aWNsZUlkKSB0aHJvdyBFcnJvcignRG8gbm90IHVzZSBieUxvY2F0aW9uIHdpdGggYXJ0aWNsZUlkJyk7XG4gICAgICAgIGlmICh0aGlzLmFydGljbGVVaWQpIHRocm93IEVycm9yKCdEbyBub3QgdXNlIGJ5TG9jYXRpb24gd2l0aCBhcnRpY2xlVWlkJyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2J5TG9jYXRpb24gPT09IHZhbHVlKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fYnlMb2NhdGlvbiA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGcm9tTG9jYXRpb24oKTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyRXZlbnRzU3Vic2NyaXB0aW9uID0gdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAgICAgICAgICAgLnBpcGUoZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRnJvbUxvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb3V0ZXJFdmVudHNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBhbHdheXNWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpXG4gICAgaW5saW5lOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBkaUhlbHBTZXJ2aWNlOiBEaUhlbHBTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogUm91dGVyLFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZlxuICAgICkgeyB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucm91dGVyRXZlbnRzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVGcm9tTG9jYXRpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlIZWxwU2VydmljZS5nZXRBcnRpY2xlQnlVcmwobG9jYXRpb24ub3JpZ2luICsgbG9jYXRpb24ucGF0aG5hbWUpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGFydGljbGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXJ0aWNsZSA9IGFydGljbGU7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFydGljbGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=