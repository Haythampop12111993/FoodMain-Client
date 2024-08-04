import { GlobleService } from './../../../services/globle/globle.service';
import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  LatLng,
  LatLngExpression,
  LatLngTuple,
  LeafletMouseEvent,
  Map,
  Marker,
  icon,
  map,
  marker,
  tileLayer,
} from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  @Input() addressLatLng!: {};
  @Input() readOnly: boolean = false;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];
  @ViewChild('map', { static: true })
  mapRef!: ElementRef;
  map!: Map;
  currentMarker!: Marker;
  constructor(private GlobleService: GlobleService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initializeMap();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes['addressLatLng'].currentValue);
    if (changes['addressLatLng'].currentValue) {
      if (this.readOnly) {
        this.showLocationOnReadOnlyMode(changes['addressLatLng'].currentValue);
      }
    }
  }
  initializeMap() {
    if (this.map) return;
    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false,
    }).setView(this.DEFAULT_LATLNG, 1);
    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
    this.map.on('click', (e: LeafletMouseEvent) => {
      this.setMarker(e.latlng);
      this.GlobleService.adressLatLng.next(e.latlng);
    });
  }
  findMyLocation() {
    console.log('here');
    this.GlobleService.getCurrentLocation().subscribe({
      next: (res) => {
        console.log(res);
        this.GlobleService.adressLatLng.next(res);
        this.GlobleService.adressLatLng$.subscribe((res) => {
          console.log(res);
        });
        this.map.setView(res, this.MARKER_ZOOM_LEVEL);
        this.setMarker(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  setMarker(latlng: LatLngExpression) {
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }
    this.currentMarker = marker(latlng, {
      draggable: false,
      icon: this.MARKER_ICON,
    }).addTo(this.map);
  }
  showLocationOnReadOnlyMode(location: any) {
    const m = this.map;
    this.initializeMap();
    this.setMarker(location);
    this.map.setView(location, this.MARKER_ZOOM_LEVEL);
    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    this.currentMarker.dragging?.disable();
  }
}
