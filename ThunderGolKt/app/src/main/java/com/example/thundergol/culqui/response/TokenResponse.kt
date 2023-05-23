package com.example.thundergol.culqui.response

import com.google.gson.annotations.SerializedName
import java.math.BigInteger

data class TokenResponse(
    @SerializedName("object") val typeObject : String,
    val id: String,
    val type: String,
    val email: String,
    val creation_date: BigInteger,
    val card_number: String,
    val last_four: String,
    val active: Boolean,
//    val iin: String,
//    val client: String,
//    val metadata: object,
) : java.io.Serializable {

}