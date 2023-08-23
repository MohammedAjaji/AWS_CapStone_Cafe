package com.example.capcafe.Controller;

import com.example.capcafe.Model.Cafe;
import com.example.capcafe.Service.CafeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cafe")
@RequiredArgsConstructor
@CrossOrigin("*")
public class Controller {

    private final CafeService cafeService;

    @GetMapping("/list")
    public Iterable<Cafe> list() {
        return cafeService.list();
    }

    @GetMapping("/find-id/{id}")
    public ResponseEntity findById(@PathVariable Integer id){
        Cafe cafe = cafeService.findById(id);
        return ResponseEntity.status(200).body(cafe);
    }

    @GetMapping("/find-name/{name}")
    public ResponseEntity findByName(@PathVariable String name){
        List<Cafe> cafes = cafeService.findByName(name);
        return ResponseEntity.status(200).body(cafes);
    }

    @GetMapping("/find-rate-more/{rate}")
    public ResponseEntity findCafeByRatingGreaterThanEqual(@PathVariable Double rate){
        List<Cafe> cafes = cafeService.findCafeByRatingGreaterThanEqual(rate);
        return ResponseEntity.status(200).body(cafes);
    }

    @PutMapping("rate-cafe/{id}/{rate}")
    public ResponseEntity rateCafe(@PathVariable Integer id, @PathVariable Double rate){
        cafeService.rateCafe(id,rate);
        return ResponseEntity.status(200).body("Cafe has been rated");

    }
}
