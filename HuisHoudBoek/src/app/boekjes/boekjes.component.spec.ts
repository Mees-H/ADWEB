import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekjesComponent } from './boekjes.component';

describe('BoekjesComponent', () => {
  let component: BoekjesComponent;
  let fixture: ComponentFixture<BoekjesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoekjesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoekjesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
