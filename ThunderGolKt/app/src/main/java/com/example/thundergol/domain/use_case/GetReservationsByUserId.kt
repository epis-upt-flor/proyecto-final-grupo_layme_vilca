package com.example.thundergol.domain.use_case

import com.example.thundergol.domain.model.ReservationModel
import com.example.thundergol.domain.repository.ReservationRepositoryInterface

import javax.inject.Inject

class GetReservationsByUserId  @Inject constructor(
    private val repository : ReservationRepositoryInterface
){
    suspend operator fun invoke(userId : String): List<ReservationModel> {
        return repository.fetchReservationsByUserId(userId)
    }
}