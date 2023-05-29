package com.example.thundergol.presentation.confirmation

import androidx.lifecycle.ViewModel
import com.example.thundergol.culqui.CulquiApi
import com.example.thundergol.domain.model.ChargeModel
import com.example.thundergol.domain.model.ReservationModel
import com.example.thundergol.domain.repository.ReservationRepositoryInterface
import com.example.thundergol.domain.use_case.CreateOneReservationUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
@HiltViewModel
class ConfirmationViewModel @Inject constructor(
//    private val repositoryReservation : ReservationRepositoryInterface
    private val createOneReservationUseCase: CreateOneReservationUseCase
) : ViewModel() {
    suspend fun storeReservation(reservation: ReservationModel) {
        createOneReservationUseCase(reservation)
    }

    suspend fun storeCharge(charge : ChargeModel): ChargeResponse? {
        return CulquiApi.storeCharge(charge)
    }
}