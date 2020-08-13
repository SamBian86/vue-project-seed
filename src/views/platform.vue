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
          <el-form-item v-if="mode === 'login'" prop="username">
            <el-input
              v-model="postData.username"
              class="login_input"
              :placeholder="$t('login.username')"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="mode === 'forget'" prop="mobile">
            <el-input
              v-model="postData.mobile"
              class="login_input"
              :placeholder="$t('login.mobile')"
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
          <el-form-item v-if="mode === 'forget'" prop="confirmNewPassword">
            <el-input
              v-model="postData.confirmNewPassword"
              class="login_input"
              type="password"
              :placeholder="$t('login.confirmNewPassword')"
            ></el-input>
          </el-form-item>
          <el-form-item v-if="mode === 'forget'" prop="vcode">
            <div class="captcha_container">
              <el-input
                v-model="postData.vcode"
                class="login_input"
                :placeholder="$t('login.captcha')"
              >
                <template slot="append">
                  <el-button
                    :disabled="captchaTag"
                    class="captcha_btn"
                    type="text"
                    @click="getCaptchaHandle"
                  >{{ !captchaTag ? $t('login.getCaptcha') : formatCaptcha }}</el-button>
                </template>
              </el-input>
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
import { getUUID, debounce } from '@/utils'
import { getCaptcha } from '@/api/auth'
import { authPlatformResetPassword } from '@/api/auth/platform'
import { getMessageSmsByType } from '@/api/message/sms'
import { mapActions, mapMutations } from 'vuex'
import { validateMobile } from '@/utils/validator'

export default {
  data() {
    return {
      skin: 0,
      mode: 'login',
      formatCaptcha: '',
      i18nMessages: messages,
      captchaPath: '',
      captchaTag: false,
      postData: {
        systemType: 'platform',
        mobile: '',
        username: '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
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
          mobile: [
            {
              required: true,
              message: this.$t('validate.required'),
              trigger: 'blur'
            },
            { validator: validateMobile, trigger: 'blur' }
          ],
          newPassword: [
            {
              required: true,
              message: this.$t('validate.required'),
              trigger: 'blur'
            }
          ],
          confirmNewPassword: [
            {
              required: true,
              message: this.$t('validate.required'),
              trigger: 'blur'
            },
            {
              validator: (rule, value, callback) => {
                if (value !== this.postData.newPassword) {
                  callback(new Error(this.$t('login.confirmNewPasswordMessage')))
                }
              },
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
    // this.getCaptcha()
    // this.checkType()
  },
  methods: {
    ...mapMutations('layout', ['setTabActive']),
    ...mapMutations('app', ['logout']),
    ...mapActions('app', ['login']),
    changeMode() {
      const { mode } = this
      this.$set(this, 'captchaPath', '')
      this.$set(this, 'mode', mode === 'login' ? 'forget' : 'login')
      this.$set(this.postData, 'systemType', 'platform')
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
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
          const { newPassword, mobile, vcode } = this.postData
          authPlatformResetPassword({
            newPassword,
            username: mobile,
            vcode
          })
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              this.$message.error(error)
            })
        }
      })
    },
    // 获取验证码
    getCaptchaHandle() {
      const { captchaTag } = this
      const { mobile } = this.postData
      if (captchaTag) {
        return false
      } else {
        if (mobile && mobile.length === 11) {
          getMessageSmsByType({
            type: 2,
            mobile
          }).then((response) => {
            this.captchaTimer()
          })
        } else {
          this.$message.error(this.$t('login.mobile'))
        }
      }
    },
    captchaTimer() {
      let second = 60
      const countSecond = () => {
        --second
        if (second !== 0) {
          this.$set(this, 'formatCaptcha', this.$t('validate.format_captcha', { second }))
          this.$set(this, 'captchaTag', true)
          countSecondAction()
        } else {
          // formatCaptcha
          this.$set(this, 'formatCaptcha', '')
          this.$set(this, 'captchaTag', false)
        }
      }
      const countSecondAction = debounce(countSecond, 1000)
      countSecondAction()
    }
  }
}
</script>
