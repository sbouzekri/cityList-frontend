import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {City, ICity} from "../city.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CityService} from "../service/city.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-city-update',
  templateUrl: './city-update.component.html',
  styleUrls: ['./city-update.component.scss']
})
export class CityUpdateComponent implements OnInit {
  form: FormGroup ;
  city: ICity = new City();
  cityUpdated: boolean = false;
  cityId: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      photo: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.cityId = Number.parseInt(params['id'], 10);
    });
    if (!Number.isNaN(this.cityId)) {
      this.cityService.getCity(this.cityId).subscribe((result: ICity) => {
        this.city = result;
        this.form.get('name')?.setValue(this.city.name);
        this.form.get('photo')?.setValue(this.city.photo);
      });
    }
    this.cityUpdated = (!Number.isNaN(this.cityId));

  }

  onCreateCity(): void {
    if (this.form.valid) {
      this.city.name = this.form.get('name')?.value;
      this.city.photo = this.form.get('photo')?.value;
      this.cityUpdated = true;
      this.cityService.update(this.city).subscribe(
        (res: ICity) => {
          this.city = res;
          this.snackBar.open('City updated with success!', 'Undo', {
            duration: 3000
          });
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  isFieldValid(field: string): any {
    return !this.form.get(field)?.valid && this.form.get(field)?.touched;
  }

  displayFieldCss(field: string): any {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
