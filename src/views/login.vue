<template>
  <div class="wrapper wrapper_property">
    <div class="login-container">
      <div class="login-slogan"></div>
      <div class="login-body">
        <el-form
          ref="form"
          :model="postData"
          :rules="dataRule"
          label-position="top"
          status-icon
          @keyup.enter.native="postDataSubmitHandle()"
        >
          <el-form-item v-if="mode === 'login'" prop="tenantCode" :label="$t('login.tenantCode')">
            <el-select v-model="postData.tenantCode" class="login_select" placeholder clearable>
              <el-option
                v-for="item in tenantList"
                :key="item.value"
                :label="item.tenantName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="mode === 'login'" prop="username" :label="$t('login.username')">
            <el-input v-model="postData.username" class="login_input"></el-input>
          </el-form-item>
          <el-form-item v-if="mode === 'forget'" prop="mobile" :label="$t('login.mobile')">
            <el-input v-model="postData.mobile" class="login_input"></el-input>
          </el-form-item>
          <el-form-item v-if="mode === 'login'" prop="password" :label="$t('login.password')">
            <el-input v-model="postData.password" class="login_input" type="password"></el-input>
          </el-form-item>
          <el-form-item
            v-if="mode === 'forget'"
            prop="newPassword"
            :label="$t('login.newPassword')"
          >
            <el-input v-model="postData.newPassword" class="login_input" type="password"></el-input>
          </el-form-item>
          <el-form-item
            v-if="mode === 'forget'"
            prop="confirmNewPassword"
            :label="$t('login.confirmNewPassword')"
          >
            <el-input v-model="postData.confirmNewPassword" class="login_input" type="password"></el-input>
          </el-form-item>
          <el-form-item v-if="mode === 'forget'" prop="vcode" :label="$t('login.captcha')">
            <div class="captcha_container">
              <el-input v-model="postData.vcode" class="login_input">
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
                <i class="icon-arrow el-icon--right"></i>
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
import { authPropertyResetPassword } from '@/api/auth/property'
import { getMessageSmsByType } from '@/api/message/sms'
import { getTenantList } from '@/api/tenant'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { validateMobile } from '@/utils/validator'
export default {
  data() {
    return {
      mode: 'login',
      formatCaptcha: '',
      i18nMessages: messages,
      captchaPath: '',
      captchaTag: false,
      postData: {
        systemType: 'property',
        mobile: '',
        tenantCode: '',
        username: '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        uuid: '',
        vcode: ''
      },
      tenantList: []
    }
  },
  computed: {
    ...mapGetters(['app_tenantCode']),
    dataRule() {
      const { mode } = this
      if (mode === 'login') {
        return {
          tenantCode: [
            {
              required: true,
              message: this.$t('validate.required'),
              trigger: 'change'
            }
          ],
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
    // this.getCaptcha()
    this.getTenantList()
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
      this.$set(this.postData, 'systemType', 'property')
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
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
          authPropertyResetPassword({
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
    getTenantList() {
      getTenantList().then((response) => {
        const isLast = response.find((item) => item.id === this.app_tenantCode)
        if (isLast) {
          this.$set(this.postData, 'tenantCode', this.app_tenantCode)
        }
        this.tenantList = response
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
