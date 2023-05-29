package com.example.thundergol.domain.use_case

import com.example.thundergol.domain.model.ReservationModel
import com.example.thundergol.domain.repository.ReservationRepositoryInterface
import javax.inject.Inject

class CreateOneReservationUseCase @Inject constructor(
    private val repository : ReservationRepositoryInterface
) {
    suspend operator fun invoke(reservation : ReservationModel){
        return repository.storeReservation(reservation)
    }
}