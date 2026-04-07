package com.example.homevalue.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.homevalue.model.Property;
import com.example.homevalue.model.Recommendation;
import com.example.homevalue.repository.PropertyRepository;
import com.example.homevalue.service.RecommendationService;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin("*")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private RecommendationService recommendationService;

    @PostMapping
    public List<Recommendation> createProperty(@RequestBody Property property) {
        Property savedProperty = propertyRepository.save(property);
        return recommendationService.getRecommendations(savedProperty);
    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }
}