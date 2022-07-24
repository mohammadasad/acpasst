package com.acp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableJpaAuditing
public class AcpAsstApplication{

	public static void main(String[] args) {
		SpringApplication.run(AcpAsstApplication.class, args);
	}
	
	 @Bean
		public WebMvcConfigurer corsConfigurer() {
		    return new WebMvcConfigurer() {
		      @Override
		      public void addCorsMappings(CorsRegistry registry) {
		    	  registry.addMapping("/**")
	              .allowedOrigins("*")
	              .allowedMethods("GET", "POST", "PUT","OPTIONS","DELETE", "HEAD")
	              .allowedHeaders("*")
	              .maxAge(4800)
	              .allowCredentials(true);
		      }
		    };
		  }
}
