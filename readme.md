## 简介
新型冠状病毒国家，省份和城市数据汇总，用于日后大数据分析和sql查询

## 使用

### 修改配置
修改根目录下 config.json 文件中的数据库配置，并且创建指定库名称

### 脚本命令
```
// 初始化模块
npm i 

// 同步表配置
npm run syncDb

// 启动任务,其中10为任务间隔时间
node ./index.js 10
```

## 更新记录
### 1.0.0
1. 项目初始化

### 1.0.1
1. 增加日志异常输出
2. 优化和解决代码bug

### 1.0.2
1. 优化sql改为城市病毒批量插入

### 1.0.3
1. 将日志输出到本地文件中，代码使用crontab管理