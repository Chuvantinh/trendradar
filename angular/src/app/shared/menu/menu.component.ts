import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../../services/auth";
import {Store} from "@ngrx/store";
import {logOut} from "../../store/actions/auth.actions";
import {MatSidenavModule} from "@angular/material/sidenav";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  isActive: boolean = false;

  isAuthenticatedState: boolean = false;
  emailUser: any = '';

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private authService: AuthService,
              private store: Store,

              ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.isAuthenticatedState = this.authService.getIsAuthenticated();
    this.emailUser = this.authService.getEmail();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  private _mobileQueryListener: () => void;

  clickEmail(){
    this.isActive = !this.isActive;
  }

  logout(){
    this.isActive = false;
    this.store.dispatch(logOut());
  }

}
