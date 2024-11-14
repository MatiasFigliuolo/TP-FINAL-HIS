import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { MedicServiceService } from "../service/medic-service.service";
import { Observable, catchError, map, of } from "rxjs";

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
      
}
