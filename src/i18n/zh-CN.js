const t = {}

t.loading = '加载中...'

t.brand = {}
t.brand.lg = '丽富社区数据看板'
t.brand.mini = '丽富社区'
t.brand.projectDefault = '选择项目'

t.add = '新增'
t.delete = '删除'
t.deleteBatch = '删除'
t.update = '修改'
t.reset = '重置'
t.detail = '详情'
t.instanceId = '活动流程图'
t.query = '查询'
t.export = '导出'
t.handle = '操作'
t.confirm = '确定'
t.cancel = '取消'
t.clearCurrent = '取消选中'
t.clear = '清除'
t.logout = '退出'
t.manage = '处理'
t.createDate = '创建时间'
t.keyword = '关键字：'
t.keywordFilterSearch = '根据关键字进行过滤'
t.choose = '请选择'
t.back = '返回'
t.download = '下载'
t.downloadTemp = '下载模板'
t.import = '导入'
t.info = '信息'
t.up = '上移'
t.down = '下移'
t.on = '上架'
t.off = '下架'
t.editorUpload = '上传图片'

t.search = {}
t.search.phoneNumberOrName = '手机号或姓名'

t.prompt = {}
t.prompt.title = '提示'
t.prompt.info = '确定进行[{handle}]操作?'
t.prompt.success = '操作成功'
t.prompt.failed = '操作失败'
t.prompt.deleteBatch = '请选择删除项'
t.prompt.customBatch = '请选择批量处理的项目'

t.validate = {}
t.validate.required = '必填项不能为空'
t.validate.format = '{attr}格式错误'
t.validate.format_mobile = '手机号'

t.upload = {}
t.upload.text = '将文件拖到此处，或<em>点击上传</em>'
t.upload.tip = '只支持{format}格式文件！'
t.upload.button = '点击上传'
t.upload.choose = '选择文件'
t.upload.uploading = '文件上传中,稍后再试..'

t.datePicker = {}
t.datePicker.range = '至'
t.datePicker.start = '开始日期'
t.datePicker.end = '结束日期'

t.fullscreen = {}
t.fullscreen.prompt = '您的浏览器不支持此操作'

t.updatePassword = {}
t.updatePassword.title = '修改密码'
t.updatePassword.username = '账号'
t.updatePassword.password = '原密码'
t.updatePassword.newPassword = '新密码'
t.updatePassword.confirmPassword = '确认密码'
t.updatePassword.validate = {}
t.updatePassword.validate.confirmPassword = '确认密码与新密码输入不一致'

t.contentTabs = {}
t.contentTabs.closeCurrent = '关闭当前标签页'
t.contentTabs.closeOther = '关闭其它标签页'
t.contentTabs.closeAll = '关闭全部标签页'

/* 页面 */
t.notFound = {}
t.notFound.desc = '抱歉！您访问的页面<em>失联</em>啦...'
t.notFound.back = '上一页'
t.notFound.home = '首页'

t.login = {}
t.login.sysname = '丽富社区数据看板'
t.login.title = '欢迎登录'
t.login.tenantCode = '请选择企业'
t.login.newPassword = '新密码'
t.login.username = '请输入账号'
t.login.password = '请输入密码'
t.login.captcha = '验证码'
t.login.forgetLabel = '忘记密码?'
t.login.loginLabel = '我要登录'
t.login.demo = ''
t.login.copyright = {}
t.login.copyright.company = '由无锡耘林大数据科技有限公司提供技术支持'
t.login.copyright.phone = '电话: 0510-85386217'
t.login.copyright.address = '地址:无锡市高浪东路999号-8-A1-1201'
t.login.type = '账号类型'
t.login.type0 = '管理员'
t.login.type1 = '运营人员'
t.login.type2 = '物业员工'
t.login.type3 = '街道人员'
t.login.loginBtn = '登录'
t.login.forgetBtn = '修改密码'

t.home = {}
t.home.desc = {}
t.home.desc.title = '项目介绍'
t.home.desc.list = ['丽富社区数据看板，基于最新的Spring Boot 2.2、Mybatis、Element 2.0+开发']

/* 模块 */
t.model = {}
t.model.name = '名称'
t.model.key = '标识'
t.model.version = '版本'
t.model.createTime = '创建时间'
t.model.lastUpdateTime = '更新时间'
t.model.design = '在线设计'
t.model.deploy = '部署'
t.model.description = '描述'

