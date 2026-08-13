import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DuckService } from './duck-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  http = inject(HttpClient);  // Inject the HttpClient service
  ds = inject(DuckService); // Inject the DuckService
  img?: string  // Property to hold the image URL

  async OnClick() {
    this.img = await this.ds.getDuckServe();    // Call the getDuckServe method from DuckService
  }
}
https://docs.google.com/document/d/1e7JlHOf4iawwIN7eLaNl7da7WTxfNgQQ9yUmof-mhu4/edit?pli=1&tab=t.0#heading=h.z2s926lcwuk1