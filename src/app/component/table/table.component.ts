import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-table',
  imports: [TableModule , RatingModule , TagModule , ButtonModule , FormsModule,IconFieldModule,InputIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  isBrowser: boolean;
   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

    products: any[] =[
            { name: 'Amy Elsner', image: 'amyelsner.png' , price: 60 , category: 'clothing' , status:'INSTOCK'},
            { name: 'Anna Fali', image: 'annafali.png', price: 60 , category: 'clothing' , status:'INSTOCK' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' , price: 60 , category: 'clothing' , status:'INSTOCK'},
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' , price: 60 , category: 'clothing' , status:'INSTOCK'},
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png', price: 60 , category: 'clothing' , status:'LOWSTOCK' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png', price: 60 , category: 'clothing' , status:'INSTOCK' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' , price: 60 , category: 'clothing' , status:'INSTOCK'},
            { name: 'Onyama Limba', image: 'onyamalimba.png', price: 60 , category: 'clothing' , status:'OUTOFSTOCK' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png', price: 60 , category: 'clothing' , status:'INSTOCK' },
            { name: 'Xuxue Feng', image: 'xuxuefeng.png', price: 60 , category: 'clothing' , status:'INSTOCK' }
        ];;
    ngOnInit() {
        
    }

    getSeverity(status: string): string {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return '';
        }
    }
}
