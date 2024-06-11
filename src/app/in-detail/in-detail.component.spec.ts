import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InDetailComponent } from './in-detail.component';
import { RouterModule } from '@angular/router';

describe('InDetailComponent', () => {
  let component: InDetailComponent;
  let fixture: ComponentFixture<InDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InDetailComponent],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
