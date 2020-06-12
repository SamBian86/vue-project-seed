const t = {}

t.loading = '加載中...'

t.brand = {}
t.brand.lg = '耘林信息工程管理平台'
t.brand.mini = '耘林信息'

t.add = '新增'
t.delete = '刪除'
t.deleteBatch = '刪除'
t.update = '修改'
t.reset = '重置'
t.detail = '詳情'
t.instanceId = '活动流程图'
t.query = '查詢'
t.export = '導出'
t.handle = '操作'
t.confirm = '確定'
t.cancel = '取消'
t.clearCurrent = '取消选中'
t.clear = '清除'
t.logout = '退出'
t.manage = '處理'
t.createDate = '創建時間'
t.keyword = '關鍵字：'
t.keywordFilterSearch = '根據關鍵字檢索'
t.choose = '請選擇'
t.back = '返回'
t.download = '下载'
t.downloadTemp = '下载模板'
t.import = '导入'
t.info = '信息'

t.search = {}
t.search.phoneNumberOrName = '手机号或姓名'

t.prompt = {}
t.prompt.title = '提示'
t.prompt.info = '確定進行[{handle}]操作?'
t.prompt.success = '操作成功'
t.prompt.failed = '操作失敗'
t.prompt.deleteBatch = '請選擇刪除項'
t.prompt.customBatch = '請選擇批量處理的選項'

t.validate = {}
t.validate.required = '必填項不能為空'
t.validate.format = '{attr}格式錯誤'

t.upload = {}
t.upload.text = '將文件拖到此處，或<em>點擊上傳</em>'
t.upload.tip = '只支持{format}格式文件！ '
t.upload.button = '點擊上傳'
t.upload.choose = '選擇文件'
t.upload.uploading = '文件上傳中，稍後再試..'

t.datePicker = {}
t.datePicker.range = '至'
t.datePicker.start = '開始日期'
t.datePicker.end = '結束日期'

t.fullscreen = {}
t.fullscreen.prompt = '您的瀏覽器不支持此操作'

t.updatePassword = {}
t.updatePassword.title = '修改密碼'
t.updatePassword.username = '賬號'
t.updatePassword.password = '原密碼'
t.updatePassword.newPassword = '新密碼'
t.updatePassword.confirmPassword = '確認密碼'
t.updatePassword.validate = {}
t.updatePassword.validate.confirmPassword = '確認密碼與新密碼輸入不一致'

t.contentTabs = {}
t.contentTabs.closeCurrent = '關閉當前標籤頁'
t.contentTabs.closeOther = '關閉其它標籤頁'
t.contentTabs.closeAll = '關閉全部標籤頁'

/* 頁面 */
t.notFound = {}
t.notFound.desc = '抱歉！您訪問的頁面<em>失聯</em>啦...'
t.notFound.back = '上一頁'
t.notFound.home = '首頁'

t.login = {}
t.login.sysname = '耘林工程项目管理系统'
t.login.title = '登錄'
t.login.username = '用戶名'
t.login.password = '密碼'
t.login.captcha = '驗證碼'
t.login.demo = '在線演示'
t.login.copyright = {}
t.login.copyright.company = '耘林信息'
t.login.copyright.phone = '电话: 0510-85386217'
t.login.copyright.address = '地址:无锡市高浪东路999号-8-A1-1201'

t.home = {}
t.home.desc = {}
t.home.desc.title = '項目介紹'
t.home.desc.list = [
  '耘林信息工程管理服務平台，基於最新的Spring Cloud Alibaba 2.1、Nacos、Spring Cloud Gateway、Spring Boot 2.1、Mybatis、Element 2.0+開發'
]

/* 模塊 */
t.model = {}
t.model.name = '名稱'
t.model.key = '標識'
t.model.version = '版本'
t.model.createTime = '創建時間'
t.model.lastUpdateTime = '更新時間'
t.model.design = '在線設計'
t.model.deploy = '部署'
t.model.description = '描述'

t.process = {}
t.process.name = '名稱'
t.process.key = '標識'
t.process.deployFile = '部署流程文件'
t.process.id = '流程ID'
t.process.deploymentId = '部署ID'
t.process.version = '版本'
t.process.resourceName = 'XML'
t.process.diagramResourceName = '圖片'
t.process.deploymentTime = '部署時間'
t.process.active = '激活'
t.process.suspend = '掛起'
t.process.convertToModel = '轉換為模型'
t.process.bizRouteSet = '配置業務路由'
t.process.bizRoute = '業務路由'

