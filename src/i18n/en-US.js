const t = {}

t.loading = 'Loading...'

t.brand = {}
t.brand.lg = '校园物业平台'
t.brand.mini = '校园物业平台'
t.brand.projectDefault = '选择项目'

t.add = 'Add'
t.delete = 'Delete'
t.deleteBatch = 'Delete'
t.update = 'Edit'
t.reset = 'Reset'
t.detail = 'Detail'
t.instanceId = '活动流程图'
t.manage = 'Manage'
t.query = 'Query'
t.export = 'Export'
t.handle = 'Action'
t.confirm = 'Confirm'
t.cancel = 'Cancel'
t.clearCurrent = '取消选中'
t.clear = 'Clear'
t.logout = 'Sign Out'
t.createDate = 'Create Time'
t.keyword = 'Keyword：'
t.keywordFilterSearch = 'filter by keyword'
t.choose = 'Please Choose'
t.back = 'Back'
t.download = '下载'
t.downloadTemp = '下载模板'
t.import = '导入'
t.info = '信息'
t.up = '上移'
t.down = '下移'
t.on = '上架'
t.off = '下架'
t.editorUpload = '上传图片'
t.projectTitle = '请指定一个项目'
t.projectPlaceholder = '请选择项目'
t.resetPassword = '请先修改密码以后重新登录系统!'

t.search = {}
t.search.phoneNumberOrName = '手机号或姓名'

t.prompt = {}
t.prompt.title = 'Prompt'
t.prompt.info = 'Confirm to carry out [{handle}] operation?'
t.prompt.success = 'Succeeded'
t.prompt.failed = 'Failed'
t.prompt.deleteBatch = 'Please select delete item'
t.prompt.customBatch = 'Please select delete items'
t.prompt.importTitle = '导入提示'

t.validate = {}
t.validate.required = 'Required field cannot be empty'
t.validate.format = '{attr} format error'
t.validate.format_mobile = '手机号'
t.validate.format_captcha = '{second}秒后重新获取'

t.upload = {}
t.upload.text = 'Drop files here, or <em>Click Upload</em>'
t.upload.tip = 'Only support {format} format files! '
t.upload.button = 'Click to upload'
t.upload.choose = 'Choose file'
t.upload.uploading = 'file uploading, try again later..'

t.datePicker = {}
t.datePicker.range = 'To'
t.datePicker.start = 'Start Date'
t.datePicker.end = 'End Date'

t.fullscreen = {}
t.fullscreen.prompt = 'Your browser does not support this operation'

t.updatePassword = {}
t.updatePassword.title = 'Change Password'
t.updatePassword.username = 'Account'
t.updatePassword.password = 'Original'
t.updatePassword.newPassword = 'New Password'
t.updatePassword.confirmPassword = 'Confirm'
t.updatePassword.validate = {}
t.updatePassword.validate.confirmPassword = 'Confirm password is not consistent with new password input'

t.contentTabs = {}
t.contentTabs.closeCurrent = 'Close Current Tab'
t.contentTabs.closeOther = 'Close Other Tabs'
t.contentTabs.closeAll = 'Close All Tabs'

/* pages */
t.notFound = {}
t.notFound.desc = 'Sorry! <em>missing</em> on the page you visited...'
t.notFound.back = 'Previous Page'
t.notFound.home = 'Home'

t.login = {}
t.login.sysname = '校园物业平台'
t.login.title = 'Sign In'
t.login.tenantCode = '请选择企业'
t.login.newPassword = '新密码'
t.login.confirmNewPassword = '确认密码'
t.login.confirmNewPasswordMessage = '新密码与确认密码不一致'
t.login.username = 'Username'
t.login.password = 'Password'
t.login.mobile = '请输入手机号'
t.login.captcha = 'Verification Code'
t.login.getCaptcha = '获取验证码'
t.login.forgetLabel = '忘记密码?'
t.login.loginLabel = '我要登录'
t.login.demo = 'Demo'
t.login.copyright = {}
t.login.copyright.company = 'yunlin'
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
t.home.desc.title = 'Project introduction'
t.home.desc.list = ['校园物业平台，基于最新的Spring Boot 2.2、Mybatis、Element 2.0+开发']

