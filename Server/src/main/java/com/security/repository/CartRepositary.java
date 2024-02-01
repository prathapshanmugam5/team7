package com.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.security.configs.entity.Cart;

public interface CartRepositary extends JpaRepository<Cart, Integer>{

	
	@Query(value="select * from cart where user_id=?",nativeQuery = true)
	List<Cart> getUserIdProductDetails(int id);
	
	@Modifying
	@Query("DELETE FROM Cart c WHERE c.productId = :productId AND c.userId = :userId")
	void deleteByProductId(@Param("productId") int productId, @Param("userId") int userId);




}
