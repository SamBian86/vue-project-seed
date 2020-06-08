const t = {}

t.loading = 'Loading...'

t.brand = {}
t.brand.lg = 'yunlin-project-plarform'
t.brand.mini = 'RC'

t.add = 'Add'
t.delete = 'Delete'
t.deleteBatch = 'Delete'
t.update = 'Edit'
t.reset = 'Reset'
t.detail = 'Detail'
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

t.search = {}
t.search.phoneNumberOrName = '手机号或姓名'

t.prompt = {}
t.prompt.title = 'Prompt'
t.prompt.info = 'Confirm to carry out [{handle}] operation?'
t.prompt.success = 'Succeeded'
t.prompt.failed = 'Failed'
t.prompt.deleteBatch = 'Please select delete item'
t.prompt.customBatch = 'Please select delete items'

t.validate = {}
t.validate.required = 'Required field cannot be empty'
t.validate.format = '{attr} format error'

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
t.login.sysname = '耘林工程项目管理系统'
t.login.title = 'Sign In'
t.login.username = 'Username'
t.login.password = 'Password'
t.login.captcha = 'Verification Code'
t.login.demo = 'Demo'
t.login.copyright = {}
t.login.copyright.company = 'yunlin'
t.login.copyright.phone = '电话: 0510-85386217'
t.login.copyright.address = '地址:无锡市高浪东路999号-8-A1-1201'

t.home = {}
t.home.desc = {}
t.home.desc.title = 'Project introduction'
t.home.desc.list = [
  'yunlin-project-platform is a project service platform ',
  'Based on the latest development of  Spring Boot 2.2, Mybatis, Element 2.0+'
]

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

t.news = {}
t.news.title = 'Title'
t.news.pubDate = 'Publish Time'
t.news.createDate = 'Create Time'
t.news.content = 'Content'

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

t.mail = {}
t.mail.name = 'Name'
t.mail.config = 'Mail Configuration'
t.mail.subject = 'Theme'
t.mail.createDate = 'Create Time'
t.mail.send = 'Send Mail'
t.mail.content = 'Content'
t.mail.smtp = 'SMTP'
t.mail.port = 'Port Number'
t.mail.username = 'Email Account'
t.mail.password = 'Mailbox Password'
t.mail.mailTo = 'Recipient'
t.mail.mailCc = 'Cc'
t.mail.params = 'Template Parameter'
t.mail.paramsTips = 'Example: {"code": "123456"}'
t.mail.templateId = 'Template ID'
t.mail.status = 'Status'
t.mail.status0 = 'Send Failed'
t.mail.status1 = 'Successfully Sent'
t.mail.mailFrom = 'Sender'
t.mail.createDate = 'Send Time'

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
t.sms.mobile = 'Mobile Number'
t.sms.status = 'Status'
t.sms.status0 = 'Send Failed'
t.sms.status1 = 'Successfully Sent'
t.sms.config = 'SMS Configuration'
t.sms.send = 'Send SMS'
t.sms.platform = 'platform Type'
t.sms.platform1 = 'Alibaba Cloud'
t.sms.platform2 = 'Tencent Cloud'
t.sms.params = 'Parameters'
t.sms.paramsTips = 'eg: {"code": "123456"}'
t.sms.params1 = 'Parameter 1'
t.sms.params2 = 'Parameter 2'
t.sms.params3 = 'Parameter 3'
t.sms.params4 = 'Parameter 4'
t.sms.createDate = 'Send Time'
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

t.dept = {}
t.dept.name = 'Name'
t.dept.parentName = 'Superior'
t.dept.sort = 'Sort'
t.dept.parentNameDefault = 'Top Department'
t.dept.chooseerror = 'Please select the department'
t.dept.title = 'Selection Department'

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

t.role = {}
t.role.name = 'Name'
t.role.remark = 'Remarks'
t.role.createDate = 'Create Date'
t.role.menuList = 'Menu Scope'
t.role.deptList = 'Data Scope'

