import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  isAdmin = false;
  medicMatricula = '';
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.getAdmin();
  
    const localMatricula =localStorage.getItem('medicMatricula') || null;
    if (localMatricula != null) 
      {
      this.medicMatricula = localMatricula;
      console.log(this.medicMatricula);
    } else {
      const matriculaParam = this.route.snapshot.paramMap.get('matricula');
      if (matriculaParam) {
        this.medicMatricula = matriculaParam;
        localStorage.setItem('medicMatricula', matriculaParam);
      } else {
        console.error('No se pudo encontrar medicMatricula en localStorage ni en los parámetros de ruta.');
      }
    }
  }

  medicPageNav() 
  {
    this.router.navigate(['/medic-page/'+this.medicMatricula]);
  }
  attendanceView()
  {
    this.router.navigate(['/attendance-view/'+this.medicMatricula]);
  }

  cleanLocalStorage()
  {
    this.isAdmin = false;
    this.authService.logOut();
    localStorage.removeItem('medicMatricula');
  
  }
}