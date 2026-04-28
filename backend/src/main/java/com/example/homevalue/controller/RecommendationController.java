package com.example.homevalue.controller;

import com.example.homevalue.model.Recommendation;
import com.example.homevalue.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin("*")
public class RecommendationController {

    @Autowired
    private RecommendationRepository recommendationRepository;

    @GetMapping
    public List<Recommendation> getAllRecommendations() {
        return recommendationRepository.findAll();
    }

    @PostMapping
    public Recommendation addRecommendation(@RequestBody Recommendation recommendation) {
        return recommendationRepository.save(recommendation);
    }

    @DeleteMapping("/{id}")
    public void deleteRecommendation(@PathVariable Long id) {
        recommendationRepository.deleteById(id);
    }
}