/* modules */
t.model = {}
t.model.name = 'Name'
t.model.key = 'Information'
t.model.version = 'Version'
t.model.createTime = 'Create Time'
t.model.lastUpdateTime = 'Update Time'
t.model.design = 'Online Design'
t.model.deploy = 'Deployment'
t.model.description = 'Description'

t.process = {}
t.process.name = 'name'
t.process.key = 'Identification'
t.process.deployFile = 'Deploy process file'
t.process.id = 'Process ID'
t.process.deploymentId = 'Deployment ID'
t.process.version = 'Version'
t.process.resourceName = 'XML'
t.process.diagramResourceName = 'Image'
t.process.deploymentTime = 'Deployment Time'
t.process.active = 'Activate'
t.process.suspend = 'Hang'
t.process.convertToModel = 'Convert to model'
t.process.bizRouteSet = 'Configuring Business Routing'
t.process.bizRoute = 'Business Routing'

t.running = {}
t.running.id = 'Instance ID'
t.running.definitionKey = 'Define Key'
t.running.processDefinitionId = 'Define ID'
t.running.processDefinitionName = 'Define the name'
t.running.activityId = 'Current Link'
t.running.suspended = 'Whether Hang'
t.running.suspended0 = 'No'
t.running.suspended1 = 'Yes'

t.schedule = {}
t.schedule.beanName = 'Bean Name'
t.schedule.beanNameTips = 'Spring bean name, eg: testTask'
t.schedule.pauseBatch = 'Pause'
t.schedule.resumeBatch = 'Recovery'
t.schedule.runBatch = 'Execution'
t.schedule.log = 'Log List'
t.schedule.params = 'Parameters'
t.schedule.cronExpression = 'Cron Expression'
t.schedule.cronExpressionTips = 'Example: 0 0 12 * * ?'
t.schedule.remark = 'Remarks'
t.schedule.status = 'Status'
t.schedule.status0 = 'Pause'
t.schedule.status1 = 'Normal'
t.schedule.statusLog0 = 'Failed'
t.schedule.statusLog1 = 'Success'
t.schedule.pause = 'Pause'
t.schedule.resume = 'Restore'
t.schedule.run = 'Execute'
t.schedule.jobId = 'Task ID'
t.schedule.times = 'Time-consuming (unit: milliseconds)'
t.schedule.createDate = 'Execution Time'

t.sms = {}
t.sms.smsCode = '短信编码'
t.sms.remark = '备注'
t.sms.mobile = 'Mobile Number'
t.sms.status = 'Status'
t.sms.status0 = 'Send Failed'
t.sms.status1 = 'Successfully Sent'
t.sms.config = 'SMS Configuration'
t.sms.editConfig = '修改配置'
t.sms.send = 'Send SMS'
t.sms.platform = 'platform Type'
t.sms.platform1 = 'Alibaba Cloud'
t.sms.platform2 = 'Tencent Cloud'
t.sms.platform3 = '七牛'
t.sms.params = 'Parameters'
t.sms.paramsTips = 'eg: {"code": "123456"}'
t.sms.createDate = 'Create Time'
t.sms.params1 = '参数1'
t.sms.params2 = '参数2'
t.sms.params3 = '参数3'
t.sms.params4 = '参数4'
t.sms.aliyunAccessKeyId = 'Key'
t.sms.aliyunAccessKeyIdTips = 'Alibaba Cloud AccessKeyId'
t.sms.aliyunAccessKeySecret = 'Secret'
t.sms.aliyunAccessKeySecretTips = 'Alibaba Cloud AccessKeySecret'
t.sms.aliyunSignName = 'SMS Signature'
t.sms.aliyunTemplateCode = 'SMS Template'
t.sms.aliyunTemplateCodeTips = 'SMS Template CODE'
t.sms.qcloudAppId = 'AppId'
t.sms.qcloudAppIdTips = 'Tencent Cloud AppId'
t.sms.qcloudAppKey = 'AppKey'
t.sms.qcloudAppKeyTips = 'Tencent Cloud AppKey'
t.sms.qcloudSignName = 'SMS Signature'
t.sms.qcloudTemplateId = 'SMS Template'
t.sms.qcloudTemplateIdTips = 'SMS template ID'
t.sms.qiniuAccessKey = 'AccessKey'
t.sms.qiniuAccessKeyTips = '七牛AccessKey'
t.sms.qiniuSecretKey = 'SecretKey'
t.sms.qiniuSecretKeyTips = '七牛SecretKey'
t.sms.qiniuTemplateId = '短信模板'
t.sms.qiniuTemplateIdTips = '短信模板ID'

