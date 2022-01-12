import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/model';
import { HttpService } from 'src/app/services/http.service';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public sort: string="";
  public games: Array<Game>=[];
  private routeSub: Subscription = new Subscription;
  private gameSub: Subscription = new Subscription;

  constructor(
    private httpService:HttpService,
    private router:Router,
    private activateRoute:ActivatedRoute) { }
    

  ngOnInit(): void {
    //Check if we have parms on the URL
    this.activateRoute.params.subscribe((params: Params)=>{
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search'])        
      }else{
        this.searchGames('metacrit');
      }
    })

    
  }

  searchGames(sort:string, search?:string):void{
    this.gameSub = this.httpService
      .getGameList(sort,search).subscribe((gameList:APIResponse<Game>)=>{
       this.games = gameList.results;
     });
  }

  openGameDetails(id:string):void{
    this.router.navigate(['details',id]);

  }

  ngOnDestroy():void{
      if(this.gameSub){
        this.gameSub.unsubscribe();
      }
      if(this.routeSub){
        this.routeSub.unsubscribe();
      }
  }

}