t.user = {}
t.user.username = 'Username'
t.user.deptName = 'Department'
t.user.email = 'Email'
t.user.mobile = 'Mobile'
t.user.status = 'Status'
t.user.status0 = 'Disable'
t.user.status1 = 'Enable'
t.user.createDate = 'Create Date'
t.user.password = 'Password'
t.user.confirmPassword = 'Confirm'
t.user.realName = 'Real Name'
t.user.gender = 'Gender'
t.user.gender0 = 'Male'
t.user.gender1 = 'Female'
t.user.gender2 = 'Secure'
t.user.roleIdList = 'Role Config'
t.user.validate = {}
t.user.validate.confirmPassword = 'Confirm password is not consistent with password input'

t.region = {}
t.region.id = 'Region ID'
t.region.name = 'Region Name'
t.region.type = 'Region Type'
t.region.sort = 'Sort'
t.region.updateDate = 'Update Date'
t.region.province = 'Province'
t.region.city = 'City'
t.region.county = 'County'
t.region.parentName = 'Superior Area'
t.region.select = 'Select Area'

t.correction = {}
t.correction.post = 'Application post'
t.correction.entryDate = 'Date of entry'
t.correction.correctionDate = 'Date of correction'
t.correction.workContent = 'work content'
t.correction.achievement = 'Work performance'

t.process.comment = 'Review Opinions'
t.process.completeTask = 'Pass'
t.process.rejectTask = 'Refuse'
t.process.doBackRollback = 'Backward'
t.process.terminationTask = 'Terminate'
t.process.entrustTask = 'Delegation'
t.process.createInstance = 'Initiation Process'
t.process.instanceId = 'Instance ID'
t.process.taskId = 'Task ID'
t.process.days = 'Days'
t.process.businessKey = 'Business Key'
t.process.processDefinitionName = 'Process Name'
t.process.ended = 'End'
t.process.ended0 = 'Yes'
t.process.ended1 = 'No'
t.process.startTime = 'Process Start Time'
t.process.endTime = 'Process End Time'
t.process.activityName = 'Current Link'
t.process.createTime = 'Task Time'
t.process.assignee = 'Processing Person'
t.process.viewFlowImage = 'View Flowchart'
t.process.flowImage = 'Flowchart'
t.process.processDefinitionVersion = 'Process Version'
t.process.startUserId = 'Initiator'
t.process.taskName = 'Task Name'
t.process.owner = 'Task Owner'
t.process.claim = 'Signature'
t.process.routeError = 'Configure business form routing information first'
t.process.entrustError = 'Please select the client'
t.process.formURLError = 'Set the URL to save the form'
t.process.keyError = 'Set up process KEY'
t.process.formNameError = 'Please set the form name'
t.process.businessKeyError = 'Business KEY is empty and cannot start process'
t.process.notExistError = 'No process is queried, please design the process first'
t.process.circulation = 'Circulation details'

t.task = {}
t.task.businessKeyError = 'Business KEY is empty and cannot handle task'
t.task.detailError = 'Business KEY is empty and processing details cannot be viewed'
t.task.startTime = 'Task Begin Time'
t.task.endTime = 'Task End Time'
t.task.durationInSeconds = 'Task Duration (seconds)'

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
t.supplier.blackAll = '全部拉黑'
t.supplier.blackOtherSame = '同一法人供应商'
t.supplier.supplierLinkman = '联系人'
t.supplier.hisSupplierLinkman = '历史联系人'
t.supplier.qualifications = '资质'
t.supplier.supplierLinkphone = '联系电话'
t.supplier.supplierGrade = '供货商评级'
t.supplier.supplierGradeName = '供货商评级'
t.supplier.supplierTypeIds = '供应商类别'
t.supplier.typeNames = '供应商类别'
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
t.land.landbudget = '预算明细'
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
t.land.landbudgetInsertTime = '录入时间'
t.land.landbudgettQuantitiesRemark = '单价说明'
t.land.exportDetail = '导出明细表'

