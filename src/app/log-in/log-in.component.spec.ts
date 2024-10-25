import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogInComponent } from './log-in.component';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate container on sign up button click', () => {
    const signUpBtn = fixture.nativeElement.querySelector('.sign-up button');
    signUpBtn.click();
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('#container');
    expect(container.classList).toContain('active');
  });

  it('should deactivate container on sign in button click', () => {
    const signInBtn = fixture.nativeElement.querySelector('.sign-in button');
    signInBtn.click();
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('#container');
    expect(container.classList).not.toContain('active');
  });
});