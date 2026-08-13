import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestServ } from './test-serv';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  http = inject(HttpClient);

  ts = inject(TestServ);

  img?: string

  async onClick() {
    this.img = await this.ts.getTestServe()
    console.log(this.img)
  }
}
