package com.example.thundergol.presentation.login


import android.app.Activity
import android.content.Intent
import android.provider.Settings.Global.getString
import android.util.Log
import android.util.Patterns
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.navigation.NavHostController
import com.example.thundergol.R
import com.example.thundergol.domain.model.UserModel
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.AuthCredential
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.launch


class LoginViewModel() : ViewModel() {
    private val auth : FirebaseAuth = Firebase.auth

     fun logInWithGoogle(credential : AuthCredential) : Task<AuthResult> {
        return auth.signInWithCredential(credential)
    }
}