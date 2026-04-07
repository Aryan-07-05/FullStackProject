package com.example.homevalue.service;

import com.example.homevalue.model.Property;
import com.example.homevalue.model.Recommendation;
import com.example.homevalue.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository recommendationRepository;

    public List<Recommendation> getRecommendations(Property property) {
        String condition = property.getConditionRating();
        String goal = property.getGoal();
        double budget = property.getBudget();

        List<Recommendation> all = recommendationRepository.findAll();

        return all.stream()
                .filter(r ->
                        (r.getTargetCondition().equalsIgnoreCase(condition)
                         || r.getTargetCondition().equalsIgnoreCase("average"))
                        && r.getTargetGoal().equalsIgnoreCase(goal)
                        && budget >= r.getMinBudget()
                        && budget <= r.getMaxBudget()
                )
                .toList();
    }
}