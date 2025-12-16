<template>
    <div>
        <AppHeader />

        <div class="login-container">
            <div class="form-box">
                <div class="row">
                    <label>Email</label>
                    <input type="email" v-model="email" />
                </div>

                <div class="row">
                    <label>Password</label>
                    <input type="password" v-model="password" />
                </div>

                <div class="buttons-container">
                    <button class="login-btn" @click="submitLogin">Login</button>
                    <div class="or-text">OR</div>
                    <button class="signup-btn" @click="goToSignUp">SignUp</button>
                </div>
            </div>
        </div>

        <AppFooter />
    </div>
</template>

<script>
import AppHeader from "../components/Header.vue"
import AppFooter from "../components/Footer.vue"

export default {
    components: { AppHeader, AppFooter },
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        async submitLogin() {
            try {
                const res = await fetch("http://localhost:3000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: this.email, password: this.password })
                })

                const data = await res.json()

                if (!res.ok) {
                    alert(data.error || "Login failed")
                    return
                }

                localStorage.setItem("token", data.token)
                alert("Login successful!")
                this.$router.push("/")
            } catch (err) {
                console.error("Login error: ", err)
                alert("Server error")
            }
        },
        goToSignUp() {
            this.$router.push("/signup")
        }
    }
}
</script>

<style scoped>

.login-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.form-box {
  background: #e8f6d9;
  padding: 25px 30px;
  border-radius: 12px;
  width: 400px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

label {
  width: 80px;
  margin-top: 8px;
}

input {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #bbb;
}

.buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

.login-btn, .signup-btn {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background: #8db7ff;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
}
</style>
