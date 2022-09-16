package com.example.demo;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Recipe;
import com.example.demo.service.RecipeService;

@RestController
@RequestMapping("/recipe")
public class RecipeResource {

	private final RecipeService recipeService;
	
	public RecipeResource(RecipeService recipeService) {
		this.recipeService = recipeService;
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Recipe>> getAllRecipes() {
		List<Recipe> recipes = recipeService.findAllRecipe();
		return new ResponseEntity<>(recipes, HttpStatus.OK);
	}
	
	@GetMapping("/find/{id}")
	public ResponseEntity<Recipe> getRecipeById(@PathVariable("id") Integer id) {
		Recipe recipe = recipeService.findRecipeById(id);
		return new ResponseEntity<>(recipe, HttpStatus.OK);
	}
	
	@PostMapping("/add")
	public ResponseEntity<Recipe> addRecipes(@RequestBody Recipe recipe) {
		Recipe newRecipe = recipeService.addRecipe(recipe);
		return new ResponseEntity<>(newRecipe, HttpStatus.CREATED);
	}
	
	@PutMapping("/update")
	public ResponseEntity<Recipe> updateRecipe(@RequestBody Recipe recipe) {
		Recipe updateRecipe = recipeService.updateRecipe(recipe);
		return new ResponseEntity<>(updateRecipe, HttpStatus.OK);
	}

	@DeleteMapping("/remove/{id}")
	public ResponseEntity<?> deleteRecipeById(@PathVariable("id") Integer id) {
		recipeService.deleteRecipeById(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
