package com.example.capcafe.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cafe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String coffeeName;
    private Double rating;
    private Long rating_count;
    @Column(columnDefinition = "varchar(9999)")
    private String url;
    private Boolean hours_24;
    private Double lon;
    private Double lan;

}