t.oss = {}
t.oss.config = 'Cloud Storage Configuration'
t.oss.upload = 'Upload File'
t.oss.url = 'URL Address'
t.oss.createDate = 'Create Time'
t.oss.type = 'Type'
t.oss.type1 = 'Seven Cows'
t.oss.type2 = 'Alibaba Cloud'
t.oss.type3 = 'Tencent Cloud'
t.oss.type4 = 'FastDFS'
t.oss.type5 = 'Local Upload'
t.oss.qiniuDomain = 'Domain Name'
t.oss.qiniuDomainTips = 'Seven cattle bound domain name'
t.oss.qiniuPrefix = 'Path Prefix'
t.oss.qiniuPrefixTips = 'Do not set default to empty'
t.oss.qiniuAccessKey = 'AccessKey'
t.oss.qiniuAccessKeyTips = 'Seven cattle AccessKey'
t.oss.qiniuSecretKey = 'SecretKey'
t.oss.qiniuSecretKeyTips = 'Seven Cow SecretKey'
t.oss.qiniuBucketName = 'Space Name'
t.oss.qiniuBucketNameTips = 'Seven cattle storage space name'
t.oss.aliyunDomain = 'Domain Name'
t.oss.aliyunDomainTips = 'Alibaba Cloud bound domain name, such as: http://cdn.yunlin.io'
t.oss.aliyunPrefix = 'Path Prefix'
t.oss.aliyunPrefixTips = 'Do not set default to empty'
t.oss.aliyunEndPoint = 'EndPoint'
t.oss.aliyunEndPointTips = 'Ali Cloud EndPoint'
t.oss.aliyunAccessKeyId = 'AccessKeyId'
t.oss.aliyunAccessKeyIdTips = 'Alibaba Cloud AccessKeyId'
t.oss.aliyunAccessKeySecret = 'AccessKeySecret'
t.oss.aliyunAccessKeySecretTips = 'Alibaba Cloud AccessKeySecret'
t.oss.aliyunBucketName = 'BucketName'
t.oss.aliyunBucketNameTips = 'Alibaba Cloud BucketName'
t.oss.qcloudDomain = 'Domain Name'
t.oss.qcloudDomainTips = 'Tencent cloud bound domain name'
t.oss.qcloudPrefix = 'Path Prefix'
t.oss.qcloudPrefixTips = 'Do not set default to empty'
t.oss.qcloudAppId = 'AppId'
t.oss.qcloudAppIdTips = 'Tencent Cloud AppId'
t.oss.qcloudSecretId = 'SecretId'
t.oss.qcloudSecretIdTips = 'Tencent Cloud SecretD'
t.oss.qcloudSecretKey = 'SecretKey'
t.oss.qcloudSecretKeyTips = 'Tencent Cloud SecretKey'
t.oss.qcloudBucketName = 'BucketName'
t.oss.qcloudBucketNameTips = 'Tencent Cloud BucketName'
t.oss.qcloudRegion = 'Affiliate'
t.oss.qcloudRegionTips = 'Please Select'
t.oss.qcloudRegionBeijing1 = 'Beijing District 1 (North China)'
t.oss.qcloudRegionBeijing = 'Beijing'
t.oss.qcloudRegionShanghai = 'Shanghai (East China)'
t.oss.qcloudRegionGuangzhou = 'Guangzhou (South China)'
t.oss.qcloudRegionChengdu = 'Chengdu (Southwest)'
t.oss.qcloudRegionChongqing = 'Chongqing'
t.oss.qcloudRegionSingapore = 'Singapore'
t.oss.qcloudRegionHongkong = 'HongKong'
t.oss.qcloudRegionToronto = 'Toronto'
t.oss.qcloudRegionFrankfurt = 'Frankfurt'
t.oss.localDomain = 'Domain Name'
t.oss.localDomainTips = 'Binded domain name, eg http://cdn.yunlin.io'
t.oss.fastdfsDomain = 'Domain Name'
t.oss.fastdfsDomainTips = 'Binded domain name, eg http://cdn.yunlin.io'
t.oss.localPrefix = 'Path Prefix'
t.oss.localPrefixTips = 'Do not set default to empty'
t.oss.localPath = 'Storage Directory'
t.oss.localPathTips = 'eg: D:/upload'

