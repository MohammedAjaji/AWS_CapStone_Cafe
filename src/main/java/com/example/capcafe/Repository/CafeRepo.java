package com.example.capcafe.Repository;

import com.example.capcafe.Model.Cafe;
import com.example.capcafe.Service.CafeService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CafeRepo extends JpaRepository<Cafe,Integer> {

    Cafe findCafeById(Integer id);
    List<Cafe> findCafeByCoffeeNameContains(String name);

    List<Cafe> findCafeByRatingGreaterThanEqual(Double rate);
}
