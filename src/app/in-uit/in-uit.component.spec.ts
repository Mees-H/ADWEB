import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { InUitComponent } from './in-uit.component';

describe('InUitComponent', () => {
  let component: InUitComponent;
  let fixture: ComponentFixture<InUitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InUitComponent],
      imports: [RouterModule.forRoot([]), HttpClientTestingModule]
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
