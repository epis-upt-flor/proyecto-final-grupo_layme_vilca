package com.example.thundergol.presentation.sportscourts

import android.net.Uri
import com.example.thundergol.domain.model.SportCourtModel
import com.google.gson.Gson

data class SportCourtDetail(
    val description: String = "",
    val id: String = "",
    val long: Int = 0,
    val materialId: String = "",
    val name: String = "",
    val photo: String= "",
    val price: Int = 0,
    val sportCenterId: String = "",
    val width: Int = 0,
    val materialName: String = "",
    val sportCenterName: String = "",
) {
    override fun toString(): String = Uri.encode(Gson().toJson(this))
}