# ngx-di-help

## Install

- `npm install dintecom/ngx-di-help-dist#v0.0.4`
- install `npm install ngx-popper` - peer dependencies of ngx-di-help

## Setup

You'll need to add `DiHelpModule` and [`ngx-popper`](https://github.com/MrFrankel/ngx-popper#ngx-popper) to your application module and confugure DiHelp HTTP address.

```typescript
import { NgxPopperModule } from 'ngx-popper';
import { DiHelpModule } from 'ngx-di-help';
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxPopperModule.forRoot(),
    DiHelpModule.forRoot({
        diHelpUrl: 'https://dihelp.example.com'
    }),
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Configure DiHelp address resolver

```typescript
import { DiHelpModule, DiHelpUrlResolver } from 'ngx-di-help';
...

export class CustomDiHelpUrlResolver implements DiHelpUrlResolver {
    constructor(private readonly config: ConfigService) { }

    resolve(): string {
        return this.config.getDiHelpUrl();
    }

    // Or use Observable
    resolve(): Observable<string> {
        return this.config.getDiHelpUrlAsync();
    }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxPopperModule.forRoot(),
    DiHelpModule.forRoot({
        diHelpUrlResolver: {
            provide: DiHelpUrlResolver,
            useClass: CustomDiHelpUrlResolver,
            deps: [ConfigService]
        }
    }),
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Configure cache lifetime

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxPopperModule.forRoot(),
    DiHelpModule.forRoot({
        cacheLifetimeSecond: 10 * 60, // 10 minutes
        ...
    }),
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### SharedModule

If you use a [`SharedModule`](https://angular.io/guide/sharing-ngmodules) that you import in multiple other feature modules,
you can export the `DiHelpModule` to make sure you don't have to import it in every module.

```typescript
@NgModule({
    exports: [
        CommonModule,
        DiHelpModule
    ]
})
export class SharedModule { }
```

> Note: Never call a `forRoot` static method in the `SharedModule`.

## Usage

```html
<di-help articleId="1"></di-help>
<di-help articleUid="article-uid"></di-help>
<di-help [byLocation]="true"></di-help>
```

## Options

| Name          | Type    | Description                                                                                   |Default|
|---------------|---------|-----------------------------------------------------------------------------------------------|-------|
| articleId     | @Input  | Get article by ID.                                                                            | null  |
| articleUid    | @Input  | Get article by UID.                                                                           | null  |
| byLocation    | @Input  | Get article by current page URL. Automatic subscribe on router NavigationEnd event.           | false |
| alwaysVisible | @Input  | Show dimmed if the article failed to load.                                                    | true  |
| inline        | @Input  | Automatically sizing the icon to match the font size of the element the icon is contained in. | false |

## FAQ Generator

```typescript
import { DiHelpFaqModule } from 'ngx-di-help';

@NgModule({
    exports: [
        ...
        DiHelpFaqModule
    ]
})
export class AppModule { }
```

```html
<di-help-faq></di-help-faq>
<di-help-faq [siteId]="1"></di-help-faq>
```

## FAQ Options

| Name   | Type    | Description                                                        |Default|
|--------|---------|--------------------------------------------------------------------|-------|
| siteId | @Input  | Get FAQ by site ID. If not specified, get to current location URL. | null  |

## Build

Run `npm run build:ngx-di-help` to build the project. The build artifacts will be stored in the `dist/` directory.
