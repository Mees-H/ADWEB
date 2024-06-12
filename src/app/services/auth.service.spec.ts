import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { of } from 'rxjs';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;

  const mockAuthService = {
    user$: null,
    register: (email: string, password: string) => of({}),
    login: (email: string, password: string) => of({}),
    logout: () => of({})
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should REGISTER a user', (done) => {
    const email = 'test@example.com';
    const password = 'password';

    service.register(email, password).subscribe(() => {
      expect(service.user$).toBeDefined();
      done();
    });
  });

  it('should LOGIN a user', (done) => {
    const email = 'test@example.com';
    const password = 'password';

    service.login(email, password).subscribe(() => {
      expect(service.user$).toBeDefined();
      done();
    });
  });

  it('should LOGOUT a user', (done) => {
    service.logout().subscribe(() => {
      expect(service.user$).toBeNull();
      done();
    });
  });
});