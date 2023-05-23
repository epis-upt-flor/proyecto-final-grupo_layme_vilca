package com.example.thundergol.presentation.sportscourts

import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import com.example.thundergol.R
import androidx.hilt.navigation.compose.hiltViewModel

import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.navigation.NavHostController
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.thundergol.ThunderGolE
import com.example.thundergol.ui.components.navigation.FilterOption

//@Preview(showBackground = true)
@Composable
fun SportsCourtsScreen(
    viewModel : SportCourtViewModel = hiltViewModel(),
    navController : NavHostController
){
    val sportsCourts by viewModel.sportsCourts.observeAsState(initial = emptyList())
    val sportsCourtsFiltered by viewModel.sportsCourtsFiltered.observeAsState(initial = emptyList())
    val isSearching by viewModel.isSearching.observeAsState(initial = false)
    val textSearch  :String by viewModel.textSearch.observeAsState(initial = "")


    val selectedFilter = remember { mutableStateOf(FilterOption.OPTION_1) }

    LaunchedEffect(key1 = Unit){
        viewModel.fetchSportsCourts()
//        Log.d("SCREN",response.size.toString())
    }

    Column(modifier = Modifier
        .fillMaxSize()
        .padding(16.dp)
    ){

        OutlinedTextField(
            value = textSearch,
            onValueChange = { viewModel.onChangeTextSearch(it) } ,
            modifier = Modifier.fillMaxWidth(),
            placeholder = { Text( text = stringResource(R.string.ph_search_text) ) },
            singleLine = true,
            maxLines = 1
        )
        Spacer(modifier = Modifier.height(16.dp))

        Column {
            Text("Filtrar por:")
            LazyRow {
                items(FilterOption.values().toList()) { option ->
                    FilterButton(
                        text = option.name,
                        isSelected = selectedFilter.value == option,
                        onSelected = { selectedFilter.value = option }
                    )
                    Spacer(Modifier.width(8.dp))
                }
            }
        }

        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(8.dp),
            userScrollEnabled = true,
            modifier = Modifier.padding(0.dp,0.dp,0.dp,48.dp)
        ){
            val listToShow = if (isSearching)  sportsCourtsFiltered else sportsCourts
            items(listToShow) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                    elevation = 8.dp,
                    shape = MaterialTheme.shapes.medium

                ) {
                    Row(
                        modifier = Modifier.clickable {
                            val json = it.toString()
                            navController.navigate("ScheduleReservation/$json")
                        }
                    ) {
                        AsyncImage(
                            model = ImageRequest.Builder(LocalContext.current)
                                .data(it.photo)
                                .crossfade(true)
                                .build(),
                            contentDescription = "Foto de portada",
                            placeholder = painterResource(R.drawable.logo_only_fox),
                            contentScale = ContentScale.FillBounds,
                            modifier = Modifier
                                .width(100.dp)
                                .height(100.dp)
                        )
                        Column(modifier = Modifier.padding(16.dp)) {
                            Text(text = it.name, style = MaterialTheme.typography.h6)
                            Text(text = it.sportCenterName, style = MaterialTheme.typography.body2)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun FilterButton(
    text: String,
    isSelected: Boolean,
    onSelected: () -> Unit
) {
    val context = LocalContext.current
    Button(
        onClick = { onSelected()
            Toast.makeText(context,"Filtrar por $text",Toast.LENGTH_SHORT).show()},
        colors = ButtonDefaults.buttonColors(
            backgroundColor = if (isSelected) Color.Blue else Color.Gray
        )
    ) {
        Text(text = text, color = Color.White)
    }
}
