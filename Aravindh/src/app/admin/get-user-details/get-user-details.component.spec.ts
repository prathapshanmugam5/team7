import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetUserDetailsComponent } from './get-user-details.component';

describe('GetUserDetailsComponent', () => {
  let component: GetUserDetailsComponent;
  let fixture: ComponentFixture<GetUserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetUserDetailsComponent]
    });
    fixture = TestBed.createComponent(GetUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
