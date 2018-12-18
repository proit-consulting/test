import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'example-simplest-rxjs',
  templateUrl: './simplest-rxjs.component.html',
  styleUrls: ['./simplest-rxjs.component.scss'],
})
export class SimplestRxjsComponent implements OnInit {
  @ViewChild('textInput') input: ElementRef;

  textInput$: Observable<any>;

  outputText: String = '';

  constructor() {}

  ngOnInit(): void {
    this.textInput$ = fromEvent(this.input.nativeElement, 'input');

    this.textInput$
      .subscribe((inputEvent) =>
        this.outputText += `You typed a ${inputEvent.data}\n`
      );
  }
}
