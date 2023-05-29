package com.example.thundergol.ui.components.navigation

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.example.thundergol.ThunderGolE
import com.example.thundergol.presentation.confirmation.ConfirmationScreen
import com.example.thundergol.presentation.login.LoginScreen
import com.example.thundergol.notifications.NotificationScreen
import com.example.thundergol.presentation.payments.PaymentCardScreen
import com.example.thundergol.presentation.reservations.ReservationScreen
import com.example.thundergol.presentation.schedulereservation.ReservationArgType
import com.example.thundergol.domain.model.ReservationModel
import com.example.thundergol.presentation.schedulereservation.ScheduleReservationScreen
import com.example.thundergol.presentation.sportscourts.SportCourtArgType
import com.example.thundergol.domain.model.SportCourtModel
import com.example.thundergol.presentation.sportscourts.SportsCourtsScreen
import com.google.gson.Gson

@RequiresApi(Build.VERSION_CODES.O)
@Composable
fun NavigationRoutes(navController : NavHostController){
    NavHost(navController = navController, startDestination = ThunderGolE.SPORT_COURT.route){
//        composable(route = ThunderGolE.LoginRoute.name){
//            LoginScreen(goToMainScreen = { navController.navigate(ThunderGolE.MainRoute.name) } )
//        }
        composable(route = ThunderGolE.SPORT_COURT.route){
            SportsCourtsScreen(navController = navController)
        }
        composable(route = ThunderGolE.RESERVATION.route){
            ReservationScreen()
        }
        composable(route = ThunderGolE.NOTIFICATION.route){
            NotificationScreen()
        }
        composable(route = ThunderGolE.PROFILE.route){
            LoginScreen(goToMainScreen = { navController.navigate(ThunderGolE.SPORT_COURT.route) } )
        }
        //        RUTAS EXTRAS
        composable(
            route = ThunderGolE.SCHEDULE_RESERVATION.route,
            arguments = listOf(navArgument("sportCourt") { type = SportCourtArgType() })
        ){ it ->
            ScheduleReservationScreen(sportCourt = it.arguments?.getString("sportCourt").let { Gson().fromJson(it,
                SportCourtModel::class.java) },
                navController = navController
            )
        }

        composable(
            route = ThunderGolE.PAYMENT_CARD.route,
            arguments = listOf(navArgument("newReservation"){ type = ReservationArgType() })
        ){ it ->
            PaymentCardScreen(
                newReservation = it.arguments?.getString("newReservation").let { Gson().fromJson(it,
                    ReservationModel::class.java) },
                navController = navController
            )
        }

        composable(
            route = ThunderGolE.PAYMENT_CONFIRMATION.route,
            arguments = listOf(
                navArgument("newReservation"){ type = ReservationArgType() },
                navArgument("token"){ type = NavType.StringType}
            )
        ){ it ->
            ConfirmationScreen(
                newReservation = it.arguments?.getString("newReservation").let { Gson().fromJson(it,
                    ReservationModel::class.java) },
                token = it.arguments?.getString("token").let{ it ?: "" },
                navController = navController
            )
        }
    }
}