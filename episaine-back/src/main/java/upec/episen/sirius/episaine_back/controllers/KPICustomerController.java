package upec.episen.sirius.episaine_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upec.episen.sirius.episaine_back.services.KPICustomerService;

import java.util.*;

@RestController
@RequestMapping("/kpi/")
public class KPICustomerController {

    @Autowired
    private KPICustomerService kpiCustomerService;

    @GetMapping("/count/females")
    public ResponseEntity<Long> getFemaleCount() {
        return ResponseEntity.ok(kpiCustomerService.getFemaleCount());
    }

    @GetMapping("/count/males")
    public ResponseEntity<Long> getMaleCount() {
        return ResponseEntity.ok(kpiCustomerService.getMaleCount());
    }

    @GetMapping("/count/total")
    public ResponseEntity<Long> getTotalCount() {
        return ResponseEntity.ok(kpiCustomerService.getTotalCount());
    }

    @GetMapping("/count/gender")
    public ResponseEntity<Map<String, Long>> getGenderCounts() {
        return ResponseEntity.ok(kpiCustomerService.getGenderCounts());
    }

    @GetMapping("/age-distribution")
    public ResponseEntity<Map<String, Long>> getAgeDistribution() {
        return ResponseEntity.ok(kpiCustomerService.getAgeDistribution());
    }

    @GetMapping("/monthly-distribution")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyDistribution() {
        return ResponseEntity.ok(kpiCustomerService.getMonthlyDistribution());
    }

    @GetMapping("/stats")
    public ResponseEntity<List<Map<String, Object>>> getStatsByAgeGroup() {
        return ResponseEntity.ok(kpiCustomerService.getStatsByAgeGroup());
    }

}