t.draw = {}
t.draw.projectId = '项目名称'
t.draw.projectName = '项目名称'
t.draw.budgetSubjectName = '预算主题'
t.draw.landbudgetTime = '初期预算时间'
t.draw.landbudgetUserName = '预算人'
t.draw.landbudgetDeptName = '预算部门'
t.draw.drawingbudget = '预算明细'
t.draw.drawingbudgetTime = '施工图预算时间'
t.draw.drawingbudgetUserName = '预算人'
t.draw.drawingbudgetUserId = '预算人'
t.draw.drawingbudgetDeptName = '预算部门'
t.draw.drawingbudgetDeptId = '预算部门'
t.draw.drawingbudgetRemark = '预算说明'
t.draw.costTypeCode = '科目编号'
t.draw.costTypeName = '科目名称'
t.draw.costPrimitiveTarget = '原始指标'
t.draw.drawingbudgetUnivalence = '建筑单价(元)'
t.draw.drawingbudgetQuantities = '工程量'
t.draw.drawingbudgetTotalCost = '建筑总价(元)'
t.draw.drawingbudgetControlRate = '强控比例'
t.draw.drawingbudgetInsertTime = '录入时间'
t.draw.drawingbudgetQuantitiesRemark = '单价说明'
t.draw.exportDetail = '导出明细表'
t.draw.exportDifference = '导出成本差异表'

t.contractType = {}
t.contractType.name = '类型名称'
t.contractType.typeName = '类型名称'
t.contractType.pid = '上级类别'
t.contractType.ptypeName = '上级类别'
t.contractType.parentNameDefault = '一级类型'

t.contract = {}
t.contract.keyWord = '关键字模糊查询'
t.contract.contractTimeFrom = '签约开始'
t.contract.contractTimeTo = '签约结束'
t.contract.baseInfo = '基本信息'
t.contract.otherInfo = '其他信息'
t.contract.plan = '付款计划'
t.contract.submit = '提交审核'
t.contract.projectId = '所属项目'
t.contract.contractProperties = '合同性质'
t.contract.contractCode = '合同编号'
t.contract.contractName = '合同名称'
t.contract.contractTypeId = '合同类别'
t.contract.contractTypeName = '合同类别'
t.contract.parentNameDefault = '一级类型'
t.contract.contractTotalPrice = '合同金额(元)'
t.contract.contractUnivalence = '单价'
t.contract.contractFinalPrice = '终审额'
t.contract.contractPayType = '付款方式'
t.contract.costInfoList = '科目明细'
t.contract.costInfoListTitle = '成本科目明细'
t.contract.costInfoListButton = '点击选择科目明细'
t.contract.supplierId = '供应商'
t.contract.supplierName = '供应商'
t.contract.contractStatus = '合同状态'
t.contract.contractStatusName = '合同状态'
t.contract.contractTime = '签约日期'
t.contract.contractHandleman = '经办人'
t.contract.contractHandlemanPhone = '经办人电话'
t.contract.contractSupplierLinkman = '乙方联系人'
t.contract.contractSupplierLinkphone = '乙方联系人电话'
t.contract.currentExaminer = '审核人'
t.contract.remark = '备注'
t.contract.contractStartDate = '合同履行开始日期'
t.contract.contractEndDate = '合同履行结束日期'
t.contract.contractInvoiceType = '发票类型'
t.contract.contractInvoiceRate = '发票税率'
t.contract.contractInvoiceTime = '取得发票时间'
t.contract.isCheck = '主体是否审核'
t.contract.isCheck0 = '通过'
t.contract.isCheck1 = '未通过'
t.contract.isAuthority = '签约人权限'
t.contract.isAuthority0 = '有'
t.contract.isAuthority1 = '没有'
t.contract.isLawyerAudit = '律师是否审核'
t.contract.isLawyerAudit0 = '已审核'
t.contract.isLawyerAudit1 = '未审核'
t.contract.isBothSignature = '双方是否签字'
t.contract.isBothSignature0 = '已签字'
t.contract.isBothSignature1 = '未签字'
t.contract.isBusinessHandle = '是否商贸经办'
t.contract.isBusinessHandle0 = '是'
t.contract.isBusinessHandle1 = '不是'
t.contract.contractDeliveryPlace = '履行交货地点'
t.contract.contractQualityStandard = '质量验收标准'
t.contract.contractTransportStandard = '运输包装要求'
t.contract.contractJurisdiction = '法律管辖地'
t.contract.contractEffectStandard = '合同生效条件'
t.contract.ossList = '合同附件'

