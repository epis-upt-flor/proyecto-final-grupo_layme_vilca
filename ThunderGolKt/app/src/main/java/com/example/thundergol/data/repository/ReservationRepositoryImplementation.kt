package com.example.thundergol.data.repository

import com.example.thundergol.domain.model.ReservationModel
import com.example.thundergol.domain.repository.ReservationRepositoryInterface
import com.google.firebase.firestore.CollectionReference
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.QuerySnapshot
import kotlinx.coroutines.tasks.await

class ReservationRepositoryImplementation(
    private val database : FirebaseFirestore
) : ReservationRepositoryInterface {

    override suspend fun storeReservation(reservation: ReservationModel) {
        val newDocument = database.collection("reservations").document()
        reservation.id = newDocument.id
        newDocument.set(reservation).await()
    }

    override suspend fun fetchReservationsBySportCourtId(sportCourtId: String) : List<ReservationModel> {
        val result : QuerySnapshot  = database.collection("reservations").whereEqualTo("sportCourtId",sportCourtId).get().await()
        return if(result.isEmpty){
            emptyList()
        }else{
            result.map { documentSnapshot -> documentSnapshot.toObject(ReservationModel::class.java) }
        }
    }

    override suspend fun fetchReservationsByUserId(userId : String): List<ReservationModel> {
        val result : QuerySnapshot  = database.collection("reservations").whereEqualTo("userId",userId).get().await()
        return if(result.isEmpty){
            emptyList()
        }else{
            result.map { documentSnapshot -> documentSnapshot.toObject(ReservationModel::class.java) }
        }
    }


    override fun getCollection(): CollectionReference {
        return database.collection("reservations")
    }
}