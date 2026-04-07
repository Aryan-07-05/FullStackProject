package com.example.homevalue.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String city;
    private String location;
    private String propertyType;
    private int bhk;
    private double areaSqft;
    private int houseAge;
    private String conditionRating;
    private double budget;
    private String goal;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Property() {}

    public Property(String title, String city, String location, String propertyType,
                    int bhk, double areaSqft, int houseAge, String conditionRating,
                    double budget, String goal) {
        this.title = title;
        this.city = city;
        this.location = location;
        this.propertyType = propertyType;
        this.bhk = bhk;
        this.areaSqft = areaSqft;
        this.houseAge = houseAge;
        this.conditionRating = conditionRating;
        this.budget = budget;
        this.goal = goal;
    }

    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPropertyType() { return propertyType; }
    public void setPropertyType(String propertyType) { this.propertyType = propertyType; }

    public int getBhk() { return bhk; }
    public void setBhk(int bhk) { this.bhk = bhk; }

    public double getAreaSqft() { return areaSqft; }
    public void setAreaSqft(double areaSqft) { this.areaSqft = areaSqft; }

    public int getHouseAge() { return houseAge; }
    public void setHouseAge(int houseAge) { this.houseAge = houseAge; }

    public String getConditionRating() { return conditionRating; }
    public void setConditionRating(String conditionRating) { this.conditionRating = conditionRating; }

    public double getBudget() { return budget; }
    public void setBudget(double budget) { this.budget = budget; }

    public String getGoal() { return goal; }
    public void setGoal(String goal) { this.goal = goal; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}