<template>
  <div :class="skin === 0 ? 'wrapper wrapper_platform0' : 'wrapper wrapper_platform1'">
    <div class="login-container">
      <div class="login-slogan"></div>
      <div class="login-body">
        <el-form
          ref="form"
          :model="postData"
          :rules="dataRule"
          status-icon
          @keyup.enter.native="postDataSubmitHandle()"
        >
          <el-form-item prop="username">
            <el-input
              v-model="postData.username"
              class="login_input"
              :placeholder="$t('login.username')"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="mode === 'login'" prop="password">
            <el-input
              v-model="postData.password"
              class="login_input"
              type="password"
              :placeholder="$t('login.password')"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="mode === 'forget'" prop="newPassword">
            <el-input
              v-model="postData.newPassword"
              class="login_input"
              type="password"
              :placeholder="$t('login.newPassword')"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="mode === 'forget'" prop="vcode">
            <div class="captcha_container">
              <el-input
                v-model="postData.vcode"
                class="login_input"
                :placeholder="$t('login.captcha')"
              ></el-input>
              <img v-if="captchaPath !== ''" :src="captchaPath" @click="getCaptcha()" />
            </div>
          </el-form-item>
          <div class="forget">
            <el-button
              type="text"
              @click="changeMode"
            >{{ mode === 'login' ? $t('login.forgetLabel') : $t('login.loginLabel') }}</el-button>
          </div>
          <el-form-item>
            <el-button class="el-button-login" @click="postDataSubmitHandle()">
              <div class="el-button-text">
                <span>{{ mode === 'login' ? $t('login.loginBtn') : $t('login.forgetBtn') }}</span>
                <!-- <i class="icon-arrow el-icon--right"></i> -->
              </div>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="login-footer">
      {{ $t('login.copyright.company') }}
      {{ $t('login.copyright.phone') }}
      {{ $t('login.copyright.address') }}
    </div>
  </div>
</template>

<script>
import { messages } from '@/i18n'
import { getUUID } from '@/utils'
import { getCaptcha } from '@/api/auth'
import { authPlatformResetPassword } from '@/api/auth/platform'
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      skin: 0,
      mode: 'login',
      i18nMessages: messages,
      captchaPath: '',
      postData: {
        systemType: 'platform',
        username: '',
        password: '',
        newPassword: '',
        uuid: '',
        vcode: ''
      }
    }
  },
  computed: {
    dataRule() {
      const { mode } = this
      if (mode === 'login') {
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
          ]
        }
      } else {
        return {
          username: [
            {
              required: true,
              message: this.$t('validate.required'),
              trigger: 'blur'
            }
          ],
          newPassword: [
            {
              required: true,
              message: this.$t('validate.required'),
              trigger: 'blur'
            }
          ],
          vcode: [
            {
              required: true,
              message: this.$t('validate.required'),
              trigger: 'blur'
            }
          ]
        }
      }
    }
  },
  created() {
    this.randomSkin()
    this.getCaptcha()
    // this.checkType()
  },
  methods: {
    ...mapMutations('layout', ['setTabActive']),
    ...mapMutations('app', ['logout']),
    ...mapActions('app', ['login']),
    changeMode() {
      const { mode } = this
      this.mode = mode === 'login' ? 'forget' : 'login'
      this.captchaPath = ''
      this.$set(this, 'postData', {
        systemType: 'platform',
        tenantCode: '',
        username: '',
        password: '',
        newPassword: '',
        uuid: '',
        vcode: ''
      })
      this.$nextTick(() => {
        const { mode } = this
        this.$refs['form'].clearValidate()
        if (mode === 'forget') {
          this.getCaptcha()
        }
      })
    },
    randomSkin() {
      const skin = Math.round(Math.random() * 1)
      this.skin = skin
    },
    // 获取验证码
    getCaptcha() {
      const uuid = getUUID()
      this.postData.uuid = uuid
      this.captchaPath = getCaptcha(uuid)
    },
    // 表单提交
    postDataSubmitHandle() {
      const { mode } = this
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return false
        }
        if (mode === 'login') {
          this.logout() // 清除storage数据
          this.login(this.postData)
            .then((response) => {
              this.$router.replace({ name: 'home' })
            })
            .catch((error) => {
              this.getCaptcha()
              this.$message.error(error)
            })
        } else {
          authPlatformResetPassword(this.postData)
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              this.$message.error(error)
            })
        }
      })
    }
  }
}
</script>
