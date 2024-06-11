import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekjeDetailComponent } from './boekje-detail.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BoekjeDetailComponent', () => {
  let component: BoekjeDetailComponent;
  let fixture: ComponentFixture<BoekjeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoekjeDetailComponent],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule]
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
