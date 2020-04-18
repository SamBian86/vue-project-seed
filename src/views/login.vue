<template>
  <div class="aui-wrapper aui-page__login">
    <div class="aui-content__wrapper">
      <div class="aui-content">
        <div class="login-container">
          <div class="login-body-left">
            <div class="app-logo"></div>
            <div class="app-name"> {{ $t('login.sysname') }} </div>
          </div>
          <div class="login-body-right">
            <h3 class="login-title">{{ $t('login.title') }}</h3>
            <el-form
              ref="postData"
              :model="postData"
              :rules="dataRule"
              status-icon
              @keyup.enter.native="postDataSubmitHandle()"
            >
              <!-- <el-form-item>
              <el-select v-model="$i18n.locale" class="w-percent-100">
                <el-option
                  v-for="(val, key) in i18nMessages"
                  :key="key"
                  :label="val._lang"
                  :value="key"
                ></el-option>
              </el-select>
              </el-form-item>-->
              <el-form-item prop="username">
                <el-input
                  v-model="postData.username"
                  :placeholder="$t('login.username')"
                >
                  <span slot="prefix" class="el-input__icon">
                    <svg class="icon-svg" aria-hidden="true">
                      <use xlink:href="#icon-user" />
                    </svg>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="postData.password"
                  :placeholder="$t('login.password')"
                  type="password"
                >
                  <span slot="prefix" class="el-input__icon">
                    <svg class="icon-svg" aria-hidden="true">
                      <use xlink:href="#icon-lock" />
                    </svg>
                  </span>
                </el-input>
              </el-form-item>
              <el-form-item prop="captcha">
                <el-row :gutter="20">
                  <el-col :span="14">
                    <el-input
                      v-model="postData.captcha"
                      :placeholder="$t('login.captcha')"
                    >
                      <span slot="prefix" class="el-input__icon">
                        <svg class="icon-svg" aria-hidden="true">
                          <use xlink:href="#icon-safetycertificate" />
                        </svg>
                      </span>
                    </el-input>
                  </el-col>
                  <el-col :span="10" class="login-captcha">
                    <img :src="captchaPath" @click="getCaptcha()" />
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="w-percent-100 el-button-login"
                  @click="postDataSubmitHandle()"
                >
                  {{ $t('login.title') }}
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="login-footer">
          <p>
            {{ $t('login.copyright.company') }}
            {{ $t('login.copyright.phone') }}
            {{ $t('login.copyright.address') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { messages } from '@/i18n'
import { getUUID } from '@/utils'
import { getCaptcha } from '@/api/auth'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      i18nMessages: messages,
      captchaPath: '',
      postData: {
        username: '',
        password: '',
        uuid: '',
        captcha: ''
      }
    }
  },
  computed: {
    dataRule() {
      return {
        username: [
          {
            required: true,
            message: this.$t('validate.required'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('validate.required'),
            trigger: 'blur'
          }
        ],
        captcha: [
          {
            required: true,
            message: this.$t('validate.required'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    ...mapActions('app', ['login']),
    // 获取验证码
    getCaptcha() {
      const uuid = getUUID()
      this.postData.uuid = uuid
      this.captchaPath = getCaptcha(uuid)
    },
    // 表单提交
    postDataSubmitHandle() {
      this.$refs['postData'].validate(valid => {
        if (!valid) {
          return false
        }
        this.login(this.postData)
          .then(response => {
            this.$router.push({ path: '/' })
          })
          .catch(error => {
            this.getCaptcha()
            this.$message.error(error)
          })
      })
    }
  }
}
</script>
