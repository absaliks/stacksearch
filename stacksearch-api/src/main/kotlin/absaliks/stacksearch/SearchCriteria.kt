package absaliks.stacksearch

data class SearchCriteria(
    val query: String,
    val page: Int = 0,
    val size: Int = 25,
    val pages: String = "0"
)