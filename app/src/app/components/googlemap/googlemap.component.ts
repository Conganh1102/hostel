import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AgmService } from '../../services/agm.service';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements OnInit {
  @Output() sendPosition = new EventEmitter();
  @Output() hiddenGM = new EventEmitter();

  lat = 20.9937815;
  lng = 105.8466875;

  latMaker = 20.9937815;
  lngMaker = 105.8466875;
  zoom = 16;

  textInput = '';
  address;
  isValid = false;
  constructor(
    private agmService: AgmService
  ) { }

  ngOnInit() {
    this.lat = 20.9937815;
    this.lng = 105.8466875;
    this.latMaker = 20.9937815;
    this.lngMaker = 105.8466875;
    this.zoom = 16;
    this.textInput = '';
  }

  placeMarker($event) {
    console.log($event.coords);
    this.lat = this.latMaker = $event.coords.lat;
    this.lng = this.lngMaker = $event.coords.lng;

    this.isValid = true;
  }
  async search($event) {
    this.isValid = false;
    if ($event.key === 'Enter') {
      try {
        const data = await this.agmService.getGeocoding(this.textInput);
        if (data.results && data.status === 'OK') {
          this.lat = this.latMaker = data.results[0].geometry.location.lat;
          this.lng = this.lngMaker = data.results[0].geometry.location.lng;
          this.textInput = this.address = data.results[0].formatted_address;
          this.isValid = true;
        }
      } catch (error) {
        console.log(error);
      }

    }
  }
  hiddenGoogleMap() {
    this.hiddenGM.emit();
  }
  onSubmitPosition() {
    const position = {
      address: this.address,
      lat: this.lat,
      lng: this.lng
    };
    this.sendPosition.emit(position);
    this.hiddenGM.emit();
  }
}
