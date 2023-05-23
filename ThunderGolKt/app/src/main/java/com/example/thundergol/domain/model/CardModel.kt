package com.example.thundergol.domain.model

data class CardModel(
    val card_number : String = "",
    val cvv : String = "",
    val expiration_month : Int = 0,
    val expiration_year : String = "",
    val email : String = "",
) : java.io.Serializable {

}