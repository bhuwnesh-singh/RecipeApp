package com.example.demo.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Recipe;

public interface RecipeRepo extends JpaRepository<Recipe, Integer>{

	Optional<Recipe> findRecipeById(int id);

}
