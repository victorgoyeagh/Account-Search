import { Component, OnInit, AfterViewInit, OnDestroy, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { debounceTime, map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-account-search',
    templateUrl: './account-search.component.html',
    styleUrls: ['./account-search.component.scss'],
    outputs: ['outputSearchTerm']
})
export class AccountSearchComponent implements OnInit, OnDestroy, AfterViewInit {
    private subs: Subscription;
    private searchTerm: string;
    private performDynamicSearch: boolean = false;
    private fmSearchPanel = new FormGroup({
        txtSearch: new FormControl('')
    })

    @Output() outputSearchTerm = new EventEmitter<any>();
    @ViewChild("txtSearch") txtSearch: ElementRef;
    @ViewChild("dynamicSearch") dynamicSearch: ElementRef;

    constructor(
    ) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {

        this.subs = fromEvent(<HTMLInputElement>this.txtSearch.nativeElement, "input")
            .pipe(
                map(
                    (event: Event) => (<HTMLInputElement>event.target).value
                ),
                debounceTime(800)
            )
            .subscribe((value: string) => {
                if (!this.performDynamicSearch) {
                    this.searchTerm = value;
                } else {
                    //for dynamic search
                    this.outputSearchTerm.emit(value);
                }
            }
        )
    }

    PerformSearch() {
        this.outputSearchTerm.emit(this.searchTerm);
    }

    UpdateDynamicSearch() {
        this.performDynamicSearch = !this.performDynamicSearch;
    }

    ngOnDestroy(): void {

        this.subs.unsubscribe();
    }

}
