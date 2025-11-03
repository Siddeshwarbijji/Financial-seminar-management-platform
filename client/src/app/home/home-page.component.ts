import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
    selector:'home-page',
    templateUrl:'./home-page.component.html',
    styleUrls:['./home-page.component.scss']
})

export class HomePageComponent{
    constructor(public authService: AuthService){}
}