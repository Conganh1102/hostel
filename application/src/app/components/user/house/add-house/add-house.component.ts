import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseService } from '../../../../services/house.service';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHouseComponent implements OnInit {
  message;
  messageClass;
  formNewHouse;

  address;
  lat = 2321.123;
  lng = 23123.213;

  processing = false;
  isGiaDan = true;
  isShowGm = false;
  constructor(
    private formBuilder: FormBuilder,
    private houseService: HouseService
  ) { }

  ngOnInit() {
    this.createFormNewHouse();
  }
  createFormNewHouse() {
    this.formNewHouse = this.formBuilder.group({
      housename: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      electricwater: ['Giá dân', Validators.compose([Validators.required])],
      electricprice: ['', Validators.compose([Validators.required])],
      waterprice: ['', Validators.compose([Validators.required])]
    });
  }
  handleChangeEWprice(boolean) {
    this.isGiaDan = boolean;
  }
  goBack() {
    window.location.reload(); // Clear all variable states
  }
  showGoogleMap() {
    this.isShowGm = true;
  }
  hiddenGoogleMap() {
    this.isShowGm = false;
  }
  getPosition($event) {
    this.address = $event.address;
    this.lat = $event.lat;
    this.lng = $event.lng;
  }

  enableFormNewHouse() {
    this.formNewHouse.controls['housename'].enable();
    this.formNewHouse.controls['address'].enable();
    this.formNewHouse.controls['electricwater'].enable();
    this.formNewHouse.controls['electricprice'].enable();
    this.formNewHouse.controls['waterprice'].enable();
  }
  disableFormNewHouse() {
    this.formNewHouse.controls['housename'].disable();
    this.formNewHouse.controls['address'].disable();
    this.formNewHouse.controls['electricwater'].disable();
    this.formNewHouse.controls['electricprice'].disable();
    this.formNewHouse.controls['waterprice'].disable();
  }
  async onHouseSubmit() {
    this.processing = true;
    this.disableFormNewHouse();
    const house = {
      housename: this.formNewHouse.get('housename').value,
      address: this.formNewHouse.get('address').value,
      lat: this.lat,
      lng: this.lng,
      electricity_price: this.isGiaDan ? 'Giá dân' : this.formNewHouse.get('electricprice').value,
      water_price: this.isGiaDan ? 'Giá dân' : this.formNewHouse.get('waterprice').value
    };
    try {
      const res = await this.houseService.createHouse(house);
      this.processing = false;
      this.enableFormNewHouse();
      this.messageClass = 'alert alert-success'; // Set a success class
      this.message = res.message; // Set a success message
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    } catch (error) {
      this.processing = false;
      this.enableFormNewHouse();
      this.messageClass = 'alert alert-danger';
      this.message = error;
    }
  }
}
