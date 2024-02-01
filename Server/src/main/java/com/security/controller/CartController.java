package com.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.configs.entity.Cart;
import com.security.repository.CartRepositary;

import jakarta.transaction.Transactional;



@RestController
@RequestMapping(value="/cart")
@CrossOrigin(origins = "*")
public class CartController {
	@Autowired
	CartRepositary cartRepo;
	
	
    
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
    
    
	
	
	
	
	

}
