import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-create',
  imports: [ FormsModule , ButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
value2:string = ''
 loading: boolean = false;
load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }
}
