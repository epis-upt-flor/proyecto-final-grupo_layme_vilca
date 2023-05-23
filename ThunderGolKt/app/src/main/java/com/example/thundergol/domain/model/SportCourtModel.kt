package com.example.thundergol.domain.model

import android.net.Uri
import com.google.gson.Gson

data class SportCourtModel (
    var description: String = "" ,
    var id: String = "",
    var long: Int = 0,
    var materialId : String = "",
    var name: String = "",
    var photo : String= "",
    var price : Int = 0,
    var sportCenterId : String = "",
    var width: Int = 0
){
    override fun toString(): String = Uri.encode(Gson().toJson(this))
}