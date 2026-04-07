package com.example.homevalue.model;

import jakarta.persistence.*;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private double minBudget;
    private double maxBudget;
    private String targetCondition;
    private String targetGoal;
    private double estimatedCost;
    private String expectedValueBoost;
    private String priority;

    public Recommendation() {}

    public Recommendation(String title, String description, double minBudget, double maxBudget,
                          String targetCondition, String targetGoal, double estimatedCost,
                          String expectedValueBoost, String priority) {
        this.title = title;
        this.description = description;
        this.minBudget = minBudget;
        this.maxBudget = maxBudget;
        this.targetCondition = targetCondition;
        this.targetGoal = targetGoal;
        this.estimatedCost = estimatedCost;
        this.expectedValueBoost = expectedValueBoost;
        this.priority = priority;
    }

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getMinBudget() { return minBudget; }
    public void setMinBudget(double minBudget) { this.minBudget = minBudget; }

    public double getMaxBudget() { return maxBudget; }
    public void setMaxBudget(double maxBudget) { this.maxBudget = maxBudget; }

    public String getTargetCondition() { return targetCondition; }
    public void setTargetCondition(String targetCondition) { this.targetCondition = targetCondition; }

    public String getTargetGoal() { return targetGoal; }
    public void setTargetGoal(String targetGoal) { this.targetGoal = targetGoal; }

    public double getEstimatedCost() { return estimatedCost; }
    public void setEstimatedCost(double estimatedCost) { this.estimatedCost = estimatedCost; }

    public String getExpectedValueBoost() { return expectedValueBoost; }
    public void setExpectedValueBoost(String expectedValueBoost) { this.expectedValueBoost = expectedValueBoost; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}