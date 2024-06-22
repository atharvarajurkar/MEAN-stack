import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RatingComponent } from './rating/rating.component';
import { StarsComponent } from './stars/stars.component';
import { AverageRatingComponent } from './average-rating/average-rating.component';
import { RatingListComponent } from './rating-list/rating-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
    StarsComponent,
    AverageRatingComponent,
    RatingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
