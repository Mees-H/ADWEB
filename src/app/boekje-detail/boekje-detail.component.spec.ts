import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekjeDetailComponent } from './boekje-detail.component';

describe('BoekjeDetailComponent', () => {
  let component: BoekjeDetailComponent;
  let fixture: ComponentFixture<BoekjeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoekjeDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoekjeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
