import { Component, inject } from '@angular/core';
import { Cars, Car as iCar } from '../cars';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-car',
  styleUrl: './car.css',
  templateUrl: './car.html',
})

export class Car {
  CarService = inject(Cars);
  getCars = toSignal(this.CarService.getCars$());
  deleteCar(car: iCar){
    this.CarService.deleteCarFromDB(car.id);
    console.log("Vehicle deleted")
  }
  
}