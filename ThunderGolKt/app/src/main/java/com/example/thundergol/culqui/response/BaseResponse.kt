package com.example.thundergol.culqui.response

class BaseResponse<T> {
    var message: String? = null
    var status: Boolean = false
    var errors: Array<String>? = null
    var code: String? = null
    var data: T? = null
}