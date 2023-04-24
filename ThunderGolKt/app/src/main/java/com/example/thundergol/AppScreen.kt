package com.example.thundergol

import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.thundergol.login.LoginScreen
import com.example.thundergol.sportscourts.SportsCourtsScreen
import com.example.thundergol.ui.components.navigation.BottomBar
import com.example.thundergol.ui.components.navigation.BottomBarScreenSealed
import com.example.thundergol.ui.components.navigation.NavigationRoutes

@Composable
fun ThunderGolApp() {
    val navController = rememberNavController()
//    NavigationRoutes(navController)
    Scaffold(
        bottomBar = { BottomBar(navController) }
    ) {
        Modifier.padding(it)
        NavigationRoutes(navController)
    }
}