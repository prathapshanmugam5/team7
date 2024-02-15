package com.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.security.MailService.EmailService;

import com.security.configs.entity.Cart;
import com.security.entity.EmailRequest;
import com.security.repository.CartRepositary;

import jakarta.transaction.Transactional;



@RestController
@RequestMapping(value="/cart")
@CrossOrigin(origins = "*")
public class CartController {
	@Autowired
	CartRepositary cartRepo;
	
	 @Autowired
	    private EmailService emailService;
	
	
    
    @PostMapping(value="/addCart")
    public Cart CartPost(@RequestBody Cart p) {
        return cartRepo.save(p);
    }
    
    @GetMapping(value="/getCart")
    public List<Cart> getAllCart() {
        return cartRepo.findAll();
    }
    
    @GetMapping(value="/getCartId/{id}")
    public List<Cart> getById(@PathVariable int id) {
    	
    	return cartRepo.getUserIdProductDetails(id);
    	
    }
    
    
    @DeleteMapping(value="/deleteCartId/{productId}/{userId}")
    @Transactional  // Add this annotation
    public String deletebgId(@PathVariable int productId,@PathVariable int userId) {
        cartRepo.deleteByProductId(productId,userId);
        return "Deleted Success";
    }
    
    
    @PutMapping(value = "/updateCart/{productId}/{userId}")
    @Transactional
    public void updateCart(@PathVariable int productId, @PathVariable int userId, @RequestBody Cart cart) {
        cartRepo.updateCart(productId, userId, cart.getItemCount());
    }
    
    
    @GetMapping(value = "/getCart/{productId}/{userId}")
    @Transactional
    public  List<Cart>  getCart(@PathVariable int productId, @PathVariable int userId) {
      return  cartRepo.getCart(productId, userId);
    }
    
    @PostMapping("/send-email")
    public String sendEmail(@RequestBody EmailRequest emailRequest) {
        // Send email to the provided email address
        emailService.sendConfirmationEmail(emailRequest);
        
        return "Mail Send Success";
    }

	
    

	
	
	
	

}
