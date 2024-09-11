import { Component } from '@angular/core';

import { concatMap, from } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'dr-higher-order-operators',
  templateUrl: './higher-order-operators.component.html',
  styleUrl: './higher-order-operators.component.css'
})
export class HigherOrderOperatorsComponent {

  start_3_1() {
    const urls = [
      'https://jsonplaceholder.typicode.com/todos',
      'https://jsonplaceholder.typicode.com/comments',
    ];

    from(urls)
      .pipe(
        concatMap((url) => {
          return ajax(url);
        })
      )
      .subscribe((response) => console.log(response.response));
  }
}
