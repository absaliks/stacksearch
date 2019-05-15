package absaliks.stacksearch.model

import java.time.Instant

data class Question(
    val title: String,
    val link: String,
    val body: String,
    val owner: Owner,
    val createdOn: Instant
)

data class Owner(
    val displayName: String
)