import { Component, computed, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Cars, Car as iCar} from '../cars';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-cardetails',
  styleUrl: './cardetails.css',
  templateUrl: './cardetails.html',
})
export class Cardetails {
  private route = inject(ActivatedRoute);

  private params = toSignal(this.route.paramMap);
  carId = computed(() => this.params()?.get('id') ?? '');

  CarService = inject(Cars);
  editCar(carId: string){
    this.CarService.editCar(carId);
}
  formGroup = new FormGroup({
    make: new FormControl(''),
    model: new FormControl('')
  })
}