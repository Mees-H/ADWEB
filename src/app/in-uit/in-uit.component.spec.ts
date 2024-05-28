import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InUitComponent } from './in-uit.component';

describe('InUitComponent', () => {
  let component: InUitComponent;
  let fixture: ComponentFixture<InUitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InUitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InUitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
