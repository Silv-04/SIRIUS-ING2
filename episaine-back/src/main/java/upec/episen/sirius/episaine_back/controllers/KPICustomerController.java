package upec.episen.sirius.episaine_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import upec.episen.sirius.episaine_back.repositories.KPICustomerRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/kpis/customers")
public class KPICustomerController {

    @Autowired
    private KPICustomerRepository kpiCustomerRepository;

    // API pour le nombre de femmes
    @GetMapping("/count/females")
    public ResponseEntity<Long> getFemaleCount() {
        long femaleCount = kpiCustomerRepository.countByGenderFemale();
        return ResponseEntity.ok(femaleCount);
    }

    // API pour le nombre d'hommes
    @GetMapping("/count/males")
    public ResponseEntity<Long> getMaleCount() {
        long maleCount = kpiCustomerRepository.countByGenderMale();
        return ResponseEntity.ok(maleCount);
    }

    // API pour le nombre total de clients
    @GetMapping("/count/total")
    public ResponseEntity<Long> getTotalCount() {
        long totalCount = kpiCustomerRepository.countTotalCustomers();
        return ResponseEntity.ok(totalCount);
    }

    // API combinée pour le nombre de femmes, d'hommes, et de clients
    @GetMapping("/count/gender")
    public ResponseEntity<Map<String, Long>> getGenderCounts() {
        long femaleCount = kpiCustomerRepository.countByGenderFemale();
        long maleCount = kpiCustomerRepository.countByGenderMale();
        long totalCount = kpiCustomerRepository.countTotalCustomers();

        Map<String, Long> genderCounts = new HashMap<>();
        genderCounts.put("Females", femaleCount);
        genderCounts.put("Males", maleCount);
        genderCounts.put("Total", totalCount);

        return ResponseEntity.ok(genderCounts);
    }
    // API for age distribution
    @GetMapping("/age-distribution")
    public ResponseEntity<Map<String, Long>> getAgeDistribution() {
        List<Object[]> results = kpiCustomerRepository.getAgeDistribution();
        Map<String, Long> ageDistribution = new HashMap<>();

        for (Object[] result : results) {
            String ageGroup = (String) result[0];
            Long count = ((Number) result[1]).longValue();
            ageDistribution.put(ageGroup, count);
        }

        return ResponseEntity.ok(ageDistribution);
    }
    // API for monthly distribution ( per gender)
    @GetMapping("/monthly-distribution")
    public ResponseEntity<List<Map<String, Object>>> getMonthlyDistribution() {
        List<Object[]> results = kpiCustomerRepository.getMonthlyDistribution();
        List<Map<String, Object>> monthlyDistribution = results.stream().map(result -> {
            Map<String, Object> data = new HashMap<>();
            data.put("month", result[0]);
            data.put("gender", result[1]);
            data.put("count", ((Number) result[2]).longValue());
            return data;
        }).toList();
        return ResponseEntity.ok(monthlyDistribution);
    }

}
