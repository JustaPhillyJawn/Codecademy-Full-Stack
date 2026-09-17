import { Component, inject } from '@angular/core';
import { Cars } from '../cars';
import { CarInt } from '../car-int';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-list',
  styleUrl: './list.css',
  templateUrl: './list.html',
})


export class List {
  carService = inject(Cars);
  currentCar?: CarInt | null = null;

  onClick(car : CarInt) {
    
    this.currentCar = car;
    this.carForm.patchValue({
      name: car.name,
      img: car.img,
    });

    console.log(car);
  }
  carForm = new FormGroup({
    name: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
  });
  
  onSubmit() {
  this.carService.addCar({
    id: this.carService.cars().length + 1,
    name: this.carForm.value.name ?? '',
    img: this.carForm.value.img ?? '',
    });
  }

  onDelete() {
    this.carService.cars().pop();
    this.currentCar = null
  }

}
