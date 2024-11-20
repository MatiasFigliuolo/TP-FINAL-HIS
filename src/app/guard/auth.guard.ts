import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.checkAdminCredentials().pipe(
    map((isAuthenticated: any) => {
      if (isAuthenticated) {
        swal("! Inicio de sesion exitoso !",'',"success");
        return true;
      } else {
        swal("Contraseña o adminId incorrectas",'',"error");
        return false;
      }
    })
  );
};

export const authMedicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.checkMedicCredentials().pipe(
    map((isAuthenticated: any) => {
      if (isAuthenticated) {
        swal("! Inicio de sesion exitoso !",'',"success");
        return true;
      } else {
        swal("Contraseña o adminId incorrectas",'',"error");
        return false;
      }
    })
  );
};
