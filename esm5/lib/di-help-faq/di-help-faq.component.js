/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DiHelpService } from '../api/di-help.service';
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
        { type: Component, args: [{
                    selector: 'di-help-faq',
                    template: "<input type=\"search\"\r\n       class=\"form-control\"\r\n       (input)=\"applyFilter($event.target.value)\"\r\n       name=\"article-search\"\r\n       placeholder=\"Search...\"\r\n       autocomplete=\"off\">\r\n\r\n<div class=\"d-block mt-3\" *ngFor=\"let article of articles; let last = last\">\r\n    <h4>{{article.Name}}</h4>\r\n    <div class=\"d-block\" [innerHtml]=\"article.ShortText\"></div>\r\n    <div class=\"mt-3\" *ngIf=\"article.DiHelpFiles\">\r\n        <a class=\"d-block mt-1\" *ngFor=\"let file of article.DiHelpFiles\" [href]=\"file.Url\" target=\"_blank\">{{file.Name}}</a>\r\n    </div>\r\n    <div class=\"mt-3\" *ngIf=\"article.Links\">\r\n        <a class=\"d-block mt-1\" *ngFor=\"let link of article.Links\" [href]=\"link.Url\" target=\"_blank\">{{link.Name}}</a>\r\n    </div>\r\n    <hr class=\"mt-3\" *ngIf=\"!last\"/>\r\n</div>\r\n"
                }] }
    ];
    /** @nocollapse */
    DiHelpFaqComponent.ctorParameters = function () { return [
        { type: DiHelpService }
    ]; };
    DiHelpFaqComponent.propDecorators = {
        siteId: [{ type: Input }]
    };
    return DiHelpFaqComponent;
}());
export { DiHelpFaqComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC1mYXEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRpLWhlbHAvIiwic291cmNlcyI6WyJsaWIvZGktaGVscC1mYXEvZGktaGVscC1mYXEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQ7SUE4QkksNEJBQTZCLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUksQ0FBQztJQW5COUQsc0JBQ0ksc0NBQU07Ozs7UUFEVjtZQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7OztRQUNELFVBQVcsS0FBYTtZQUF4QixpQkFhQztZQVpHLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLO2dCQUFFLE9BQU87WUFFbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUN2RCxLQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7OztZQUFFO2dCQUNDLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDOzs7T0FkQTs7OztJQWtCRCxxQ0FBUTs7O0lBQVI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLFFBQVE7Z0JBQ2xFLEtBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO2dCQUM1QixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsQ0FBQzs7O1lBQUU7Z0JBQ0MsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7Ozs7SUFFRCx3Q0FBVzs7OztJQUFYLFVBQVksTUFBbUI7UUFBbkIsdUJBQUEsRUFBQSxXQUFtQjtRQUMzQixJQUFJLE1BQU0sRUFBRTs7Z0JBQ0YsT0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07Ozs7WUFBQyxVQUFBLENBQUM7Z0JBQ3JDLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBSyxDQUFDO3VCQUNqQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFLLENBQUM7dUJBQ3pDLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUk7Ozs7b0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFLLENBQUMsRUFBcEMsQ0FBb0MsRUFBQyxDQUFDO3VCQUNoRixDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJOzs7O29CQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBSyxDQUFDLEVBQXBDLENBQW9DLEVBQUMsQ0FBQztZQUh2RSxDQUd1RSxFQUFDLENBQUM7U0FDaEY7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNwQztJQUNMLENBQUM7O2dCQXZESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLDgyQkFBMEM7aUJBQzdDOzs7O2dCQUxRLGFBQWE7Ozt5QkFhakIsS0FBSzs7SUE2Q1YseUJBQUM7Q0FBQSxBQXhERCxJQXdEQztTQXBEWSxrQkFBa0I7OztJQUUzQixzQ0FBOEI7Ozs7O0lBRTlCLHFDQUF3Qjs7Ozs7SUFDeEIseUNBQXlDOzs7OztJQXFCN0IsMkNBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElBcnRpY2xlQ2xpZW50RHRvIH0gZnJvbSAnLi4vYXBpL2FydGljbGUtY2xpZW50LWR0byc7XHJcbmltcG9ydCB7IERpSGVscFNlcnZpY2UgfSBmcm9tICcuLi9hcGkvZGktaGVscC5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdkaS1oZWxwLWZhcScsXHJcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGktaGVscC1mYXEudGVtcGxhdGUuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIERpSGVscEZhcUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgYXJ0aWNsZXM6IElBcnRpY2xlQ2xpZW50RHRvW107XHJcblxyXG4gICAgcHJpdmF0ZSBfc2l0ZUlkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGFsbEFydGljbGVzOiBJQXJ0aWNsZUNsaWVudER0b1tdO1xyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBnZXQgc2l0ZUlkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpdGVJZDtcclxuICAgIH1cclxuICAgIHNldCBzaXRlSWQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl9zaXRlSWQgPT09IHZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX3NpdGVJZCA9IHZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5kaUhlbHBTZXJ2aWNlLmdldEZhcUJ5U2l0ZUlkKHZhbHVlKS5zdWJzY3JpYmUoYXJ0aWNsZXMgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFsbEFydGljbGVzID0gYXJ0aWNsZXM7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcclxuICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsQXJ0aWNsZXMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5RmlsdGVyKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkaUhlbHBTZXJ2aWNlOiBEaUhlbHBTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2l0ZUlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlIZWxwU2VydmljZS5nZXRGYXFCeVNpdGVVcmwobG9jYXRpb24ub3JpZ2luKS5zdWJzY3JpYmUoYXJ0aWNsZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxBcnRpY2xlcyA9IGFydGljbGVzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUZpbHRlcigpO1xyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEFydGljbGVzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5RmlsdGVyKGZpbHRlcjogc3RyaW5nID0gJycpIHtcclxuICAgICAgICBpZiAoZmlsdGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gZmlsdGVyLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJ0aWNsZXMgPSB0aGlzLmFsbEFydGljbGVzLmZpbHRlcihhID0+XHJcbiAgICAgICAgICAgICAgICBhLk5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSlcclxuICAgICAgICAgICAgICAgIHx8IGEuU2hvcnRUZXh0LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpXHJcbiAgICAgICAgICAgICAgICB8fCAoYS5EaUhlbHBGaWxlcyAmJiBhLkRpSGVscEZpbGVzLnNvbWUoZiA9PiBmLk5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSkpKVxyXG4gICAgICAgICAgICAgICAgfHwgKGEuTGlua3MgJiYgYS5MaW5rcy5zb21lKGwgPT4gbC5OYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpKSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXJ0aWNsZXMgPSB0aGlzLmFsbEFydGljbGVzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=