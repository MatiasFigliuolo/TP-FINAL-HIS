import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { MedicServiceService } from "../services/medic-service/medic-service.service";
import { Observable, catchError, map, of } from "rxjs";
import { PatientService } from "../services/patient-service/patient.service";
import { AppointmentServiceService } from "../services/appointment-service/appointment-service.service";

export class CustomValidators {

    static medicExist(medicService: MedicServiceService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          if (control.value === '') {
            return of(null);  // Simplemente retornamos null si está vacío
          } else {
            return medicService.getByMatricula(control.value).pipe(
              map((exists: boolean) => {
                console.log('Valor de exists en medicExist:', exists);  // Log para verificar la respuesta
                return exists ? { medicExist: { value: control.value } } : null;  // Si existe, devolvemos el error
              }),
              catchError(() => {
                console.log('Error en el validador de matrícula');
                return of(null);  // Si hay un error, devolvemos null
              })
            );
          }
        };
      }
      
      static dniExist(patientService : PatientService): AsyncValidatorFn{
        return(control: AbstractControl): Observable<ValidationErrors | null> => {
          if(control.value === '')
          {
            return of (null);
          }else {
            return patientService.getByDni(control.value).pipe(
              map((exist: boolean) => {
                console.log('Valor de exist en dniExist:', exist);
                return exist ? {dniExist : {value: control.value}} : null;
              }),
              catchError(() => {
                console.log('Error en el validador de dni');
                return of(null);
              })
            )
          }
        }
      }

      static checkDate(appointmentService: AppointmentServiceService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
          if (!control.value) {
            return of(null); // Si no hay valor, no se valida
          }
          return appointmentService.fechaNoPasada(control.value);
        };
      }

      static dniLenght(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
      
          // Validar que el valor sea un string con entre 7 y 8 caracteres
          if (!value || value.length < 7 || value.length > 8) {
            return { dniLenght: true }; // Error si no cumple
          }
      
          return null; // Válido si cumple
        };
      }

      static matriculaLenght(): ValidatorFn 
      {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = control.value;
          if (!value || value.length < 4 || value.length > 5){
            return {matriculaLenght : true}
          }

          return null;
        };
      }
}
