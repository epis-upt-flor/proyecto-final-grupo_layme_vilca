package com.example.thundergol.data.repository


import com.example.thundergol.domain.model.MaterialModel
import com.example.thundergol.domain.model.SportCenterModel
import com.example.thundergol.domain.model.SportCourtModel
import com.example.thundergol.domain.repository.SportCourtRepositoryInterface
import com.example.thundergol.presentation.sportscourts.SportCourtDetail
import com.google.firebase.firestore.CollectionReference
import com.google.firebase.firestore.FirebaseFirestore

import com.google.firebase.firestore.ktx.snapshots
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.tasks.await

class SportCourtRepositoryImplementation(
    private val database : FirebaseFirestore,
) : SportCourtRepositoryInterface {

    @OptIn(DelicateCoroutinesApi::class)
    override suspend fun fetchListSportCourt(): Flow<List<Deferred<SportCourtDetail>>> {
        return getCollection()
            .snapshots()
            .map { snapshot -> snapshot.toObjects(SportCourtModel::class.java) }
            .map { list ->
                list.map {
                    GlobalScope.async(Dispatchers.Default) {
                        return@async fetchOneSportCourt(it)
                    }
                }
            }
    }



    override suspend fun fetchOneSportCourt(sportCourt : SportCourtModel): SportCourtDetail {
        val sportCenter = database.collection("sportcenters").document(sportCourt.sportCenterId).get().await().toObject(
            SportCenterModel::class.java)
        val material = database.collection("materials").document(sportCourt.materialId).get().await().toObject(
            MaterialModel::class.java)

        return SportCourtDetail(
            id = sportCourt.id,
            description = sportCourt.description,
            long = sportCourt.long,
            materialId = sportCourt.materialId,
            materialName = material?.name ?: "Cesped",
            name = sportCourt.name,
            sportCenterId = sportCourt.id,
            photo = sportCourt.photo,
            sportCenterName = sportCenter?.name ?: "Centro deportivo",
            price = sportCourt.price,
            width = sportCourt.width
        )

    }


    override fun getCollection(): CollectionReference {
        return database.collection("sportcourts")
    }

}