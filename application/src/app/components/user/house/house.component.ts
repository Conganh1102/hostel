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
  roomTypes = [{ name: 'Tất cả' }, { name: 'Đã cho thuê' }, { name: 'Còn trống' }, { name: 'Đang rao' }];
  selectedTypeRoom;
  houseItems;
  newHouse = false;
  houseList;
  selectedHouse;

  constructor(
    private houseService: HouseService
  ) { }

  ngOnInit() {
    this.getHouseList();
    this.selectedTypeRoom = { name: 'Tất cả' };
    this.houseItems = [
      {
        label: 'Sửa', icon: 'fa fa-pencil', command: () => {
          this.editHouse();
        }
      },
      {
        label: 'Xóa', icon: 'fa-close', command: () => {
          this.confirmModel();
        }
      }
    ];
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


  editHouse() {

  }
  async deleteHouse(id) {
    try {
      const data = await this.houseService.deleteHouse(id);
      this.messageClass = 'alert alert-success';
      this.message = data.message;
    } catch (error) {
      this.messageClass = 'alert alert-danger';
      this.message = error;
    }
  }

  onHouseSubmit() {

  }
  newHouseForm() {
    this.newHouse = true;
  }
  refresh() {

  }
  confirmModel() {
    this.selectedHouse = true;
  }

}