t.contractCost = {}
t.contractCost.costTypeId = '科目id'
t.contractCost.costTypeName = '科目名称'
t.contractCost.pcostTypeName = '上级科目'
t.contractCost.costPrimitiveTarget = '原始指标'
t.contractCost.costControlRate = '强控比例'
t.contractCost.drawingbudgetTotalCost = '施工图预算(元)'
t.contractCost.contractGeneratedAmount = '已产生合同金额'
t.contractCost.changeGeneratedAmount = '已产生变更金额'
t.contractCost.amount = '合同金额'
t.contractCost.amountAll = '合同总金额'
t.contractCost.save = '保存'
t.contractCost.cancel = '取消'
t.contractCost.amountPlaceholder = '请输入合同金额'
t.contractCost.drawingbudgetTotalCostRange = '最大值建议不超过'
t.contractCost.load = '选择'

t.contractExamine = {}
t.contractExamine.examineStatus = '审批状态'
t.contractExamine.examineStatus0 = '未审核'
t.contractExamine.examineStatus1 = '已审核'
t.contractExamine.examineStatus2 = '全部'
t.contractExamine.contractTimeFrom = '签约开始'
t.contractExamine.contractTimeTo = '签约结束'
t.contractExamine.keyWord = '关键字模糊查询'
t.contractExamine.projectId = '所属项目'
t.contractExamine.contractCode = '合同编号'
t.contractExamine.contractName = '合同名称'
t.contractExamine.contractTypeId = '合同类别'
t.contractExamine.contractTypeName = '合同类别'
t.contractExamine.contractTotalPrice = '合同金额'
t.contractExamine.supplierName = '供应商'
t.contractExamine.supplierId = '供应商'
t.contractExamine.contractTime = '签约时间'
t.contractExamine.contractPayType = '付款方式'
t.contractExamine.contractPayTypeName = '付款方式'
t.contractExamine.contractHandleman = '经办人'
t.contractExamine.handleTime = '审核时间'
t.contractExamine.pass = '通过'
t.contractExamine.reject = '退回'

t.contractPayplan = {}
t.contractPayplan.costPayName = '款项名称'
t.contractPayplan.amount = '付款金额'
t.contractPayplan.acceptancelAmount = '承兑金额'
t.contractPayplan.cashAmount = '现金金额'
t.contractPayplan.paymentNode = '付款节点'
t.contractPayplan.estimatedPayTime = '预计付款时间'
t.contractPayplan.remark = '备注'
t.contractPayplan.add = '添加'
t.contractPayplan.delete = '删除'
t.contractPayplan.save = '保存'
t.contractPayplan.cancel = '取消'

t.activiti = {}
t.activiti.comment = '退回理由'

t.contractInvoice = {}
t.contractInvoice.title = '新增票据'
t.contractInvoice.keyWord = '关键字模糊查询'
t.contractInvoice.projectId = '所属项目'
t.contractInvoice.contractTimeFrom = '签约开始'
t.contractInvoice.contractTimeTo = '签约结束'
t.contractInvoice.contractCode = '合同编号'
t.contractInvoice.contractName = '合同名称'
t.contractInvoice.contractTypeName = '合同类别'
t.contractInvoice.contractTotalPrice = '合同金额'
t.contractInvoice.contractFinalPrice = '终审额'
t.contractInvoice.supplierName = '供应商'
t.contractInvoice.contractTime = '签约时间'
t.contractInvoice.contractHandleman = '经办人'
t.contractInvoice.receivedInvoiceAmount = '已收票据金额'

