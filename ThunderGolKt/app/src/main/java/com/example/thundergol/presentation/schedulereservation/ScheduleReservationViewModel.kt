package com.example.thundergol.presentation.schedulereservation

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.thundergol.domain.model.ReservationModel
import com.example.thundergol.domain.model.SportCourtModel
import com.example.thundergol.domain.repository.ReservationRepositoryInterface
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ScheduleReservationViewModel @Inject constructor(
    private val repositoryReservation : ReservationRepositoryInterface,
//    private val repositorySportCourt : SportCourtRepositoryInterface,
) : ViewModel() {
    val reservations = MutableLiveData<List<ReservationModel>>()
    val newReservation = MutableLiveData<ReservationModel>()
    val reservationDuration = MutableLiveData<Int>()

    fun onItemSelected(hourStart : Int , date : String,sportCourt : SportCourtModel){
        reservationDuration.value = 1
        val total = sportCourt.price * reservationDuration.value!!
        newReservation.value = ReservationModel(
            "",
            date,
            hourStart,
            hourEnd = (hourStart + reservationDuration.value!!),
            sportCourtId = sportCourt.id,
            userId = "",
            total,
            chargeCode = ""
        )
    }

    fun getReservation(): ReservationModel? {
        return newReservation.value
    }

    fun resetReservation() {
        newReservation.value = null
    }

    fun fetchReservationsBySportCourtId(sportCourtId : String){
        viewModelScope.launch {
            reservations.value = repositoryReservation.fetchReservationsBySportCourtId(sportCourtId)
        }
    }

    fun listenReservationsBySportCourtId(sportCourtId : String){

        repositoryReservation.getCollection().whereEqualTo("sportCourtId",sportCourtId).addSnapshotListener { snapshot, e ->
            if (e != null) {
                return@addSnapshotListener
            }

            if (snapshot != null) {
                val lista = snapshot.documents.mapNotNull { it.toObject(ReservationModel::class.java) }
                reservations.value = lista
            }
        }
    }

//    suspend fun fetchOneSportCourtDetail(sportCourt : SportCourtModel): SportCourtDetail {
//        return repositorySportCourt.fetchOneSportCourt(sportCourt)
//    }
}