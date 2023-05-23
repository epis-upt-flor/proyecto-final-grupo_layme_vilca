package com.example.thundergol.presentation.confirmation

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.*
import androidx.compose.material.Button
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.thundergol.ThunderGolE
import com.example.thundergol.domain.model.ChargeModel
import com.example.thundergol.domain.model.ReservationModel
import kotlinx.coroutines.launch
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun ConfirmationScreen(
    viewModel : ConfirmationViewModel = hiltViewModel(),
    newReservation : ReservationModel,
    token : String,
    navController: NavController
) {

    val scope = rememberCoroutineScope()

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .fillMaxHeight()
            .padding(16.dp)
    ) {

           Column {
               Row {
                    Column() {
                        Text(
                            text = newReservation.sportCourtId,
                            style = MaterialTheme.typography.h5,
                            fontWeight = FontWeight.Bold
                        )
                        Text(
                            text = "Top Gol",
                            style = MaterialTheme.typography.body1,
                        )
                    }
               }
               Row {
                   Column() {
                       Text(
                           text = DateTimeFormatter.ofLocalizedDate(FormatStyle.FULL).format(LocalDate.parse(newReservation.date)),
                           style = MaterialTheme.typography.subtitle1,
//                       fontWeight = FontWeight.Bold
                       )
                       Text(
                           text = "Hora : " + newReservation.hourStart,
                           style = MaterialTheme.typography.body1,
                       )
                   }
               }

               Row {
                   Column {
                       Text(
                           modifier = Modifier.fillMaxWidth(),
                           text = "Duración : 1 hora",
                           style = MaterialTheme.typography.body1,
//                       fontWeight = FontWeight.Bold
                       )
                       Column(
                           verticalArrangement = Arrangement.Center,
                           modifier = Modifier.height(128.dp)
                       ) {
                           Text(
                               modifier = Modifier.fillMaxWidth(),
                               text = "S/. "+newReservation.total.toString(),
                               style = MaterialTheme.typography.h4,
                               fontWeight = FontWeight.ExtraBold,
                               textAlign = TextAlign.Center
                           )
                       }
                   }
               }
               
               Button(
                   onClick = {
                       scope.launch {

                           val newCharge = ChargeModel(
                               amount = (newReservation.total * 100).toString(),
                               source_id = token,
                               email = "richard@piedpiper.com",
                               capture = false,
                           )
                            val charge = viewModel.storeCharge(newCharge)
                           if (charge != null){
                               newReservation.chargeCode = charge.id
                               viewModel.storeReservation(newReservation)
                               navController.navigate(ThunderGolE.SPORT_COURT.route)
                           }else{
                               Log.d("CH","No se pudo crear el cargo")
                           }
                       }
                   }
               ) {
                    Text(text = "Confirmar")
               }
           }

    }
}