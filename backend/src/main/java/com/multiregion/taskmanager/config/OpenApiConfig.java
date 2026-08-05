package com.multiregion.taskmanager.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI taskManagerOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Multi-Region Task Manager API")
                        .description("REST API documentation for the Multi-Region Task Manager project.")
                        .version("v1.0")
                        .contact(new Contact()
                                .name("Subham")
                                .email("your-email@example.com"))
                        .license(new License()
                                .name("MIT License")))
                .externalDocs(new ExternalDocumentation()
                        .description("Project Documentation"));
    }
}