const t = {}

t.loading = '加载中...'

t.brand = {}
t.brand.lg = '耘林信息工程管理平台'
t.brand.mini = '耘林信息'

t.add = '新增'
t.delete = '删除'
t.deleteBatch = '删除'
t.update = '修改'
t.reset = '重置'
t.detail = '详情'
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
t.login.sysname = '耘林工程项目管理系统'
t.login.title = '欢迎登录'
t.login.username = '用户名'
t.login.password = '密码'
t.login.captcha = '验证码'
t.login.demo = ''
t.login.copyright = {}
t.login.copyright.company = '由无锡耘林信息技术有限公司提供技术支持'
t.login.copyright.phone = '电话: 0510-85386217'
t.login.copyright.address = '地址:无锡市高浪东路999号-8-A1-1201'

t.home = {}
t.home.desc = {}
t.home.desc.title = '项目介绍'
t.home.desc.list = ['耘林信息工程管理项目平台，基于最新的Spring Boot 2.2、Mybatis、Element 2.0+开发']

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

t.news = {}
t.news.title = '标题'
t.news.pubDate = '发布时间'
t.news.createDate = '创建时间'
t.news.content = '内容'

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

t.mail = {}
t.mail.name = '名称'
t.mail.config = '邮件配置'
t.mail.subject = '主题'
t.mail.createDate = '创建时间'
t.mail.send = '发送邮件'
t.mail.content = '内容'
t.mail.smtp = 'SMTP'
t.mail.port = '端口号'
t.mail.username = '邮箱账号'
t.mail.password = '邮箱密码'
t.mail.mailTo = '收件人'
t.mail.mailCc = '抄送'
t.mail.params = '模板参数'
t.mail.paramsTips = '如：{"code": "123456"}'
t.mail.templateId = '模版ID'
t.mail.status = '状态'
t.mail.status0 = '发送失败'
t.mail.status1 = '发送成功'
t.mail.mailFrom = '发送者'
t.mail.createDate = '发送时间'

t.dingtalk = {}
t.dingtalk.config = '钉钉配置'
t.dingtalk.send = '发送通知'
t.dingtalk.messageUrl = '消息链接路径'
t.dingtalk.params1 = '参数1'
t.dingtalk.params2 = '参数2'
t.dingtalk.params3 = '参数3'
t.dingtalk.params4 = '参数4'
t.dingtalk.type = '审批类型'
t.dingtalk.type0 = '应付审批'
t.dingtalk.type1 = '合同审批'
t.dingtalk.type2 = '变更审批'
t.dingtalk.type3 = '结算审批'
t.dingtalk.createDate = '创建时间'
t.dingtalk.agentId = 'agentId'
t.dingtalk.appKey = 'appKey'
t.dingtalk.appSecret = 'appSecret'
t.dingtalk.phoneNumber = '钉钉用户手机'
t.dingtalk.sendType = '通知类型'
t.dingtalk.value1 = '参数值1'
t.dingtalk.value2 = '参数值2'
t.dingtalk.value3 = '参数值3'
t.dingtalk.value4 = '参数值4'
t.dingtalk.value5 = '参数值5'

t.sms = {}
t.sms.mobile = '手机号'
t.sms.status = '状态'
t.sms.status0 = '发送失败'
t.sms.status1 = '发送成功'
t.sms.config = '短信配置'
t.sms.send = '发送短信'
t.sms.platform = '平台类型'
t.sms.platform1 = '阿里云'
t.sms.platform2 = '腾讯云'
t.sms.params = '参数'
t.sms.paramsTips = '如：{"code": "123456"}'
t.sms.params1 = '参数1'
t.sms.params2 = '参数2'
t.sms.params3 = '参数3'
t.sms.params4 = '参数4'
t.sms.createDate = '发送时间'
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

t.dept = {}
t.dept.name = '名称'
t.dept.parentName = '上级部门'
t.dept.sort = '排序'
t.dept.parentNameDefault = '一级部门'
t.dept.chooseerror = '请选择部门'
t.dept.title = '选择部门'

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

t.role = {}
t.role.name = '名称'
t.role.remark = '备注'
t.role.createDate = '创建时间'
t.role.menuList = '菜单授权'
t.role.deptList = '数据授权'

