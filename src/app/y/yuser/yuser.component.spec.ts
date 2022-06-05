import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YuserComponent } from './yuser.component';

describe('YuserComponent', () => {
  let component: YuserComponent;
  let fixture: ComponentFixture<YuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
