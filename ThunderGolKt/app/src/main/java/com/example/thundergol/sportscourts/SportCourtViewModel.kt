package com.example.thundergol.sportscourts

import android.util.Log
import androidx.compose.runtime.mutableStateListOf
import androidx.lifecycle.*
import com.google.firebase.firestore.ktx.toObject
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SportCourtViewModel @Inject() constructor(
    private val repositorySportCourt : SportCourtRepositoryInterface
) : ViewModel(){
    val sportsCourts = MutableLiveData<List<SportCourtModel>>()
    val textSearch = MutableLiveData<String>()
    val isSearching = MutableLiveData<Boolean>()
    val sportsCourtsFiltered = MutableLiveData<List<SportCourtModel>>()


//    init {
//        fetchSportsCourts()
//    }

    fun onChangeTextSearch(text : String){
        textSearch.value = text
        isSearching.value = textSearch.value!!.isNotEmpty()
        if(isSearching.value == true && text.isNotEmpty()){
            sportsCourtsFiltered.value = sportsCourts.value?.filter { it.name?.lowercase()!!.contains(text.lowercase()) }
        }
    }

    fun fetchSportsCourts(){
        viewModelScope.launch{
            sportsCourts.value = repositorySportCourt.fetchListSportCourt()
        }
    }

    fun listenToSportsCourts(){
        repositorySportCourt.getCollection().addSnapshotListener { snapshot, e ->
            if (e != null) {
//                Log.w(TAG, "Listen failed.", e)
                return@addSnapshotListener
            }

            if (snapshot != null) {
                val lista = snapshot.documents.mapNotNull { it.toObject(SportCourtModel::class.java) }
                Log.d("SCVM",lista.count().toString())
                sportsCourts.value = lista
            }
//            else {
//
//            }
        }
    }
}