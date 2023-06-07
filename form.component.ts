
import { Component } from '@angular/core';
import carData from './cars.json';
import { Rent } from './rent.model';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  cars=carData;
  step:number=1;
  pickup:string='';
  pdate:string = '';
  ptime:string='';
  ddate:string='';
  dtime:string='';
  nrdays:number=0;
  pickupError:number=0;
  pickupTimeError:number=0;
  dropTimeError:number=0;
  carSelected:string='';
  carPrice:number=0;
  confirmSelected:boolean=true;
  phoneError:number=0;
  phone:number=0;
  


  submit(){
    let currentDate:any = new Date();
    let confirmedPdate:any = new Date(this.pdate);
    let confirmedDdate:any = new Date(this.ddate);
   
    for(let i=0; i<this.cars.length;i++){
      this.cars[i].taken=false;
    }
    

    if(currentDate - confirmedPdate>=0){
      this.pickupTimeError=1;
      return;
    }
    this.nrdays=(-(confirmedPdate - confirmedDdate))/86400000;
    this.validateLocation();
    this.validatePdate();
    this.validateDdate();
    if(this.nrdays<=0){
      this.pickupTimeError=1;
      return;
    }
    
    const savedRent = localStorage.getItem('rents');
    if (savedRent) {
      const rentObject = JSON.parse(savedRent);
      
      for(let i=0; i<rentObject.length;i++){
        let rentedLocation:any=rentObject[i].location; 
        let rentedPdate:any= new Date(rentObject[i].pickupDate); 
        let rentedDdate:any=new Date(rentObject[i].dropDate) ; 

        if(this.checkTaken(confirmedPdate,confirmedDdate, rentedPdate, rentedDdate)===false && rentedLocation===this.pickup){
          for(let j=0;j<this.cars.length;j++){
            if(this.cars[j].category===rentObject[i].category){
              this.cars[j].taken=true;
            }
          }
          
        }

        
      }
    }




    if(this.validateLocation()===1 && this.validatePdate()===1 && this.validateDdate()===1 && this.validateDdate()===1){

      this.step+=1;
    }else return;
     
    
    
     
      return false;
  }

  back(){
    this.step-=1;
    window.scrollTo(0, 0);
  }
  next(){
    this.aCarIsSelected();
    if(this.confirmSelected===true){
       this.step+=1;
      window.scrollTo(0, 0);
    }else {
      // console.log('eroare selectare');
      window.scrollTo(0, 0);
    }
   
  }

  validateLocation(){
    if(this.pickup===""){
      // console.log('error location');
      this.pickupError=1;
      return 0;
    }else {
      this.pickupError=0;
      return 1;
    }
  }

  validatePdate(){
    if( this.pdate==='' || this.ptime===''){
      this.pickupTimeError=1;
      return 0;
    }else{
      this.pickupTimeError=0;
      return 1;
    }
  }

  validateDdate(){
    if( this.ddate==='' || this.dtime===''){
      this.dropTimeError=1;
      return 0;
    }else {
      this.dropTimeError=0;
      return 1;
    }
    
  }

  carCardSelected(el:any){
    for (let i = 0; i < this.cars.length; i++) {
      if (this.cars[i] !== el) {
        this.cars[i].isSelected = false;
      }
    }
      el.isSelected = !el.isSelected;
      this.carSelected = el.category;
      this.carPrice = el.price;
      // console.log(el.price);
      // console.log(this.carSelected);
      // console.log(this.cars)
  }

  aCarIsSelected(){
    for(let i=0;i<this.cars.length;i++){
      if(this.cars[i].isSelected===true){
        this.confirmSelected=true;
        return;
      }else {
        this.confirmSelected=false;
      }
    }
  }

  validateDateDif(a:any,b:any){
      if(a<=b){
        this.pickupTimeError=1;
        // console.log('teaca');
        return 0;
        
      }else{
        this.pickupTimeError=0;
        return 1;
      }
  }

  confirm(){
    let phoneInp:any = document.querySelector('.phone-inp') as HTMLInputElement;
    let nrs = /^[0-9]+$/;
    let inputValue = phoneInp?.value;
    let isNumbersOnly = nrs.test(inputValue);
    

    
    // console.log(phoneInp?.value);
    if(phoneInp.value.length<10 || isNumbersOnly===false){
      this.phoneError=1;
      return;
    }else{
      this.phone = phoneInp.value;
      const rent = new Rent(this.pickup, this.pdate, this.ptime, this.ddate, this.dtime, this.phone, this.carSelected);
      
      let rents: Rent[] = JSON.parse(localStorage.getItem('rents') || '[]');

      
      rents.push(rent);
  
      
      localStorage.setItem('rents', JSON.stringify(rents));
      
      this.phoneError=0;
      this.step++;
      // console.log(rent);
    }
  }

  home(){
   location.reload();
  }

  checkTaken(a:any,b:any,c:any,d:any){
    if(a<c && b<c){
      
      console.log('e bun');
      return true;
    }
    if(a>d && b > d){
      
      console.log('e bun');
      return true;
    }else {
      
      console.log('nu e bun');
      return false;
    }

  }
 
  


 

 
  }


  








