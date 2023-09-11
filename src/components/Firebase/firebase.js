import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyChsI0H07-JdHNtYJ9WL-8uEbFnuIlVRPw",
    authDomain: "marvel-quiz-b4199.firebaseapp.com",
    projectId: "marvel-quiz-b4199",
    storageBucket: "marvel-quiz-b4199.appspot.com",
    messagingSenderId: "396426678326",
    appId: "1:396426678326:web:9cacc5e16a191aa9a54897"
};

class Firebase {
    constructor() {
        app.initializeApp()
    }
}

export default Firebase