import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IResponseConsultinPicoPlaca } from 'src/app/services/Vehicle/vehicle.service';

export interface IDataModal {
  canDrive: boolean
  date: string
  message: string
  plate: string
}

@Component({
  selector: 'app-response-consulting',
  templateUrl: './response-consulting.component.html',
  styleUrls: ['./response-consulting.component.scss']
})
export class ResponseConsultingComponent {
  @Input() data?: IResponseConsultinPicoPlaca

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataModal: IDataModal,
  ) { }

}
