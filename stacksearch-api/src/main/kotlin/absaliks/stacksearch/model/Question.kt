package absaliks.stacksearch.model

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.Instant

data class Question(
    val title: String,
    val link: String,
    val owner: Owner,
    @JsonProperty("creation_date") val createdOn: Instant
)

data class Owner(
    @JsonProperty("display_name") var displayName: String
)