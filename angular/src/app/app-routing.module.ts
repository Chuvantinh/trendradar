import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./modules/login/login.component";
import {HomeComponent} from "./pages/home/home.component";
import {ServicesComponent} from "./pages/services/services.component";
import {AboutComponent} from "./shared/about/about.component";
import {ListtrendsComponent} from "./pages/listtrends/listtrends.component";
import {TrendradarComponent} from "./pages/trendradar/trendradar.component";
import {PortfolioComponent} from "./pages/portfolio/portfolio.component";
import {RoadmapComponent} from "./pages/roadmap/roadmap.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'projects', component: ServicesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'listtrends', component: ListtrendsComponent},
  {path: 'trendradar', component: TrendradarComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'roadmap', component: RoadmapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
