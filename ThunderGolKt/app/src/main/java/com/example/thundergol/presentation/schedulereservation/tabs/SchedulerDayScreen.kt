package com.example.thundergol.presentation.schedulereservation.tabs

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.example.thundergol.domain.model.ReservationModel
import com.example.thundergol.presentation.schedulereservation.ScheduleReservationViewModel
import com.example.thundergol.domain.model.SportCourtModel


@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun SchedulerDayScreen(
    viewModel: ScheduleReservationViewModel,
    startHour: Int,
    endHour: Int,
    date: String,
    sportCourt: SportCourtModel,
    reservations: List<ReservationModel>
){

    val hours = mutableListOf<Int>()
    for(i in startHour until endHour) hours.add(i)

    val reservationDuration by viewModel.reservationDuration.observeAsState(1)
    val selectedItem by viewModel.newReservation.observeAsState(initial = null)

    LaunchedEffect(key1 = Unit){
        viewModel.resetReservation()
    }
    LazyColumn(
        verticalArrangement = Arrangement.spacedBy(8.dp),
        userScrollEnabled = true,
        modifier = Modifier.padding(0.dp,0.dp,0.dp,48.dp)
    ) {
        items(hours) {
            val isReserved = isReserved(it,date,reservations)
            RowHour(
                title = it.toString()+"h",
                color = getColorForRowHour(it,scheduleReservation = selectedItem, isReserved),
                onItemSelected = {
                    viewModel.onItemSelected(it,date,sportCourt)
                },
                isReserved = isReserved
            )
        }
    }
}

fun isReserved(hour: Int,date : String, reservations: List<ReservationModel>) : Boolean {
    return reservations.find{ hour >=it.hourStart  &&   hour < it.hourEnd && date == it.date } != null
}

fun getColorForRowHour(
    hour: Int,
    scheduleReservation: ReservationModel?,
    isReserved : Boolean
): Color {
    if(isReserved){
        return Color.Yellow
    }
    if(scheduleReservation == null){
        return Color.Transparent
    }
    if(hour >=scheduleReservation.hourStart  &&   hour < scheduleReservation.hourEnd){
        return Color.Green
    }
    return Color.Transparent
}


@Composable
fun RowHour(
    title : String,
    isReserved : Boolean,
    color : Color,
    onItemSelected : () -> Unit
){
    Row(
        modifier = Modifier
            .height(48.dp)
            .fillMaxWidth()
            .background(color)
            .clickable {
                if(!isReserved){
                    onItemSelected.invoke()
                }
            }
    ){
        Text(text = title , modifier = Modifier.padding(8.dp))
    }
}