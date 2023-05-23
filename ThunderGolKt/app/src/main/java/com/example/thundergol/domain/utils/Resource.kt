package com.example.thundergol.domain.utils

sealed class Resource<T>(val data: T, val message: String? = null) {
    class Success<T>(data: T) : Resource<T>(data)
    class Error<T>(message: String, data: T) : Resource<T>(data, message)
    class Loading<T>(data: T) : Resource<T>(data)
}