t.running = {}
t.running.id = '實例ID'
t.running.definitionKey = '定義Key'
t.running.processDefinitionId = '定義ID'
t.running.processDefinitionName = '定義名稱'
t.running.activityId = '當前環節'
t.running.suspended = '是否掛起'
t.running.suspended0 = '否'
t.running.suspended1 = '是'

t.news = {}
t.news.title = '標題'
t.news.pubDate = '發佈時間'
t.news.createDate = '創建時間'
t.news.content = '內容'

t.schedule = {}
t.schedule.beanName = 'bean名稱'
t.schedule.beanNameTips = 'spring bean名稱, 如: testTask'
t.schedule.pauseBatch = '暫停'
t.schedule.resumeBatch = '恢復'
t.schedule.runBatch = '執行'
t.schedule.log = '日誌列表'
t.schedule.params = '參數'
t.schedule.cronExpression = 'cron表達式'
t.schedule.cronExpressionTips = '如: 0 0 12 * * ?'
t.schedule.remark = '備註'
t.schedule.status = '狀態'
t.schedule.status0 = '暫停'
t.schedule.status1 = '正常'
t.schedule.statusLog0 = '失敗'
t.schedule.statusLog1 = '成功'
t.schedule.pause = '暫停'
t.schedule.resume = '恢復'
t.schedule.run = '執行'
t.schedule.jobId = '任務ID'
t.schedule.times = '耗時(單位: 毫秒)'
t.schedule.createDate = '執行時間'

t.mail = {}
t.mail.name = '名稱'
t.mail.config = '郵件配置'
t.mail.subject = '主題'
t.mail.createDate = '創建時間'
t.mail.send = '發送郵件'
t.mail.content = '內容'
t.mail.smtp = 'SMTP'
t.mail.port = '端口號'
t.mail.username = '郵箱賬號'
t.mail.password = '郵箱密碼'
t.mail.mailTo = '收件人'
t.mail.mailCc = '抄送'
t.mail.params = '模板參數'
t.mail.paramsTips = '如：{"code": "123456"}'
t.mail.templateId = '模版ID'
t.mail.status = '狀態'
t.mail.status0 = '發送失敗'
t.mail.status1 = '發送成功'
t.mail.mailFrom = '發送者'
t.mail.createDate = '發送時間'

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
t.sms.mobile = '手機號'
t.sms.status = '狀態'
t.sms.status0 = '發送失敗'
t.sms.status1 = '發送成功'
t.sms.config = '短信配置'
t.sms.send = '發送短信'
t.sms.platform = '平台類型'
t.sms.platform1 = '阿里雲'
t.sms.platform2 = '騰訊雲'
t.sms.params = '參數'
t.sms.paramsTips = '如：{"code": "123456"}'
t.sms.params1 = '參數1'
t.sms.params2 = '參數2'
t.sms.params3 = '參數3'
t.sms.params4 = '參數4'
t.sms.createDate = '發送時間'
t.sms.aliyunAccessKeyId = 'Key'
t.sms.aliyunAccessKeyIdTips = '阿里雲AccessKeyId'
t.sms.aliyunAccessKeySecret = 'Secret'
t.sms.aliyunAccessKeySecretTips = '阿里雲AccessKeySecret'
t.sms.aliyunSignName = '短信簽名'
t.sms.aliyunTemplateCode = '短信模板'
t.sms.aliyunTemplateCodeTips = '短信模板CODE'
t.sms.qcloudAppId = 'AppId'
t.sms.qcloudAppIdTips = '騰訊雲AppId'
t.sms.qcloudAppKey = 'AppKey'
t.sms.qcloudAppKeyTips = '騰訊雲AppKey'
t.sms.qcloudSignName = '短信簽名'
t.sms.qcloudTemplateId = '短信模板'
t.sms.qcloudTemplateIdTips = '短信模板ID'

