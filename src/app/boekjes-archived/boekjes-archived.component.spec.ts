import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BoekjesComponentArchived } from './boekjes-archived.component'
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { of } from 'rxjs';
import { ErrorComponent } from '../error/error.component';

describe('BoekjesComponentArchived', () => {
  let component: BoekjesComponentArchived;
  let fixture: ComponentFixture<BoekjesComponentArchived>;
  let authService: AuthService;

  const mockAuthService = {
    user$: of(null),
    register: (email: string, password: string) => of({}),
    login: (email: string, password: string) => of({}),
    logout: () => of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoekjesComponentArchived],
      imports: [
        ErrorComponent,
        RouterModule.forRoot([]), 
        HttpClientTestingModule,
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
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoekjesComponentArchived);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});