package com.example.thundergol.domain.model

import android.net.Uri
import com.google.gson.Gson

data class ReservationModel(
    var id : String = "",
    val date : String = "",
    val hourStart : Int = 0,
    val hourEnd : Int = 0,
    val sportCourtId : String = "",
    var userId : String = "",
    val total : Int = 0,
    var chargeCode : String = "",
    var payed : Boolean = false,
    var methodPayment : String = ""

){
    override fun toString(): String = Uri.encode(Gson().toJson(this))
}
