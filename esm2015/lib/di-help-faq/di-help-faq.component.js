/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DiHelpService } from '../api/di-help.service';
export class DiHelpFaqComponent {
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
if (false) {
    /** @type {?} */
    DiHelpFaqComponent.prototype.articles;
    /**
     * @type {?}
     * @private
     */
    DiHelpFaqComponent.prototype._siteId;
    /**
     * @type {?}
     * @private
     */
    DiHelpFaqComponent.prototype.allArticles;
    /**
     * @type {?}
     * @private
     */
    DiHelpFaqComponent.prototype.diHelpService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC1mYXEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRpLWhlbHAvIiwic291cmNlcyI6WyJsaWIvZGktaGVscC1mYXEvZGktaGVscC1mYXEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFNdkQsTUFBTSxPQUFPLGtCQUFrQjs7OztJQTBCM0IsWUFBNkIsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFBSSxDQUFDOzs7O0lBbkI5RCxJQUNJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFhO1FBQ3BCLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLO1lBQUUsT0FBTztRQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVyQixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBQzVCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7UUFBRSxHQUFHLEVBQUU7WUFDSixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBSUQsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxRQUFRLENBQUMsRUFBRTtnQkFDckUsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDOzs7WUFBRSxHQUFHLEVBQUU7Z0JBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsU0FBaUIsRUFBRTtRQUMzQixJQUFJLE1BQU0sRUFBRTs7a0JBQ0YsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUN4QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7bUJBQ2pDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzttQkFDekMsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7bUJBQ2hGLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUk7Ozs7Z0JBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztTQUNoRjthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQzs7O1lBdkRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsODJCQUEwQzthQUM3Qzs7OztZQUxRLGFBQWE7OztxQkFhakIsS0FBSzs7OztJQUxOLHNDQUE4Qjs7Ozs7SUFFOUIscUNBQXdCOzs7OztJQUN4Qix5Q0FBeUM7Ozs7O0lBcUI3QiwyQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSUFydGljbGVDbGllbnREdG8gfSBmcm9tICcuLi9hcGkvYXJ0aWNsZS1jbGllbnQtZHRvJztcclxuaW1wb3J0IHsgRGlIZWxwU2VydmljZSB9IGZyb20gJy4uL2FwaS9kaS1oZWxwLnNlcnZpY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2RpLWhlbHAtZmFxJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9kaS1oZWxwLWZhcS50ZW1wbGF0ZS5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlIZWxwRmFxQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBhcnRpY2xlczogSUFydGljbGVDbGllbnREdG9bXTtcclxuXHJcbiAgICBwcml2YXRlIF9zaXRlSWQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgYWxsQXJ0aWNsZXM6IElBcnRpY2xlQ2xpZW50RHRvW107XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIGdldCBzaXRlSWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2l0ZUlkO1xyXG4gICAgfVxyXG4gICAgc2V0IHNpdGVJZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NpdGVJZCA9PT0gdmFsdWUpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fc2l0ZUlkID0gdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLmRpSGVscFNlcnZpY2UuZ2V0RmFxQnlTaXRlSWQodmFsdWUpLnN1YnNjcmliZShhcnRpY2xlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsQXJ0aWNsZXMgPSBhcnRpY2xlcztcclxuICAgICAgICAgICAgdGhpcy5hcHBseUZpbHRlcigpO1xyXG4gICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hbGxBcnRpY2xlcyA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGRpSGVscFNlcnZpY2U6IERpSGVscFNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5zaXRlSWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kaUhlbHBTZXJ2aWNlLmdldEZhcUJ5U2l0ZVVybChsb2NhdGlvbi5vcmlnaW4pLnN1YnNjcmliZShhcnRpY2xlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEFydGljbGVzID0gYXJ0aWNsZXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RmlsdGVyKCk7XHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsQXJ0aWNsZXMgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZpbHRlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlGaWx0ZXIoZmlsdGVyOiBzdHJpbmcgPSAnJykge1xyXG4gICAgICAgIGlmIChmaWx0ZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5hcnRpY2xlcyA9IHRoaXMuYWxsQXJ0aWNsZXMuZmlsdGVyKGEgPT5cclxuICAgICAgICAgICAgICAgIGEuTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KVxyXG4gICAgICAgICAgICAgICAgfHwgYS5TaG9ydFRleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSlcclxuICAgICAgICAgICAgICAgIHx8IChhLkRpSGVscEZpbGVzICYmIGEuRGlIZWxwRmlsZXMuc29tZShmID0+IGYuTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSkpXHJcbiAgICAgICAgICAgICAgICB8fCAoYS5MaW5rcyAmJiBhLkxpbmtzLnNvbWUobCA9PiBsLk5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSkpKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hcnRpY2xlcyA9IHRoaXMuYWxsQXJ0aWNsZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==