t.process = {}
t.process.name = '名称'
t.process.key = '标识'
t.process.deployFile = '部署流程文件'
t.process.id = '流程ID'
t.process.deploymentId = '部署ID'
t.process.version = '版本'
t.process.resourceName = 'XML'
t.process.diagramResourceName = '图片'
t.process.deploymentTime = '部署时间'
t.process.active = '激活'
t.process.suspend = '挂起'
t.process.convertToModel = '转换为模型'
t.process.bizRouteSet = '配置业务路由'
t.process.bizRoute = '业务路由'

t.running = {}
t.running.id = '实例ID'
t.running.definitionKey = '定义Key'
t.running.processDefinitionId = '定义ID'
t.running.processDefinitionName = '定义名称'
t.running.activityId = '当前环节'
t.running.suspended = '是否挂起'
t.running.suspended0 = '否'
t.running.suspended1 = '是'

t.schedule = {}
t.schedule.beanName = 'bean名称'
t.schedule.beanNameTips = 'spring bean名称, 如: testTask'
t.schedule.pauseBatch = '暂停'
t.schedule.resumeBatch = '恢复'
t.schedule.runBatch = '执行'
t.schedule.log = '日志列表'
t.schedule.params = '参数'
t.schedule.cronExpression = 'cron表达式'
t.schedule.cronExpressionTips = '如: 0 0 12 * * ?'
t.schedule.remark = '备注'
t.schedule.status = '状态'
t.schedule.status0 = '暂停'
t.schedule.status1 = '正常'
t.schedule.statusLog0 = '失败'
t.schedule.statusLog1 = '成功'
t.schedule.pause = '暂停'
t.schedule.resume = '恢复'
t.schedule.run = '执行'
t.schedule.jobId = '任务ID'
t.schedule.times = '耗时(单位: 毫秒)'
t.schedule.createDate = '执行时间'

t.sms = {}
t.sms.smsCode = '短信编码'
t.sms.remark = '备注'
t.sms.mobile = '手机号'
t.sms.status = '状态'
t.sms.status0 = '发送失败'
t.sms.status1 = '发送成功'
t.sms.config = '新增配置'
t.sms.editConfig = '修改配置'
t.sms.send = '发送短信'
t.sms.platform = '平台类型'
t.sms.platform1 = '阿里云'
t.sms.platform2 = '腾讯云'
t.sms.platform3 = '七牛'
t.sms.params = '参数'
t.sms.paramsTips = '如：{"code": "123456"}'
t.sms.params1 = '参数1'
t.sms.params2 = '参数2'
t.sms.params3 = '参数3'
t.sms.params4 = '参数4'
t.sms.createDate = '创建时间'
t.sms.aliyunAccessKeyId = 'Key'
t.sms.aliyunAccessKeyIdTips = '阿里云AccessKeyId'
t.sms.aliyunAccessKeySecret = 'Secret'
t.sms.aliyunAccessKeySecretTips = '阿里云AccessKeySecret'
t.sms.aliyunSignName = '短信签名'
t.sms.aliyunTemplateCode = '短信模板'
t.sms.aliyunTemplateCodeTips = '短信模板CODE'
t.sms.qcloudAppId = 'AppId'
t.sms.qcloudAppIdTips = '腾讯云AppId'
t.sms.qcloudAppKey = 'AppKey'
t.sms.qcloudAppKeyTips = '腾讯云AppKey'
t.sms.qcloudSignName = '短信签名'
t.sms.qcloudTemplateId = '短信模板'
t.sms.qcloudTemplateIdTips = '短信模板ID'
t.sms.qiniuAccessKey = 'AccessKey'
t.sms.qiniuAccessKeyTips = '七牛AccessKey'
t.sms.qiniuSecretKey = 'SecretKey'
t.sms.qiniuSecretKeyTips = '七牛SecretKey'
t.sms.qiniuTemplateId = '短信模板'
t.sms.qiniuTemplateIdTips = '短信模板ID'

