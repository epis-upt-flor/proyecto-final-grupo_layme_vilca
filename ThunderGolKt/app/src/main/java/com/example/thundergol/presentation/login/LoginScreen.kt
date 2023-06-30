package com.example.thundergol.presentation.login


import android.content.Intent
import android.util.Log
import android.widget.Toast
import androidx.activity.compose.ManagedActivityResultLauncher
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.request.ImageRequest
import com.example.thundergol.R
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseUser
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
        val token = "229069328254-dsh9ql6j8ougbfichcdj47aiiinr0hun.apps.googleusercontent.com"
        val launcher = rememberFirebaseAuthLauncher(
            viewModel,
            onAuthComplete = { result ->
                user = result.user
//                user.g

                goToMainScreen()
            },
            onAuthError = {
                Log.d(TAG,it.stackTraceToString())
//                user = null
            }
        )

        Column(modifier = Modifier
            .fillMaxWidth()
            .fillMaxHeight()) {


//            if(Firebase.auth.currentUser != null && Firebase.auth.currentUser!!.photoUrl.toString() != ""){
//
//            }

            Spacer(modifier = Modifier.padding(16.dp))
            Firebase.auth.currentUser?.let { UserInfo(it) }
            Spacer(modifier = Modifier.padding(16.dp))
            if(Firebase.auth.currentUser == null){
                Image(
                    painter = painterResource(id = R.drawable.logo_only_fox),
                    contentDescription = "Header" ,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
                Button(
                    modifier = Modifier.align(Alignment.CenterHorizontally),
                    onClick = {
                        val options = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                            .requestIdToken(token)
                            .requestEmail()
                            .build()
                        val googleClient = GoogleSignIn.getClient(context,options)
                        launcher.launch(googleClient.signInIntent)
                    }){
                    Text(text = "Login con Google")
                }
            }
        }
    }
}

@Composable
fun UserInfo(user : FirebaseUser){
    Column(
        modifier = Modifier.padding(16.dp).fillMaxSize(),
        verticalArrangement = Arrangement.Center
    ) {
        AsyncImage(
            model = ImageRequest.Builder(LocalContext.current)
                .data(Firebase.auth.currentUser!!.photoUrl.toString())
                .crossfade(true)
                .build(),
            contentDescription = "Foto de perfil",
            placeholder = painterResource(R.drawable.logo_only_fox),
            contentScale = ContentScale.FillBounds,
            modifier = Modifier
                .width(100.dp)
                .height(100.dp)
                .align(Alignment.CenterHorizontally)
                .clip(CircleShape)
        )
        Text(text = user.displayName.orEmpty() , modifier = Modifier.align(Alignment.CenterHorizontally) , style = MaterialTheme.typography.h5)
        Text(text = user.email.orEmpty() , modifier = Modifier.align(Alignment.CenterHorizontally) , fontStyle = FontStyle.Italic)
    }
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
                val authResult = viewModel.logInWithGoogle(credential).await()
                onAuthComplete(authResult)
            }
        } catch (e: ApiException) {
            onAuthError(e)
        }
    }
}

