import { Component } from '@angular/core';

import { of } from 'rxjs';

@Component({
  selector: 'dr-intro',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {

  start_1_1() {
    const numbers$ = of(1,2,3)
    numbers$.subscribe(v => console.log(v))
    numbers$.subscribe(myObserver)
    numbers$.subscribe(new MyObserver('obs1: '));
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