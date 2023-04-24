package com.example.thundergol.firebase

import com.example.thundergol.sportscourts.SportCourtRepositoryImplementation
import com.example.thundergol.sportscourts.SportCourtRepositoryInterface
import com.google.firebase.firestore.FirebaseFirestore
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@InstallIn(SingletonComponent::class)
@Module
class RepositoryModule {
    @Provides
    @Singleton
    fun provideSportCourtRepository(
        database : FirebaseFirestore
    ) : SportCourtRepositoryInterface {
        return SportCourtRepositoryImplementation(database)
    }
}