t.contractCreateInvoice = {}
t.contractCreateInvoice.planId = '对应款项'
t.contractCreateInvoice.invoiceUnit = '开票单位'
t.contractCreateInvoice.invoiceCode = '票据编码'
t.contractCreateInvoice.invoiceSymbol = '票据代码'
t.contractCreateInvoice.invoiceDate = '开票日期'
t.contractCreateInvoice.invoiceType = '票据类型'
t.contractCreateInvoice.invoiceAmount = '税额'
t.contractCreateInvoice.contractTaxAmount = '含税金额'
t.contractCreateInvoice.ossList = '附件'
t.contractCreateInvoice.remark = '备注'
t.contractCreateInvoice.addedAmountTitle = '新增票据金额：'
t.contractCreateInvoice.totalAmountTitle = '合计票据金额：'
t.contractCreateInvoice.add = '添加'
t.contractCreateInvoice.save = '保存'
t.contractCreateInvoice.cancel = '取消'

t.applypayment = {}
t.applypayment.projectId = '项目名称'
t.applypayment.keyWord = '关键字模糊查询'
t.applypayment.baseInfo = '基本信息'
t.applypayment.payInfo = '付款信息'
t.applypayment.applyStatus = '申请状态'
t.applypayment.contractId = '合同'
t.applypayment.contractCode = '合同编号'
t.applypayment.planId = '款项'
t.applypayment.contractName = '合同名称'
t.applypayment.contractTypeName = '合同类别'
t.applypayment.contractTotalPrice = '合同金额'
t.applypayment.contractFinalPrice = '终审额'
t.applypayment.supplierName = '供应商'
t.applypayment.costPayName = '款项名称'
t.applypayment.needPayAmount = '应付金额'
t.applypayment.invoiceAmount = '开票金额'
t.applypayment.havePayAmount = '已付金额'
t.applypayment.haveApplyAmount = '已申请金额'
t.applypayment.thisAmount = '本次申请金额'
t.applypayment.applyStatusName = '请付状态'
t.applypayment.applyDate = '申请日期'
t.applypayment.contractUnivalence = '单价'
t.applypayment.contractTime = '签约日期'
t.applypayment.contractFinalPrice = '终审额'
t.applypayment.contractPayType = '付款方式'
t.applypayment.contractHandleman = '经办人'
t.applypayment.contractHandlemanPhone = '经办人电话'
t.applypayment.contractSupplierLinkman = '乙方联系人'
t.applypayment.contractSupplierLinkphone = '乙方联系人电话'
t.applypayment.contractRemark = '合同备注'
t.applypayment.remark = '申请备注'
t.applypayment.ossList = '附件'
t.applypayment.otherOssList = '相关票据'
t.applypayment.applyCostinfoDto = '科目明细'
t.applypayment.applyCostinfoDtoTitle = '应付科目明细'
t.applypayment.applyCostinfoDtoButton = '点击选择科目明细'
t.applypayment.submit = '提交审核'
t.applypayment.comment = '退回理由'
t.applypayment.userName = '退回人'

t.applycostlist = {}
t.applycostlist.currentTotalPrice = '本次申请金额'
t.applycostlist.applyAmount = '本次申请金额'
t.applycostlist.contractGeneratedAmount = '已申请金额'
t.applycostlist.contractTotalCost = '合同金额'
t.applycostlist.costControlRate = '强控比列'
t.applycostlist.costPrimitiveTarget = '原始指标'
t.applycostlist.costTypeCode = '科目编号'
t.applycostlist.costTypeName = '科目名称'
t.applycostlist.pcostTypeName = '上级科目'
t.applycostlist.remark = '备注'
t.applycostlist.apply = '申请'
t.applycostlist.save = '保存'
t.applycostlist.cancel = '取消'
t.applycostlist.amountPlaceholder = '请输入申请金额'
t.applycostlist.applyAmountRange = '建议最大申请金额'