t.oss = {}
t.oss.config = '雲存儲配置'
t.oss.upload = '上傳文件'
t.oss.url = 'URL地址'
t.oss.createDate = '創建時間'
t.oss.type = '類型'
t.oss.type1 = '七牛'
t.oss.type2 = '阿里雲'
t.oss.type3 = '騰訊雲'
t.oss.type4 = 'FastDFS'
t.oss.type5 = '本地上傳'
t.oss.qiniuDomain = '域名'
t.oss.qiniuDomainTips = '七牛綁定的域名'
t.oss.qiniuPrefix = '路徑前綴'
t.oss.qiniuPrefixTips = '不設置默認為空'
t.oss.qiniuAccessKey = 'AccessKey'
t.oss.qiniuAccessKeyTips = '七牛AccessKey'
t.oss.qiniuSecretKey = 'SecretKey'
t.oss.qiniuSecretKeyTips = '七牛SecretKey'
t.oss.qiniuBucketName = '空間名'
t.oss.qiniuBucketNameTips = '七牛存儲空間名'
t.oss.aliyunDomain = '域名'
t.oss.aliyunDomainTips = '阿里雲綁定的域名，如：http://cdn.yunlin.io'
t.oss.aliyunPrefix = '路徑前綴'
t.oss.aliyunPrefixTips = '不設置默認為空'
t.oss.aliyunEndPoint = 'EndPoint'
t.oss.aliyunEndPointTips = '阿里雲EndPoint'
t.oss.aliyunAccessKeyId = 'AccessKeyId'
t.oss.aliyunAccessKeyIdTips = '阿里雲AccessKeyId'
t.oss.aliyunAccessKeySecret = 'AccessKeySecret'
t.oss.aliyunAccessKeySecretTips = '阿里雲AccessKeySecret'
t.oss.aliyunBucketName = 'BucketName'
t.oss.aliyunBucketNameTips = '阿里雲BucketName'
t.oss.qcloudDomain = '域名'
t.oss.qcloudDomainTips = '騰訊雲綁定的域名'
t.oss.qcloudPrefix = '路徑前綴'
t.oss.qcloudPrefixTips = '不設置默認為空'
t.oss.qcloudAppId = 'AppId'
t.oss.qcloudAppIdTips = '騰訊雲AppId'
t.oss.qcloudSecretId = 'SecretId'
t.oss.qcloudSecretIdTips = '騰訊雲SecretId'
t.oss.qcloudSecretKey = 'SecretKey'
t.oss.qcloudSecretKeyTips = '騰訊雲SecretKey'
t.oss.qcloudBucketName = 'BucketName'
t.oss.qcloudBucketNameTips = '騰訊雲BucketName'
t.oss.qcloudRegion = '所屬地區'
t.oss.qcloudRegionTips = '請選擇'
t.oss.qcloudRegionBeijing1 = '北京一區（華北）'
t.oss.qcloudRegionBeijing = '北京'
t.oss.qcloudRegionShanghai = '上海（華東）'
t.oss.qcloudRegionGuangzhou = '廣州（華南）'
t.oss.qcloudRegionChengdu = '成都（西南）'
t.oss.qcloudRegionChongqing = '重慶'
t.oss.qcloudRegionSingapore = '新加坡'
t.oss.qcloudRegionHongkong = '香港'
t.oss.qcloudRegionToronto = '多倫多'
t.oss.qcloudRegionFrankfurt = '法蘭克福'
t.oss.localDomain = '域名'
t.oss.localDomainTips = '綁定的域名，如：http://cdn.yunlin.io'
t.oss.fastdfsDomain = '域名'
t.oss.fastdfsDomainTips = '綁定的域名，如：http://cdn.yunlin.io'
t.oss.localPrefix = '路徑前綴'
t.oss.localPrefixTips = '不設置默認為空'
t.oss.localPath = '存儲目錄'
t.oss.localPathTips = '如：D:/upload'

t.dept = {}
t.dept.name = '名稱'
t.dept.parentName = '上級部門'
t.dept.sort = '排序'
t.dept.parentNameDefault = '一級部門'
t.dept.chooseerror = '請選擇部門'
t.dept.title = '選擇部門'

t.dict = {}
t.dict.dictName = '字典名稱'
t.dict.dictType = '字典類型'
t.dict.dictLabel = '字典標籤'
t.dict.dictValue = '字典值'
t.dict.sort = '排序'
t.dict.remark = '備註'
t.dict.createDate = '創建時間'

t.logError = {}
t.logError.module = '模塊名稱'
t.logError.requestUri = '請求URI'
t.logError.requestMethod = '請求方式'
t.logError.requestParams = '請求參數'
t.logError.ip = '操作IP'
t.logError.userAgent = '用戶代理'
t.logError.createDate = '創建時間'
t.logError.errorInfo = '異常信息'

t.logLogin = {}
t.logLogin.creatorName = '用戶名'
t.logLogin.status = '狀態'
t.logLogin.status0 = '失敗'
t.logLogin.status1 = '成功'
t.logLogin.status2 = '賬號已鎖定'
t.logLogin.operation = '操作類型'
t.logLogin.operation0 = '登錄'
t.logLogin.operation1 = '退出'
t.logLogin.ip = '操作IP'
t.logLogin.userAgent = 'User-Agent'
t.logLogin.createDate = '創建時間'

