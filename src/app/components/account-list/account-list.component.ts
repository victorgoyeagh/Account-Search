import { Component, OnInit, OnChanges, Input, SimpleChanges, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { Response } from '@angular/http';
import { AccountSearchService } from './../../services/account-search.service';
import { ISearchResult, ISearchResultContentItem, IContentItemStatus } from './../../entities/search.entity';
import { SortByPipe } from './../../pipes/sort.pipe';
import { FilterPipe } from './../../pipes/filter.pipe';
import { CapitalisePipe } from './../../pipes/capitalise.pipe';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.scss'],
    inputs: ['inputSearchTerm']
})
export class AccountListComponent implements OnInit, OnChanges, OnDestroy {
    private searchTerm: string = undefined;
    private result: Array<any>;
    private sortByParam: string = "name";
    private subs: Subscription;
    private searchResults: ISearchResult = undefined;
    private accountsCollection: Array<ISearchResultContentItem> = undefined;

    @Input() private set inputSearchTerm(value: string) {
        this.searchTerm = value;
    }

    constructor(
        private _accountSearchService: AccountSearchService
    ) {

    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes.inputSearchTerm.firstChange) {

            let curValue = changes.inputSearchTerm.currentValue;

            this.subs = this._accountSearchService.SearchAccounts()
                .subscribe((response: Response) => {

                    if (response.status == 200) {
                        this.searchResults = <ISearchResult>response.json(); 
                        this.accountsCollection = <Array<ISearchResultContentItem>>this.searchResults.content;
                    }
                }
            )
        }
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
