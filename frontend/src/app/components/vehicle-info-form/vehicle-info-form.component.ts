import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { VehicleService } from 'src/app/services/Vehicle/vehicle.service'

@Component({
  selector: 'app-vehicle-info-form',
  templateUrl: './vehicle-info-form.component.html',
  styleUrls: ['./vehicle-info-form.component.scss']
})
export class VehicleInfoFormComponent implements OnInit {

  plate!: string
  brand!: string
  model!: string
  version!: string
  chasis!: string
  year!: string
  formGroup!: FormGroup
  errorMessages: { [key: string]: string } = {}
  controlNamesTranslations: any = {
    plate: 'Placa',
    brand: 'Marca',
    model: 'Modelo',
    version: 'Versión',
    year: 'Año',
    chasis: 'Chasis'
  }
  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private snackBar: MatSnackBar
  ) { }

  buildForm = () => {
    this.formGroup = this.formBuilder.group({
      plate: [{ disable: false, value: null }, [Validators.required]],
      brand: [{ disable: false, value: null }, [Validators.required]],
      model: [{ disable: false, value: null }, [Validators.required]],
      version: [{ disable: false, value: null }, [Validators.required]],
      year: [{ disable: false, value: null }, [Validators.required, Validators.pattern(/^\d{4}$/)]],
      chasis: [{ disable: false, value: null }, [Validators.required]]
    })
  }

  controlErrorMessages = (controlName: string) => {
    const control = this.formGroup.get(controlName)
    if (control?.errors?.['required']) {
      this.controlNamesTranslations[controlName]
      this.errorMessages[controlName] = `${this.controlNamesTranslations[controlName]} es requerido`
    }
    if (control?.errors?.['pattern']) {
      this.errorMessages[controlName] = `El ${this.controlNamesTranslations[controlName]} debe tener 4 dígitos. Ej: 2023`
    }
  }

  sendVehicleInfo = () => {
    this.errorMessages = {}
    if (this.formGroup.valid) {
      this.vehicleService.saveVehicleInfo(this.formGroup.value).subscribe({
        next: (_response) => {
          this.snackBar.open('Información guardada exitosamente', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success']
          });
        },
        error: (_error) => {
          this.snackBar.open('No se logró guardar la información, intente de nuevo', 'Cerrar', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error']
          });
        }
      })
      this.formGroup.reset()
    } else {
      Object.keys(this.formGroup.controls).forEach(controlName => {
        const control = this.formGroup.get(controlName)
        if (control?.invalid) {
          this.controlErrorMessages(controlName)
        }
      })
    }
  }

  ngOnInit(): void {
    this.buildForm()
  }

}
