import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekjesComponentArchived } from './boekjes-archived.component';

describe('BoekjesComponent', () => {
  let component: BoekjesComponentArchived;
  let fixture: ComponentFixture<BoekjesComponentArchived>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoekjesComponentArchived]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoekjesComponentArchived);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
