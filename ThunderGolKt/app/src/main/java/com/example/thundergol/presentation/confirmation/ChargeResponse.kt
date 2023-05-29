package com.example.thundergol.presentation.confirmation

import com.google.gson.annotations.SerializedName
import java.math.BigInteger

data class ChargeResponse(
    @SerializedName("object") val typeObject : String,
    val id : String ,
    val creation_date: BigInteger,
    val amount : BigInteger,
    val amount_refunded: BigInteger,
    val current_amount: BigInteger,
    val installments : Int,
    val installments_amount: Int,
    val currency_code : String,
    val email : String,
    val description: String,
) : java.io.Serializable {

}