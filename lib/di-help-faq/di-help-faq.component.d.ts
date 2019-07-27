import { OnInit } from '@angular/core';
import { IArticleClientDto } from '../api/article-client-dto';
import { DiHelpService } from '../api/di-help.service';
export declare class DiHelpFaqComponent implements OnInit {
    private readonly diHelpService;
    articles: IArticleClientDto[];
    private _siteId;
    private allArticles;
    siteId: number;
    constructor(diHelpService: DiHelpService);
    ngOnInit(): void;
    applyFilter(filter?: string): void;
}
