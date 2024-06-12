import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoekjeDetailComponent } from './boekje-detail.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BoekjeService } from '../services/boekje.service';
import { AuthService } from '../services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { of } from 'rxjs';

describe('BoekjeDetailComponent', () => {
  let component: BoekjeDetailComponent;
  let fixture: ComponentFixture<BoekjeDetailComponent>;

  const mockAuthService = {
    user$: of(null),
    register: (email: string, password: string) => of({}),
    login: (email: string, password: string) => of({}),
    logout: () => of({})
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoekjeDetailComponent],
      imports: [
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
        BoekjeService,
        { provide: AuthService, useValue: mockAuthService },
        provideAuth(() => getAuth())
      ]
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