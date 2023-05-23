package com.example.thundergol.domain.repository

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.thundergol.domain.model.SportCourtModel
import com.example.thundergol.domain.utils.Resource
import com.example.thundergol.presentation.sportscourts.SportCourtDetail
import com.google.firebase.firestore.CollectionReference
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.flow.Flow

interface SportCourtRepositoryInterface {
    suspend fun fetchListSportCourt(
//    ): Flow<MutableList<SportCourtDetail>>
    ): Flow<List<Deferred<SportCourtDetail>>>
//    ):List<SportCourtDetail>
    suspend fun fetchOneSportCourt(sportCourt : SportCourtModel) : SportCourtDetail

    fun getCollection() : CollectionReference
}