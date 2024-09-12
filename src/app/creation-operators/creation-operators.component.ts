import { Component } from '@angular/core';

import { from, generate, interval, Observable, range, Subscription, switchMap, throwError } from 'rxjs';
import { of, timer, merge, defer } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'dr-creation-operators',
  templateUrl: './creation-operators.component.html',
  styleUrl: './creation-operators.component.css'
})
export class CreationOperatorsComponent {

  start_2_1() {
    console.clear();
    const ajax$ = ajax('https://api.github.com/users?per_page=2')
    ajax$.subscribe(v => console.log(v))
  }

  start_2_2() {
    console.clear();
    const germanFirstNames = [
      "Anna", "Ben", "Clara", "Elias", "Emma", "Felix", "Finn", "Hannah",
      "Jonas", "Lara", "Lea", "Leon", "Lina", "Lukas", "Marie", "Maximilian",
      "Mia", "Noah", "Paul", "Sophia"
    ];
    
    let index = 0;
    
    const names$ = Observable.create(function(observer :any) {
      const interval = setInterval(() => {
        observer.next(germanFirstNames[index]);
        index = (index + 1) % germanFirstNames.length; // Reset index if end is reached
      }, 300);
    
      return () => clearInterval(interval);
    });
    this.subscribeWithTimeout(names$, new MyObserver('create: '), 6000);
  }

  start_2_3() {
    console.clear();
    const s1 = of(new Date()); //will capture current date time
    const s2 = defer(() => of(new Date())); //will capture date time at the moment of subscription
  
    console.log(new Date());
  
    timer(2000)
      .pipe(
        switchMap(_ => merge(s1, s2))
      ).subscribe(new MyObserver('defer: '));
  }

  start_2_4() {
    console.clear();
    //const subscribe = empty().subscribe(new MyObserver('empty: '));
    // since empty is deprecated an empty "of" does the trick
    const subscribe = of().subscribe(new MyObserver('empty: '));
  }

  start_2_5() {
    console.clear();
    const letters$ = from('Hello World!')
    letters$.subscribe(new MyObserver('from: '))
  }

  start_2_6() {
    // const button3_1_6 = document.getElementById('startBtn3_1_6');
    // const button3_1_6Click$ = fromEvent(button3_1_6, 'click')
    // button3_1_6Click$.subscribe(new MyObserver('fromEvent: '))
  }

  start_2_7() {
    console.clear();
    const generate$: Observable<string> = generate(
      2,
      (x: number) => x <= 38,
      (x: number) => x + 3,
      (x: number) => '.'.repeat(x)
    );
    generate$.subscribe(new MyObserver('generate: '))
  }

  start_2_8() {
    console.clear();
    const timer1$ = interval(500)
    this.subscribeWithTimeout(timer1$, new MyObserver('interval: '), 6000);
  }

  start_2_9() {
    console.clear();
    const numbers$ = of(1,2,3)
    numbers$.subscribe(new MyObserver('of: '))
  }

  start_2_10() {
    console.clear();
    const numbers$ = range(1, 10)
    numbers$.subscribe(new MyObserver('range: '))
  }

  start_2_11() {
    console.clear();
    const error$ = throwError('This is an error!')
    error$.subscribe(new MyObserver('throw: '))
  }

  start_2_12() {
    console.clear();
    const timer1$ = timer(1000, 2000)
    this.subscribeWithTimeout(timer1$, new MyObserver('timer: '), 5100);
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

class MyObserver {
  constructor(private prefix: string) {}
  next(event :any) { console.log(this.prefix + event)}
  error(error :any) { console.log(this.prefix + error)}
  complete() { console.log(this.prefix + 'complete!')}
}