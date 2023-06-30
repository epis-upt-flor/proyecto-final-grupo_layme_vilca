package com.example.thundergol.presentation.reservations

import android.util.Log
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.Card
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase

@Composable
fun ReservationScreen(
    viewModel : ReservationViewModel = hiltViewModel()
){
    val reservations by viewModel.reservations.observeAsState(initial = emptyList())

    LaunchedEffect(key1 = Unit ){
        viewModel.fetchReservationList()
        Log.d("QQQ","USER " + Firebase.auth.currentUser!!.uid)
    }
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(text = "Reservas" , style = MaterialTheme.typography.h4)
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(8.dp),
            userScrollEnabled = true,
            modifier = Modifier.padding(0.dp,0.dp,0.dp,48.dp)
        ){
            items(reservations){
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    elevation = 8.dp,
                    shape = MaterialTheme.shapes.medium
                ) {
                    Column(
                        modifier = Modifier.padding(16.dp)
                    ) {
                        Text(text = "Fecha : " + it.date)
                        Spacer(Modifier.width(8.dp))
                        Text(text = "Cancha : " + it.sportCourtId)
                        Spacer(Modifier.width(8.dp))
                        Text(text = "Hora inicio : " + it.hourStart)
                        Spacer(Modifier.width(8.dp))
                        Text(text = "Hora de termino : " + it.hourEnd)
                        Spacer(Modifier.width(8.dp))
                        Text(text =  "S/." + it.total.toString() , style = MaterialTheme.typography.h6)

                    }
                }
            }
        }
    }
}