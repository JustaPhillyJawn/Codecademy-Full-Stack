import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-doc-view',
  styleUrl: './doc-view.css',
  templateUrl: './doc-view.html',
})
export class DocView {
  upload() {
    console.log('clicked');
  }
}
