import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Car, Cars } from '../cars';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-add-car',
  styleUrl: './add-car.css',
  templateUrl: './add-car.html',
})
export class AddCar {
  CarService = inject(Cars);
  formGroup = new FormGroup({
    make: new FormControl(''),
    model: new FormControl('')
  })
  formGroupSignal = signal(this.formGroup);  
  addCar() {
    if (this.formGroup.value.make != null || this.formGroup.value.model != null){
      let carInfo = this.formGroupSignal().value as Car;
      console.log(this.formGroup.value);
      this.CarService.addCarToDB(carInfo);
    }
    else {
      console.log("No Car Added");
    }
  }
}
