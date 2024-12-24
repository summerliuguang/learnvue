<template>
    <div class="profilecontent">
        <h2>个人资料</h2>
        <form class="profileform" @submit.prevent="handleSubmit">
            <div class="avatar">
                <span>
                    <img class="avatarimg" ref="avatarimg" alt="头像" />
                </span>
                <span>
                    <img class="uploadimg" src="/src/resources/upload.svg" alt="默认头像" />
                </span>
            </div>
            <div class="account">
                <label>账号：{{ userdata.account }}</label>
            </div>
            <div class="nickname">
                <label for="nickname">昵称：</label>
                <input type="text" name="nickname" @input="validateNickname" v-model="userdata.nickname" />
                <label v-if="nicknameError" class="error-msg">{{ nicknameError }}</label>
            </div>
            <div class="birthday">
                <label for="birthday">出生日期：</label>
                <input type="date" id="birthday" @input="validateBirthday" v-model="userdata.birthday" />
                <label v-if="birthdayError" class="error-msg">{{ birthdayError }}</label>
            </div>
            <div class="submit">
                <button type="submit">提交</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup name='userdata'>
import { ref, reactive, watch, onMounted } from 'vue';
import { usePersonStore } from '@/store/person';
import { storeToRefs } from 'pinia';
import axios from 'axios';

const personStore = usePersonStore();
let avatarimg = ref();
let userdata = reactive({
    account: "",
    avatar: "",
    nickname: "liuguang",
    birthday: "1991-12-21",
});

function requestUserData() {
    userdata.account = "summer";
    userdata.avatar = "/src/resources/avatar.jpg";
    userdata.nickname = "liuguang";
    userdata.birthday = "1997-12-21";
    avatarimg.value.src = userdata.avatar;
}

// 用于存储验证错误信息的响应式变量
const nicknameError = ref('');
const birthdayError = ref('');


// 昵称验证方法
const validateNickname = (): boolean => {
    if (userdata.nickname.trim() === '') {
        nicknameError.value = '昵称不能为空';
        return false;
    }
    // 这里可以添加更多复杂的验证规则，比如长度限制、特殊字符限制等
    nicknameError.value = '';
    return true;
};

const minDate = new Date('1900-01-01');
const maxDate = new Date('2024-12-31');

// 出生日期验证方法
const validateBirthday = (): boolean => {
    if (!userdata.birthday) {
        birthdayError.value = '请选择出生日期';
        return false;
    }
    const selectedDate = new Date(userdata.birthday);
    if (selectedDate < minDate || selectedDate > maxDate) {
        birthdayError.value = `出生日期需在 ${minDate.toISOString().split('T')[0]} 至 ${maxDate.toISOString().split('T')[0]} 之间`;
        return false;
    }
    birthdayError.value = '';
    return true;
};

// 表单提交处理方法
const handleSubmit = async () => {
    if (!validateNickname() || !validateBirthday()) {
        return;
    }
    try {
        console.log('提交的用户数据：', userdata);
    } catch (error) {
        console.error('表单提交出现错误：', error);
    }
};

onMounted(() => {
    requestUserData();
});

</script>

<style scoped>
.profilecontent {
    flex: 1;
    margin-top: 10px;
    background-color: white;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}

h2 {
    color: black;
    text-align: center;
}

.profileform {
    background-color: white;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    margin: 5px auto;
    gap: 8px;
}

.profileform div {
    display: flex;
    flex-direction: column;
}

.avatar {
    position: relative;
    width: 64px;
    height: 64px;
    margin: 0 auto;
}
.avatar .avatarimg {
    position: absolute;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
}

.avatar .uploadimg {
    position: absolute;
    width: 20px;
    border: 2px solid white;
    border-radius: 50%;
    object-fit: cover;
    right: 0;
    bottom: 0;
}

.error-msg {
    color: red;
    font-size: 12px;
}

label,
input,
select,
button {
    height: 30px;
    flex-grow: 1;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;
    border: none;
    font-family: yahei;
}

input {
    background-color: #f5f5f5;
    padding-left: 8px;
    font-size: 14px;
}

.submit button {
    margin-top: 16px;
    background-color: #004ad9;
    color: white;
    border-radius: 8px;
}
</style>