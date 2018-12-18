
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventosComponent } from './view-eventos.component';

describe('ViewEventosComponent', () => {
  let component: ViewEventosComponent;
  let fixture: ComponentFixture<ViewEventosComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
