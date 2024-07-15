import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})
export class VideoplayerComponent {
  readonly data = inject<any>(MAT_DIALOG_DATA);
  trailerKeyList!: string[]
  currentVideoIndex: number = 0
  constructor() {
    this.trailerKeyList = this.data['trailers']
    this.currentVideoIndex = 0
  }

  browseTrailer(step: string) {
    if (step === "next") {
      this.currentVideoIndex = (this.currentVideoIndex + 1)% this.trailerKeyList.length
    } else {
      this.currentVideoIndex = (this.currentVideoIndex + this.trailerKeyList.length - 1)% this.trailerKeyList.length
    }
  }
}