t.user = {}
t.user.username = '用户名'
t.user.deptName = '所属部门'
t.user.email = '邮箱'
t.user.mobile = '手机号'
t.user.status = '状态'
t.user.status0 = '停用'
t.user.status1 = '正常'
t.user.createDate = '创建时间'
t.user.password = '密码'
t.user.confirmPassword = '确认密码'
t.user.realName = '真实姓名'
t.user.gender = '性别'
t.user.gender0 = '男'
t.user.gender1 = '女'
t.user.gender2 = '保密'
t.user.roleIdList = '角色配置'
t.user.validate = {}
t.user.validate.confirmPassword = '确认密码与密码输入不一致'

t.region = {}
t.region.id = '区域标识'
t.region.name = '区域名称'
t.region.type = '区域类型'
t.region.sort = '排序'
t.region.updateDate = '更新时间'
t.region.province = '省份直辖市'
t.region.city = '地市'
t.region.county = '区县'
t.region.parentName = '上级区域'
t.region.select = '选择区域'

t.correction = {}
t.correction.post = '申请岗位'
t.correction.entryDate = '入职日期'
t.correction.correctionDate = '转正日期'
t.correction.workContent = '工作內容'
t.correction.achievement = '工作成绩'

t.process.comment = '审核意见'
t.process.completeTask = '通过'
t.process.rejectTask = '驳回'
t.process.doBackRollback = '回退'
t.process.terminationTask = '终止'
t.process.entrustTask = '委托'
t.process.createInstance = '发起流程'
t.process.instanceId = '流程实例ID'
t.process.taskId = '任务ID'
t.process.days = '天数'
t.process.businessKey = '业务KEY'
t.process.processDefinitionName = '流程名称'
t.process.ended = '是否结束'
t.process.ended0 = '是'
t.process.ended1 = '否'
t.process.startTime = '流程开始时间'
t.process.endTime = '流程结束时间'
t.process.activityName = '当前环节'
t.process.createTime = '任务创建时间'
t.process.assignee = '处理人'
t.process.viewFlowImage = '查看流程图'
t.process.flowImage = '流程图'
t.process.processDefinitionVersion = '流程版本'
t.process.startUserId = '发起人'
t.process.taskName = '任务名称'
t.process.owner = '任务所有人'
t.process.claim = '签收'
t.process.routeError = '请先配置业务表单路由信息'
t.process.entrustError = '请选择委托人'
t.process.formURLError = '请设置保存表单的URL'
t.process.keyError = '请设置流程KEY'
t.process.formNameError = '请设置表单名称'
t.process.businessKeyError = '业务KEY为空，无法启动流程'
t.process.notExistError = '没有查询到流程，请先设计流程'
t.process.circulation = '流转详情'

t.task = {}
t.task.businessKeyError = '业务KEY为空，无法处理任务'
t.task.detailError = '业务KEY为空，无法查看处理详情'
t.task.startTime = '任务开始时间'
t.task.endTime = '任务结束时间'
t.task.durationInSeconds = '任务时长（秒）'

t.joblist = {}
t.joblist.jobName = '岗位名称'
t.joblist.deptName = '部门名称'
t.joblist.pjobName = '上级岗位'
t.joblist.remark = '备注'

t.employee = {}
t.employee.deptName = '所属部门'
t.employee.positionName = '岗位名称'
t.employee.positionId = '岗位名称'
t.employee.relationshipId = '是否兼职'
t.employee.relationshipId0 = '否'
t.employee.relationshipId1 = '是'
t.employee.name = '姓名'
t.employee.headPhoto = '头像'
t.employee.phoneNumber = '手机号码'
t.employee.sex = '性别'
t.employee.status = '在职状态'
t.employee.contractStartTime = '合同开始时间'
t.employee.constractEndTime = '合同结束时间'
t.employee.birthday = '生日'
t.employee.nativePlace = '籍贯'
t.employee.nation = '民族'
t.employee.education = '学历'
t.employee.emergencyContactName = '紧急联系人'
t.employee.emergencyContactPhoneNumber = '紧急联系电话'
t.employee.address = '住址'
t.employee.married = '是否结婚'
t.employee.censusRegister = '户口所在地'
t.employee.idCard = '身份证号'
t.employee.companyInfo = '员工单位信息'
t.employee.personalInfo = '员工个人信息'
t.employee.deptNameDefault = '请选择部门'

t.projectarea = {}
t.projectarea.name = '区域名称'
t.projectarea.subProjectNum = '下属项目个数'
t.projectarea.deptName = '所属部门'

