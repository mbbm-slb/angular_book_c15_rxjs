import { Component } from '@angular/core';

import { concatMap, delay, exhaustMap, from, interval, map, mergeMap, Observable, of, Subscription, switchMap, take } from 'rxjs';

@Component({
  selector: 'dr-higher-order-operators',
  templateUrl: './higher-order-operators.component.html',
  styleUrl: './higher-order-operators.component.css'
})
export class HigherOrderOperatorsComponent {

  start_3_1() {
    console.clear();
    // const urls = [
    //   'https://jsonplaceholder.typicode.com/todos',
    //   'https://jsonplaceholder.typicode.com/comments',
    // ];

    // from(urls)
    //   .pipe(
    //     concatMap((url) => {
    //       return ajax(url);
    //     })
    //   )
    //   .subscribe((response) => console.log(response.response));

    //emit delay value
    const source = of(2000, 1000, 500, 3000);
    // map value from source into inner observable, when complete emit result and move to next
    const example = source.pipe(
      concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
    );
    //output: With concatMap: Delayed by: 2000ms, With concatMap: Delayed by: 1000ms
    const subscribe = example.subscribe(val =>
      console.log(`With concatMap: ${val}`)
    );
  }

  start_3_2() {
    console.clear();

    // first observable that emits random intervals
    const randomInterval$ = new Observable<number>((observer) => {
      const emitValue = () => {
        const delay = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
        observer.next(delay / 1000); // Emit the interval in seconds
        setTimeout(emitValue, delay);
      };
      emitValue();
    });

    // second observable that emits a value every 300ms and is restarted by the first observable
    const switchInterval$ = randomInterval$.pipe(switchMap(() => interval(300))); 

    this.subscribeWithTimeout<number>(
      switchInterval$,
      (value: number) => console.log('value:', value),
      30000
    );

    // demonstrate the random interval observable
    // this.subscribeWithTimeout<number>(
    //   randomInterval$,
    //   (value: number) => console.log('Random interval fired at:', value),
    //   30000
    // );
  }

  start_3_3() {
    console.clear();

    // first observable that emits random intervals
    const randomInterval$ = new Observable<number>((observer) => {
      const emitValue = () => {
        const delay = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
        observer.next(delay / 1000); // Emit the interval in seconds
        setTimeout(emitValue, delay);
      };
      emitValue();
    });

    // second observable that emits a value every 300ms and is restarted by the first observable
    const switchInterval$ = randomInterval$.pipe(mergeMap(() => interval(300))); 

    this.subscribeWithTimeout<number>(
      switchInterval$,
      (value: number) => console.log('value:', value),
      30000
    );
  }

  start_3_4() {
    console.clear();

    // first observable that emits determined intervals
    const determinedInterval$ = new Observable<number>((observer) => {
      const delays = [1, 2, 3, 4, 8, 16, 32, 64, 128, 256];
      const emitValue = (seq: number) => {
        seq++;
        const delay = delays[seq % 4] * 200;
        observer.next(seq); // Emit the interval in seconds
        setTimeout(emitValue, delay, seq);
      };
      emitValue(0);
    });

    // second observable that emits a value every 300ms and is restarted by the first observable
    const switchInterval$: Observable<number> = determinedInterval$.pipe(
      exhaustMap((outerValue: number): Observable<number> => 
        interval(100).pipe(
        take(10), // Take only the first 20 values
        map((innerValue: number): number => innerValue + (outerValue * 100)) // add outer value multiplied by 100 to inner value
      )
      )
    );

    this.subscribeWithTimeout<number>(
      switchInterval$,
      (value: number) => console.log('value:', value),
      30000
    );
  }
  
  // ================================================================================================
  // Helper methods
  // ================================================================================================

  subscribeWithTimeout<T>(
    observable: Observable<T>,
    observer: any,
    timeout: number
  ): Subscription {
    const subscription = observable.subscribe(observer);
    setTimeout(() => {
      subscription.unsubscribe();
      console.log('Unsubscribed after timeout');
    }, timeout);
    return subscription;
  }
}
