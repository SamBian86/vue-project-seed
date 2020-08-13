<template>
  <el-dialog
    width="375px"
    :visible.sync="visible"
    :title="$t('updatePassword.title')"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    :show-close="false"
    @close="closeHandle"
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
      <!-- <el-button @click="visible = false">{{ $t('cancel') }}</el-button> -->
      <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t('confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { modifyPassword } from '@/api/auth'
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
    ...mapGetters(['user_userInfo', 'app_systemType']),
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
    ...mapMutations('user', ['cleanUserInfoStore']),
    ...mapActions('app', ['logout']),
    ...mapActions('user', ['getUserInfo']),
    init() {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    // 表单提交
    dataFormSubmitHandle() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        modifyPassword(this.dataForm)
          .then((response) => {
            this.cleanUserInfoStore()
            this.getUserInfo()
            this.$message({
              message: this.$t('prompt.success'),
              type: 'success',
              duration: 2000,
              onClose: () => {
                this.visible = false
              }
            })
          })
          .catch(() => {})
      })
    },
    closeHandle() {
      this.$emit('close-listener')
    }
  }
}
</script>
