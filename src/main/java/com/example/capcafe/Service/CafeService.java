package com.example.capcafe.Service;

import com.example.capcafe.ApiException.ApiException;
import com.example.capcafe.Model.Cafe;
import com.example.capcafe.Repository.CafeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CafeService {

    private final CafeRepo cafeRepo;

    public Iterable<Cafe> list() {
        return cafeRepo.findAll();
    }

    public void saveCafes(List<Cafe> cafes) {
        cafeRepo.saveAll(cafes);
    }

    public Cafe findById(Integer id){
        Cafe cafe = cafeRepo.findCafeById(id);

        if (cafe == null){
            throw new ApiException("Cafe Not Found");
        }
        return cafe;
    }

    public List<Cafe> findByName(String name){
        return cafeRepo.findCafeByCoffeeNameContains(name);
    }

    public List<Cafe> findCafeByRatingGreaterThanEqual(Double rate){
        return cafeRepo.findCafeByRatingGreaterThanEqual(rate);
    }

    public void rateCafe(Integer id, Double rate) {
        Cafe cafe = cafeRepo.findCafeById(id);
        if (cafe == null){
            throw new ApiException("Cafe Not Found");
        }
        Double rating = cafe.getRating()* cafe.getRating_count();
        Long finalCount = cafe.getRating_count()+1;
        Double finalRating = (rating+rate)/(finalCount);

        Double scale = Math.pow(10, 1);
        finalRating = Math.round(finalRating*scale)/(scale);


        cafe.setRating(finalRating);
        cafe.setRating_count(finalCount);
        cafeRepo.save(cafe);
    }
}
