import { Component, inject, signal } from '@angular/core';
import { Cats, CatsService } from '../cats.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-edit-cat-db',
  styleUrl: './edit-cat-db.css',
  templateUrl: './edit-cat-db.html',
})
export class EditCatDB {
  CatService = inject(CatsService);
  formGroup = new FormGroup ({
    name: new FormControl (''),
    color: new FormControl (''),
    breed: new FormControl ('')
  })
  formGroupSignal = signal(this.formGroup);
  addCat() {
    if (this.formGroup.value.name != null || this.formGroup.value.breed != null || this.formGroup.value.color != null){
      let catInfo = this.formGroupSignal().value as Cats;
      console.log(this.formGroup.value);
      this.CatService.addCatToDB(catInfo);
    }
    else {
      console.log("No Cat Added");
    }
  }


}