import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datarow',
  templateUrl: './datarow.component.html',
  styleUrl: './datarow.component.scss'
})
export class DatarowComponent {
  @Input() heading!: string
  @Input() subheading!: string
  @Input() imagename!: string
}
