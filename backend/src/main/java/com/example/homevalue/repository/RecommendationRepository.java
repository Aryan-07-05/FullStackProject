package com.example.homevalue.repository;

import com.example.homevalue.model.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {

    List<Recommendation> findByTargetConditionAndTargetGoal(String targetCondition, String targetGoal);
}