package com.example.thundergol.utils

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import java.time.LocalDate
import java.time.format.TextStyle
import java.util.Locale

abstract class Helper {

    companion object Methods {
        @RequiresApi(Build.VERSION_CODES.O)
        fun getTwoLettersFromDay(date : LocalDate) : String{
            val dayName = date.dayOfWeek.getDisplayName(TextStyle.FULL, Locale("es","ES"))
            return dayName
//        return dayName.substring(0,1)
        }

        fun isValidCardnumber(card : String): Boolean {//4111 1111 1111 1111
            if(card.isEmpty() || card.length < 14) return false
            val sum = card
                .reversed()
                .map { char -> char.digitToInt() }
                .reduceIndexed{ position,acc,digit ->
                    if(position % 2 == 0) acc + digit
                    else acc + (
                        if(digit >= 5) digit * 2 - 9
                        else digit * 2
                    )
                }
            Log.d("SS",sum.toString())
            return (sum % 10) == 0
        }
    }

}