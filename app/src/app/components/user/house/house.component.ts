import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../../services/house.service';
import { RoomService } from '../../../services/room.service';
import { PostService } from '../../../services/post.service';
import { UploadFileService } from '../../../services/upload-file.service';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import {Message} from 'primeng/api';


@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css'],
  providers: [MessageService]
})
export class HouseComponent implements OnInit {

  message;
  messageClass;
  msgs: Message[] = [];

  newHouse = false;
  houseList;
  selectedHouse;
  roomOptions = {};

  roomImageUrl = environment.roomImageUrl;

  formNewRoom;
  selectedFile;

  selectedRoomId;

  constructor(
    private houseService: HouseService,
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private uploadFileService: UploadFileService,
    private messageService: MessageService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getHouseList();
    this.createFormNewRoom();
  }

  createFormNewRoom() {
    this.formNewRoom = this.formBuilder.group({
      roomNumber: ['', Validators.compose([Validators.required])],
      floor: ['', Validators.compose([Validators.required])],
      area: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.required])],
      other_info: ['', Validators.compose([Validators.required])],
    });
  }

  async getHouseList() {
    try {
      const data = await this.houseService.getOwnHouses();
      this.houseList = data.houses;
      this.constructorRoomOptions();
    } catch (error) {
      this.messageClass = 'alert alert-danger';
      this.message = error;
    }
  }

  constructorRoomOptions() {
    this.houseList.forEach(house => {
      this.roomOptions[house._id] = {};
      this.roomOptions[house._id].isShowRoom = false;
      this.roomOptions[house._id].selectShowOption = 'XEM_TAT_CA';
    });
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
  selectRoomId(id) {
    this.selectedRoomId = id;
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity: 'success', summary: 'Success Message', detail: 'Cập nhật phòng thành công !'});
}

  async updateStatusForRoom(room, status) {
    // tslint:disable-next-line:prefer-const
    let isPutDown = false;
    this.houseList.forEach(h => {
      if (h.rooms) {
        h.rooms.forEach(r => {
          if (r._id === room._id) {
            if (r.status === 'SALE' && status === 'EMPTY') {
              isPutDown = true;
            }
            r.status = status;
          }
        });
      }
    });

    // tslint:disable-next-line:prefer-const
    let newRoom = {
      _id: room._id,
      status: status
    };
    try {
      const res = await this.roomService.updateRoom(newRoom);
      if (isPutDown) {
        const r = await this.postService.putDownPost(room._id);
      }
      this.showSuccess();
    } catch (error) {
      alert(error);
    }
  }

  async deleteRoom() {
    try {
      const res = await this.roomService.deleteRoom(this.selectedRoomId);
      setTimeout(function() {
        window.location.reload();
      }, 1000);
        } catch (error) {
      alert(error);
    }
  }

  newHouseForm() {
    this.newHouse = true;
  }


  async onNewRoomSubmit() {
    // tslint:disable-next-line:prefer-const
    let newRoom = {
      houseId: this.selectedHouse._id,
      roomNumber: this.formNewRoom.get('roomNumber').value,
      floor: this.formNewRoom.get('floor').value,
      area: this.formNewRoom.get('area').value,
      price: this.formNewRoom.get('price').value,
      images: '',
      other_info: this.formNewRoom.get('other_info').value,
    };
    try {
      const resUploadImage = await this.uploadFileService.uploadRoomImage(this.selectedFile);
      newRoom.images = resUploadImage.filename;
      console.log(newRoom);
      const res = await this.roomService.createRoom(newRoom);
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    } catch (error) {
      alert(error);
    }
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      // this.roomImage = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  async showRooms(house) {
    if (this.roomOptions[house._id].isShowRoom) {
      this.roomOptions[house._id].isShowRoom = false;
      // do something
    } else {
      this.roomOptions[house._id].isShowRoom = true;
      try {
        const data = await this.roomService.getRoomsByHouseId(house._id);
        this.houseList.forEach(houseE => {
          if (houseE._id === house._id) {
            house.rooms = data.rooms;
            return;
          }
        });
      } catch (error) {
        this.messageClass = 'alert alert-danger';
        this.message = error;
      }
    }
  }
}
