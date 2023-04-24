package com.example.thundergol.ui.components.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.thundergol.ThunderGolE
import com.example.thundergol.login.LoginScreen
import com.example.thundergol.notifications.NotificationScreen
import com.example.thundergol.profile.ProfileScreen
import com.example.thundergol.reservations.ReservationScreen
import com.example.thundergol.schedulereservation.ScheduleReservationScreen
import com.example.thundergol.sportscourts.SportsCourtsScreen

@Composable
fun NavigationRoutes(navController : NavHostController){
    NavHost(navController = navController, startDestination = ThunderGolE.MainRoute.name){
//        composable(route = ThunderGolE.LoginRoute.name){
//            LoginScreen(goToMainScreen = { navController.navigate(ThunderGolE.MainRoute.name) } )
//        }
        composable(route = ThunderGolE.MainRoute.name){
            SportsCourtsScreen(navController = navController)
        }
        composable(route = ThunderGolE.ReservationRoute.name){
            ReservationScreen()
        }
        composable(route = ThunderGolE.NotificationRoute.name){
            NotificationScreen()
        }
        composable(route = ThunderGolE.ProfileRoute.name){
//            ProfileScreen()
            LoginScreen(goToMainScreen = { navController.navigate(ThunderGolE.MainRoute.name) } )
        }
        //        RUTAS EXTRAS
        composable(route = ThunderGolE.ScheduleReservationRoute.name){
            ScheduleReservationScreen()
        }
    }
}