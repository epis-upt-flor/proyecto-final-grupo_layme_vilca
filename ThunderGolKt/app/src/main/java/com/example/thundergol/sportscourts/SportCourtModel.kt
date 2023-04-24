package com.example.thundergol.sportscourts

data class SportCourtModel (
    var id: String? = null,
    var name: String? = null,
    var description: String? = null,
    var businessHours: String? = null,
//    var long: Float? = null,
//    var wide: Float? = null,
    var photo : String? = null,
    var price : String? = null,
    val sportCenterId : String? = null,
)