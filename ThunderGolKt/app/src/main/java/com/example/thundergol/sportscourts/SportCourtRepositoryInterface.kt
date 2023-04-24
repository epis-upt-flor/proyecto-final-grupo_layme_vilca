package com.example.thundergol.sportscourts

import com.google.firebase.firestore.CollectionReference

interface SportCourtRepositoryInterface {
    suspend fun fetchListSportCourt() : List<SportCourtModel>
    suspend fun fetchOneSportCourt(id : String) : SportCourtModel

    fun getCollection() : CollectionReference
}