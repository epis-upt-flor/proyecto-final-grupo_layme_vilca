package com.example.thundergol.di

import com.google.firebase.firestore.FirebaseFirestore
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@InstallIn(SingletonComponent::class)
@Module
class FirestoreModule {
    @Provides
    @Singleton
    fun provideFirestoreInstance() : FirebaseFirestore {
        return FirebaseFirestore.getInstance()
    }
}