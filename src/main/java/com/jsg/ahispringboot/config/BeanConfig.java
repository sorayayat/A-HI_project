package com.jsg.ahispringboot.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import com.jsg.ahispringboot.inspection.utils.FileUtils;
import com.jsg.ahispringboot.inspection.utils.FileUtilsImpl;

@Configuration
public class BeanConfig {
    @Bean
    public ModelMapper modelmapper() {

        return new ModelMapper();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public FileUtils fileUtil(RestTemplate restTemplate) {
        return fileUtilsImpl(restTemplate);
    }

    @Bean
    public FileUtilsImpl fileUtilsImpl (RestTemplate restTemplate) {
        return new FileUtilsImpl(restTemplate);
    }

}
