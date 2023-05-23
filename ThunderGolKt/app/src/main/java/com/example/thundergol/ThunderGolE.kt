package com.example.thundergol

enum class ThunderGolE(val route : String) {
    LOGIN("login"),
    SPORT_COURT("sportcourt"),
    NOTIFICATION("notification"),
    PROFILE("profile"),
    RESERVATION("reservation"),
    SCHEDULE_RESERVATION("ScheduleReservation/{sportCourt}"),
    SCHEDULE("schedule"),
    PAYMENT("payment"),

    PAYMENT_CARD("payment_card/{newReservation}"),
    PAYMENT_CONFIRMATION("confirmation/{newReservation}/{token}")
}