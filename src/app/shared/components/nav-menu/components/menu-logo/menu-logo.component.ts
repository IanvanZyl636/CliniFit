import { Component } from '@angular/core';
import { faNotesMedical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-logo',
  templateUrl: './menu-logo.component.html',
  styleUrls: ['./menu-logo.component.scss'],
})
export class MenuLogoComponent {
  public faNotesMedical = faNotesMedical;

  constructor() {}
}
