<template>
    <div class="profilecontent">
        <h2>个人资料</h2>
        <form class="profileform" @submit.prevent="handleSubmit">
            <div class="avatar">
                <span>
                    <img class="avatarimg" ref="avatarimg" alt="头像" />
                </span>
                <span>
                    <img class="uploadimg" @click="uploadAvatar" src="/src/resources/upload.svg" alt="点击上传头像"
                        role="button" />
                    <input type="file" ref="uploadInput" name="avatar" style="display: none;" accept="image/*"
                        @change="avatarUploaded" />
                </span>
            </div>
            <fieldset class="account">
                <label>账号：{{ userdata.account }}</label>
            </fieldset>
            <fieldset class="nickname">
                <label for="nickname">昵称：</label>
                <input type="text" name="nickname" @input="validateNickname" v-model="userdata.nickname" />
                <label v-if="nicknameError" class="error-msg">{{ nicknameError }}</label>
            </fieldset>
            <fieldset class="birthday">
                <label for="birthday">出生日期：</label>
                <input type="date" id="birthday" name="birthday" @input="validateBirthday"
                    v-model="userdata.birthday" />
                <label v-if="birthdayError" class="error-msg">{{ birthdayError }}</label>
            </fieldset>
            <fieldset class="submit">
                <button type="submit">提交</button>
            </fieldset>
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
let uploadInput = ref();
let userdata = reactive({
    account: "",
    avatar: "",
    nickname: "",
    birthday: "",
});

function requestUserData() {
    userdata.account = "summer";
    userdata.avatar = "";
    userdata.nickname = "liuguang";
    userdata.birthday = "1997-12-21";
    avatarimg.value.src = userdata.avatar;
}

function avatarUploaded(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) {
        console.warn('未选择文件');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
            userdata.avatar = e.target.result;
            avatarimg.value.src = e.target.result;
            console.log('头像上传成功');
        }
    };
    reader.onerror = () => {
        console.error('文件读取失败');
    };
    reader.readAsDataURL(file);
}

function uploadAvatar() {
    // 触发文件选择框
    uploadInput.value.click();
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

    const formData = new FormData();
    formData.append('nickname', userdata.nickname);
    formData.append('birthday', userdata.birthday);

    const file = uploadInput.value.files?.[0];
    if (file) {
        formData.append('avatar', file);
    }

    axios.post('http://localhost:3000/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        console.log('提交成功：', res.data);
    }).catch(error => {
        console.error('提交失败：', error);
    });

};

onMounted(() => {
    requestUserData();
    if (!userdata.avatar) {
        avatarimg.value.src = "/src/resources/avatar.jpg";
    }
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

.profileform fieldset {
    display: flex;
    flex-direction: column;
    border: none;
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
    font-family: 'Microsoft YaHei', sans-serif;
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