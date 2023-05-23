package com.example.thundergol

import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.thundergol.presentation.login.LoginScreen
import com.example.thundergol.presentation.sportscourts.SportsCourtsScreen
import com.example.thundergol.ui.components.navigation.BottomBar
import com.example.thundergol.ui.components.navigation.BottomBarScreenSealed
import com.example.thundergol.ui.components.navigation.NavigationRoutes

@RequiresApi(Build.VERSION_CODES.O)
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