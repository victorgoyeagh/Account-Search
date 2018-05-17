import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class AccountSearchService {
    private searchUrl: string = environment.api.search;

    constructor(
        private _http: Http
    ) {
    }

    SearchAccounts() {
        return this._http.get(this.searchUrl);
    }

}
