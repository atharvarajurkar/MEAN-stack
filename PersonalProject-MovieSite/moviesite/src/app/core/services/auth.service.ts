import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private checkEmailURL: string = "http://localhost:5566/api/v1/auth/check-email"
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  constructor(private http: HttpClient) { }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.post<any>(this.checkEmailURL, {
      "email": email
    }).pipe(
      take(1)
    )
  }

  checkEmailValidator(shouldExist:boolean): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkEmailExists(control.value)
      .pipe(
        map((data:boolean)=>{
          if (shouldExist){
            return !data ? { emailDoesNotExist: true } : null
          } else {
            return data ? { emailExists: true } : null
          }
        })
      )
    }
  }
}
