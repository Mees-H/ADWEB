import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { InComponent } from './in.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ErrorComponent } from '../error/error.component';

describe('InComponent', () => {
  let component: InComponent;
  let fixture: ComponentFixture<InComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InComponent],
      imports: [ErrorComponent, RouterModule.forRoot([]), HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
