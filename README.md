# bcjj-v3-manage-system

此项目是编程进阶系列的后台管理系统，基于 Vue3 + Element Plus + TypeScript + Vite 构建，包含功能管理、用户管理、角色权限设置、菜单设置等功能。

## 配置环境变量

将`.env.example`文件拷贝为`.env`文件，并修改配置。

```txt
VITE_RSA_PUBLIC_KEY=你的公钥
```

前端项目需要配置公钥，用于前端请求后端接口时进行签名。
后端项目`bcjj-api`配置环境变量时会生成公钥，请按 `README.md`文档进行操作，并把复制好的公钥publicKey填写到.env`文件中的`VITE_RSA_PUBLIC_KEY`配置

## 安装与运行

```sh
npm install
```

```sh
npm run dev
```

## 初始超级管理员账号

```txt
账号：superadmin
密码：123123
```