t.oss = {}
t.oss.config = '云存储配置'
t.oss.upload = '上传文件'
t.oss.url = 'URL地址'
t.oss.createDate = '创建时间'
t.oss.type = '类型'
t.oss.type1 = '七牛'
t.oss.type2 = '阿里云'
t.oss.type3 = '腾讯云'
t.oss.type4 = 'FastDFS'
t.oss.type5 = '本地上传'
t.oss.qiniuDomain = '域名'
t.oss.qiniuDomainTips = '七牛绑定的域名'
t.oss.qiniuPrefix = '路径前缀'
t.oss.qiniuPrefixTips = '不设置默认为空'
t.oss.qiniuAccessKey = 'AccessKey'
t.oss.qiniuAccessKeyTips = '七牛AccessKey'
t.oss.qiniuSecretKey = 'SecretKey'
t.oss.qiniuSecretKeyTips = '七牛SecretKey'
t.oss.qiniuBucketName = '空间名'
t.oss.qiniuBucketNameTips = '七牛存储空间名'
t.oss.aliyunDomain = '域名'
t.oss.aliyunDomainTips = '阿里云绑定的域名，如：http://cdn.yunlin.io'
t.oss.aliyunPrefix = '路径前缀'
t.oss.aliyunPrefixTips = '不设置默认为空'
t.oss.aliyunEndPoint = 'EndPoint'
t.oss.aliyunEndPointTips = '阿里云EndPoint'
t.oss.aliyunAccessKeyId = 'AccessKeyId'
t.oss.aliyunAccessKeyIdTips = '阿里云AccessKeyId'
t.oss.aliyunAccessKeySecret = 'AccessKeySecret'
t.oss.aliyunAccessKeySecretTips = '阿里云AccessKeySecret'
t.oss.aliyunBucketName = 'BucketName'
t.oss.aliyunBucketNameTips = '阿里云BucketName'
t.oss.qcloudDomain = '域名'
t.oss.qcloudDomainTips = '腾讯云绑定的域名'
t.oss.qcloudPrefix = '路径前缀'
t.oss.qcloudPrefixTips = '不设置默认为空'
t.oss.qcloudAppId = 'AppId'
t.oss.qcloudAppIdTips = '腾讯云AppId'
t.oss.qcloudSecretId = 'SecretId'
t.oss.qcloudSecretIdTips = '腾讯云SecretId'
t.oss.qcloudSecretKey = 'SecretKey'
t.oss.qcloudSecretKeyTips = '腾讯云SecretKey'
t.oss.qcloudBucketName = 'BucketName'
t.oss.qcloudBucketNameTips = '腾讯云BucketName'
t.oss.qcloudRegion = '所属地区'
t.oss.qcloudRegionTips = '请选择'
t.oss.qcloudRegionBeijing1 = '北京一区（华北）'
t.oss.qcloudRegionBeijing = '北京'
t.oss.qcloudRegionShanghai = '上海（华东）'
t.oss.qcloudRegionGuangzhou = '广州（华南）'
t.oss.qcloudRegionChengdu = '成都（西南）'
t.oss.qcloudRegionChongqing = '重庆'
t.oss.qcloudRegionSingapore = '新加坡'
t.oss.qcloudRegionHongkong = '香港'
t.oss.qcloudRegionToronto = '多伦多'
t.oss.qcloudRegionFrankfurt = '法兰克福'
t.oss.localDomain = '域名'
t.oss.localDomainTips = '绑定的域名，如：http://cdn.yunlin.io'
t.oss.fastdfsDomain = '域名'
t.oss.fastdfsDomainTips = '绑定的域名，如：http://cdn.yunlin.io'
t.oss.localPrefix = '路径前缀'
t.oss.localPrefixTips = '不设置默认为空'
t.oss.localPath = '存储目录'
t.oss.localPathTips = '如：D:/upload'

t.dict = {}
t.dict.dictName = '字典名称'
t.dict.dictType = '字典类型'
t.dict.dictLabel = '字典标签'
t.dict.dictValue = '字典值'
t.dict.sort = '排序'
t.dict.remark = '备注'
t.dict.createDate = '创建时间'

t.logError = {}
t.logError.module = '模块名称'
t.logError.requestUri = '请求URI'
t.logError.requestMethod = '请求方式'
t.logError.requestParams = '请求参数'
t.logError.ip = '操作IP'
t.logError.userAgent = '用户代理'
t.logError.createDate = '创建时间'
t.logError.errorInfo = '异常信息'

