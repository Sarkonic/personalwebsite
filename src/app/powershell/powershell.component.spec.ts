import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowershellComponent } from './powershell.component';

describe('PowershellComponent', () => {
  let component: PowershellComponent;
  let fixture: ComponentFixture<PowershellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowershellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowershellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