t.logOperation = {}
t.logOperation.module = '模塊名稱'
t.logOperation.status = '狀態'
t.logOperation.status0 = '失敗'
t.logOperation.status1 = '成功'
t.logOperation.creatorName = '用戶名'
t.logOperation.operation = '用戶操作'
t.logOperation.requestUri = '請求URI'
t.logOperation.requestMethod = '請求方式'
t.logOperation.requestParams = '請求參數'
t.logOperation.requestTime = '請求時長'
t.logOperation.ip = '操作IP'
t.logOperation.userAgent = 'User-Agent'
t.logOperation.createDate = '創建時間'

t.menu = {}
t.menu.name = '名稱'
t.menu.icon = '圖標'
t.menu.type = '類型'
t.menu.type0 = '菜單'
t.menu.type1 = '按鈕'
t.menu.sort = '排序'
t.menu.url = '路由'
t.menu.permissions = '授權標識'
t.menu.permissionsTips = '如: sys:menu:save'
t.menu.parentName = '上級菜單'
t.menu.parentNameDefault = '一級菜單'
t.menu.resource = '授權資源'
t.menu.resourceUrl = '資源URL'
t.menu.resourceMethod = '請求方式'
t.menu.resourceAddItem = '添加一項'

t.params = {}
t.params.paramCode = '編碼'
t.params.paramValue = '值'
t.params.remark = '備註'

t.role = {}
t.role.name = '名稱'
t.role.remark = '備註'
t.role.createDate = '創建時間'
t.role.menuList = '菜單授權'
t.role.deptList = '數據授權'

t.user = {}
t.user.username = '用戶名'
t.user.deptName = '所屬部門'
t.user.email = '郵箱'
t.user.mobile = '手機號'
t.user.status = '狀態'
t.user.status0 = '停用'
t.user.status1 = '正常'
t.user.createDate = '創建時間'
t.user.password = '密碼'
t.user.confirmPassword = '確認密碼'
t.user.realName = '真實姓名'
t.user.gender = '性別'
t.user.gender0 = '男'
t.user.gender1 = '女'
t.user.gender2 = '保密'
t.user.roleIdList = '角色配置'
t.user.validate = {}
t.user.validate.confirmPassword = '確認密碼與密碼輸入不一致'

t.region = {}
t.region.id = '區域標識'
t.region.name = '區域名稱'
t.region.type = '區域類型'
t.region.sort = '排序'
t.region.updateDate = '更新時間'
t.region.province = '省份直轄市'
t.region.city = '地市'
t.region.county = '區縣'
t.region.parentName = '上級區域'
t.region.select = '選擇區域'

t.correction = {}
t.correction.post = '申請崗位'
t.correction.entryDate = '入職日期'
t.correction.correctionDate = '轉正日期'
t.correction.workContent = '工作內容'
t.correction.achievement = '工作成績'

t.process.comment = '審核意見'
t.process.completeTask = '通過'
t.process.rejectTask = '駁回'
t.process.doBackRollback = '回退'
t.process.terminationTask = '終止'
t.process.entrustTask = '委託'
t.process.createInstance = '發起流程'
t.process.instanceId = '流程實例ID'
t.process.taskId = '任務ID'
t.process.days = '天數'
t.process.businessKey = '業務KEY'
t.process.processDefinitionName = '流程名稱'
t.process.ended = '是否結束'
t.process.ended0 = '是'
t.process.ended1 = '否'
t.process.startTime = '流程開始時間'
t.process.endTime = '流程結束時間'
t.process.activityName = '當前環節'
t.process.createTime = '任務創建時間'
t.process.assignee = '處理人'
t.process.viewFlowImage = '查看流程圖'
t.process.flowImage = '流程圖'
t.process.processDefinitionVersion = '流程版本'
t.process.startUserId = '發起人'
t.process.taskName = '任務名稱'
t.process.owner = '任務所有人'
t.process.claim = '簽收'
t.process.routeError = '請先配置業務表單路由信息'
t.process.entrustError = '請選擇委託人'
t.process.formURLError = '請設置保存表單的URL'
t.process.keyError = '請設置流程KEY'
t.process.formNameError = '請設置表單名稱'
t.process.businessKeyError = '業務KEY為空，無法啟動流程'
t.process.notExistError = '沒有查詢到流程，請先設計流程'
t.process.circulation = '流轉詳情'

t.task = {}
t.task.businessKeyError = '業務KEY為空，無法處理任務'
t.task.detailError = '業務KEY為空，無法查看處理詳情'
t.task.startTime = '任務開始時間'
t.task.endTime = '任務結束時間'
t.task.durationInSeconds = '任務時長 (秒)'

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
t.applypayment.examiner = '当前审核人'
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
t.applypaymentPay.payAll = '完成支付'
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
t.applypaymentPay.payStatusName = '支付状态'
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
t.contractChange.user = '退回人'
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