t.logLogin = {}
t.logLogin.creatorName = '用户名'
t.logLogin.status = '状态'
t.logLogin.status0 = '失败'
t.logLogin.status1 = '成功'
t.logLogin.status2 = '账号已锁定'
t.logLogin.operation = '操作类型'
t.logLogin.operation0 = '登录'
t.logLogin.operation1 = '退出'
t.logLogin.ip = '操作IP'
t.logLogin.userAgent = 'User-Agent'
t.logLogin.createDate = '创建时间'

t.logOperation = {}
t.logOperation.module = '模块名称'
t.logOperation.status = '状态'
t.logOperation.status0 = '失败'
t.logOperation.status1 = '成功'
t.logOperation.creatorName = '用户名'
t.logOperation.operation = '用户操作'
t.logOperation.requestUri = '请求URI'
t.logOperation.requestMethod = '请求方式'
t.logOperation.requestParams = '请求参数'
t.logOperation.requestTime = '请求时长'
t.logOperation.ip = '操作IP'
t.logOperation.userAgent = 'User-Agent'
t.logOperation.createDate = '创建时间'

t.menu = {}
t.menu.name = '名称'
t.menu.icon = '图标'
t.menu.type = '类型'
t.menu.type0 = '菜单'
t.menu.type1 = '按钮'
t.menu.sort = '排序'
t.menu.url = '路由'
t.menu.permissions = '授权标识'
t.menu.permissionsTips = '如: sys:menu:save'
t.menu.parentName = '上级菜单'
t.menu.parentNameDefault = '一级菜单'
t.menu.resource = '授权资源'
t.menu.resourceUrl = '资源URL'
t.menu.resourceMethod = '请求方式'
t.menu.resourceAddItem = '添加一项'

t.params = {}
t.params.paramCode = '编码'
t.params.paramValue = '值'
t.params.remark = '备注'

t.sysTenantRole = {}
t.sysTenantRole.name = '角色名称'
t.sysTenantRole.menuIdList = '运营平台权限'
t.sysTenantRole.deleteMessage = '请确认是否删除该角色！'

t.sysPlatformUser = {}
t.sysPlatformUser.usernameOrName = '姓名或手机号'
t.sysPlatformUser.realName = '姓名'
t.sysPlatformUser.username = '手机号'
t.sysPlatformUser.roleName = '角色'
t.sysPlatformUser.roleId = '角色'
t.sysPlatformUser.status = '状态'
t.sysPlatformUser.status0 = '停用'
t.sysPlatformUser.status1 = '启用'
t.sysPlatformUser.status0Message = '请确认是否停用该账号！'
t.sysPlatformUser.status1Message = '请确认是否启用该账号！'

t.sysTenant = {}
t.sysTenant.tenantName = '企业名称'
t.sysTenant.nameOrPhone = '管理员姓名或电话'
t.sysTenant.realName = '联系人'
t.sysTenant.username = '手机号'
t.sysTenant.address = '联系地址'
t.sysTenant.status = '状态'
t.sysTenant.status0 = '停用'
t.sysTenant.status1 = '启用'
t.sysTenant.status0Message = '请确认是否停用该企业！停用后，该企业所有的业务将无法使用！'
t.sysTenant.status1Message = '请确认是否启用该企业！启用后，该企业的业务将恢复使用！'
t.sysTenant.enter = '进入企业后台'
t.sysTenant.enterMessage = '进入当前企业后台！'

t.school = {}
t.school.schoolName = '学校名称'
t.school.schoolStatus = '学校状态'
t.school.schoolStatus0 = '停用'
t.school.schoolStatus1 = '启用'
t.school.schoolStatus0Message = '请确认是否停用该学校！停用后，该学校的C端业务都无法使用！'
t.school.schoolStatus1Message = '请确认是否启用该学校！启用后，该学校的C端业务都恢复使用！'
t.school.schoolAddress = '联系地址'
t.school.schoolPicture = '学校logo'
t.school.set = '学院设置'

t.schoolBranch = {}
t.schoolBranch.branchName = '学院名称'
t.schoolBranch.branchStatus = '学院状态'
t.schoolBranch.branchStatus0 = '停用'
t.schoolBranch.branchStatus1 = '启用'
t.schoolBranch.branchStatus0Message = '请确认是否停用该学院！'
t.schoolBranch.branchStatus1Message = '请确认是否启用该学院！'

