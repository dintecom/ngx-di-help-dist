import { DiHelpFileClientDto } from './di-help-file-client-dto';
import { LinkClientDto } from './link-client-dto';
export interface IArticleClientDto {
    Id: number;
    Uid: string;
    Name: string;
    ShortText: string;
    DiHelpFiles: DiHelpFileClientDto[];
    Links: LinkClientDto[];
}
export declare class ArticleClientDto implements IArticleClientDto {
    Id: number;
    Uid: string;
    Name: string;
    ShortText: string;
    DiHelpFiles: DiHelpFileClientDto[];
    Links: LinkClientDto[];
}
