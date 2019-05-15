package absaliks.stacksearch

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

const val SEARCH_PATH: String = "/search"

@RestController
@RequestMapping
class SearchController(private val service: SearchService) {

    @GetMapping(SEARCH_PATH)
    fun search(criteria: SearchCriteria) = service.searchQuestions(criteria)
}
