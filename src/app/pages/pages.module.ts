import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { PagesComponent } from './pages.component';
import { NbLayoutModule, NbMenuModule, NbSidebarModule, NbSelectModule, NbDatepickerModule, NbButtonModule,
        NbInputModule, NbToggleModule, NbCardModule, NbCheckboxModule, NbIconModule, NbStepperModule, NbListModule } from '@nebular/theme';

import { ChartsModule } from 'ng2-charts';
import { ChartUsersComponent } from './users/chart-users/chart-users.component';
import { UsersTotalComponent } from './users/users-total-card/users-total-card.component';
import { UsersNewVsReturningCardComponent } from './users/users-new-vs-returning-card/users-new-vs-returning-card.component';
import { AboutComponent } from './about/about.component';
import { PerformanceComponent } from './performance/performance.component';
import { ChartPageLoadingComponent } from './performance/chart-page-loading/chart-page-loading.component';
import { UrlsComponent } from './urls/urls.component';
import { ChartUrlsProportionsComponent } from './urls/chart-urls-proportions/chart-urls-proportions.component';


@NgModule({
  declarations: [
    UsersComponent,
    PagesComponent,
    ChartUsersComponent,
    UsersTotalComponent,
    UsersNewVsReturningCardComponent,
    AboutComponent,
    PerformanceComponent,
    ChartPageLoadingComponent,
    UrlsComponent,
    ChartUrlsProportionsComponent,
  ], imports: [
    CommonModule,
    PagesRoutingModule,
    ChartsModule,

    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbSelectModule,
    NbDatepickerModule,
    NbButtonModule,
    NbInputModule,
    NbToggleModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbListModule,
  ]
})
export class PagesModule { }
