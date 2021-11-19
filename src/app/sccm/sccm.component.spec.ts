import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SccmComponent } from './sccm.component';

describe('SccmComponent', () => {
  let component: SccmComponent;
  let fixture: ComponentFixture<SccmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SccmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SccmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
