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
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.AuthCredential
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.launch


class LoginViewModel() : ViewModel() {
    private val TAG : String = "LOGIN_VM"
    private val auth : FirebaseAuth = Firebase.auth
    private val _email = MutableLiveData<String>()
    val email : LiveData<String> = _email

    private val _password = MutableLiveData<String>()
    val password : LiveData<String> = _password

    private val _isSubmitting = MutableLiveData<Boolean>()
    val isSubmitting : LiveData<Boolean> = _isSubmitting

    private fun isValidEmail(email:String):Boolean = Patterns.EMAIL_ADDRESS.matcher(email).matches()

    fun onLoginChanged(email :String , password : String ){
        _email.value = email
        _password.value = password
    }

    fun logIn(){
        _isSubmitting.value = true
    }

     fun logInWithGoogle(credential : AuthCredential) : Task<AuthResult> {
        return auth.signInWithCredential(credential)
    }

}