t.tenant = {}
t.tenant.tenantName = '企业名称'
t.tenant.address = '联系地址'
t.tenant.realName = '联系人'
t.tenant.username = '手机号'

t.dept = {}
t.dept.contactNameOrPhone = '联系人姓名或电话'
t.dept.deptId = '组织名称'
t.dept.name = '组织名称'
t.dept.parentName = '上级组织'
t.dept.type = '组织类型'
t.dept.contactAddress = '联系地址'
t.dept.contactName = '联系人'
t.dept.contactPhone = '联系电话'
t.dept.pid = '上级组织'

t.role = {}
t.role.name = '岗位名称'
t.role.menuIdList = '企业后台权限'
t.role.deleteMessage = '请确认是否删除该岗位！'

t.propertyEmployee = {}
t.propertyEmployee.deptId = '所属组织'
t.propertyEmployee.deptName = '所属组织'
t.propertyEmployee.nameOrPhone = '姓名或手机号'
t.propertyEmployee.roleId = '岗位'
t.propertyEmployee.roleName = '岗位'
t.propertyEmployee.status = '状态'
t.propertyEmployee.status0 = '停用'
t.propertyEmployee.status1 = '启用'
t.propertyEmployee.status0Message = '请确认是否停用该账号！'
t.propertyEmployee.status1Message = '请确认是否启用该账号！'
t.propertyEmployee.buildingWorkerSign = '是否宿管人员'
t.propertyEmployee.maintenanceWorkerSign = '是否维修人员'
t.propertyEmployee.name = '姓名'
t.propertyEmployee.phoneNumber = '手机号'
t.propertyEmployee.address = '当前住址'
t.propertyEmployee.censusRegister = '户籍地址'
t.propertyEmployee.frontProjectIdList = '所属项目'
t.propertyEmployee.idCard = '身份证号'
t.propertyEmployee.projectIdList = '项目数据权限'
t.propertyEmployee.type = '人员性质'

t.project = {}
t.project.locked = '状态'
t.project.status0 = '停用'
t.project.status1 = '启用'
t.project.status0Message = '请确认是否停用该项目！停用后，该项目的C端业务都无法使用！'
t.project.status1Message = '请确认是否启用该项目！启用后，该项目的C端业务都恢复使用！'
t.project.nameOrPhone = '负责人姓名或手机号'
t.project.projectName = '项目名称'
t.project.projectLinkPhone = '项目联系电话'
t.project.projectManager = '项目负责人'
t.project.projectName = '项目名称'
t.project.schoolName = '学校'
t.project.schoolId = '学校'
t.project.schoolIdPlaceholder = '如果未找到想要对应的学校，请及时与平台联系！'
t.project.goodsList = '领用物品'
t.project.goodsName = '物品名称'
t.project.addGoods = '添加物品'
t.project.goodsNamePlaceholder = '请输入物品名称'
t.project.levelList = '等级评分列表'
t.project.interiorCheckType = '内务检查'
t.project.isLinkHousekeeper = '联系宿管'
t.project.limitOvertime = '接单超时提醒'
t.project.overtimeUnit = '分钟'
t.project.markPoint = '等级分数'
t.project.markPointPlaceholder = '请输入等级分数'
t.project.name = '等级名称'
t.project.namePlaceholder = '请输入等级名称'
t.project.baseInfo = '基本信息'
t.project.projectConfig = '项目配置'
t.project.level = '等级设置'
t.project.addLevel = '添加等级'
t.project.addMessage = '请填写完毕在添加'
t.project.save = '保存'
t.project.remove = '删除'

t.propertySchool = {}
t.propertySchool.branchName = '学院名称'
t.propertySchool.logo = '学校logo'
t.propertySchool.info = '学校信息'
t.propertySchool.branchInfo = '学院信息'
t.propertySchool.qrcodeBtn = '生成校园码'
t.propertySchool.qrcode = '校园码'
t.propertySchool.chooseProject = '请先在右上角处选择具体项目后，再使用此功能！'
t.propertySchool.tips = '注：如果学校学院信息与实际不符，请及时与平台运营人员联系进行调整！'

