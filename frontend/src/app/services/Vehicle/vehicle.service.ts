import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IVehicleInfo {
  plate: string
  brand: string
  model: string
  version: string
  chasis: string
  year: string
}

export interface IDataToConsulting {
  plate: string
  date: string
}

export interface IResponseConsultinPicoPlaca {
  data: {
    canDrive: boolean
    date: string
    message: string
    plate: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(
    private httpClient: HttpClient
  ) { }

  saveVehicleInfo(vehicleInfo: IVehicleInfo): Observable<any> {
    return new Observable((observer) => {
      this.httpClient.post('http://localhost:3000/save-info', vehicleInfo).subscribe({
        next: (response) => {
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    })
  }

  consultingPicoPlaca(dataToConsulting: IDataToConsulting): Observable<IResponseConsultinPicoPlaca> {
    return new Observable((observer) => {
      this.httpClient.get(`http://localhost:3000/consult-pico-placa/${dataToConsulting.plate}/${dataToConsulting.date}`).subscribe({
        next: (response) => {
          observer.next(response as IResponseConsultinPicoPlaca)
          observer.complete()
        },
        error: (error) => {
          observer.error(error)
        }
      })
    })
  }

}
