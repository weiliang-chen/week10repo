import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-addmovieactor',
  templateUrl: './addmovieactor.component.html',
  styleUrls: ['./addmovieactor.component.css']
})
export class AddmovieactorComponent implements OnInit {
  actorsDB: any[] = [];
  moviesDB: any[] = [];
  selectactor: any = null;
  selectmovie: any = null;

  constructor(private dbService: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.dbService.getMovies().subscribe((data: any) => {
      this.moviesDB = data;
    });

    this.dbService.getActors().subscribe((data: any) => {
      this.actorsDB = data;
    });
  }

  selectActor(item: any){
    this.selectactor = item
  }

  selectMovie(item: any){
    this.selectmovie = item
  }

  updateMovie() {
    //addActorInMovie(actor:any, movie:any)
    this.dbService.addActorInMovie(this.selectactor._id, this.selectmovie._id).subscribe( result => {
      this.router.navigate(["/listmovies"]);
    })
  }
}
