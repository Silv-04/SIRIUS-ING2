package upec.episen.sirius.episaine_back.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import upec.episen.sirius.episaine_back.dto.CustomerProgressDTO;
import upec.episen.sirius.episaine_back.models.Customer;
import upec.episen.sirius.episaine_back.models.CustomerProgress;
import upec.episen.sirius.episaine_back.repositories.CustomerProgressRepository;
import upec.episen.sirius.episaine_back.repositories.CustomerRepository;

@Service
public class CustomerProgressService {
    
    @Autowired
    private CustomerProgressRepository customerProgressRepository;
    @Autowired
    private CustomerRepository customerRepository;

    public int saveCustomerProgress(CustomerProgressDTO customerProgressDTO) {
        Customer customer = customerRepository.findById(customerProgressDTO.getCustomerId())
            .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        CustomerProgress customerProgress = new CustomerProgress();
        customerProgress.setCustomer(customer);
        customerProgress.setWeight_forecast(customerProgressDTO.getWeightForecast());
        return customerProgressRepository.save(customerProgress).getProgress_id();
    }

    public CustomerProgress findByIdCustomerProgress(Integer customerId) {
        Optional<CustomerProgress> customerProgress = customerProgressRepository.findByCustomerCustomerId(customerId);
        return customerProgress.orElse(null);
    }

    public boolean updateCustomerProgress(CustomerProgressDTO customerProgressDTO) {
        Optional<CustomerProgress> customerProgress = customerProgressRepository.findByCustomerCustomerId(customerProgressDTO.getCustomerId());
        if (customerProgress.isPresent()) {
            CustomerProgress progress = customerProgress.get();
            progress.setWeight_forecast(customerProgressDTO.getWeightForecast());
            customerProgressRepository.save(progress);
            return true;
        }
        return false;
    }
}
