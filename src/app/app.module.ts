import { BrowserModule } from "@angular/platform-browser";
import { Http, HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AccountSearchComponent } from "./components/account-search/account-search.component";
import { AccountSearchService } from "src/app/services/account-search.service";
import { AccountListComponent } from './components/account-list/account-list.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SortByPipe } from './pipes/sort.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { CapitalisePipe } from './pipes/capitalise.pipe';

@NgModule({
  declarations: [AppComponent, AccountSearchComponent, AccountListComponent, NavigationComponent, HeaderComponent, FooterComponent, SortByPipe, FilterPipe, CapitalisePipe],
  imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule],
  providers: [AccountSearchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
