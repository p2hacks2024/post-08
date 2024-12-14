<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-card width="400px" class="mx-auto mt-5">
          <v-card-actions>
            <v-col>
                <v-btn
                @click="signin"
                block
                class="text-transform py-4 my-2"
                color="primary"
                >
                Twitterでログイン
                </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import firebaseApp from '@/src/main.js'
import { getAuth, signInWithPopup, TwitterAuthProvider } from "firebase/auth";

export default {
  methods: {
  signin() {
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          console.log(user?.uid);
          localStorage.setItem('uid', user?.uid)
        } else {
          alert('ログインに失敗しました。');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  }
}
}
</script>


<style scoped>
.login {
    text-align: center;
    margin-top: 50px;
}
form {
    display: inline-block;
    text-align: left;
}
div {
    margin-bottom: 10px;
}
label {
    display: block;
    margin-bottom: 5px;
}
input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
button {
    padding: 10px 20px;
}
</style>