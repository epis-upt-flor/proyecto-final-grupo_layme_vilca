package com.example.thundergol.sportscourts

import com.google.firebase.firestore.CollectionReference
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.QuerySnapshot
import kotlinx.coroutines.tasks.await

class SportCourtRepositoryImplementation(
    val database : FirebaseFirestore,
) : SportCourtRepositoryInterface {
    override suspend fun fetchListSportCourt(): List<SportCourtModel> {
        //.orderBy("sportCenterId")
        val result : QuerySnapshot = database.collection("sportcourts").get().await()
        return if(result.isEmpty){
            emptyList()
        }else{
            result.documents.mapNotNull { documentSnapshot -> documentSnapshot.toObject(SportCourtModel::class.java) }
        }
    }

    override suspend fun fetchOneSportCourt(id: String): SportCourtModel {
        TODO("Not yet implemented")
    }

    override fun getCollection(): CollectionReference {
        return database.collection("sportcourts")
    }

}