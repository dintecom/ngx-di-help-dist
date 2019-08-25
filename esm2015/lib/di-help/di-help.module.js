/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPopperModule } from 'ngx-popper';
import { DiHelpComponent } from './di-help.component';
import { DiHelpService, cacheLifetimeSecondDefault } from '../api/di-help.service';
import { DI_HELP_URL_TOKEN, DI_HELP_CACHE_LIFETIME_TOKEN } from '../di-help.config';
import { DiHelpUrlResolver } from '../di-help.config';
export class DiHelpModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGktaGVscC8iLCJzb3VyY2VzIjpbImxpYi9kaS1oZWxwL2RpLWhlbHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25GLE9BQU8sRUFBZ0IsaUJBQWlCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQWN0RCxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFvQjtRQUMvQixPQUFPO1lBQ0gsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNQLE1BQU0sQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO2dCQUMxRTtvQkFDSSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVM7aUJBQzdCO2dCQUNEO29CQUNJLE9BQU8sRUFBRSw0QkFBNEI7b0JBQ3JDLFFBQVEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CO2lCQUN4RztnQkFDRCxhQUFhO2FBQ2hCO1NBQ0osQ0FBQztJQUNOLENBQUM7OztZQTdCSixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osZUFBZTtpQkFDbEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLGVBQWU7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxlQUFlO2lCQUNsQjthQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmd4UG9wcGVyTW9kdWxlIH0gZnJvbSAnbmd4LXBvcHBlcic7XHJcbmltcG9ydCB7IERpSGVscENvbXBvbmVudCB9IGZyb20gJy4vZGktaGVscC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBEaUhlbHBTZXJ2aWNlLCBjYWNoZUxpZmV0aW1lU2Vjb25kRGVmYXVsdCB9IGZyb20gJy4uL2FwaS9kaS1oZWxwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEaUhlbHBDb25maWcsIERJX0hFTFBfVVJMX1RPS0VOLCBESV9IRUxQX0NBQ0hFX0xJRkVUSU1FX1RPS0VOIH0gZnJvbSAnLi4vZGktaGVscC5jb25maWcnO1xyXG5pbXBvcnQgeyBEaUhlbHBVcmxSZXNvbHZlciB9IGZyb20gJy4uL2RpLWhlbHAuY29uZmlnJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE5neFBvcHBlck1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIERpSGVscENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBEaUhlbHBDb21wb25lbnRcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIERpSGVscE1vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc6IERpSGVscENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBEaUhlbHBNb2R1bGUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLmRpSGVscFVybFJlc29sdmVyIHx8IHsgcHJvdmlkZTogRGlIZWxwVXJsUmVzb2x2ZXIsIHVzZVZhbHVlOiBudWxsIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogRElfSEVMUF9VUkxfVE9LRU4sXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZy5kaUhlbHBVcmwsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6IERJX0hFTFBfQ0FDSEVfTElGRVRJTUVfVE9LRU4sXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlVmFsdWU6IGlzTmFOKGNvbmZpZy5jYWNoZUxpZmV0aW1lU2Vjb25kKSA/IGNhY2hlTGlmZXRpbWVTZWNvbmREZWZhdWx0IDogY29uZmlnLmNhY2hlTGlmZXRpbWVTZWNvbmQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgRGlIZWxwU2VydmljZVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG4iXX0=