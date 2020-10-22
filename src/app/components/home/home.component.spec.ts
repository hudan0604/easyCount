import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkDirectiveStub } from 'src/app/testing/router-link-directive-stub';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let elem: any;
  let linkDes: any;
  let routerLink: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, RouterLinkDirectiveStub ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    elem = fixture.nativeElement;
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
    routerLink = linkDes.map((de: DebugElement) => de.injector.get(RouterLinkDirectiveStub));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' The home component should contain an h1 tag !"', () => {
    const title = elem.querySelector('h1');
    expect(title).toBeTruthy();
  });

  it('The title of the home component should be "Welcome on EasyCount !"', () => {
    const title = elem.querySelector('h1');
    expect(title.textContent).toBe('Welcome to EasyCount !');
  });

  it('The goal of the app must be : EasyCount helps you and your friends easily manage your common expenses', () => {
    const descDiv = elem.querySelector('div .desc-div');
    expect(descDiv.textContent).toBe('EasyCount helps you and your friends easily manage your common expenses');
  });

  it('can get RouterLink', () => {
    expect(routerLink.length).toBe(1, 'should have 1 routerLink');
    expect(routerLink[0].linkParams).toBe('/create-dashboard');
  });

  it('can click create dashboard link in template', () => {
    const createDashboardLinkDe = linkDes[0];    // create dashboard link DebugElement
    const createDashboardLink = routerLink[0];  // create dashboard link directive

    expect(createDashboardLink.navigatedTo).toBeNull('should not have navigated yet');

    createDashboardLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(createDashboardLink.navigatedTo).toBe('/create-dashboard');
  });
});
