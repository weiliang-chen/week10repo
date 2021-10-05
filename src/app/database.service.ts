import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

// mark a class as available to injector for creation
@Injectable({
  providedIn: "root", //make this service available to the whole application
})

export class DatabaseService {
  constructor(private http: HttpClient) {} //inject httpclient to our service to make it available to make http request.
  result: any;
  getActors() {
    return this.http.get("/actors");
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }

  createActor(data:any) {
    return this.http.post("/actors", data, httpOptions);
  }

  updateActor(id:string, data:any) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id:string) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }

  getMovies() {
    return this.http.get("/movies");
  }

  getMoviesGreaterthan(){
    return this.http.get("/moviesgreaterthan");
  }

  createMovie(data: any){
    return this.http.post("/movies", data, httpOptions);
  }

  deleteMovie(id:string) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }

  deleteMovies(year1: number, year2: number) {
    let url = "/movies/" + year1 + "/" + year2;
    return this.http.delete(url, httpOptions);
  }

  addActorInMovie(actorid:string, movieid:string) {
    return this.http.put("/movies/add/"+ movieid +"/" + actorid, httpOptions)
  }
}