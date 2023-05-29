package com.example.thundergol.domain.model

data class ChargeModel(
    val amount: String = "750",
    val currency_code : String = "PEN",
    val email : String = "richard@piedpiper.com",
    val source_id : String =  "",
    val capture: Boolean  = true,
){

}