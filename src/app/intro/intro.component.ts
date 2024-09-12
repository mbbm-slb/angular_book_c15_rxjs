import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { of, interval } from 'rxjs';

@Component({
  selector: 'dr-intro',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {
  sub1?: Subscription;
  sub2?: Subscription;

  start_1_1() {
    console.clear();
    const numbers$ = of(1,2,3)
    numbers$.subscribe(v => console.log(v))
    numbers$.subscribe(myObserver)
    numbers$.subscribe(new MyObserver('obs1: '));
  }

  start_1_2() {
    console.clear();
    const timer1$ = interval(500)
    this.sub1 = timer1$.subscribe(v => console.log('sub1:' + v))
    this.sub2 = timer1$.subscribe(v => console.log('sub2:' + v))
    setTimeout(() => {
      if (this.sub2) {
        this.sub2.unsubscribe();
      }
    }, 6100);
  }

  stop_1_2() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}

interface Observer {
  next: (event: any) => void;
  error: (error: any) => void;
  complete: () => void;
}

const myObserver: Observer = {
  next: (event: any) => console.log(event),
  error: (error: any) => console.log(error),
  complete: () => console.log('complete!')
}

class MyObserver {
  constructor(private prefix: string) {}
  next(event :any) { console.log(this.prefix + event)}
  error(error :any) { console.log(this.prefix + error)}
  complete() { console.log(this.prefix + 'complete!')}
}