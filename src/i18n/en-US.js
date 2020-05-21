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
t.clear = 'Clear'
t.logout = 'Sign Out'
t.createDate = 'Create Time'
t.keyword = 'Keyword：'
t.keywordFilterSearch = 'filter by keyword'
t.choose = 'Please Choose'
t.back = 'Back'

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
t.supplierQualifications.qualificationsType = '资质类别'
t.supplierQualifications.qualificationsGrade = '资质评级'
t.supplierQualifications.qualificationsDetail = '资质备注信息'
t.supplierQualifications.isBlacklist = '拉黑状态'
t.supplierQualifications.qualificationsOssIds = '资质文件'

t.supplierLinkhis = {}
t.supplierLinkhis.supplierLinkman = '联系人'
t.supplierLinkhis.supplierLinkphone = '联系电话'
t.supplierLinkhis.createDate = '创建时间'
t.supplierLinkhis.updateDate = '更新时间'

t.supplier = {}
t.supplier.name = '供应商名称'
t.supplier.supplierLinkman = '联系人'
t.supplier.supplierLinkphone = '联系电话'
t.supplier.supplierGrade = '供货商评级'
t.supplier.aaaa = '供应商类别???'
t.supplier.isRely = '是否挂靠'
t.supplier.supplierCorporation = '法人代表'
t.supplier.supplierCorporationPhone = '法人电话号码'
t.supplier.supplierAddress = '注册地址'
t.supplier.supplierDetail = '供货商备注'
t.supplier.supplierOssIds = '供货商文件'
export default t
