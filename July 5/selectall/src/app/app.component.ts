import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  selectAll!: any
  obj: any = {}
  count: number = 0

  optList: string[] = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSelectAllChange() {
    console.log("onSelectAllChange", this.selectAll, this.obj);

    this.optList.forEach((option: any) => {
      this.obj[option] = this.selectAll
    });
  }

  onOptionChange(opt: any) {
    console.log("onOptionChange ", opt, this.selectAll, this.obj, this.count);
    if (this.obj[opt]) {
      this.count += 1
    } else {
      this.count -= 1
    }
    console.log(this.count);
    if (this.count === this.optList.length) {
      this.selectAll = true
    } else {
      this.selectAll = false
    }
  }

  ngOnDestroy(): void {
  }

  // ---------------------------------------------------------------------------------------
  // selectAllForm!: FormGroup
  // optList: string[] = [
  //   "Option 1",
  //   "Option 2",
  //   "Option 3",
  //   "Option 4"
  // ]
  // count: number = 0
  // sbp: Subscription = new Subscription()

  // constructor(private fb: FormBuilder) { }


  // get selectall() {
  //   return this.selectAllForm.get('selectall')
  // }

  // get options() {
  //   return this.selectAllForm.get('options')
  // }

  // ngOnInit(): void {
  //   this.selectAllForm = this.fb.group({
  //     selectall: [false],
  //     options: this.fb.group(
  //       this.optList.reduce((acc: any, x) => {
  //         acc[x] = [false]
  //         return acc
  //       }, {}))
  //   })

  //   this.subscribeSelectAll()
  //   this.subscribeOptions()
  // }

  // subscribeSelectAll() {
  //   const sub = this.selectall?.valueChanges.subscribe(value => {
  //     const that = this
  //     this.count = value?this.optList.length:0
  //     this.optList.forEach((option: string) => {
  //       this.options?.get(option)?.setValue(value, {emitEvent:false})
  //     }, that)
  //   })
  //   this.sbp.add(sub)
  // }

  // subscribeOptions() {
  //   this.optList.forEach((option: string) => {
  //     const sub = this.options?.get(option)?.valueChanges.subscribe(value => {
  //       if (value) {
  //         this.count += 1
  //       } else {
  //         this.count -= 1
  //       }
  //       if (this.count == this.optList.length) {
  //         this.selectall?.setValue(true,{emitEvent:false})
  //       } else {
  //         this.selectall?.setValue(false,{emitEvent:false})
  //       }
  //     })
  //     this.sbp.add(sub)
  //   })
  // }

  // ngOnDestroy(): void {
  //   this.sbp.unsubscribe()
  // }
}
