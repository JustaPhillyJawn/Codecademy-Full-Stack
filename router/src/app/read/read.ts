import { Component, computed, inject } from '@angular/core';
import { CelebService } from '../celeb-service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-read',
  imports: [],
  templateUrl: './read.html',
  styleUrl: './read.css',
})
export class Read {
  celebService = inject(CelebService);
  route = inject(ActivatedRoute);

  params = toSignal(this.route.params);

  user = computed(() =>{
    let params = this.params();
    if(params === null || params['id'] === undefined){
      return null;
    }
  })
}