t.applypaymentExamine = {}
t.applypaymentExamine.keyWord = '关键字模糊查询'
t.applypaymentExamine.contractHandleman = '经办人'
t.applypaymentExamine.projectId = '所属项目'
t.applypaymentExamine.contractCode = '合同编号'
t.applypaymentExamine.contractName = '合同名称'
t.applypaymentExamine.contractTypeName = '合同类别'
t.applypaymentExamine.contractTypeId = '合同类别'
t.applypaymentExamine.contractTotalPrice = '合同金额'
t.applypaymentExamine.supplierName = '供应商'
t.applypaymentExamine.supplierId = '供应商'
t.applypaymentExamine.contractHandleman = '经办人'
t.applypaymentExamine.costPayName = '款项名称'
t.applypaymentExamine.needPayAmount = '应付金额'
t.applypaymentExamine.havePayAmount = '已付金额'
t.applypaymentExamine.thisAmount = '申请金额'
t.applypaymentExamine.examineStatus = '审批状态'
t.applypaymentExamine.examineStatus0 = '未审核'
t.applypaymentExamine.examineStatus1 = '已审核'
t.applypaymentExamine.examineStatus2 = '全部'
t.applypaymentExamine.pass = '通过'
t.applypaymentExamine.reject = '退回'

t.applypaymentPay = {}
t.applypaymentPay.pay = '支付'
t.applypaymentPay.payDetail = '合同支付详情'
t.applypaymentPay.payStatus = '支付状态'
t.applypaymentPay.keyWord = '关键字模糊查询'
t.applypaymentPay.projectId = '所属项目'
t.applypaymentPay.contractCode = '合同编号'
t.applypaymentPay.contractName = '合同名称'
t.applypaymentPay.contractTypeName = '合同类别'
t.applypaymentPay.contractTypeId = '合同类别'
t.applypaymentPay.supplierName = '供应商'
t.applypaymentPay.supplierId = '供应商'
t.applypaymentPay.costPayName = '款项名称'
t.applypaymentPay.haveApplyAmount = '申请总金额'
t.applypaymentPay.havePayAmount = '已付金额'
t.applypaymentPay.needPayAmount = '款项金额'
t.applypaymentPay.payAmount = '实付金额'
t.applypaymentPay.thisAmount = '申请金额'
t.applypaymentPay.payType = '支付方式'
t.applypaymentPay.applyDate = '申请日期'
t.applypaymentPay.handleman = '经办人'
t.applypaymentPay.handleDate = '经办日期'
t.applypaymentPay.applier = '申请人'

t.contractChangeType = {}
t.contractChangeType.changeTypeName = '变更类别名称'
t.contractChangeType.remark = '备注'

t.contractChange = {}
t.contractChange.baseInfo = '基本信息'
t.contractChange.contractInfo = '合同信息'
t.contractChange.contractChoose = '选择合同'
t.contractChange.projectId = '所属项目'
t.contractChange.changeCode = '变更编号'
t.contractChange.changeSpeciality = '变更专业'
t.contractChange.changeSpecialityName = '变更专业'
t.contractChange.changeName = '变更名称'
t.contractChange.changeId = '变更类别'
t.contractChange.changeTypeName = '变更类别'
t.contractChange.changeReason = '变更原因'
t.contractChange.changeAmount = '变更金额'
t.contractChange.changePosition = '工程部位'
t.contractChange.mapCode = '图纸编号'
t.contractChange.designerUnit = '设计单位'
t.contractChange.userId = '经办人'
t.contractChange.userName = '经办人'
t.contractChange.deptId = '经办人部门'
t.contractChange.deptName = '经办人部门'
t.contractChange.defaultDeptName = '经办人部门'
t.contractChange.applyDate = '签发日期'
t.contractChange.applyStatus = '审批状态'
t.contractChange.applyStatusName = '审批状态'
t.contractChange.remark = '变更说明'
t.contractChange.changeOssIds = '附件'
t.contractChange.batchSave = '选择'
t.contractChange.contractCode = '合同编号'
t.contractChange.contractName = '合同名称'
t.contractChange.contractHandleman = '经办人'
t.contractChange.contractTotalPrice = '合同金额'
t.contractChange.changeCostInfos = '变更明细'
t.contractChange.save = '保存'
t.contractChange.cancel = '取消'
t.contractChange.costTypeName = '科目名称'
t.contractChange.pcostTypeName = '上级科目'
t.contractChange.costPrimitiveTarget = '原始指标'
t.contractChange.costControlRate = '强控比例'
t.contractChange.drawingbudgetTotalCost = '施工图预算'
t.contractChange.contractGeneratedAmount = '已产生合同金额'
t.contractChange.changeGeneratedAmount = '已产生变更金额'
t.contractChange.thisChangeAmount = '本次变更金额'
t.contractChange.load = '选择'
t.contractChange.submit = '提交审核'
t.contractChange.thisChangeAmountPlaceholder = '请输入变更金额'
t.contractChange.comment = '退回理由'
t.contractChange.userName = '退回人'
t.contractChange.drawingbudgetTotalCostRange = '最大值建议不超过'

