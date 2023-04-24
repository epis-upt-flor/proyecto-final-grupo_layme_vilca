package com.example.thundergol.login


import android.content.Intent
import android.util.Log
import android.widget.Toast
import androidx.activity.compose.ManagedActivityResultLauncher
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.Button
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TextField
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.thundergol.R
import com.example.thundergol.ThunderGolE
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.GoogleAuthProvider
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await


@Composable
fun LoginScreen(
    goToMainScreen : () -> Unit
) {
    Box(modifier = Modifier
        .fillMaxSize()
        .padding(16.dp)
    ){
        val TAG = "LIS"
        val context = LocalContext.current
        val viewModel = LoginViewModel()
        var user by remember {
            mutableStateOf(Firebase.auth.currentUser)
        }
        val email :String by viewModel.email.observeAsState(initial = "")
        val password :String by viewModel.password.observeAsState(initial = "")
        val isSubmitting :Boolean by viewModel.isSubmitting.observeAsState(initial = false)
        val token = "229069328254-dsh9ql6j8ougbfichcdj47aiiinr0hun.apps.googleusercontent.com"
        val launcher = rememberFirebaseAuthLauncher(
            viewModel,
            onAuthComplete = { result ->
                user = result.user
                goToMainScreen()
            },
            onAuthError = {
                Log.d(TAG,it.stackTraceToString())
                user = null
            }
        )

        Column(modifier = Modifier.fillMaxWidth().fillMaxHeight()) {
            Logo(Modifier.align(Alignment.CenterHorizontally))
//            Spacer(modifier = Modifier.padding(16.dp))
//            EmailField(email) { viewModel.onLoginChanged(it, password) }
//            Spacer(modifier = Modifier.padding(16.dp))
//            PasswordField(password){viewModel.onLoginChanged(email,it)}
            Spacer(modifier = Modifier.padding(16.dp))
//            Button(onClick = {
//                viewModel.logIn()
//            } , enabled = !isSubmitting ,modifier = Modifier.align(Alignment.CenterHorizontally)) {
//                Text(text = "Iniciar sesión")
//            }
            Spacer(modifier = Modifier.padding(16.dp))
            Button(
                modifier = Modifier.align(Alignment.CenterHorizontally),
                onClick = {
                val options = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                    .requestIdToken(token)
                    .requestEmail()
                    .build()
                val googleClient = GoogleSignIn.getClient(context,options)
                launcher.launch(googleClient.signInIntent)
//                Toast.makeText(context,"Presionaste en login con google",Toast.LENGTH_SHORT)
            }){
                Text(text = "Login con Google")
            }
        }
    }
}

@Composable
fun EmailField(email:String, onTextFieldChanged:(String)-> Unit){
    TextField(
        value = email,
        onValueChange = {onTextFieldChanged(it)},
        modifier = Modifier.fillMaxWidth(),
        placeholder = { Text( text = stringResource(R.string.lblEmail) ) },
        keyboardOptions =  KeyboardOptions(keyboardType = KeyboardType.Email),
        singleLine = true,
        maxLines = 1
    )
}
@Composable
fun PasswordField(password : String ,  onTextFieldChanged:(String)-> Unit){
    TextField(
        value = password,
        onValueChange = {onTextFieldChanged(it)},
        modifier = Modifier.fillMaxWidth(),
        placeholder = { Text( text = stringResource(R.string.lblPassword) ) },
        keyboardOptions =  KeyboardOptions(keyboardType = KeyboardType.Password),
        singleLine = true,
        maxLines = 1
    )
}

@Composable
fun Logo(modifier : Modifier){
    Image(painter = painterResource(id = R.drawable.logo_only_fox), contentDescription = "Header" , modifier = modifier)
}

@Composable
fun rememberFirebaseAuthLauncher(
    viewModel : LoginViewModel,
    onAuthComplete: (AuthResult) -> Unit,
    onAuthError: (ApiException) -> Unit
): ManagedActivityResultLauncher<Intent, ActivityResult> {
    val scope = rememberCoroutineScope()
    return rememberLauncherForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        val task = GoogleSignIn.getSignedInAccountFromIntent(result.data)
        try {
            val account = task.getResult(ApiException::class.java)!!
            val credential = GoogleAuthProvider.getCredential(account.idToken!!, null)
            scope.launch {
                Log.d("LIZ","Lanzando launch")
                val authResult = viewModel.logInWithGoogle(credential).await()
                onAuthComplete(authResult)
            }
        } catch (e: ApiException) {
            onAuthError(e)
        }
    }
}

