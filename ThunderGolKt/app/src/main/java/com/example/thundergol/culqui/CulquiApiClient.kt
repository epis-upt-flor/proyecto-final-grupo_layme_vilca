package com.example.thundergol.culqui

import com.example.thundergol.domain.model.ChargeModel
import com.example.thundergol.presentation.confirmation.ChargeResponse
import com.example.thundergol.culqui.response.TokenResponse
import com.example.thundergol.domain.model.CardModel
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface CulquiApiClient {
    @POST("/v2/tokens/")
    suspend fun createToken(@Body card : CardModel) : Response<TokenResponse>

    @POST("/v2/charges/")
    suspend fun createCharge(@Body charge : ChargeModel) : Response<ChargeResponse>
}