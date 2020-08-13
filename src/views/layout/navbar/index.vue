<template>
  <nav :class="`aui-navbar--${layout_navbar_layoutType}`" class="aui-navbar">
    <div class="aui-navbar__header">
      <h1 class="aui-navbar__brand" @click="$router.push({ name: 'home' })">
        <a class="aui-navbar__brand-lg" href="javascript:;">{{ $t('brand.lg') }}</a>
        <a class="aui-navbar__brand-mini" href="javascript:;">{{ $t('brand.mini') }}</a>
      </h1>
    </div>
    <div class="aui-navbar__body">
      <el-menu class="aui-navbar__menu mr-auto" mode="horizontal">
        <el-menu-item index="1" @click="toggleFold()">
          <svg
            class="icon-svg aui-navbar__icon-menu aui-navbar__icon-menu--switch"
            aria-hidden="true"
          >
            <use xlink:href="#icon-outdent" />
          </svg>
        </el-menu-item>
        <!-- <el-menu-item index="2" @click="refresh()">
          <svg
            class="icon-svg aui-navbar__icon-menu aui-navbar__icon-menu--refresh"
            aria-hidden="true"
          >
            <use xlink:href="#icon-sync" />
          </svg>
        </el-menu-item>-->
      </el-menu>
      <el-menu class="aui-navbar__menu" mode="horizontal">
        <!-- <el-menu-item index="1">
          <el-dropdown :show-timeout="0" placement="bottom">
            <el-button size="mini">{{ $t('_lang') }}</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(val, key) in i18nMessages" :key="key" @click.native="$i18n.locale = key">
                {{ val._lang }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>-->
        <el-menu-item v-if="app_systemType === 'property'" index="1">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <span>{{ projectName || $t('brand.projectDefault') }}</span>
              <i class="el-icon-arrow-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in projectList"
                :key="index"
                @click.native="switchTenantHandle(item.id)"
              >{{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
            <!-- 这个空标签一定要留着，不然要你好看 -->
            <!-- <el-dropdown-menu v-else></el-dropdown-menu> -->
          </el-dropdown>
        </el-menu-item>
        <!-- <el-menu-item index="2">
          <a href="javascript:void(0)" @click.stop="goToDashBoard">
            <svg class="icon-svg aui-navbar__icon-menu" aria-hidden="true">
              <use xlink:href="#icon-earth" />
            </svg>
          </a>
        </el-menu-item>-->
        <!-- <el-menu-item index="3" @click="fullscreenHandle()">
          <svg class="icon-svg aui-navbar__icon-menu" aria-hidden="true">
            <use xlink:href="#icon-fullscreen" />
          </svg>
        </el-menu-item>-->
        <!-- <el-menu-item index="4" class="aui-navbar__avatar">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <span>{{ user_userInfo.realName }}, 你好</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="updatePasswordHandle()"
              >{{ $t('updatePassword.title') }}</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">{{ $t('logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>-->
        <el-menu-item index="4" class="aui-navbar__name">
          <div>{{ user_userInfo.realName }}, 你好</div>
        </el-menu-item>
        <el-menu-item index="5">
          <div @click="updatePasswordHandle()">{{ $t('updatePassword.title') }}</div>
        </el-menu-item>
        <el-menu-item index="6">
          <div @click="logoutHandle()">{{ $t('logout') }}</div>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password
      v-if="updatePassowrdVisible"
      ref="updatePassowrd"
      @close-listener="closeListener"
    ></update-password>
    <!-- 选择项目 -->
    <el-dialog
      append-to-body
      width="220px"
      class="project-container"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="project-title">{{ $t('projectTitle') }}</div>
      </template>
      <el-select
        v-model="projectId"
        class="select-block"
        size="small"
        :placeholder="$t('projectTitle')"
        @change="switchTenantHandle"
      >
        <el-option
          v-for="(item,index) in projectList"
          :key="index"
          :label="item.projectName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-dialog>
  </nav>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { messages } from '@/i18n'
import screenfull from 'screenfull'
import UpdatePassword from './update-password'
import { getProjectPermissionList } from '@/api/project'
import { getProjectId, setProjectId, getSystemType } from '@/utils/cookie'

export default {
  inject: ['refresh'],
  components: {
    UpdatePassword
  },
  data() {
    return {
      dialogVisible: false,
      projectList: [],
      projectId: '',
      projectName: '',
      i18nMessages: messages,
      updatePassowrdVisible: false
    }
  },
  computed: {
    ...mapGetters(['layout_navbar_layoutType', 'layout_sidebar_fold', 'user_userInfo', 'app_systemType'])
  },
  created() {
    const systemType = getSystemType()
    setTimeout(() => {
      if (this.user_userInfo.resetPassword === 1) {
        this.checkResetPassword()
        return false
      }
      if (systemType === 'property') {
        this.getProjectPermissionList()
        return false
      }
    }, 1000)
  },
  methods: {
    ...mapMutations('layout', ['setSidebarFold']),
    ...mapActions('app', ['logout', 'setProjectId']),
    // 展开收缩菜单
    toggleFold() {
      this.setSidebarFold(!this.layout_sidebar_fold)
    },
    getProjectPermissionList() {
      const projectId = getProjectId()
      getProjectPermissionList().then((response) => {
        const len = (response && response.length) || 0
        this.projectList = response
        if (len === 1) {
          if (projectId === '') {
            this.switchTenantHandle(response[0]['id'])
          }
        } else if (len > 1) {
          if (projectId === '') {
            this.chooseProject()
            // console.log(response)
          } else {
            response.forEach((item) => {
              item.value = item.id
              item.label = item.projectName
              if (projectId === item.id) {
                this.projectName = item.projectName
              }
            })
          }
        } else {
          // console.log(response)
        }
      })
    },
    chooseProject() {
      this.dialogVisible = true
    },
    checkResetPassword() {
      this.$message({
        message: this.$t('resetPassword'),
        type: 'warning',
        customClass: 'el-reset-message--warning',
        duration: 3000
      })
      this.updatePasswordHandle()
    },
    closeListener() {
      if (this.user_userInfo.resetPassword === 1) {
        setTimeout(() => {
          this.checkResetPassword()
        }, 1000)
      }
    },
    switchTenantHandle(projectId) {
      setProjectId(projectId)
      this.setProjectId(projectId)
      setTimeout(() => {
        window.location.reload()
      }, 200)
    },
    // 全屏
    fullscreenHandle() {
      if (!screenfull.isEnabled) {
        return this.$message({
          message: this.$t('fullscreen.prompt'),
          type: 'warning',
          duration: 2000
        })
      }
      screenfull.toggle()
    },
    // 修改密码
    updatePasswordHandle() {
      this.updatePassowrdVisible = true
      this.$nextTick(() => {
        this.$refs.updatePassowrd.init()
      })
    },
    // 退出
    logoutHandle() {
      this.$confirm(this.$t('prompt.info', { handle: this.$t('logout') }), this.$t('prompt.title'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      })
        .then(() => {
          const routerName = this.user_userInfo.type === 1 ? 'platform' : 'login'
          this.logout().then(() => {
            this.$router.replace({ name: routerName }).then(() => {
              setTimeout(() => {
                window.location.reload()
              }, 10)
            })
          })
        })
        .catch(() => {})
    }
    // goToDashBoard() {
    //   window.open(`/dashboard/index.html?env=${process.env.VUE_APP_NODE_ENV}`, '_blank')
    // }
  }
}
</script>
<style lang="scss">
.aui-navbar--colorful .aui-navbar__menu > .el-menu-item.aui-navbar__name,
.aui-navbar--colorful .aui-navbar__menu > .el-menu-item.aui-navbar__name.is-active {
  &:hover {
    background: transparent;
    cursor: text;
  }
}
.project-title {
  font-weight: bold;
}

.project-container .el-dialog {
  margin-top: 0px !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}

.project-container .el-dialog__body {
  padding: 20px 20px;
}

.el-reset-message--warning {
  z-index: 2010 !important;
}
</style>