t.schoolSpeciality = {}
t.schoolSpeciality.branchId = '所属学院'
t.schoolSpeciality.branchName = '所属学院'
t.schoolSpeciality.nameOrPhone = '联系人姓名或电话'
t.schoolSpeciality.specialityName = '专业名称'
t.schoolSpeciality.specialityLinkMan = '本专业联系人'
t.schoolSpeciality.specialityLinkPhone = '本专业联系电话'

t.schoolClass = {}
t.schoolClass.branchId = '所属学院'
t.schoolClass.branchName = '所属学院'
t.schoolClass.className = '班级名称'
t.schoolClass.nameOrPhone = '联系人姓名或电话'
t.schoolClass.classLinkMan = '班主任'
t.schoolClass.classLinkPhone = '班主任联系电话'
t.schoolClass.specialityId = '所属专业'
t.schoolClass.specialityName = '所属专业'

t.schoolBuilding = {}
t.schoolBuilding.buildingName = '楼栋名称'
t.schoolBuilding.buildingType = '楼栋类型'
t.schoolBuilding.schoolId = '学校'

t.schoolFloor = {}
t.schoolFloor.buildingId = '所属楼栋'
t.schoolFloor.buildingName = '所属楼栋'
t.schoolFloor.buildingType = '楼栋类型'
t.schoolFloor.buildingTypeName = '楼栋类型'
t.schoolFloor.floorName = '楼层名称'

t.schoolRoom = {}
t.schoolRoom.buildingName = '所属楼栋'
t.schoolRoom.buildingId = '所属楼栋'
t.schoolRoom.floorName = '所属楼层'
t.schoolRoom.floorId = '所属楼层'
t.schoolRoom.roomName = '房间名称'
t.schoolRoom.roomBedNum = '床位数'
t.schoolRoom.remark = '备注'

t.student = {}
t.student.branchId = '所属学院'
t.student.branchName = '所属学院'
t.student.buildingId = '所属宿舍楼'
t.student.buildingName = '所属宿舍楼'
t.student.classId = '所属班级'
t.student.className = '所属班级'
t.student.floorId = '所属楼层'
t.student.floorName = '所属楼层'
t.student.roomId = '宿舍房间'
t.student.roomName = '宿舍房间'
t.student.specialityId = '所属专业'
t.student.specialityName = '所属专业'
t.student.studentName = '学生姓名'
t.student.studentNo = '学号'
t.student.studentPhone = '手机号'
t.student.studentSex = '性别'
t.student.bedNum = '床位号'
t.student.contactName = '联系人'
t.student.contactPhoneNumber = '联系人电话'

t.buildingWorker = {}
t.buildingWorker.buildingList = '服务楼栋'
t.buildingWorker.buildingName = '服务楼栋'
t.buildingWorker.buildingNames = '服务楼栋'
t.buildingWorker.deptName = '所属组织'
t.buildingWorker.nameOrPhone = '姓名或手机号'
t.buildingWorker.userId = '宿管'
t.buildingWorker.userName = '宿管'
t.buildingWorker.userNamePage = '选择员工'
t.buildingWorker.userNamePlaceholder = '选择员工'
t.buildingWorker.userPhone = '手机号'
t.buildingWorker.introduce = '备注'
t.buildingWorker.headPhoto = '照片'
t.buildingWorker.roleId = '岗位'
t.buildingWorker.roleName = '岗位'
t.buildingWorker.name = '员工姓名'
t.buildingWorker.phoneNumber = '手机号'
t.buildingWorker.set = '设为宿管'
t.buildingWorker.already = '已是宿管'

t.studentCheckin = {}
t.studentCheckin.branchId = '学院'
t.studentCheckin.branchName = '学院'
t.studentCheckin.buildingOrRoom = '楼栋名称或宿舍号'
t.studentCheckin.className = '班级'
t.studentCheckin.nameOrPhoneOrNo = '姓名手机号或学号'
t.studentCheckin.buildingName = '宿舍楼栋'
t.studentCheckin.createDate = '入宿时间'
t.studentCheckin.roomName = '宿舍号'
t.studentCheckin.studentName = '学生'
t.studentCheckin.studentPhone = '手机号'
t.studentCheckin.studentNo = '学号'
t.studentCheckin.baseInfo = '基本信息'
t.studentCheckin.otherInfo = '领用信息'
t.studentCheckin.collectingList = '领用物品'
t.studentCheckin.goodsName = '领用物品'
t.studentCheckin.collectionNum = '领用数量'

