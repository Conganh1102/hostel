import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../../services/house.service';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  message;
  messageClass;
  newHouse = false;
  houseList;
  selectedHouse;

  constructor(
    private houseService: HouseService
  ) { }

  ngOnInit() {
    this.getHouseList();
  }

  async getHouseList() {
    try {
      const data = await this.houseService.getOwnHouses();
      this.houseList = data.houses;
    } catch (error) {
      this.messageClass = 'alert alert-danger';
      this.message = error;
    }
  }

  async deleteHouse() {
    try {
      const data = await this.houseService.deleteHouse(this.selectedHouse._id);
      this.messageClass = 'alert alert-success';
      this.message = data.message;
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    } catch (error) {
      this.messageClass = 'alert alert-danger';
      this.message = error;
    }
  }

  selectHouse(house) {
    this.selectedHouse = house;
  }

  onHouseSubmit() {

  }
  newHouseForm() {
    this.newHouse = true;
  }
  refresh() {

  }
}
