package com.example.thundergol.culqui

import com.example.thundergol.domain.model.ChargeModel
import com.example.thundergol.presentation.confirmation.ChargeResponse
import com.example.thundergol.culqui.response.TokenResponse
import com.example.thundergol.domain.model.CardModel
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

abstract class CulquiApi {

    companion object Methods {
        private fun getInstanceSecure() : CulquiApiClient {
            return Retrofit.Builder()
                .baseUrl("https://secure.culqi.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .client(getClient())
                .build()
                .create(CulquiApiClient::class.java)
        }

        private fun getClient() : OkHttpClient{
            return OkHttpClient.Builder()
                .addInterceptor(HeaderInterceptor())
                .build()
        }
        private fun getInstance() : CulquiApiClient {
            return Retrofit.Builder()
                .baseUrl("https://api.culqi.com/")
                .addConverterFactory(GsonConverterFactory.create())
                .client(getClient())
                .build()
                .create(CulquiApiClient::class.java)
        }

        suspend fun createToken(cardModel : CardModel): TokenResponse? {
            return try {
                val call = getInstanceSecure().createToken(cardModel)
                call.body()
            }catch (e : Exception){
                e.printStackTrace()
                null
            }
        }

        suspend fun storeCharge(charge : ChargeModel) : ChargeResponse? {
            return try{
                getInstance().createCharge(charge).body()
            }catch (e : Exception){
                e.printStackTrace()
                null
            }
        }
    }
}