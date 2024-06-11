import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BoekjesComponent } from './boekjes.component';
import { RouterModule } from '@angular/router';

describe('BoekjesComponent', () => {
  let component: BoekjesComponent;
  let fixture: ComponentFixture<BoekjesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoekjesComponent],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule]
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
