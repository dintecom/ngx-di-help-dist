import { DiHelpFileClientDto } from './di-help-file-client-dto';
import { LinkClientDto } from './link-client-dto';
export interface IArticleClientDto {
    Id: number;
    Name: string;
    ShortText: string;
    DiHelpFiles: DiHelpFileClientDto[];
    Links: LinkClientDto[];
}
export declare class ArticleClientDto implements IArticleClientDto {
    Id: number;
    Name: string;
    ShortText: string;
    DiHelpFiles: DiHelpFileClientDto[];
    Links: LinkClientDto[];
}
