import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRepetiteur } from './dashboard-repetiteur';

describe('DashboardRepetiteur', () => {
  let component: DashboardRepetiteur;
  let fixture: ComponentFixture<DashboardRepetiteur>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRepetiteur],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardRepetiteur);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
