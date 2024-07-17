import { Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  userLoggedIn: boolean = false
  username!: string
  sbp: Subscription = new Subscription()
  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.sbp.add(
      this.authService.currentUserObs$.subscribe((user: User | null) => {
        if (user) {
          this.userLoggedIn = true
          this.username = user.username
        } else {
          this.userLoggedIn = false
          this.username = ""
        }
      })
    )
  }

  onLogOut(){
    this.authService.currentUser$.next(null)
  }


  ngOnDestroy(): void {
    this.sbp.unsubscribe()
  }

}
