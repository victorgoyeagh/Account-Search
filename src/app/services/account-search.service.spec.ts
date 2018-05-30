import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Http, HttpModule, ConnectionBackend } from '@angular/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountSearchService } from "./account-search.service";
import { ISearchResult, IContentItemStatus, IIdentifiers, ISearchResultContentItem } from './../entities/search.entity';
import { AsyncAction } from "rxjs/internal/scheduler/AsyncAction";
import { environment } from './../../environments/environment';


describe("AccountSearchService", () => {
    let service: AccountSearchService;
    let httpMock: HttpTestingController;
    let originalTimeout: number;
    let beConnection: ConnectionBackend;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [AccountSearchService, Http, ConnectionBackend, HttpTestingController]
        })
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it("provider works", () => {
        service = TestBed.get(AccountSearchService);
        expect((<any>service)["searchUrl"]).toBeDefined;
        expect(service).toBeTruthy();
    })

    it("should get accounts via api successfully", () => {

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
        }


        //beConnection = TestBed.get(ConnectionBackend);
        //beConnection.createConnection(environment.api.search);

        service = TestBed.get(AccountSearchService);
        let httpClientSpy: { get: jasmine.Spy };
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        httpClientSpy.get.and.returnValue((testAccounts));

       
        service.SearchAccounts().subscribe((response) => {
            
            expect(response.json()).toBeDefined;      
            expect((<ISearchResult>response.json())).toEqual(testAccounts);
            
        })
 /*
        httpMock = TestBed.get(HttpTestingController);
        */

    })

})
