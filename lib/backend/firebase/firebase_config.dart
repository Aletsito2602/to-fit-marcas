import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

Future initFirebase() async {
  if (kIsWeb) {
    await Firebase.initializeApp(
        options: FirebaseOptions(
            apiKey: "AIzaSyDcSKcJ6-7d7QAKxbvIRf5UzXPcRndBbds",
            authDomain: "to-fit.firebaseapp.com",
            projectId: "to-fit",
            storageBucket: "to-fit.firebasestorage.app",
            messagingSenderId: "159172611530",
            appId: "1:159172611530:web:e2f2c02140734eba815333",
            measurementId: "G-DT62916EXR"));
  } else {
    await Firebase.initializeApp();
  }
}
