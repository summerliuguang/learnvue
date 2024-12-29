<template>
    <div class="signup-container">
        <h2>注册</h2>
        <form @submit.prevent="handleSignup" :class="{ 'form-invalid': !isFormValid }">
            <div class="form-group">
                <label for="username">用户名:</label>
                <input type="text" id="username" v-model="username" required @change="validateUsername" />
                <p v-if="usernameErrorMessage" class="error-message">{{ usernameErrorMessage }}</p>
            </div>
            <div class="form-group">
                <label for="password">输入密码:</label>
                <input type="password" id="password" v-model="password" required @change="validatePasswordStrength" />
                <p v-if="passwordStrengthMessage" class="error-message">{{ passwordStrengthMessage }}</p>
            </div>
            <div class="form-group">
                <label for="confirmPassword">确认密码:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword" required
                    @change="validatePasswordMatch" />
                <p v-if="passwordMismatchMessage" class="error-message">{{ passwordMismatchMessage }}</p>
            </div>
            <!-- Turnstile 小组件 -->
            <div ref="turnstileRef" :data-sitekey="siteKey"></div>
            <button type="submit" :disabled="!isFormValid">注册</button>
        </form>
        <div v-if="turnstileError" class="error-message">请完成验证码验证。</div>
    </div>
</template>

<script lang='ts' setup name='Signup'>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// 注册表单相关数据
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const usernameErrorMessage = ref('');
const passwordStrengthMessage = ref('');
const passwordMismatchMessage = ref('');
const turnstileToken = ref('');
const turnstileError = ref(false);
const siteKey = '0x4AAAAAAA4J3URqlIvasfOu';
const turnstileRef = ref(null);
let isTurnstileRendered = ref(false);

function validateUsername() {
    // 用户名必须是 6 到 20 个字符，且只能包含字母、数字和下划线
    const usernameRegex = /^[a-zA-Z0-9_]{6,20}$/;
    if (!username.value.match(usernameRegex)) {
        usernameErrorMessage.value = '用户名必须是 6 到 20 个字符，且只能包含字母、数字和下划线';
        return false;
    } else {
        usernameErrorMessage.value = '';
        return true;
    }
}

// 密码强度验证
function validatePasswordStrength() {
    // 密码至少需要在8位以上，必须包含大写字母、小写字母和数字
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s)[A-Za-z\d@$!%*?&]{8,50}$/;
    if (!password.value.match(passwordRegex)) {
        passwordStrengthMessage.value = '密码至少需要在8位以上，必须包含大写字母、小写字母和数字';
        return false;
    } else {
        passwordStrengthMessage.value = '';
        return true;
    }
}

// 确认密码是否一致
function validatePasswordMatch() {
    if (password.value !== confirmPassword.value) {
        passwordMismatchMessage.value = '两次输入密码不一致，请重新输入';
        return false;
    } else {
        passwordMismatchMessage.value = '';
        return true;
    }
}

// 表单验证
const isFormValid = computed(() => {
    return validateUsername() && validatePasswordStrength() && validatePasswordMatch() && turnstileToken.value;
});

// 提交表单
const handleSignup = async () => {
    try {
        const response = await axios.post('http://192.168.1.21:8080/common/register', {
            username: username.value,
            password: password.value,
            turnstileToken: turnstileToken.value
        });
        if (response.data.code === 0) {
            alert('Signup successful: ' + response.data.message);
        } else {
            alert('Signup failed:' + response.data.message);
        }
    } catch (error) {
        alert('Sign up failed: ' + error);
    }

};

const onloadTurnstileCallback = () => {
    console.log('Cloudflare Turnstile has been loaded.');
    if (window.turnstile && !isTurnstileRendered.value && siteKey) {
        window.turnstile.render(turnstileRef.value, {
            sitekey: siteKey,
            callback: (token: string) => {
                turnstileToken.value = token;
                console.log('turnstile token:', token);
            }
        });
        isTurnstileRendered.value = true;
    }
};

// 在组件挂载后初始化 Turnstile
onMounted(() => {
    onloadTurnstileCallback(); // 只会执行一次
});
</script>

<style scoped>
.form-invalid {
    border-color: red;
}

.signup-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 5px;
}

.validation-group {
    display: flex;
}

.validation-group input,
.validation-group img {
    margin-right: 10px;
    height: 35px;
    width: auto;
}


.error-message {
    margin-top: 5px;
    color: #5e5b5b;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>
