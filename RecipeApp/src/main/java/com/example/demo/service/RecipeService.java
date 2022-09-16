package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.exception.UserNotFoundException;
import com.example.demo.model.Recipe;
import com.example.demo.repo.RecipeRepo;

@Service
public class RecipeService {
	
	private final RecipeRepo recipeRepo;
	
	@Autowired
	public RecipeService(RecipeRepo recipeRepo) {
		this.recipeRepo = recipeRepo;
	} 
	
	public Recipe addRecipe(Recipe recipe) {
		return recipeRepo.save(recipe);
	}
	
	public List<Recipe> findAllRecipe() {
		return recipeRepo.findAll();
	}
	
	public Recipe updateRecipe(Recipe recipe) {
		return recipeRepo.save(recipe);
	}
	
	public Recipe findRecipeById(int id) {
		return recipeRepo.findRecipeById(id)
				.orElseThrow(() -> new UserNotFoundException("Recipe by id "+ id + "not present"));
	}
	
	public void deleteRecipeById(int id) {
		recipeRepo.deleteById(id);
	}
}
