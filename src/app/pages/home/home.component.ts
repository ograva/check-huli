import { Component, AfterViewInit, ViewEncapsulation, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@Component({
  selector: 'app-home',
  imports: [MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  url =
    'https://mayhulika.mmda.gov.ph/check-for-violations/results?method=plate-no&queryNo=ABC123&mvNo=123456789012345';
  urlSafe: SafeResourceUrl;

  plates:any = [
    // Add more plates as needed
  ];

  selectedPlate : any = { label: '', platenum: '', mvNo: '' };

  constructor(private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {

    this.loadPlates();
    if (this.plates.length > 0) {
      this.setPlateNo(this.plates[0].platenum);
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    } else {
      this.addNewPlate();
    }
  }

  setPlateNo(plateNo: string) {
    console.log('Selected Plate No:', plateNo);
    const plate = this.plates.find((p: { label: string; platenum: string; mvNo: string }) => p.platenum === plateNo);
    if (plate) {
      this.url = `https://mayhulika.mmda.gov.ph/check-for-violations/results?method=plate-no&queryNo=${plate.platenum}&mvNo=${plate.mvNo}`;
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      Object.assign(this.selectedPlate, plate);
    }
  }

  editPlate() {
    console.log('Editing Plate:', this.selectedPlate);
    this.router.navigate(['/dashboard/edit-plate'], { queryParams: { platenum: this.selectedPlate.platenum } });

  }

  addNewPlate() {
    this.selectedPlate = { label: '', platenum: '', mvNo: '' };
    this.router.navigate(['/dashboard/edit-plate']);
  }

  loadPlates() {
    const plates = localStorage.getItem('plates');
    if (plates) {
      this.plates = JSON.parse(plates);
    } else {
      this.plates = [];
    }
  } 

  savePlates() {
    localStorage.setItem('plates', JSON.stringify(this.plates));
  }
}

