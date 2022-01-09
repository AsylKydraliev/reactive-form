import { Component } from '@angular/core';

@Component({
  selector: 'appApplication',
  template: `<h1>Your application is accepted, thanks!
                <button class="btn btn-dark" routerLink="/">Home >></button>
             </h1>
  `,
  styles: [`h1{
    color: green;
    margin: 200px 0 20px 0;
    text-align: center;
  }`]
})
export class ApplicationComponent{}