t.contractChangeExamine = {}
t.contractChangeExamine.projectId = '所属项目'
t.contractChangeExamine.changeName = '变更名称'
t.contractChangeExamine.changeId = '变更类别'
t.contractChangeExamine.pass = '通过'
t.contractChangeExamine.reject = '退回'
t.contractChangeExamine.examineStatus = '审批状态'
t.contractChangeExamine.examineStatus0 = '未审核'
t.contractChangeExamine.examineStatus1 = '已审核'
t.contractChangeExamine.examineStatus2 = '全部'
t.contractChangeExamine.changeCode = '变更编号'
t.contractChangeExamine.changeSpecialityName = '专业'
t.contractChangeExamine.changeName = '变更名称'
t.contractChangeExamine.changeTypeName = '变更类别'
t.contractChangeExamine.changeReason = '变更原因'
t.contractChangeExamine.changeAmount = '变更金额'
t.contractChangeExamine.userName = '经办人'
t.contractChangeExamine.applyDate = '签发日期'

t.contractSettlement = {}
t.contractSettlement.contractCodeOrName = '合同名称/合同编号/供应商名称'
t.contractSettlement.settlementExamineStatus = '结算状态'
t.contractSettlement.settlement = '结算'
t.contractSettlement.projectId = '所属项目'
t.contractSettlement.contractTimeStart = '签约开始'
t.contractSettlement.contractTimeEnd = '签约结束'
t.contractSettlement.contractCode = '合同编号'
t.contractSettlement.contractName = '合同名称'
t.contractSettlement.contractTypeName = '合同类别'
t.contractSettlement.contractTotalPrice = '合同金额'
t.contractSettlement.totalChangeAmount = '累计变更金额'
t.contractSettlement.totalChangeRatio = '累计变更比例'
t.contractSettlement.contractFinalPrice = '终审额'
t.contractSettlement.supplierName = '供应商'
t.contractSettlement.settlementExamineStatusName = '结算状态'
t.contractSettlement.contractTime = '签约时间'
t.contractSettlement.contractHandleman = '经办人'
t.contractSettlement.submit = '提交审核'
t.contractSettlement.comment = '退回理由'
t.contractSettlement.userName = '退回人'
t.contractSettlement.settlementInfo = '合同结算信息'
t.contractSettlement.settlementBaseInfo = '合同基本信息'
t.contractSettlement.settlementName = '结算名称'
t.contractSettlement.settlementProvisionalAmount = '暂定金额'
t.contractSettlement.settlementActualAmount = '实际金额'
t.contractSettlement.settlementTrialAmount = '送审价'
t.contractSettlement.settlementChangeAmount = '结算变更金额'
t.contractSettlement.settlementFinalAmount = '终审额'
t.contractSettlement.thisChangeAmount = '本次变更税额'
t.contractSettlement.contractTaxAmount = '合同税额'
t.contractSettlement.contractAvgTax = '合同平均税率'
t.contractSettlement.remark = '结算详细说明'
t.contractSettlement.userId = '经办人'
t.contractSettlement.userName = '经办人'
t.contractSettlement.deptId = '经办人部门'
t.contractSettlement.deptName = '经办人部门'
t.contractSettlement.defaultDeptName = '经办人部门'
t.contractSettlement.settlementOssIds = '附件'
t.contractSettlement.changeTypeAmountList = '变更类别与金额'
t.contractSettlement.changeTypeName = '变更类别'
t.contractSettlement.changeTypeAmount = '变更金额'
t.contractSettlement.changeCostInfos = '变更科目明细'
t.contractSettlement.costTypeCode = '科目编号'
t.contractSettlement.costTypeName = '成本科目'
t.contractSettlement.drawingbudgetTotalCost = '预算金额'
t.contractSettlement.costControlRate = '强控比例'
t.contractSettlement.contractGeneratedAmount = '已发生金额'
t.contractSettlement.changeGeneratedAmount = '已产生变更金额'
t.contractSettlement.remark = '备注'

