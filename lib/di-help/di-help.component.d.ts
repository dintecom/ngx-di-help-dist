import { OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IArticleClientDto } from '../api/article-client-dto';
import { DiHelpService } from '../api/di-help.service';
export declare class DiHelpComponent implements OnDestroy {
    private readonly diHelpService;
    private readonly router;
    private readonly changeDetector;
    article: IArticleClientDto;
    private routerEventsSubscription;
    private _articleId;
    private _articleUid;
    private _byLocation;
    articleId: number;
    articleUid: string;
    byLocation: boolean;
    alwaysVisible: boolean;
    inline: boolean;
    constructor(diHelpService: DiHelpService, router: Router, changeDetector: ChangeDetectorRef);
    ngOnDestroy(): void;
    private updateFromLocation;
}
