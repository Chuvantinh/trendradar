import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './shared/menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ServicesComponent } from './pages/services/services.component';
import { AboutComponent } from './shared/about/about.component';
import { SliderComponent } from './shared/home_child/slider/slider.component';
import { PartnerComponent } from './shared/home_child/partner/partner.component';
import { IntroductionComponent } from './shared/home_child/introduction/introduction.component';
import { CustomerCommentsComponent } from './shared/home_child/customer-comments/customer-comments.component';
import { NewsComponent } from './shared/home_child/news/news.component';
import { NewlesterComponent } from './shared/home_child/newlester/newlester.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenudownComponent } from './shared/menudown/menudown.component';
import { FooterCopyrightComponent } from './shared/footer-copyright/footer-copyright.component';
import { MatGridListModule} from "@angular/material/grid-list";
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatMenuModule} from "@angular/material/menu";

//bootstrap: https://valor-software.com/ngx-bootstrap/#/documentation
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {A11yModule} from "@angular/cdk/a11y";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

// state management
import { StoreModule, MetaReducer } from '@ngrx/store';
import { ScrolltopComponent } from './shared/generell-component/scrolltop/scrolltop.component';

// toast notification
import { ToastrModule } from 'ngx-toastr';
import {AuthService} from "./services/auth";
import {A} from "@angular/cdk/keycodes";
// NgRx
import { Authreducer} from "./store/reducers/auth.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./store/effects/auth.effects";
import { StoreDevtoolsModule} from "@ngrx/store-devtools";

import { metaReducers, reducers} from "./store/app.states";
import { TrendradarComponent } from './pages/trendradar/trendradar.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { ListtrendsComponent } from './pages/listtrends/listtrends.component';
import {GraphQLModule} from "./graphql.module";
import { TrendDetailComponent } from './pages/trend-detail/trend-detail.component';
import { TrendAddOneComponent } from './pages/trend-add-one/trend-add-one.component';
// tool tip
import { TooltipModule} from "ngx-bootstrap/tooltip";
// fire storage
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import {HttpLinkModule} from 'apollo-angular-link-http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    ServicesComponent,
    AboutComponent,
    SliderComponent,
    PartnerComponent,
    IntroductionComponent,
    CustomerCommentsComponent,
    NewsComponent,
    NewlesterComponent,
    FooterComponent,
    MenudownComponent,
    FooterCopyrightComponent,
    ScrolltopComponent,
    TrendradarComponent,
    PortfolioComponent,
    RoadmapComponent,
    ListtrendsComponent,
    TrendDetailComponent,
    TrendAddOneComponent
  ],
  exports: [
    MatSidenavModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatMenuModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      //logOnly: environment.production, // Restrict extension to log-only mode
    }),
    EffectsModule.forRoot([AuthEffects]),
    CarouselModule,
    A11yModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,

    GraphQLModule,
    TooltipModule.forRoot(),

    AngularFireModule.initializeApp(environment.firebaseConfig, 'cloud'),
    AngularFireDatabaseModule,
    AngularFireStorageModule,

    HttpClientModule,
    HttpLinkModule,

  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