t.project = {}
t.project.name = '项目名称'
t.project.projectAddress = '项目地址'
t.project.areaName = '所属区域'
t.project.areaId = '所属区域'
t.project.deptIds = '所属部门'
t.project.deptName = '所属部门'
t.project.projectStatus = '项目状态'
t.project.projectType = '项目类型'
t.project.projectTotalArea = '总占地面积'
t.project.projectConstructionLandArea = '建筑用地面积'
t.project.projectTotalBuildingArea = '总建筑面积'
t.project.projectBuildingDensity = '建筑密度'
t.project.projectGreenArea = '绿化面积'
t.project.projectGreenRate = '绿地率'
t.project.projectPropertyCompany = '物业公司'
t.project.uploadDTOs = '项目详情信息'

t.building = {}
t.building.projectName = '项目名称'
t.building.projectId = '项目名称'
t.building.buildingNumber = '楼栋号'
t.building.buildingTotalFloor = '楼栋总层数'
t.building.projectFloorHeight = '楼栋层高'
t.building.remark = '备注'

t.supplierType = {}
t.supplierType.typeName = '类别名称'
t.supplierType.pid = '上级类别'
t.supplierType.parentName = '上级类别'
t.supplierType.parentNameDefault = '顶级供应商'

t.supplierQualifications = {}
t.supplierQualifications.name = '资质名称'
t.supplierQualifications.title = '供应商资质'
t.supplierQualifications.qualificationsType = '资质类别'
t.supplierQualifications.qualificationsGrade = '资质级别'
t.supplierQualifications.qualificationsGradeName = '资质级别'
t.supplierQualifications.qualificationsDetail = '资质备注信息'
t.supplierQualifications.isBlacklist = '拉黑状态'
t.supplierQualifications.ossEntityList = '资质文件'

t.supplierLinkhis = {}
t.supplierLinkhis.title = '联系人变更记录'
t.supplierLinkhis.add = '变更联系人'
t.supplierLinkhis.supplierLinkman = '联系人'
t.supplierLinkhis.supplierLinkphone = '联系电话'
t.supplierLinkhis.createDate = '变更时间'
t.supplierLinkhis.updateDate = '修改时间'

t.supplier = {}
t.supplier.name = '供应商名称'
t.supplier.black = '拉黑'
t.supplier.blackMessage = '拉黑同一法人的所有供应商'
t.supplier.blackCurrent = '拉黑当前供应商'
t.supplier.blackAll = '拉黑同一法人供应商'
t.supplier.blackOtherSame = '同一法人供应商'
t.supplier.supplierLinkman = '联系人'
t.supplier.hisSupplierLinkman = '历史联系人'
t.supplier.qualifications = '资质'
t.supplier.supplierLinkphone = '联系电话'
t.supplier.supplierGrade = '供货商评级'
t.supplier.supplierGradeName = '供货商评级'
t.supplier.supplierTypeIds = '供应商类别'
t.supplier.supplierTypeNames = '供应商类别'
t.supplier.isRely = '是否挂靠'
t.supplier.supplierCorporation = '法人代表'
t.supplier.supplierCorporationPhone = '法人电话'
t.supplier.supplierAddress = '注册地址'
t.supplier.supplierDetail = '供货商备注'
t.supplier.ossEntityList = '供货商文件'

t.cost = {}
t.cost.costTypeCode = '科目编号'
t.cost.costTypeName = '科目名称'
t.cost.pid = '上级科目'
t.cost.pcostTypeName = '上级科目'
t.cost.costPrimitiveTarget = '原始指标'
t.cost.isStrongControl = '是否强控'
t.cost.costControlRate = '强控比例'
t.cost.remark = '备注'

t.land = {}
t.land.projectId = '项目名称'
t.land.projectName = '项目名称'
t.land.budgetSubjectName = '预算主题'
t.land.landbudget = '预算'
t.land.landbudgetUserId = '预算人'
t.land.landbudgetDeptId = '预算部门'
t.land.landbudgetDeptName = '预算部门'
t.land.landbudgetTime = '预算时间'
t.land.landbudgetRemark = '预算说明'
t.land.costTypeCode = '科目编号'
t.land.costTypeName = '科目名称'
t.land.costPrimitiveTarget = '原始指标'
t.land.landbudgetUnivalence = '建筑单价(元)'
t.land.landbudgetQuantities = '工程量'
t.land.landbudgetTotalCost = '建筑总价(元)'
t.land.landbudgetControlRate = '强控比例'
t.land.landbudgettQuantitiesRemark = '单价说明'
export default t
