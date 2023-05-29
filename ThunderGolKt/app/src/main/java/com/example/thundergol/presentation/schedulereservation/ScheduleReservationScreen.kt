package com.example.thundergol.presentation.schedulereservation

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.PagerState
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.MutableLiveData
import androidx.navigation.NavHostController
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.thundergol.R
import com.example.thundergol.presentation.schedulereservation.tabs.SchedulerDayScreen
import com.example.thundergol.presentation.schedulereservation.tabs.TabItem
import com.example.thundergol.presentation.sportscourts.SportCourtDetail
import com.example.thundergol.domain.model.SportCourtModel
import com.example.thundergol.utils.Helper
import kotlinx.coroutines.launch
import java.time.LocalDate

@RequiresApi(Build.VERSION_CODES.O)
@OptIn(ExperimentalFoundationApi::class)
@Composable
fun ScheduleReservationScreen(
    viewModel: ScheduleReservationViewModel = hiltViewModel(),
    sportCourt : SportCourtModel,
    navController : NavHostController
){
    val reservations by viewModel.reservations.observeAsState(initial = emptyList())
    val currentReservation by viewModel.newReservation.observeAsState(initial = null)
    val scope = rememberCoroutineScope()
    var today = LocalDate.now()
    val sevenDays = (0..6).map { today.plusDays(it.toLong()) }
    val tabs = sevenDays.map {
        TabItem(R.drawable.baseline_sports_soccer_24,Helper.getTwoLettersFromDay(it)) {
            SchedulerDayScreen(viewModel,startHour = 6, endHour = 22, date = it.toString(), sportCourt = sportCourt,reservations)
        }
    }
    val pagerState = rememberPagerState()
    val _sportCourtDetail = MutableLiveData<SportCourtDetail>()
//    val sportCourtDetail = _sportCourtDetail.observeAsState(initial = null)


    LaunchedEffect(key1 = Unit){
        viewModel.fetchReservationsBySportCourtId(sportCourtId = sportCourt.id)
        viewModel.listenReservationsBySportCourtId(sportCourtId = sportCourt.id)
//        _sportCourtDetail.value = viewModel.fetchOneSportCourtDetail(sportCourt)
    }
    Column {

            AsyncImage(
                model = ImageRequest.Builder(LocalContext.current)
                    .data(sportCourt.photo)
                    .crossfade(true)
                    .build(),
                contentDescription = "Foto de portada",
                placeholder = painterResource(R.drawable.logo_only_fox),
                contentScale = ContentScale.FillBounds,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(180.dp)
            )
            Column(modifier = Modifier
                .fillMaxWidth()
                .fillMaxHeight()) {

                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = sportCourt.name)
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(text = "Precio : S/." + sportCourt.price)
                    Spacer(modifier = Modifier.height(16.dp))
                    OutlinedButton(
                        enabled =  currentReservation != null,
                        onClick = {
                            viewModel.getReservation()?.let{
                                val json = it.toString()
                                navController.navigate("payment_card/$json")
                            }

//                            scope.launch {
//                                viewModel.getReservation()?.let { viewModel.storeReservation(it) }
//                            }
                        }
                    ) {
                        Text(text = "Reservar")
                    }
                }
                Tabs(tabs = tabs , pagerState = pagerState)
                TabContent(tabs = tabs, pagerState = pagerState)
            }

    }
}

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun Tabs(tabs: List<TabItem>, pagerState: PagerState) {
    val scope = rememberCoroutineScope()
    // OR ScrollableTabRow()
    ScrollableTabRow(

        // Our selected tab is our current page
        selectedTabIndex = pagerState.currentPage,
        // Override the indicator, using the provided pagerTabIndicatorOffset modifier
        backgroundColor = Color.DarkGray,
        contentColor = Color.White,
//        indicator = { tabPositions ->
//            TabRowDefaults.Indicator(
//                modifier = Modifier.pagerTabIndicatorOffset(pagerState,tabPositions)
//            )
//        }
    ) {
        // Add tabs for all of our pages
        tabs.forEachIndexed { index, tab ->
            // OR Tab()
            LeadingIconTab(
                modifier = Modifier.fillMaxWidth(),
                icon = { Icon(painter = painterResource(id = tab.icon), contentDescription = "") },
                text = { Text(tab.title) },
                selected = pagerState.currentPage == index,
                onClick = {
                    scope.launch {
                        pagerState.animateScrollToPage(index)
                    }
                },
            )
        }
    }
}


@OptIn(ExperimentalFoundationApi::class)
@Composable
fun TabContent(
    tabs: List<TabItem>, pagerState: PagerState
){
    HorizontalPager(state = pagerState, pageCount = tabs.size) { page ->
        tabs[page].screen()
    }
}