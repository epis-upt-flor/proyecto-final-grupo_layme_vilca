package com.example.thundergol.di

import com.example.thundergol.data.repository.ReservationRepositoryImplementation
import com.example.thundergol.domain.repository.ReservationRepositoryInterface
import com.example.thundergol.data.repository.SportCourtRepositoryImplementation
import com.example.thundergol.domain.repository.SportCourtRepositoryInterface
import com.example.thundergol.domain.use_case.GetOneSportcourtUseCase
import com.example.thundergol.domain.use_case.GetSportCourtListUseCase
import com.google.firebase.firestore.FirebaseFirestore
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton


@Module
@InstallIn(SingletonComponent::class)
class RepositoryModule {
    @Provides
    @Singleton
    fun provideSportCourtRepository(
        database : FirebaseFirestore,
    ) : SportCourtRepositoryInterface {
        return SportCourtRepositoryImplementation(database)
    }

    @Provides
    @Singleton
    fun provideReservationRepository(
        database : FirebaseFirestore
    ) : ReservationRepositoryInterface {
        return ReservationRepositoryImplementation(database)
    }

    @Provides
    @Singleton
    fun provideGetSportCourtListUseCase(
        repository : SportCourtRepositoryInterface
    ) : GetSportCourtListUseCase {
        return GetSportCourtListUseCase(repository)
    }
}