import { Component, OnInit } from '@angular/core';

import { PheroClient } from "../../phero.generated";
const fetch = window.fetch.bind(this);
const client = new PheroClient(fetch);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  name = '';
  message = '';

  constructor() {}

  async go() {
    if(this.name !== '') {
      try {
        this.message = await client.helloWorldService.helloWorld(this.name);
      } catch (e) {
        console.log(e);
      }
    }
  }

}
