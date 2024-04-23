import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekjeSearchComponent } from './boekje-search.component';

describe('BoekjeSearchComponent', () => {
  let component: BoekjeSearchComponent;
  let fixture: ComponentFixture<BoekjeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoekjeSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoekjeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
