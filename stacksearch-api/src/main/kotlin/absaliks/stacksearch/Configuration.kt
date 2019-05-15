package absaliks.stacksearch

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory
import org.springframework.web.client.RestOperations
import org.springframework.web.client.RestTemplate

@Configuration
class Configuration {

    @Bean
    fun restOperations(): RestOperations = RestTemplate(HttpComponentsClientHttpRequestFactory())
}