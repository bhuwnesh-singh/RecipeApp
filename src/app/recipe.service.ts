import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"; 
import { Recipe } from "./recipe";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class RecipeService {
    private apiServerURL = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiServerURL}/recipe/all`);
    }

    public getRecipeById(recipeId: number): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.apiServerURL}/recipe/id`);
    }

    public addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${this.apiServerURL}/recipe/add`, recipe);
    }
    
    public updateRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${this.apiServerURL}/recipe/update`, recipe);
    }
    
    public deleteRecipe(recipeId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiServerURL}/recipe/delete/${recipeId}`);
    }
}