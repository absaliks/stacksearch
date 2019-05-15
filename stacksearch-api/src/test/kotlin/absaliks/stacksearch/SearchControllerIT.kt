package absaliks.stacksearch

import absaliks.stacksearch.model.Page
import absaliks.stacksearch.model.Question
import absaliks.stacksearch.model.emptyPage
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.web.server.LocalServerPort
import org.springframework.http.HttpMethod
import java.util.function.Consumer

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
internal class SearchControllerIT {

    @LocalServerPort
    private val port: Int = 0

    @Autowired
    private lateinit var restTemplate: TestRestTemplate

    @Test
    fun `search three kotlin questions`() {
        val query = "kotlin"
        val size = 3

        val url = "http://localhost:$port$SEARCH_PATH?query={query}&page={page}&size={size}"
        val params = hashMapOf(
                "query" to query,
                "page" to 0,
                "size" to size
        )
        val page = this.restTemplate.exchange(url, HttpMethod.GET, null, typeRef<Page<Question>>(), params).body ?: emptyPage()

        assertEquals(size, page.items.size)
        page.items.forEach(Consumer { item -> assertTrue(item.title.contains(query, true))})
    }
}