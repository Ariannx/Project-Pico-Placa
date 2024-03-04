import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { VehicleService } from 'src/app/services/Vehicle/vehicle.service'
import { ResponseConsultingComponent } from '../response-consulting/response-consulting.component'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-consulting',
  templateUrl: './consulting.component.html',
  styleUrls: ['./consulting.component.scss']
})
export class ConsultingComponent implements OnInit {

  formGroup!: FormGroup
  plate!: string
  date!: string
  errorMessages: { [key: string]: string } = {}
  controlNamesTranslations: any = {
    plate: 'Placa',
    date: 'Fecha'
  }
  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ResponseConsultingComponent>,
    private snackBar: MatSnackBar
  ) { }

  buildForm = () => {
    this.formGroup = this.formBuilder.group({
      plate: [{ disable: false, value: null }, [Validators.required]],
      date: [{ disable: false, value: null }, [Validators.required, this.validateDate]]
    })
  }

  validateDate = (control: FormControl) => {
    if (new Date(control.value) < new Date()) {
      return { invalidDate: true }
    }
    return null
  }

  controlErrorMessages = (controlName: string) => {
    const control = this.formGroup.get(controlName)
    if (control?.errors?.['required']) {
      this.errorMessages[controlName] = `${this.controlNamesTranslations[controlName]} es requerido`
    }
    if (control?.errors?.['invalidDate']) {
      this.errorMessages[controlName] = `La ${controlName} no puede ser anterior a la fecha y hora actual`
    }
  }

  consultingPicoPlaca = () => {
    this.errorMessages = {}
    if (this.formGroup.valid) {
      this.vehicleService.consultingPicoPlaca(this.formGroup.value).subscribe({
        next: (response) => {
          if (response) {
            this.dialog.open(ResponseConsultingComponent, {
              data: response.data
            });
          }
        },
        error: (error) => {
          this.snackBar.open(error.error.error.message || 'Ocurrió un error', 'Cerrar', {
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
