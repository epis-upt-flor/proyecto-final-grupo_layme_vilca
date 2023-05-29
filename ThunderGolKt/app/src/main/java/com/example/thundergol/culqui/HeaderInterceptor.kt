package com.example.thundergol.culqui

import android.util.Log
import okhttp3.Interceptor
import okhttp3.Response

class HeaderInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {

        val request = chain.request().newBuilder()
            .addHeader("Authorization","Bearer pk_test_9u8JQglNX1mtDPJe")
            .addHeader("Content-Type","application/json")
            .build()
        Log.d("RQ", request.url.toString())
        return chain.proceed(request)
    }

}