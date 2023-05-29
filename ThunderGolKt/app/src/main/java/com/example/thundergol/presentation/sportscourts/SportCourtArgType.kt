package com.example.thundergol.presentation.sportscourts

import com.example.thundergol.utils.JsonNavType
import com.google.gson.Gson

class SportCourtArgType : JsonNavType<SportCourtDetail>() {
    override fun fromJsonParse(value: String): SportCourtDetail {
        return Gson().fromJson(value, SportCourtDetail::class.java)
    }

    override fun SportCourtDetail.getJsonParse(): String {
        return Gson().toJson(this)
    }

}