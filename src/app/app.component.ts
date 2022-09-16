import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public recipes!: Recipe[];
  public editRecipe!: Recipe;
  public deleteRecipe!: Recipe;

  constructor(private recipeService: RecipeService){}

  ngOnInit() {
    this.getRecipes();
  }

  /**
   * getRecipes
 : void  */
  public getRecipes(): void {
    this.recipeService.getRecipes().subscribe(
      (response: Recipe[]) => {
        this.recipes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  /**
   * onAddRecipe
   * addForm: NgForm :void
   * */
  public onAddRecipe(addForm: NgForm):void {
    document.getElementById('add-recipe-form')?.click();
    this.recipeService.addRecipe(addForm.value).subscribe(
      (response:Recipe) => {
        console.log(response);
        this.getRecipes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset();
      }
    );
  }

    /**
   * onUpdateRecipe
   * recipe: Recipe :void
   * */
     public onUpdateRecipe(recipe: Recipe):void {
      this.recipeService.updateRecipe(recipe).subscribe(
        (response:Recipe) => {
          console.log(response);
          this.getRecipes();
        },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
    }

  /**
 * onDeleteRecipe
 * recipeId: number :void
 * */
    public onDeleteRecipe(recipeId: number):void {
    this.recipeService.deleteRecipe(recipeId).subscribe(
      (response:void) => {
        console.log(response);
        this.getRecipes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    );
  }

/**
 * searchRecipe
key: string :void*/
public searchRecipe(key: string):void {
  console.log(key);
  const results: Recipe[] = [];
  for(const recipe of this.recipes) {
    if(recipe.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      results.push(recipe);
    }
  }
  this.recipes = results;
  if (results.length === 0 || !key) {
    this.getRecipes();
  }
}

  public onOpenModal(recipe: any, mode: string):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addRecipeModal');
    }
    if(mode === 'edit') {
      this.editRecipe = recipe;
      button.setAttribute('data-target','#updateRecipeModal');
    }
    if(mode === 'delete') {
      this.deleteRecipe = recipe;
      button.setAttribute('data-target','#deleteRecipeModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