t.contractSettlementExamine = {}
t.contractSettlementExamine.contractCodeOrName = '合同名称/合同编号/供应商名称'
t.contractSettlementExamine.examineStatus = '审批状态'
t.contractSettlementExamine.projectId = '所属项目'
t.contractSettlementExamine.contractTimeStart = '签约开始'
t.contractSettlementExamine.contractTimeEnd = '签约结束'
t.contractSettlementExamine.pass = '通过'
t.contractSettlementExamine.reject = '退回'

t.contractSettlementExamine.contractCode = '合同编号'
t.contractSettlementExamine.contractName = '合同名称'
t.contractSettlementExamine.contractTypeName = '合同类别'
t.contractSettlementExamine.contractTotalPrice = '合同金额'
t.contractSettlementExamine.contractFinalPrice = '终审额'
t.contractSettlementExamine.supplierName = '供应商'
t.contractSettlementExamine.contractTime = '签约时间'
t.contractSettlementExamine.trialTime = '审批时间'
t.contractSettlementExamine.contractHandleman = '经办人'

t.statisticsContract = {}
t.statisticsContract.projectId = '所属项目'
t.statisticsContract.dateFrom = '开始'
t.statisticsContract.dateTo = '结束'
t.statisticsContract.pcontractTypeName = '合同大类'
t.statisticsContract.contractTypeName = '合同分类'
t.statisticsContract.contractCode = '合同编号'
t.statisticsContract.contractName = '合同名称'
t.statisticsContract.supplierName = '供应商'
t.statisticsContract.contractTime = '签约时间'
t.statisticsContract.contractTotalPrice = '合同额'
t.statisticsContract.changeAmount = '变更金额'
t.statisticsContract.contractFinalPrice = '终审金额'
t.statisticsContract.needPayAmount = '应付总金额'
t.statisticsContract.havePayAmount = '已付款'
t.statisticsContract.unPayAmount = '未付款'

t.statisticsChange = {}
t.statisticsChange.projectId = '所属项目'
t.statisticsChange.dateFrom = '开始'
t.statisticsChange.dateTo = '结束'
t.statisticsChange.pcontractTypeName = '合同大类'
t.statisticsChange.contractTypeName = '合同分类'
t.statisticsChange.contractCode = '合同编号'
t.statisticsChange.contractName = '合同名称'
t.statisticsChange.supplierName = '供应商'
t.statisticsChange.changeAmount = '变更金额'
t.statisticsChange.changeTypeName = '变更类别'
t.statisticsChange.contractFinalPrice = '终审金额'

t.statisticsPayplan = {}
t.statisticsPayplan.projectId = '所属项目'
t.statisticsPayplan.dateFrom = '开始'
t.statisticsPayplan.dateTo = '结束'
t.statisticsPayplan.pcontractTypeName = '合同大类'
t.statisticsPayplan.contractTypeName = '合同分类'
t.statisticsPayplan.contractCode = '合同编号'
t.statisticsPayplan.contractName = '合同名称'
t.statisticsPayplan.supplierName = '供应商'
t.statisticsPayplan.costPayName = '款项名称'
t.statisticsPayplan.amount = '款项金额'
t.statisticsPayplan.estimatedPayTime = '付款时间'

export default t
