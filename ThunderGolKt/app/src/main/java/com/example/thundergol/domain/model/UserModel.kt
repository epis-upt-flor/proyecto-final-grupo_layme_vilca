package com.example.thundergol.domain.model

import android.net.Uri
import com.google.gson.Gson

data class UserModel(
    var uid : String = "",
    var username : String = "",
    var photoUrl : String = "",
    var email : String = "",
) {

    override fun toString(): String = Uri.encode(Gson().toJson(this))
}