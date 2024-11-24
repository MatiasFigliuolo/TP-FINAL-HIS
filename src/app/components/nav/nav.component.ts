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
    if(localStorage.getItem('medicMatricula'))
    {
      this.medicMatricula = localStorage.getItem('medicMatricula') || '';
    }else
    {
      this.medicMatricula = String(this.route.snapshot.paramMap.get('matricula'));
      localStorage.setItem('medicMatricula',this.medicMatricula);
    }
  }

  medicPageNav() 
  {
    this.router.navigate(['/medic-page/'+this.medicMatricula]);
  }

  cleanLocalStorage()
  {
    localStorage.removeItem('medicMatricula');
  }
}