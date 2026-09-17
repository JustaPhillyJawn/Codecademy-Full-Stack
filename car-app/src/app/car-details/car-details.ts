import { Component, computed, inject } from '@angular/core';
import { Cars } from '../cars';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink],
  selector: 'app-car-details',
  styleUrl: './car-details.css',
  templateUrl: './car-details.html',
})
export class CarDetails {
  carService = inject(Cars);
  CarInterface = Cars;
  carId = toSignal(inject(ActivatedRoute).paramMap);
  currentCar = computed(() => this.carService.cars().find((car) => car.id === +this.carId()?.get('id')!));
}
