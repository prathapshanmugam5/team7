package com.security.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.configs.entity.Product;
import com.security.repository.ProductRepositary;

@RestController
@RequestMapping(value="/product")
@CrossOrigin(origins = "*")
//@Repository
public class ProductController {
    
    @Autowired
    ProductRepositary prorepo;
    
    @PostMapping(value="/productPost")
    public Product productPost(@RequestBody Product p) {
        return prorepo.save(p);
    }
    
    @GetMapping(value="/getAllProduct")
    public List<Product> getAllProduct() {
        return prorepo.findAll();
    }
    
    @GetMapping(value="/getById/{id}")
    public Product getById(@PathVariable int id) {
    	
    	return prorepo.findById(id).get();
    	
    }
    
    @DeleteMapping(value="/deletebyId/{id}")
    public Product deletebgId(@PathVariable int id) {
    	
    	Product p=prorepo.findById(id).get();
    	prorepo.deleteById(id);
    	
    	return p;
    }
    
    @PutMapping(value="/updateById/{id}")
    public Product updateById(@PathVariable int id,@RequestBody Product p) {

    	Product x=prorepo.findById(id).get();
    	x.setImage(p.getImage());
    	x.setPrice(p.getPrice());
    	x.setProductDetails(p.getProductDetails());
    	x.setProductName(p.getProductName());
    	
    	return prorepo.save(x);
    }
    
    @GetMapping(value="/getByCategory/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
    	
    	return prorepo.getByCategory(category);
    	
    }
 
    @GetMapping(value="/getBytype/{type}")
    public List<Product> getBytype(@PathVariable String type) {
    	
    	return prorepo.getBytype(type);
    	
    }
    
    
    @GetMapping(value="/getByTypeCategory/{type}/{category}")
    public List<Product> getByTypeCategory(@PathVariable String type,@PathVariable String category) {
    	
    	return prorepo.getByTypeAndCategory(type,category);
    	
    }
    
     
  
    
    
    
    
}
