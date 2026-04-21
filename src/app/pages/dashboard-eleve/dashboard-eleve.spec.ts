import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEleve } from './dashboard-eleve';

describe('DashboardEleve', () => {
  let component: DashboardEleve;
  let fixture: ComponentFixture<DashboardEleve>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEleve],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardEleve);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
