import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-plate',
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './edit-plate.component.html',
  styleUrl: './edit-plate.component.scss'
})
export class EditPlateComponent implements OnInit {
  plateInfo = {
    label: '',
    platenum: '',
    mvNo: '',
  };

  constructor(private router: Router) {
    // Initialization logic can go here
  }

  ngOnInit(): void {
    // if the path includes a platenum, load the plate
    const urlParams = new URLSearchParams(window.location.search);
    const plateNum = urlParams.get('platenum');
    if (plateNum) {
      this.loadPlate(plateNum);
    }
  }

  checkPlateNum() {
    // check if the label is empty then set it to the plate number
    if (this.plateInfo.label=== '') {
      this.plateInfo.label = this.plateInfo.platenum;
    }
    //remove and - or spaces from the plate number
    this.plateInfo.platenum = this.plateInfo.platenum.replace(/[-\s]/g, '');
  }

  checkMvNo() {
    // remove any non-numeric characters from the mvNo
    this.plateInfo.mvNo = this.plateInfo.mvNo.replace(/\D/g, '');
    // and trim it to just 15 numbers
    if (this.plateInfo.mvNo.length > 15) {
      this.plateInfo.mvNo = this.plateInfo.mvNo.slice(0, 15);
    }
  }


  savePlate() {
    // get the plates from local storage
    const plates = JSON.parse(localStorage.getItem('plates') || '[]');
    // check if the plate already exists
    const existingPlateIndex = plates.findIndex((plate: any) => plate.platenum === this.plateInfo.platenum);
    if (existingPlateIndex !== -1) {
      // Update existing plate
      plates[existingPlateIndex] = this.plateInfo;
    } else {
      // Add new plate
      plates.push(this.plateInfo);
    }
    // Save the updated plates back to local storage
    localStorage.setItem('plates', JSON.stringify(plates));
  }
  clearPlate() {
    this.plateInfo = {
      label: '',
      platenum: '',
      mvNo: '',
    };
  }

  deletePlate() {
    // get the plates from local storage
    const plates = JSON.parse(localStorage.getItem('plates') || '[]');
    // find the index of the plate to delete
    const plateIndex = plates.findIndex((plate: any) => plate.platenum === this.plateInfo.platenum);
    if (plateIndex !== -1) {
      // Remove the plate from the array
      plates.splice(plateIndex, 1);
      // Save the updated plates back to local storage
      localStorage.setItem('plates', JSON.stringify(plates));
      // Clear the form
      this.clearPlate();
    }
    else {
      console.error('Plate not found');
    }
  }
  loadPlate(plateNum: string) {
    // get the plates from local storage
    const plates = JSON.parse(localStorage.getItem('plates') || '[]');
    // find the plate by plateNum
    const plate = plates.find((p: any) => p.platenum === plateNum);
    if (plate) {
      this.plateInfo = { ...plate };
    } else {
      console.error('Plate not found');
    } 
  }

  goToDashboard() {
    // Navigate to the dashboard
    this.router.navigate(['/dashboard'])  ;
  }

}