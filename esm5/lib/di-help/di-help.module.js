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
    return DiHelpModule;
}());
export { DiHelpModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGktaGVscC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZGktaGVscC8iLCJzb3VyY2VzIjpbImxpYi9kaS1oZWxwL2RpLWhlbHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25GLE9BQU8sRUFBZ0IsaUJBQWlCLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV0RDtJQUFBO0lBOEJBLENBQUM7Ozs7O0lBakJVLG9CQUFPOzs7O0lBQWQsVUFBZSxNQUFvQjtRQUMvQixPQUFPO1lBQ0gsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNQLE1BQU0sQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO2dCQUMxRTtvQkFDSSxPQUFPLEVBQUUsaUJBQWlCO29CQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLFNBQVM7aUJBQzdCO2dCQUNEO29CQUNJLE9BQU8sRUFBRSw0QkFBNEI7b0JBQ3JDLFFBQVEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CO2lCQUN4RztnQkFDRCxhQUFhO2FBQ2hCO1NBQ0osQ0FBQztJQUNOLENBQUM7O2dCQTdCSixRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osZUFBZTtxQkFDbEI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLGVBQWU7cUJBQ2xCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxlQUFlO3FCQUNsQjtpQkFDSjs7SUFtQkQsbUJBQUM7Q0FBQSxBQTlCRCxJQThCQztTQWxCWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hQb3BwZXJNb2R1bGUgfSBmcm9tICduZ3gtcG9wcGVyJztcbmltcG9ydCB7IERpSGVscENvbXBvbmVudCB9IGZyb20gJy4vZGktaGVscC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGlIZWxwU2VydmljZSwgY2FjaGVMaWZldGltZVNlY29uZERlZmF1bHQgfSBmcm9tICcuLi9hcGkvZGktaGVscC5zZXJ2aWNlJztcbmltcG9ydCB7IERpSGVscENvbmZpZywgRElfSEVMUF9VUkxfVE9LRU4sIERJX0hFTFBfQ0FDSEVfTElGRVRJTUVfVE9LRU4gfSBmcm9tICcuLi9kaS1oZWxwLmNvbmZpZyc7XG5pbXBvcnQgeyBEaUhlbHBVcmxSZXNvbHZlciB9IGZyb20gJy4uL2RpLWhlbHAuY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgTmd4UG9wcGVyTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgRGlIZWxwQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIERpSGVscENvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRGlIZWxwTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChjb25maWc6IERpSGVscENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IERpSGVscE1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAgICAgIGNvbmZpZy5kaUhlbHBVcmxSZXNvbHZlciB8fCB7IHByb3ZpZGU6IERpSGVscFVybFJlc29sdmVyLCB1c2VWYWx1ZTogbnVsbCB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvdmlkZTogRElfSEVMUF9VUkxfVE9LRU4sXG4gICAgICAgICAgICAgICAgICAgIHVzZVZhbHVlOiBjb25maWcuZGlIZWxwVXJsLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBESV9IRUxQX0NBQ0hFX0xJRkVUSU1FX1RPS0VOLFxuICAgICAgICAgICAgICAgICAgICB1c2VWYWx1ZTogaXNOYU4oY29uZmlnLmNhY2hlTGlmZXRpbWVTZWNvbmQpID8gY2FjaGVMaWZldGltZVNlY29uZERlZmF1bHQgOiBjb25maWcuY2FjaGVMaWZldGltZVNlY29uZCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIERpSGVscFNlcnZpY2VcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG59XG4iXX0=