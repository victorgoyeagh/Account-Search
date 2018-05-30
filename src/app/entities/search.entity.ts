

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
        customerId: string,
        externalReference: string
}

export interface IIdentifiers {
    type: string,
    accountNumber: string,
    sortCode: string
}

export enum IContentItemStatus {
    ACTIVE = <any>"ACTIVE",
    INACTIVE = <any>"INACTIVE"
}