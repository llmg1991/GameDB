import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating=0;
  gameId:string = "";
  game!: Game;
  routeSub: Subscription = new Subscription;
  gameSub: Subscription = new Subscription;

  constructor(
    private ActivateRoute:ActivatedRoute,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.routeSub =this.ActivateRoute.params.subscribe((params:Params)=>{
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    }
    )
  }

  ngOnDestroy(): void {
      if(this.gameSub){
        this.gameSub.unsubscribe();
      }

      if(this.routeSub){
        this.routeSub.unsubscribe();
      }
  }


  getGameDetails(id: string):void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp:Game)=>{
        this.game=gameResp;
        setTimeout(()=>{
          this.gameRating = this.game.metacritic;
        },1000);
      });
    
  }

  getColor(value:number):string{
    let color;
    if(value > 75 ){
      color = '#5ee432';
    }else if(value > 50){
      color= '#fff050'
    }else if (value > 30){
      color= '#f7aa38'
    }else{
      color= '#ef4655'
    }
    return color;
  }

}
