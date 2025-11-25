<template>
  <div>
    <AppHeader />

    <div class="signup-container">
      <div class="form-box">
        <div class="row">
          <label>Email</label>
          <input type="email" v-model="email" />
        </div>

        <div class="row">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            @input="validatePassword"
          />
        </div>

        <button class="signup-btn" @click="submitSignup">
          Signup
        </button>

        <div v-if="!passwordValid && password.length > 0" class="error-box">
          The password is not valid
          <ul>
            <li v-for="(err, i) in errors" :key="i">{{ err }}</li>
          </ul>
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
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      email: "",
      password: "",
      passwordValid: true,
      errors: []
    }
  },
  methods: {
    validatePassword() {
      const e = []

      if (this.password.length < 8 || this.password.length > 15)
        e.push("Length must be between 8 and 15 characters")

      if (!/[A-Z]/.test(this.password))
        e.push("Must include at least one uppercase letter")

      const lower = this.password.match(/[a-z]/g)
      if (!lower || lower.length < 2)
        e.push("Must include at least two lowercase letters")

      if (!/[0-9]/.test(this.password))
        e.push("Must include at least one numeric value")

      if (!/^[A-Z]/.test(this.password))
        e.push("Must start with an uppercase letter")

      if (!/_/.test(this.password))
        e.push("Must include the character '_'")

      this.errors = e
      this.passwordValid = e.length === 0
    },

    submitSignup() {
      this.validatePassword()
      if (this.passwordValid) alert("Signup successful!") 
      else alert("The password is not valid!")
    }
  }
}
</script>

<style scoped>

.signup-container {
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

.signup-btn {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background: #8db7ff;
  border: none;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
}

/* error box, pops up when any of the conditions are not met */
.error-box {
  margin-top: 15px;
  background: #ffe6e6;
  border-radius: 8px;
  padding: 10px;
  color: red;
  font-size: 0.9rem;
  font-weight: 600;
}

.error-box ul {
  text-align: left;
  font-weight: 300;
}
</style>
