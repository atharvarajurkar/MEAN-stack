import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, of, Subject, take, tap } from 'rxjs';
import { User } from '../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseURL: string = "http://localhost:5566/api/v1/auth/"
  private readonly CHECK_EMAIL: string = "check-email"
  private readonly SIGNIN: string = "signin"
  private readonly SIGNUP: string = "signup"
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  currentUser$: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null)
  currentUserObs$: Observable<User|null> = this.currentUser$.asObservable()
  constructor(private http: HttpClient) { }

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

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.baseURL + this.SIGNIN, {
      ...credentials
    }).pipe(
      map((data: any) => {
        const user: User = {
          ...credentials, ...data,
          token: data['accessToken'].split(" ")[1]
        }
        this.currentUser$.next(user)
        return user
      }),
      catchError(err => {
        throw new Error(err.error.errMsg)
      }),
      take(1)
    )
  }

  signup(credentials: any): Observable<any> {
    return this.http.post<any>(this.baseURL + this.SIGNUP, {
      ...credentials
    }).pipe(
      map((data: any) => {
        const user: User = {
          ...credentials, ...data,
          token: data['accessToken'].split(" ")[1]
        }
        this.currentUser$.next(user)
        return user
      }),
      catchError(err => {
        throw new Error(err.error)
      }),
      take(1)
    )
  }
}
