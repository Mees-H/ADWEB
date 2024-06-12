import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { of } from 'rxjs';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let authService: AuthService;

  const mockAuthService = {
    user$: of(null),
    register: (email: string, password: string) => of({}),
    login: (email: string, password: string) => of({}),
    logout: () => of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      imports: [
        RouterModule.forRoot([]), 
        HttpClientTestingModule, 
        FormsModule,
        AngularFireModule.initializeApp({
          "projectId": "adweb-cc478",
          "appId": "1:132154462752:web:5c4c2fea7a71c9f57f2245",
          "storageBucket": "adweb-cc478.appspot.com",
          "apiKey": "AIzaSyDYxfSleOSxM9EAz1eiZRAI6h30RxC5Cm4",
          "authDomain": "adweb-cc478.firebaseapp.com",
          "messagingSenderId": "132154462752",
          "measurementId": "G-E0X9Z71VCE"
        })
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        provideAuth(() => getAuth())
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});