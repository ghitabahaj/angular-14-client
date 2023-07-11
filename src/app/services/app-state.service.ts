import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public stuentState :any ={

  }

  public authState :any ={
    isAuthenticated : false,
    username : undefined,
    roles : undefined,
    token : undefined
  }
  constructor() { }

  public  setProductState(state :any):void {
    this.stuentState={...this.stuentState, ...state}
  }
  public setAuthState(state : any) :void{
    this.authState={...this.authState, ...state};
  }
}