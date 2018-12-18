import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventosComponent } from './dashboard-eventos.component';

describe('DashboardEventosComponent', () => {
  let component: DashboardEventosComponent;
  let fixture: ComponentFixture<DashboardEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
