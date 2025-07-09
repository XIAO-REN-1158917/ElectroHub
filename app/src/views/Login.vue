<template>
    <div class="bg">
        <div class="login">
            <!-- title -->
            <div class="logo">
                <img :src="logo" alt="" width="70px" height="70px">
                <h1 class="ml">Electro Hub</h1>
            </div>
            <!-- login form -->
            <el-form :model="ruleForm" :rules="rules" ref="formRef">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="Your username" prefix-icon="User"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="ruleForm.password" placeholder="Your password" prefix-icon="lock" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click="handleLogin">Login</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.png";
import { reactive,ref } from "vue";
import type { FormRules, FormInstance } from 'element-plus';
import { useUserStore } from "@/store/auth";
import { useRouter } from "vue-router";

interface RuleForm{
    username: string;
    password: string
}

const ruleForm: RuleForm = reactive({
    username: "",
    password: ""
})

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: "Username is required", trigger: "blur" },
        { min: 4, max: 8, message: "Username should be 4 to 8 characters and include only letters and numbers.", trigger: "blur" }
    ],
    password: [
        { required: true, message: "Password is required", trigger: "blur" }
    ]
})

const formRef = ref<FormInstance>();
const useStore = useUserStore()
const router = useRouter()

const handleLogin = () => {
    formRef.value?.validate(async(valid: boolean) => {
        if (valid) {
            await useStore.login(ruleForm)
            router.push("/")
        }
        
    })
}

</script>

<style lang="less" scoped>
.bg{
    background-image: url("../assets/bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    .login{
        width: 500px;
        height: 300px;
        padding: 50px;
        box-shadow: 0 0 10px 10px #f4f4f4;
        text-align: center;
        position: absolute;
        top: 50%;
        margin-top: -200px;
        left: 10%;
        .logo{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 40px;
            h1{
                color: rgb(14, 53, 148);
            }
        }
    }
}
</style>