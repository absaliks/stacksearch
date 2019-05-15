package absaliks.stacksearch

import absaliks.stacksearch.model.Page
import absaliks.stacksearch.model.Question
import absaliks.stacksearch.model.emptyPage
import org.springframework.stereotype.Service
import org.springframework.web.client.RestOperations
import org.springframework.web.client.getForObject

const val REMOTE_URL =
    "http://api.stackexchange.com/2.2/search?intitle={query}&page={page}&pagesize={size}&site=stackoverflow"

@Service
class SearchService(private val restOperations: RestOperations) {

    fun searchQuestions(criteria: SearchCriteria): Page<Question> {
        val params = toStackExchangeParamMap(criteria)
        return restOperations.getForObject(REMOTE_URL, params) ?: emptyPage()
    }

    fun toStackExchangeParamMap(criteria: SearchCriteria): Map<String, Any> {
        return hashMapOf(
            "query" to criteria.query,
            "page" to criteria.page + 1,
            "size" to criteria.size
        )
    }
}
