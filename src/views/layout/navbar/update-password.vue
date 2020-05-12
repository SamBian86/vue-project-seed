<template>
  <el-dialog
    :visible.sync="visible"
    :title="$t('updatePassword.title')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
  >
    <el-form
      ref="dataForm"
      :model="dataForm"
      :rules="dataRule"
      label-width="120px"
      @keyup.enter.native="dataFormSubmitHandle()"
    >
      <el-form-item :label="$t('updatePassword.username')">
        <span>{{ user_userInfo.username }}</span>
      </el-form-item>
      <el-form-item :label="$t('updatePassword.password')" prop="password">
        <el-input
          v-model="dataForm.password"
          :placeholder="$t('updatePassword.password')"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('updatePassword.newPassword')" prop="newPassword">
        <el-input
          v-model="dataForm.newPassword"
          :placeholder="$t('updatePassword.newPassword')"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('updatePassword.confirmPassword')" prop="confirmPassword">
        <el-input
          v-model="dataForm.confirmPassword"
          :placeholder="$t('updatePassword.confirmPassword')"
          type="password"
        ></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <el-button @click="visible = false">{{ $t('cancel') }}</el-button>
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { modifyUserPassword } from '@/api/sys/user'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user_userInfo']),
    dataRule() {
      var validateConfirmPassword = (rule, value, callback) => {
        if (this.dataForm.newPassword !== value) {
          return callback(new Error(this.$t('updatePassword.validate.confirmPassword')))
        }
        callback()
      }
      return {
        password: [
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
        confirmPassword: [
          {
            required: true,
            message: this.$t('validate.required'),
            trigger: 'blur'
          },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('app', ['logout']),
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    // 表单提交
    dataFormSubmitHandle() {
      this.$refs['dataForm'].validate(valid => {
        if (!valid) {
          return false
        }
        modifyUserPassword(this.dataForm)
          .then(response => {
            this.$message({
              message: this.$t('prompt.success'),
              type: 'success',
              duration: 2000,
              onClose: () => {
                this.visible = false
                this.logout().then(() => {
                  this.$router.replace({ name: 'login' }).then(() => {
                    window.location.reload()
                  })
                })
              }
            })
          })
          .catch(() => {})
      })
    }
  }
}
</script>
