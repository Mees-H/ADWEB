import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoekjesComponentArchived } from './boekjes-archived.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BoekjesComponent', () => {
  let component: BoekjesComponentArchived;
  let fixture: ComponentFixture<BoekjesComponentArchived>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoekjesComponentArchived],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule]
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
