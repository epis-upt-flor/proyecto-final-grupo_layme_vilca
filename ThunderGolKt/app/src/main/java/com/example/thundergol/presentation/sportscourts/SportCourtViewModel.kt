package com.example.thundergol.presentation.sportscourts

import android.util.Log
import androidx.lifecycle.*
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.thundergol.domain.model.SportCourtModel
import com.example.thundergol.domain.repository.SportCourtRepositoryInterface
import com.example.thundergol.domain.use_case.GetOneSportcourtUseCase
import com.example.thundergol.domain.use_case.GetSportCourtListUseCase
import com.example.thundergol.domain.utils.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import javax.inject.Inject

@HiltViewModel
class SportCourtViewModel @Inject constructor(
    private val getSportCourtListUseCase: GetSportCourtListUseCase ,
) : ViewModel(){
    val sportsCourts = MutableLiveData<List<SportCourtDetail>>()
    val textSearch = MutableLiveData<String>()
    val isSearching = MutableLiveData<Boolean>()
    val sportsCourtsFiltered = MutableLiveData<List<SportCourtDetail>>()



    fun onChangeTextSearch(text : String){
        textSearch.value = text
        isSearching.value = textSearch.value!!.isNotEmpty()
        if(isSearching.value == true && text.isNotEmpty()){
            sportsCourtsFiltered.value = sportsCourts.value?.filter { it.name?.lowercase()!!.contains(text.lowercase()) }
        }
    }

//    @OptIn(DelicateCoroutinesApi::class)
    suspend fun fetchSportsCourts()  {

        viewModelScope.launch {
            getSportCourtListUseCase.invoke().collect{
                sportsCourts.value = it
            }

        }
    }

}