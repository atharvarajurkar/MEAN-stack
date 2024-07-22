import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, of, Subject, take, tap } from 'rxjs';
import { User } from '../../shared/interfaces/user';
import { AuthDTO } from '../../shared/interfaces/authDTO';
import { Credentials } from '../../shared/interfaces/credentialInfo';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly baseURL: string = "http://localhost:5566/api/v1/auth/"
  private readonly CHECK_EMAIL: string = "check-email"
  private readonly SIGNIN: string = "signin"
  private readonly SIGNUP: string = "signup"
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  currentUserObs$: Observable<User | null> = this.currentUser$.asObservable()
  constructor(private http: HttpClient, private router: Router) { }
  private jwtHelper = new JwtHelperService();
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.post<any>(this.baseURL + this.CHECK_EMAIL, {
      "email": email
    }).pipe(
      take(1)
    )
  }

  checkEmailValidator(shouldExist: boolean): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkEmailExists(control.value)
        .pipe(
          map((data: boolean) => {
            if (shouldExist) {
              return !data ? { emailDoesNotExist: true } : null
            } else {
              return data ? { emailExists: true } : null
            }
          })
        )
    }
  }

  refreshToken(): Observable<AuthDTO | string> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.router.navigate(['/']);
      return of('err');
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http
      .get<AuthDTO>(`${this.baseURL}/refresh-token`, { headers })
      .pipe(
        tap(({ accessToken, role }: AuthDTO) => {
          this.setUserValueByToken({ accessToken, role });
        }),
      );
  }

  private startRefreshTokenTimer(exp: string) {
    // set a timeout to refresh the token a minute before it expires
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();

    this.refreshTokenTimeout = setTimeout(() => {
      if (this.currentUser$.value) {
        this.refreshToken().subscribe();
      }
    }, timeout);
  }
  public stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  setUserValueByToken({ accessToken, role }: AuthDTO): User {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("role", role)
    const { id, username, email, exp } =
      this.jwtHelper.decodeToken(accessToken);

    const user: User = {
      ...{ id, username, email, role },
      jwtToken: accessToken,
    };
    this.currentUser$.next(user)
    this.startRefreshTokenTimer(exp);
    return user
  }


  login(credentials: Credentials): Observable<any> {
    return this.http.post<any>(this.baseURL + this.SIGNIN, {
      ...credentials
    }).pipe(
      map(({ accessToken, role }: AuthDTO) => {
        console.log("login successful", accessToken, role);
        const user = this.setUserValueByToken({ accessToken, role })
        return user
      }),
      catchError(err => {
        throw new Error(err.error.errMsg)
      }),
      take(1)
    )
  }

  isUserLoggedIn() {
    return localStorage.getItem("accessToken") ? true : false
  }

  getUserRole(): string | undefined {
    return this.currentUser$.value?.role
  }

  signup(credentials: any): Observable<any> {
    return this.http.post<any>(this.baseURL + this.SIGNUP, {
      ...credentials
    }).pipe(
      map(({ accessToken, role }: AuthDTO) => {
        console.log("sign-up successful", accessToken, role);
        const user = this.setUserValueByToken({ accessToken, role })
        return user
      }),
      catchError(err => {
        throw new Error(err.error)
      }),
      take(1)
    )
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role');
    this.currentUser$.next(null)
    this.stopRefreshTokenTimer();
  }
}
