package com.example.thundergol.ui.components.navigation

import com.example.thundergol.R
import com.example.thundergol.ThunderGolE

sealed  class BottomBarScreenSealed(
    val route: String,
    val title: String,
    val icon: Int,
    val icon_focused: Int
) {
    object SportCourt: BottomBarScreenSealed(
        route = ThunderGolE.MainRoute.name,
        title = "Canchas",
        icon = R.drawable.baseline_sports_soccer_24,
        icon_focused = R.drawable.baseline_sports_soccer_24
    )

    object Notification: BottomBarScreenSealed(
        route = ThunderGolE.NotificationRoute.name,
        title = "Notificaciones",
        icon = R.drawable.baseline_notifications_none_24,
        icon_focused = R.drawable.baseline_notifications_none_24
    )

    object Reservation: BottomBarScreenSealed(
        route = ThunderGolE.ReservationRoute.name,
        title = "Reservaciones",
        icon = R.drawable.baseline_list_alt_24,
        icon_focused = R.drawable.baseline_list_alt_24
    )

    object Profile: BottomBarScreenSealed(
        route = ThunderGolE.ProfileRoute.name,
        title = "Reservaciones",
        icon = R.drawable.baseline_person_4_24,
        icon_focused = R.drawable.baseline_person_4_24
    )
}