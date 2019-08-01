/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                template: "<input type=\"search\"\n       class=\"form-control\"\n       (input)=\"applyFilter($event.target.value)\"\n       name=\"article-search\"\n       placeholder=\"Search...\"\n       autocomplete=\"off\">\n\n<div class=\"d-block mt-3\" *ngFor=\"let article of articles; let last = last\">\n    <h4>{{article.Name}}</h4>\n    <div class=\"d-block\" [innerHtml]=\"article.ShortText\"></div>\n    <div class=\"mt-3\" *ngIf=\"article.DiHelpFiles\">\n        <a class=\"d-block mt-1\" *ngFor=\"let file of article.DiHelpFiles\" [href]=\"file.Url\" target=\"_blank\">{{file.Name}}</a>\n    </div>\n    <div class=\"mt-3\" *ngIf=\"article.Links\">\n        <a class=\"d-block mt-1\" *ngFor=\"let link of article.Links\" [href]=\"link.Url\" target=\"_blank\">{{link.Name}}</a>\n    </div>\n    <hr class=\"mt-3\" *ngIf=\"!last\"/>\n</div>\n"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC1mYXEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRpLWhlbHAvIiwic291cmNlcyI6WyJsaWIvZGktaGVscC1mYXEvZGktaGVscC1mYXEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFNdkQsTUFBTSxPQUFPLGtCQUFrQjs7OztJQTBCM0IsWUFBNkIsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFBSSxDQUFDOzs7O0lBbkI5RCxJQUNJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE1BQU0sQ0FBQyxLQUFhO1FBQ3BCLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLO1lBQUUsT0FBTztRQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVyQixJQUFJLENBQUMsS0FBSztZQUFFLE9BQU87UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzFELElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBQzVCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDOzs7UUFBRSxHQUFHLEVBQUU7WUFDSixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBSUQsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxRQUFRLENBQUMsRUFBRTtnQkFDckUsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDOzs7WUFBRSxHQUFHLEVBQUU7Z0JBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsU0FBaUIsRUFBRTtRQUMzQixJQUFJLE1BQU0sRUFBRTs7a0JBQ0YsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUN4QyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7bUJBQ2pDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQzttQkFDekMsQ0FBQyxDQUFDLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7bUJBQ2hGLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUk7Ozs7Z0JBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQztTQUNoRjthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQzs7O1lBdkRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsMDBCQUEwQzthQUM3Qzs7OztZQUxRLGFBQWE7OztxQkFhakIsS0FBSzs7OztJQUxOLHNDQUE4Qjs7Ozs7SUFFOUIscUNBQXdCOzs7OztJQUN4Qix5Q0FBeUM7Ozs7O0lBcUI3QiwyQ0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElBcnRpY2xlQ2xpZW50RHRvIH0gZnJvbSAnLi4vYXBpL2FydGljbGUtY2xpZW50LWR0byc7XG5pbXBvcnQgeyBEaUhlbHBTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2RpLWhlbHAuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZGktaGVscC1mYXEnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kaS1oZWxwLWZhcS50ZW1wbGF0ZS5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBEaUhlbHBGYXFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgYXJ0aWNsZXM6IElBcnRpY2xlQ2xpZW50RHRvW107XG5cbiAgICBwcml2YXRlIF9zaXRlSWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIGFsbEFydGljbGVzOiBJQXJ0aWNsZUNsaWVudER0b1tdO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgc2l0ZUlkKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaXRlSWQ7XG4gICAgfVxuICAgIHNldCBzaXRlSWQodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5fc2l0ZUlkID09PSB2YWx1ZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuX3NpdGVJZCA9IHZhbHVlO1xuXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcbiAgICAgICAgdGhpcy5kaUhlbHBTZXJ2aWNlLmdldEZhcUJ5U2l0ZUlkKHZhbHVlKS5zdWJzY3JpYmUoYXJ0aWNsZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbGxBcnRpY2xlcyA9IGFydGljbGVzO1xuICAgICAgICAgICAgdGhpcy5hcHBseUZpbHRlcigpO1xuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFsbEFydGljbGVzID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkaUhlbHBTZXJ2aWNlOiBEaUhlbHBTZXJ2aWNlKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuc2l0ZUlkKSB7XG4gICAgICAgICAgICB0aGlzLmRpSGVscFNlcnZpY2UuZ2V0RmFxQnlTaXRlVXJsKGxvY2F0aW9uLm9yaWdpbikuc3Vic2NyaWJlKGFydGljbGVzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEFydGljbGVzID0gYXJ0aWNsZXM7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZpbHRlcigpO1xuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWxsQXJ0aWNsZXMgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXIoZmlsdGVyOiBzdHJpbmcgPSAnJykge1xuICAgICAgICBpZiAoZmlsdGVyKSB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IGZpbHRlci50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdGhpcy5hcnRpY2xlcyA9IHRoaXMuYWxsQXJ0aWNsZXMuZmlsdGVyKGEgPT5cbiAgICAgICAgICAgICAgICBhLk5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSlcbiAgICAgICAgICAgICAgICB8fCBhLlNob3J0VGV4dC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KVxuICAgICAgICAgICAgICAgIHx8IChhLkRpSGVscEZpbGVzICYmIGEuRGlIZWxwRmlsZXMuc29tZShmID0+IGYuTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSkpXG4gICAgICAgICAgICAgICAgfHwgKGEuTGlua3MgJiYgYS5MaW5rcy5zb21lKGwgPT4gbC5OYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcnRpY2xlcyA9IHRoaXMuYWxsQXJ0aWNsZXM7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=