t.studentCheckout = {}
t.studentCheckout.branchId = '学院'
t.studentCheckout.branchName = '学院'
t.studentCheckout.buildingOrRoom = '楼栋名称或宿舍号'
t.studentCheckout.className = '班级'
t.studentCheckout.nameOrPhoneOrNo = '姓名手机号或学号'
t.studentCheckout.buildingName = '宿舍楼栋'
t.studentCheckout.createDate = '离宿时间'
t.studentCheckout.roomName = '宿舍号'
t.studentCheckout.studentName = '学生'
t.studentCheckout.studentPhone = '手机号'
t.studentCheckout.studentNo = '学号'
t.studentCheckout.baseInfo = '基本信息'
t.studentCheckout.otherInfo = '退还信息'
t.studentCheckout.collectingList = '退还物品'
t.studentCheckout.goodsName = '退还物品'
t.studentCheckout.collectionNum = '退还数量'

t.interiorCheck = {}
t.interiorCheck.buildingName = '宿舍楼栋'
t.interiorCheck.floorName = '楼层'
t.interiorCheck.roomName = '宿舍'
t.interiorCheck.userName = '检查人'
t.interiorCheck.createDate = '检查时间'
t.interiorCheck.interiorCheckType = '检查类型'
t.interiorCheck.interiorConclusion = '检查结果'
t.interiorCheck.total = '总分'
t.interiorCheck.regulationsRemark = '备注'
t.interiorCheck.scoreList = '评分列表'
t.interiorCheck.baseInfo = '基本信息'
t.interiorCheck.otherInfo = '检查结果'
t.interiorCheck.typeName = '检查项'
t.interiorCheck.checkScore = '分数'

t.regulationsCheck = {}
t.regulationsCheck.buildingOrFloor = '楼栋名或楼层'
t.regulationsCheck.buildingName = '宿舍楼栋'
t.regulationsCheck.floorName = '楼层'
t.regulationsCheck.roomName = '宿舍'
t.regulationsCheck.studentName = '违章人'
t.regulationsCheck.userName = '检查人'
t.regulationsCheck.createDate = '登记时间'
t.regulationsCheck.regulationsGoods = '违章物品'
t.regulationsCheck.studentName = '违章人'
t.regulationsCheck.userName = '检查人'
t.regulationsCheck.baseInfo = '基本信息'
t.regulationsCheck.otherInfo = '违章信息'

t.bedtimeCheck = {}
t.bedtimeCheck.buildingName = '宿舍楼栋'
t.bedtimeCheck.floorName = '楼层'
t.bedtimeCheck.roomName = '宿舍'
t.bedtimeCheck.userName = '检查人'
t.bedtimeCheck.absentNum = '缺席人数'
t.bedtimeCheck.createDate = '检查时间'
t.bedtimeCheck.shouldNum = '应到人数'
t.bedtimeCheck.detailList = '缺席人员'
t.bedtimeCheck.baseInfo = '基本信息'
t.bedtimeCheck.otherInfo = '缺席信息'
t.bedtimeCheck.studentName = '缺席人员'
t.bedtimeCheck.studentPhone = '手机号'
t.bedtimeCheck.reason = '缺席原因'

t.studentGoout = {}
t.studentGoout.lateType = '类型'
t.studentGoout.branchId = '学院'
t.studentGoout.branchName = '学院'
t.studentGoout.buildingOrRoom = '楼栋名称或宿舍号'
t.studentGoout.className = '班级'
t.studentGoout.nameOrPhoneOrNo = '姓名手机号或学号'
t.studentGoout.buildingName = '宿舍楼'
t.studentGoout.createDate = '登记时间'
t.studentGoout.roomName = '宿舍号'
t.studentGoout.studentName = '学生'
t.studentGoout.studentPhone = '手机号'
t.studentGoout.regulationsReason = '晚出原因'
t.studentGoout.baseInfo = '晚出详情'

t.studentComeback = {}
t.studentComeback.lateType = '类型'
t.studentComeback.branchId = '学院'
t.studentComeback.branchName = '学院'
t.studentComeback.buildingOrRoom = '楼栋名称或宿舍号'
t.studentComeback.className = '班级'
t.studentComeback.nameOrPhoneOrNo = '姓名手机号或学号'
t.studentComeback.buildingName = '宿舍楼'
t.studentComeback.createDate = '登记时间'
t.studentComeback.roomName = '宿舍号'
t.studentComeback.studentName = '学生'
t.studentComeback.studentPhone = '手机号'
t.studentComeback.regulationsReason = '晚归原因'
t.studentComeback.baseInfo = '晚归详情'

