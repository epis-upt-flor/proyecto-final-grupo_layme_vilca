package com.example.thundergol.presentation.schedulereservation.tabs
import androidx.compose.runtime.Composable


typealias ComposableFun = @Composable () -> Unit

data class TabItem(
    val icon: Int,
    val title: String,
    var screen: ComposableFun
)