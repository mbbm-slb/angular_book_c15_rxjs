import { Component } from '@angular/core';
import { concat, from, merge, Observable, range } from 'rxjs';

@Component({
  selector: 'dr-combination-operators',
  templateUrl: './combination-operators.component.html',
  styleUrl: './combination-operators.component.css'
})
export class CombinationOperatorsComponent {
  
  start_1(){
    console.clear();
    // const numbers$ = range(1, 10)
    // const letters$ = from('ABCDEFGHIJ')

    // const merged$ = merge(numbers$, letters$)
    // merged$.subscribe(v => console.log(v))
    const numbers$ = new Observable<number>((observer) => {
      const emitValue = (seq: number) => {
        seq++;
        const delay = 500;
        if (seq < 10) {
          observer.next(seq);
        setTimeout(emitValue, delay, seq);
        } else {
          observer.complete();
        }
      };
      emitValue(0);
    });
    const letters$ = new Observable<string>((observer) => {
      const letters = 'ABCDEFGHIJ'.split('');
      const emitValue = (seq: number) => {
        seq++;
        const delay = 500;
        if (seq < letters.length) {
          observer.next(letters[seq]);
          setTimeout(emitValue, delay, seq);
        } else {
          observer.complete();
        }
      };
      emitValue(0);
    });

    const merged$ = merge(numbers$, letters$)
    merged$.subscribe(v => console.log(v))
  }

  start_1_1(){
    console.clear();
    const numbers$ = range(1, 10)
    const letters$ = from('ABCDEFGHIJ')

    const merged$ = merge(numbers$, letters$)
    merged$.subscribe(v => console.log(v))
  }

  start_2(){
    const numbers$ = new Observable<number>((observer) => {
      const emitValue = (seq: number) => {
        seq++;
        const delay = 500;
        if (seq < 10) {
          observer.next(seq);
        setTimeout(emitValue, delay, seq);
        } else {
          observer.complete();
        }
      };
      emitValue(0);
    });
    const letters$ = new Observable<string>((observer) => {
      const letters = 'ABCDEFGHIJ'.split('');
      const emitValue = (seq: number) => {
        seq++;
        const delay = 500;
        if (seq < letters.length) {
          observer.next(letters[seq]);
          setTimeout(emitValue, delay, seq);
        } else {
          observer.complete();
        }
      };
      emitValue(0);
    });

    const merged$ = concat(numbers$, letters$)
    merged$.subscribe(v => console.log(v))
  }
}
