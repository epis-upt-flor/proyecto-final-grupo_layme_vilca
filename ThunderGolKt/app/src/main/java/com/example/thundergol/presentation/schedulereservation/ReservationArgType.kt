package com.example.thundergol.presentation.schedulereservation


import com.example.thundergol.domain.model.ReservationModel
import com.example.thundergol.utils.JsonNavType
import com.google.gson.Gson

class ReservationArgType : JsonNavType<ReservationModel>() {
    override fun fromJsonParse(value: String): ReservationModel {
        return Gson().fromJson(value, ReservationModel::class.java)
    }

    override fun ReservationModel.getJsonParse(): String {
        return Gson().toJson(this)
    }

}