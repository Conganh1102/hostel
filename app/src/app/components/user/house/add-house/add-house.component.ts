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
      address: ['', Validators.compose([Validators.required])],
      info: ['', Validators.compose([Validators.required])]
    });
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
    this.formNewHouse.controls['address'].enable();
    this.formNewHouse.controls['info'].enable();
  }
  disableFormNewHouse() {
    this.formNewHouse.controls['address'].disable();
    this.formNewHouse.controls['info'].enable();

  }
  async onHouseSubmit() {
    this.processing = true;
    this.disableFormNewHouse();
    const house = {
      address: this.formNewHouse.get('address').value,
      lat: this.lat,
      lng: this.lng,
      info: this.formNewHouse.get('info').value
    };
    try {
      const res = await this.houseService.createHouse(house);
      // this.processing = false;
      // this.enableFormNewHouse();
      this.messageClass = 'alert alert-success'; // Set a success class
      this.message = res.message; // Set a success message
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    } catch (error) {
      this.processing = false;
      this.enableFormNewHouse();
      this.messageClass = 'alert alert-danger';
      this.message = 'Thêm nhà không thành công';
    }
  }
}
