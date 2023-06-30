package com.example.thundergol.presentation.reservations

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.thundergol.domain.model.ReservationModel
import com.example.thundergol.domain.repository.ReservationRepositoryInterface
import com.example.thundergol.domain.use_case.GetReservationsByUserId
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class ReservationViewModel @Inject constructor(
    private val getReservationsByUserId: GetReservationsByUserId
) : ViewModel() {
    val reservations = MutableLiveData<List<ReservationModel>>()

    suspend fun fetchReservationList(){
        val result = getReservationsByUserId(Firebase.auth.currentUser!!.uid)
        reservations.value = result
    }
}