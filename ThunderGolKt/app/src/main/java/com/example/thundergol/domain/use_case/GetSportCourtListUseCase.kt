package com.example.thundergol.domain.use_case

import android.util.Log
import com.example.thundergol.domain.model.SportCourtModel
import com.example.thundergol.domain.repository.SportCourtRepositoryInterface
import com.example.thundergol.domain.utils.Resource
import com.example.thundergol.presentation.sportscourts.SportCourtDetail
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.forEach
import kotlinx.coroutines.flow.map
import javax.inject.Inject

class GetSportCourtListUseCase @Inject constructor(
    private val repository : SportCourtRepositoryInterface
) {

//    suspend operator fun invoke(): Flow<MutableList<SportCourtModel>> {
//    suspend operator fun invoke(): List<SportCourtDetail> {
//        suspend operator fun invoke(): Flow<List<Deferred<SportCourtDetail>>> {
suspend operator fun invoke(): Flow<List<SportCourtDetail>> {
    val res = repository.fetchListSportCourt().map { it.awaitAll() }
//    res
         return res
    }
}