import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      'username':[null,[Validators.required]]
    })
  }

  getErrorUsername():string{
    return this.formGroup.get('username')?.hasError('required') ? 'Field is required' : '';
  }
  
  onSubmit(formGroup:FormGroup):void{
    localStorage.clear();
    localStorage.setItem('bookApp-username',formGroup.get('username')?.value);
    this.router.navigate(['/search']);
  }
}
