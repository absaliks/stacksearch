package absaliks.stacksearch

import absaliks.stacksearch.model.Owner
import absaliks.stacksearch.model.Page
import absaliks.stacksearch.model.Question
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.CsvSource
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity
import org.springframework.web.client.RestOperations
import java.time.Instant


class SearchServiceTest {

    private val restOperationsMock: RestOperations = mock(RestOperations::class.java)
    private val service: SearchService = SearchService(restOperationsMock)

    @ParameterizedTest
    @CsvSource(
        "kotlin hello world, 1, 2",
        "java12, 3, 5",
        "clean code, 0, 25"
    )
    fun searchSuccess(givenQuery: String, givenPage: Int, givenSize: Int) {
        val criteria = SearchCriteria(givenQuery, givenPage, givenSize)
        val expectedParameters = hashMapOf(
            "query" to criteria.query,
            "page" to criteria.page + 1,
            "size" to criteria.size
        )

        val expectedPage = Page(
            listOf(
                Question(
                    givenQuery,
                    givenPage.toString(),
                    Owner("John Doe"),
                    Instant.MIN
                )
            ), true
        )

        `when`(restOperationsMock.exchange(REMOTE_URL, HttpMethod.GET, null, typeRef<Page<Question>>(), expectedParameters))
            .thenReturn(ResponseEntity.ok(expectedPage))

        val results = service.searchQuestions(criteria)

        assertEquals(expectedPage, results)
    }
}