package com.example.thundergol.domain.repository

import com.example.thundergol.domain.model.ReservationModel
import com.google.firebase.firestore.CollectionReference

interface ReservationRepositoryInterface {
    suspend fun storeReservation( reservation: ReservationModel)

    suspend fun fetchReservationsBySportCourtId(sportCourtId : String) : List<ReservationModel>

    suspend fun fetchReservationsByUserId(userId : String) : List<ReservationModel>
    fun getCollection() : CollectionReference
}