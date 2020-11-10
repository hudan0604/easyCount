import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OpenAnimationService } from '../shared/services/open-animation.service';

@Component({
  selector: 'easy-dashboards-list',
  templateUrl: './dashboards-list.component.html',
  styleUrls: ['./dashboards-list.component.scss'],
  animations: [
    trigger('reduceWidth', [
      // ...
      state('reduce', style({
        width: '30%',
      })),
      transition('* => reduce', animate('0.4s')
      ),
    ]),
  ],
})
export class DashboardsListComponent implements OnInit, OnDestroy {
  dashboards: any = [{
  }];
  animationSub: Subscription;
  reduce = false;

  @HostBinding('@reduceWidth') get reduceWidth(): string {
    return this.reduce ? 'reduce' : '';
  }

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardsAnimationService: OpenAnimationService
  ) { }



  /**
   * @param activityName: dashboard name
   * need it to construct a custom URL
   * and navigate to the dahsboards details component
   */
  openDetailComponent(activityName: string): void {
    this.dashboardsAnimationService.setAnimationStatus(true);
    this.router.navigate([`view/${activityName}/detail`], { relativeTo: this.route });
  }

  ngOnInit() {
    this.dashboards = this.localStorageService.getValueParsed('dashboards');
    this.animationSub = this.dashboardsAnimationService._dashboardAnimationOn
      .subscribe((status: boolean) => this.reduce = status);
  }

  ngOnDestroy() {
    this.dashboardsAnimationService.setAnimationStatus(false);
    this.animationSub.unsubscribe();
  }

}
