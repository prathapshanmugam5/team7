package com.security.configs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfigurationClass {

	@Autowired
	JwtAuthFilter authFilter;

	@Bean
	public UserDetailsService userDetailsService() {

		return new UserInfoUserDetailsService();

	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		return http.csrf().disable().authorizeHttpRequests()
				.requestMatchers("/jwt/get", "/jwt/addUser", "/jwt/authenticate", "/jwt/newaccount", "/jwt/getAdmin",
						"/jwt/getAllUser", "/jwt/getUser/{name}", "/product/productPost", "/product/getAllProduct",
						"/product/getBytype/{type}", "product/getById/{id}", "product/deletebyId/{id}",
						"product/updateById/{id}", "/cart/addCart", "/cart/getCart", "/cart/getCartId/{id}",
						"/cart/deleteCartId/{productId}/{userId}", "/product/getproductByNameUsingFilter/{productName}",
						"/product/getByCategory/{category}", "/image/addImage", "/image/getAllImage",
						"/cart/updateCart/{productId}/{userId}", "/image/deleteImageById/{id}",
						"product/getByTypeCategory/{type}/{category}", "/image/updateImageById/{id}",
						"/image/getImageById/{id}","/cart/getCart/{productId}/{userId}")
				.permitAll().and().authorizeHttpRequests().requestMatchers("/jwt/**").authenticated().and()
//				.formLogin().and().build();

				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authenticationProvider(authenticationProvider())
				.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class).build();
	}

	@Bean
	public AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticate = new DaoAuthenticationProvider();
		daoAuthenticate.setUserDetailsService(userDetailsService());
		daoAuthenticate.setPasswordEncoder(passwordEncoder());
		return daoAuthenticate;
	}

	@Bean
	public AuthenticationManager authManager(AuthenticationConfiguration authconfig) throws Exception {
		return authconfig.getAuthenticationManager();
	}

}