t.dict = {}
t.dict.dictName = 'Name'
t.dict.dictType = 'Type'
t.dict.dictValue = 'Value'
t.dict.dictLabel = 'Label'
t.dict.sort = 'Sort'
t.dict.remark = 'Remarks'
t.dict.createDate = 'Create Date'

t.logError = {}
t.logError.module = 'Module Name'
t.logError.requestUri = 'Request URI'
t.logError.requestMethod = 'Request Method'
t.logError.requestParams = 'Request Parameters'
t.logError.ip = 'IP'
t.logError.userAgent = 'User Agent'
t.logError.createDate = 'Create Date'
t.logError.errorInfo = 'Exception'

t.logLogin = {}
t.logLogin.creatorName = 'Username'
t.logLogin.status = 'Status'
t.logLogin.status0 = 'Failed'
t.logLogin.status1 = 'Success'
t.logLogin.status2 = 'Locked'
t.logLogin.operation = 'User Action'
t.logLogin.operation0 = 'Login'
t.logLogin.operation1 = 'Exit'
t.logLogin.ip = 'IP'
t.logLogin.userAgent = 'User-Agent'
t.logLogin.createDate = 'Create Date'

t.logOperation = {}
t.logOperation.module = 'Module Name'
t.logOperation.status = 'Status'
t.logOperation.status0 = 'Failed'
t.logOperation.status1 = 'Success'
t.logOperation.creatorName = 'Username'
t.logOperation.operation = 'User Action'
t.logOperation.requestUri = 'Request URI'
t.logOperation.requestMethod = 'Request Mode'
t.logOperation.requestParams = 'Request Parameters'
t.logOperation.requestTime = 'Request Duration'
t.logOperation.ip = 'IP'
t.logOperation.userAgent = 'User-Agent'
t.logOperation.createDate = 'Create Date'

t.menu = {}
t.menu.name = 'Name'
t.menu.icon = 'Icon'
t.menu.type = 'Type'
t.menu.type0 = 'Menu'
t.menu.type1 = 'Button'
t.menu.sort = 'Sort'
t.menu.url = 'Route'
t.menu.permissions = 'Auth ID'
t.menu.permissionsTips = 'eg: sys:menu:save'
t.menu.parentName = 'Superior'
t.menu.parentNameDefault = 'Top Menu'
t.menu.resource = 'Auth Resources'
t.menu.resourceUrl = 'Resource URL'
t.menu.resourceMethod = 'Request Method'
t.menu.resourceAddItem = 'Add an Item'

t.params = {}
t.params.paramCode = 'Code'
t.params.paramValue = 'Value'
t.params.remark = 'Remarks'

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
t.project.name = '项目名称'
t.project.namePlaceholder = '请输入项目名称'
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
t.schoolRoom.buildingName = '所属宿舍栋'
t.schoolRoom.buildingId = '所属宿舍栋'
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
