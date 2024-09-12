import { Component } from '@angular/core';
import { map, range } from 'rxjs';

@Component({
  selector: 'dr-transformation-operators',
  templateUrl: './transformation-operators.component.html',
  styleUrl: './transformation-operators.component.css'
})
export class TransformationOperatorsComponent {

  start_1() {
    console.clear();
    const mappedNumbers$ = range(1, 10).pipe(
      map(value => value * 2) // Use the map operator to multiply each value by 2
    );

    mappedNumbers$.subscribe(value => console.log(value));
  }
}
