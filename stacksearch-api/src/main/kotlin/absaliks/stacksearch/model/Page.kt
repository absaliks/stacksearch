package absaliks.stacksearch.model

import com.fasterxml.jackson.annotation.JsonProperty


fun <T> emptyPage(): Page<T> = Page(emptyList(), false)

data class Page<T>(
    val items: List<T>,
    @JsonProperty("has_more") val has_more: Boolean
)