package absaliks.stacksearch

import absaliks.stacksearch.model.Page
import absaliks.stacksearch.model.Question
import absaliks.stacksearch.model.emptyPage
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpMethod
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.client.RestOperations

const val REMOTE_URL =
    "http://api.stackexchange.com/2.2/search?intitle={query}&page={page}&pagesize={size}&site=stackoverflow"

inline fun <reified T> typeRef() = object : ParameterizedTypeReference<T>() {}

@Service
class SearchService(private val restOperations: RestOperations) {

    fun searchQuestions(criteria: SearchCriteria): Page<Question> {
        val params = toStackExchangeParamMap(criteria)
        val responseEntity: ResponseEntity<Page<Question>> =
                restOperations.exchange(REMOTE_URL, HttpMethod.GET, null, typeRef<Page<Question>>(), params)

        return responseEntity.body ?: emptyPage()
    }

    fun toStackExchangeParamMap(criteria: SearchCriteria): HashMap<String, Any?> {
        return hashMapOf(
            "query" to criteria.query,
            "page" to criteria.page + 1,
            "size" to criteria.size
        )
    }
}
