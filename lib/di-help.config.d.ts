import { Provider, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
export declare abstract class DiHelpUrlResolver {
    abstract resolve(): string | Observable<string>;
}
export interface DiHelpConfig {
    diHelpUrl?: string;
    diHelpUrlResolver?: Provider;
    cacheLifetimeSecond?: number;
}
export declare const DI_HELP_URL_TOKEN: InjectionToken<string>;
export declare const DI_HELP_CACHE_LIFETIME_TOKEN: InjectionToken<string>;
