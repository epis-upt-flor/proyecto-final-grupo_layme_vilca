package com.example.thundergol.presentation.payments

import androidx.compose.foundation.layout.*
import androidx.compose.material.Button
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.navigation.NavController
import com.example.thundergol.domain.model.CardModel
import com.example.thundergol.domain.model.ReservationModel
import kotlinx.coroutines.launch


@Composable
fun PaymentCardScreen(
    viewModel : PaymentCardViewModel = hiltViewModel(),
    newReservation: ReservationModel,
    navController: NavController
) {
    val cardNumber by viewModel.cardNumber.observeAsState(initial = "")
    val cvv by viewModel.cvv.observeAsState(initial = "")
    val month by viewModel.month.observeAsState(initial = "")
    val year by viewModel.year.observeAsState(initial = "")
    val isSubmitting by viewModel.isSubmitting.observeAsState(initial = false)
    val scope = rememberCoroutineScope()

//    LaunchedEffect(key1 = Unit){
//        viewModel.createToken(
//            Card(
//                card_number = "4111111111111111",
//                cvv = "123",
//                expiration_month = 9,
//                expiration_year = "2025",
//                email = "ichard@piedpiper.com"
//            )
//        )
//    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .fillMaxHeight()
            .padding(16.dp)
    ) {
        OutlinedTextField(
            value = cardNumber,
            onValueChange = { viewModel.onDataCardChange(it,cvv,month,year)},
            label = { Text(text = "Número de tarjeta")},
            modifier = Modifier.fillMaxWidth()

        )
        Spacer(modifier = Modifier.padding(16.dp))
        OutlinedTextField(
            value = cvv,
            onValueChange = { viewModel.onDataCardChange(cardNumber,it,month,year)} ,
            label = { Text(text = "CVV")},
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.padding(16.dp))
        OutlinedTextField(
            value = month.toString(),
            onValueChange = {
                viewModel.onDataCardChange(cardNumber,cvv,it,year)
            } ,
            label = { Text(text = "Mes")},
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.padding(16.dp))
        OutlinedTextField(
            value = year,
            onValueChange = { viewModel.onDataCardChange(cardNumber,cvv,month,it)} ,
            label = { Text(text = "Año")},
            modifier = Modifier.fillMaxWidth()
        )
        Spacer(modifier = Modifier.padding(16.dp))

        Button(
            modifier = Modifier.fillMaxWidth(),
            enabled = !isSubmitting,
            onClick = {
                scope.launch {
                    val token = viewModel.createToken(
                        CardModel(
                            card_number = cardNumber,
                            cvv = cvv,
                            expiration_month = month.toInt(),
                            expiration_year = year,
                            email = "ichard@piedpiper.com"
                        )
                    )
                    if(token != ""){
                        val newReservationJson = newReservation.toString()
                        navController.navigate("confirmation/$newReservationJson/$token")
                    }
                }
            }
        ) {
            Text(text = "Continuar")
        }
    }
}