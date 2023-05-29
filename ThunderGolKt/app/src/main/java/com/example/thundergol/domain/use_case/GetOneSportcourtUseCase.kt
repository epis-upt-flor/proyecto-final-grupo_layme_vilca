package com.example.thundergol.domain.use_case

import com.example.thundergol.domain.model.SportCourtModel
import com.example.thundergol.domain.repository.SportCourtRepositoryInterface
import com.example.thundergol.presentation.sportscourts.SportCourtDetail
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject

class GetOneSportcourtUseCase @Inject constructor(
    private val repository : SportCourtRepositoryInterface
){
    suspend operator fun invoke(sportCourt : SportCourtModel): SportCourtDetail {
        return repository.fetchOneSportCourt(sportCourt)
    }
}