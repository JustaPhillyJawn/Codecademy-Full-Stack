import { computed, inject, Service, signal, WritableSignal } from '@angular/core';
import { CarInt } from './car-int';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';



@Service()
export class Cars {
    cars: WritableSignal<CarInt[]> = signal([
        {
            id: 1,
            name: 'Mustang',
            img: '/assets/mustang.jpg'
        },
        {
            id: 2,
            name: 'Camaro',
            img: '/assets/camaro.jpg'
        },
        {
            id: 3,
            name: 'Corvette',
            img: '/assets/corvette.jpg'
        }
    ]);
    
    addCar(car: CarInt) {
        this.cars.update((cars) => [...cars, car]);
    }

    private route = inject(ActivatedRoute);
    params = toSignal(this.route.paramMap);

    id = computed(() => this.params()?.get('id'));


}
