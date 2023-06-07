import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
    burgerSource:string="assets/burger-bar.png";
    xSource:string="assets/close.png";
    display:boolean=true;
   
    
    
    toggle(){
      if(this.display===true){
        this.display = false;
      }else{
        this.display = true;
      }
      
    }
    
  

}