t.studentCollecting = {}
t.studentCollecting.buildingName = '宿舍楼'
t.studentCollecting.floorName = '楼层'
t.studentCollecting.roomName = '宿舍号'
t.studentCollecting.studentName = '学生姓名'
t.studentCollecting.createDate = '登记时间'
t.studentCollecting.studentPhone = '手机号'
t.studentCollecting.collectingList = '领退物品'
t.studentCollecting.type = '领退类型'
t.studentCollecting.baseInfo = '基本信息'
t.studentCollecting.otherInfo = '领退信息'
t.studentCollecting.goodsName = '物品'
t.studentCollecting.collectionNum = '数量'

t.maintenanceWorker = {}
t.maintenanceWorker.buildingName = '服务楼栋'
t.maintenanceWorker.deptName = '所属组织'
t.maintenanceWorker.nameOrPhone = '维修人员手机号或姓名'
t.maintenanceWorker.position = '人员类型'
t.maintenanceWorker.qrcode = '生成二维码'
t.maintenanceWorker.buildingNameStr = '服务楼栋'
t.maintenanceWorker.employeeName = '维修人员'
t.maintenanceWorker.phone = '手机号'
t.maintenanceWorker.positionName = '职位'
t.maintenanceWorker.buildingIds = '服务楼栋'
t.maintenanceWorker.userId = '维修人员'
t.maintenanceWorker.userNamePlaceholder = '选择员工'
t.maintenanceWorker.userNamePage = '选择员工'
t.maintenanceWorker.roleId = '岗位'
t.maintenanceWorker.roleName = '岗位'
t.maintenanceWorker.name = '员工姓名'
t.maintenanceWorker.phoneNumber = '手机号'
t.maintenanceWorker.set = '设为维修人员'
t.maintenanceWorker.already = '已是维修人员'

t.maintenanceApplication = {}
t.maintenanceApplication.buildingName = '报修楼栋'
t.maintenanceApplication.buildingId = '报修楼栋'
t.maintenanceApplication.executorNameOrPhone = '处理人姓名或手机号'
t.maintenanceApplication.nameOrPhone = '报修人姓名或手机号'
t.maintenanceApplication.status = '处理状态'
t.maintenanceApplication.createDate = '报修时间'
t.maintenanceApplication.executorId = '处理人'
t.maintenanceApplication.executorName = '处理人'
t.maintenanceApplication.executorPhoneNumber = '处理人手机号'
t.maintenanceApplication.studentId = '学生'
t.maintenanceApplication.studentName = '报修人'
t.maintenanceApplication.studentPhone = '报修人手机号'
t.maintenanceApplication.address = '报修地点'
t.maintenanceApplication.completeComment = '完成说明'
t.maintenanceApplication.completeOssUrls = '完成图片'
t.maintenanceApplication.completeTime = '完成时间'
t.maintenanceApplication.completeType = '完成结果'
t.maintenanceApplication.details = '详情内容'
t.maintenanceApplication.evaluateComment = '评价结果'
t.maintenanceApplication.executeTime = '接单时间'
t.maintenanceApplication.ossUrls = '报修图片'
t.maintenanceApplication.baseInfo = '基本信息'
t.maintenanceApplication.otherInfo = '处理信息'

t.campusPatrolSite = {}
t.campusPatrolSite.siteName = '巡检点名称'

t.campusPatrolHistory = {}
t.campusPatrolHistory.createDate = '巡检日期'
t.campusPatrolHistory.siteName = '巡检点'
t.campusPatrolHistory.userName = '巡检人'
t.campusPatrolHistory.photoList = '图片列表'
t.campusPatrolHistory.siteAddress = '打卡位置'
t.campusPatrolHistory.lat = '纬度'
t.campusPatrolHistory.lng = '经度'
t.campusPatrolHistory.createDate1 = '打卡时间'

t.article = {}
t.article.title = '公告标题'
t.article.content = '文章内容'
t.article.createDate = '发布时间'
t.article.publisher = '发布人'

export default t
