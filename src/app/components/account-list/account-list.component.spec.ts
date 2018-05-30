import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AccountListComponent } from './account-list.component';
import { DebugElement, SimpleChange, SimpleChanges } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SortByPipe } from './../../pipes/sort.pipe';
import { FilterPipe } from './../../pipes/filter.pipe';
import { CapitalisePipe } from './../../pipes/capitalise.pipe';
import { Http, HttpModule } from '@angular/http';
import { AccountSearchService } from '../../services/account-search.service';
import { ISearchResult, IContentItemStatus, IIdentifiers, ISearchResultContentItem } from './../../entities/search.entity';
import * as Rx from 'rxjs';

describe("AccountListComponent", () => {
    let component: AccountListComponent;
    let fixture: ComponentFixture<AccountListComponent>;
    let debEl: DebugElement;
    let originalTimeout: number = undefined;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                AccountListComponent, CapitalisePipe, SortByPipe, FilterPipe
            ],
            imports: [HttpModule],
            providers: [AccountSearchService]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountListComponent);
        component = fixture.componentInstance;
        debEl = fixture.debugElement;

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("should initialise the component", () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        });
    })

    it("should show accounts-list__noData block without data", () => {

        expect((<any>component).searchResults).toBeUndefined;

        fixture.detectChanges();

        //test initial instruction text
        let alEl = debEl.query(By.css(".accounts-list"));
        let withoutDataBlock = <HTMLDivElement>alEl.nativeElement.querySelector("p");
        expect(withoutDataBlock.textContent).toEqual((<any>component).initialText);
    })

    xit("Show accounts-list__withData block with passed in data", () => {

        let alEl = debEl.query(By.css(".accounts-list"));
        let withDataBlock = <HTMLDivElement>alEl.nativeElement.querySelector("#accountsListWithData");

        expect((<any>component).searchTerm).toBeUndefined;
        expect(withDataBlock).toBeUndefined;

        const testAccounts = <ISearchResult>{
            content: <Array<ISearchResultContentItem>>[
                {
                    id: "A02017NU",
                    name: "1010 SOFTWARE LTD",
                    balance: "46.91",
                    currency: "GBP",
                    status: IContentItemStatus.ACTIVE,
                    identifiers: <Array<IIdentifiers>>[
                        {
                            type: "SCAN",
                            accountNumber: "00001232",
                            sortCode: "000000"
                        }
                    ],
                    customerId: "C0200098",
                    externalReference: "Account 1"
                }
            ],
            page: 0,
            size: 15,
            totalPages: 407,
            totalSize: 60960944
        };

        component.inputSearchTerm = "software";

        const inputSearchTerm = <SimpleChange>{
            currentValue: "software",
            firstChange: false,
            previousValue: undefined
        }

        const _accountService = TestBed.get(AccountSearchService);
        const searchAccountsSpy = jasmine.createSpy("_accountService", _accountService.SearchAccounts)
            .and.returnValue(
                Rx.Observable.create({
                    status: 200,
                    json: () => testAccounts
                })
            );

        component.ngOnChanges({ inputSearchTerm });
        fixture.checkNoChanges();
        fixture.detectChanges();

        expect(searchAccountsSpy).toHaveBeenCalled();


    })


})