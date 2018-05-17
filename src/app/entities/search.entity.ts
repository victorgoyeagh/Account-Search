

export interface ISearchResult {
    content: Array<ISearchResultContentItem>,
    size: number,
    totalSize: number,
    page: number,
    totalPages: number
}

export interface ISearchResultContentItem {
        id: string,
        name: string,
        balance: string,  
        currency: string,
        status: IContentItemStatus,
        identifiers: Array<IIdentifiers>
        customerId: string
}

export interface IIdentifiers {
    type: string,
    accountNumber: number,
    sortCode: number
}

export enum IContentItemStatus {
    ACTIVE = <any>"ACTIVE",
    INACTIVE = <any>"INACTIVE"
}