import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HomePageComponent } from '../home-page/home-page.component';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {


  userName: string = "";
  password: string = "";
  InvaliedLogin: boolean = false;
  LoginSuccess: boolean = false;

  UserArry: any[] = [];
  isTrue: boolean =false;

  constructor(private http: HttpClient,private router:Router) { }

  userLogin() {
    let bodyData = {
      "userName": this.userName,
      "password": this.password,
    };

    let isTrue=this.checkStrength(this.password);
    
    if (isTrue == true) {
      this.serachUser(bodyData);
      // this.getAllUser(bodyData);
      this.clear();
    } else {   
      alert("Use One or more Capital letters and special character [!,%,&,@,#,$,^,*,?,_,~] and one or more number..!");
    }

  }


  serachUser(bodyData: { userName: string; password: string; }) {

    this.http.post("http://localhost:8080/api/v1/user/search", bodyData, { responseType: 'text' })
      .subscribe((resultData: string) => {
        if (resultData == "true") {
          alert("Login successfully..!");
          this.router.navigateByUrl('home');
        } else {
          alert("wrong Password..!");
        }
      });
    }


    

  //validation details alert
  more() {
    alert("Use One or more Capital letters and special character [!,%,&,@,#,$,^,*,?,_,~] and one or more number..!");
    }

  checkStrength(password: string):boolean {
      //initial strength
      var strength = 0

      if (password.length > 7) strength += 1
		
		//if password contains both lower and uppercase characters, increase strength value
		if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))  strength += 1
		
		//if it has numbers and characters, increase strength value
		if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))  strength += 1 
		
		//if it has one special character, increase strength value
		if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  strength += 1
		
		//if it has two special characters, increase strength value
		if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1
	
		
		//if value is less than 2
		if (strength > 3)
		{
      return true
    }else{
      return false;
    }
  }


  // clear text fields
  clear() {
    this.userName = "";
    this.password = "";
  }
}
