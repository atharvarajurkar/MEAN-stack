import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  menulist: any = [
    {
      name: "Item 1",
      child: [
        {
          name: "Item 1.1",
          child: [
            { name: "Item 1.1.1", child: [] },
            { name: "Item 1.1.2", child: [] },
            {
              name: "Item 1.1.3",
              child: [{ name: "Item 1.1.3.1", child: [] }],
            },
            {
              name: "Item 1.1.4",
              child: [
                { name: "Item 1.1.4.1", child: [] },
                { name: "Item 1.1.4.2", child: [] },
              ],
            },
          ],
        },
        {
          name: "Item 1.2",
          child: [
            { name: "Item 1.2.1", child: [] },
            {
              name: "Item 1.2.2",
              child: [{ name: "Item 1.2.2.1", child: [] }],
            },
            {
              name: "Item 1.2.3",
              child: [
                { name: "Item 1.2.3.1", child: [] },
                {
                  name: "Item 1.2.3.2",
                  child: [{ name: "Item 1.2.3.2.1", child: [] }],
                },
                { name: "Item 1.2.3.3", child: [] },
              ],
            },
          ],
        },
      ],
    },
  ];
}
