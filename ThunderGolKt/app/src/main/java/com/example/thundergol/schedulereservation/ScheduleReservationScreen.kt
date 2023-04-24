package com.example.thundergol.schedulereservation

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material.Card
import androidx.compose.material.MaterialTheme
import androidx.compose.material.OutlinedButton
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.thundergol.R

@Composable
fun ScheduleReservationScreen(){
    Column {

            AsyncImage(
                model = ImageRequest.Builder(LocalContext.current)
                    .data("https://scontent.flim20-1.fna.fbcdn.net/v/t39.30808-6/336126008_223744093508748_1278885746202340520_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=XCqEhMUUQNcAX_Sdcsn&_nc_ht=scontent.flim20-1.fna&oh=00_AfAG6xElCdSZLKM70sTWNnExYQCKHmzG8Nne7ArTCxD6eg&oe=6448F148")
                    .crossfade(true)
                    .build(),
                contentDescription = "Foto de portada",
                placeholder = painterResource(R.drawable.logo_only_fox),
                contentScale = ContentScale.FillBounds,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp)
            )
            Column(modifier = Modifier.fillMaxWidth().fillMaxHeight().padding(16.dp)) {

                Text(text = "Cancha")
                Spacer(modifier = Modifier.height(16.dp))
                Text(text = "Precio : S/. 50.00")
                Spacer(modifier = Modifier.height(16.dp))
                OutlinedButton(onClick = { /*TODO*/ },) {
                    Text(text = "Reservar")
                }
            }

    }
}