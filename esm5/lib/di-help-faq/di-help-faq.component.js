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
                    template: "<input type=\"search\"\n       class=\"form-control\"\n       (input)=\"applyFilter($event.target.value)\"\n       name=\"article-search\"\n       placeholder=\"Search...\"\n       autocomplete=\"off\">\n\n<div class=\"d-block mt-3\" *ngFor=\"let article of articles; let last = last\">\n    <h4>{{article.Name}}</h4>\n    <div class=\"d-block\" [innerHtml]=\"article.ShortText\"></div>\n    <div class=\"mt-3\" *ngIf=\"article.DiHelpFiles\">\n        <a class=\"d-block mt-1\" *ngFor=\"let file of article.DiHelpFiles\" [href]=\"file.Url\" target=\"_blank\">{{file.Name}}</a>\n    </div>\n    <div class=\"mt-3\" *ngIf=\"article.Links\">\n        <a class=\"d-block mt-1\" *ngFor=\"let link of article.Links\" [href]=\"link.Url\" target=\"_blank\">{{link.Name}}</a>\n    </div>\n    <hr class=\"mt-3\" *ngIf=\"!last\"/>\n</div>\n"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC1mYXEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWRpLWhlbHAvIiwic291cmNlcyI6WyJsaWIvZGktaGVscC1mYXEvZGktaGVscC1mYXEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUV6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQ7SUE4QkksNEJBQTZCLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUksQ0FBQztJQW5COUQsc0JBQ0ksc0NBQU07Ozs7UUFEVjtZQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7OztRQUNELFVBQVcsS0FBYTtZQUF4QixpQkFhQztZQVpHLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLO2dCQUFFLE9BQU87WUFFbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTOzs7O1lBQUMsVUFBQSxRQUFRO2dCQUN2RCxLQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztnQkFDNUIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3ZCLENBQUM7OztZQUFFO2dCQUNDLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDOzs7T0FkQTs7OztJQWtCRCxxQ0FBUTs7O0lBQVI7UUFBQSxpQkFVQztRQVRHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLFFBQVE7Z0JBQ2xFLEtBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDO2dCQUM1QixLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkIsQ0FBQzs7O1lBQUU7Z0JBQ0MsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QixDQUFDLEVBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQzs7Ozs7SUFFRCx3Q0FBVzs7OztJQUFYLFVBQVksTUFBbUI7UUFBbkIsdUJBQUEsRUFBQSxXQUFtQjtRQUMzQixJQUFJLE1BQU0sRUFBRTs7Z0JBQ0YsT0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07Ozs7WUFBQyxVQUFBLENBQUM7Z0JBQ3JDLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBSyxDQUFDO3VCQUNqQyxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFLLENBQUM7dUJBQ3pDLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUk7Ozs7b0JBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFLLENBQUMsRUFBcEMsQ0FBb0MsRUFBQyxDQUFDO3VCQUNoRixDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJOzs7O29CQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBSyxDQUFDLEVBQXBDLENBQW9DLEVBQUMsQ0FBQztZQUh2RSxDQUd1RSxFQUFDLENBQUM7U0FDaEY7YUFBTTtZQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNwQztJQUNMLENBQUM7O2dCQXZESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLDAwQkFBMEM7aUJBQzdDOzs7O2dCQUxRLGFBQWE7Ozt5QkFhakIsS0FBSzs7SUE2Q1YseUJBQUM7Q0FBQSxBQXhERCxJQXdEQztTQXBEWSxrQkFBa0I7OztJQUUzQixzQ0FBOEI7Ozs7O0lBRTlCLHFDQUF3Qjs7Ozs7SUFDeEIseUNBQXlDOzs7OztJQXFCN0IsMkNBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQXJ0aWNsZUNsaWVudER0byB9IGZyb20gJy4uL2FwaS9hcnRpY2xlLWNsaWVudC1kdG8nO1xuaW1wb3J0IHsgRGlIZWxwU2VydmljZSB9IGZyb20gJy4uL2FwaS9kaS1oZWxwLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2RpLWhlbHAtZmFxJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZGktaGVscC1mYXEudGVtcGxhdGUuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgRGlIZWxwRmFxQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIGFydGljbGVzOiBJQXJ0aWNsZUNsaWVudER0b1tdO1xuXG4gICAgcHJpdmF0ZSBfc2l0ZUlkOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBhbGxBcnRpY2xlczogSUFydGljbGVDbGllbnREdG9bXTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHNpdGVJZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2l0ZUlkO1xuICAgIH1cbiAgICBzZXQgc2l0ZUlkKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpdGVJZCA9PT0gdmFsdWUpIHJldHVybjtcblxuICAgICAgICB0aGlzLl9zaXRlSWQgPSB2YWx1ZTtcblxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XG4gICAgICAgIHRoaXMuZGlIZWxwU2VydmljZS5nZXRGYXFCeVNpdGVJZCh2YWx1ZSkuc3Vic2NyaWJlKGFydGljbGVzID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWxsQXJ0aWNsZXMgPSBhcnRpY2xlcztcbiAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbGxBcnRpY2xlcyA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmFwcGx5RmlsdGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgZGlIZWxwU2VydmljZTogRGlIZWxwU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnNpdGVJZCkge1xuICAgICAgICAgICAgdGhpcy5kaUhlbHBTZXJ2aWNlLmdldEZhcUJ5U2l0ZVVybChsb2NhdGlvbi5vcmlnaW4pLnN1YnNjcmliZShhcnRpY2xlcyA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGxBcnRpY2xlcyA9IGFydGljbGVzO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlGaWx0ZXIoKTtcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFsbEFydGljbGVzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmFwcGx5RmlsdGVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGx5RmlsdGVyKGZpbHRlcjogc3RyaW5nID0gJycpIHtcbiAgICAgICAgaWYgKGZpbHRlcikge1xuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBmaWx0ZXIudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHRoaXMuYXJ0aWNsZXMgPSB0aGlzLmFsbEFydGljbGVzLmZpbHRlcihhID0+XG4gICAgICAgICAgICAgICAgYS5OYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkpXG4gICAgICAgICAgICAgICAgfHwgYS5TaG9ydFRleHQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSlcbiAgICAgICAgICAgICAgICB8fCAoYS5EaUhlbHBGaWxlcyAmJiBhLkRpSGVscEZpbGVzLnNvbWUoZiA9PiBmLk5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeSkpKVxuICAgICAgICAgICAgICAgIHx8IChhLkxpbmtzICYmIGEuTGlua3Muc29tZShsID0+IGwuTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHF1ZXJ5KSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXJ0aWNsZXMgPSB0aGlzLmFsbEFydGljbGVzO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19