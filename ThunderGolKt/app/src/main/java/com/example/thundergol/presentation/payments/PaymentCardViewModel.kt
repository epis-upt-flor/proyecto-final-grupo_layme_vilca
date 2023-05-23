package com.example.thundergol.presentation.payments

import android.util.Log
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.thundergol.domain.model.CardModel
import com.example.thundergol.culqui.CulquiApi
import com.example.thundergol.utils.Helper
import javax.inject.Inject

class PaymentCardViewModel @Inject constructor(

) : ViewModel() {

    val cardNumber = MutableLiveData<String>()
    val cvv = MutableLiveData<String>()
    val month = MutableLiveData<String>()
    val year = MutableLiveData<String>()
    val isSubmitting = MutableLiveData<Boolean>()


    suspend fun createToken(cardModel : CardModel): String {
//        viewModelScope.launch {
            val token = CulquiApi.createToken(cardModel)
            isSubmitting.value = false
            return token?.id ?: ""
//        }
    }

    fun onDataCardChange(cardNumber : String,cvv : String , month : String , year : String){
        if(Helper.isValidCardnumber(cardNumber)){
            Log.d("VV","es valido")
        }else{
            Log.d("VV","No es valido")
        }
        this.cardNumber.value = cardNumber
        this.cvv.value = cvv
        this.month.value = month
        this.year.value = year

    }
}