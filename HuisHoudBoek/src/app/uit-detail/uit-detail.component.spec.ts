import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UitDetailComponent } from './uit-detail.component';

describe('UitDetailComponent', () => {
  let component: UitDetailComponent;
  let fixture: ComponentFixture<UitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UitDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
