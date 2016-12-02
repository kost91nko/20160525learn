import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  form: FormGroup;
  isIncreasing: boolean;
  previousValue: string;

  constructor(){
    this.isIncreasing = false;
    this.form = new FormGroup({
      firstName: new FormControl()
    });
    const isIncreasing$ = this.form.valueChanges
      .filter((value) => this.form.valid)
      .reduce((state, value) => {
        this.isIncreasing = value.firstName > state;
        return value.firstName
      }, "");

     isIncreasing$.subscribe();
  }
}
