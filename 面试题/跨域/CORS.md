# CORS - 跨域资源共享- Cross-Origin Resource Sharing 

## 跨域问题的由来
### 同源策略 
- 由 Netspace 提出的一个安全策略，所有支持JS的浏览器都会使用这个策略。
- 在同源策略中，要求 **域名**, **协议**， **端口** 三部分都要相同
- 如果浏览器没有对 JS 进行同源限制，则有可能会被利用浏览器的漏洞攻击服务器，如CSRF、XSS、跨域问题
- 同源策略可以限制读取 Cookie、LocalStorage、IndexDB等；限制获取DOM、JS，发送Ajax请求等

### 常见的攻击手段
1. **CSRF攻击 Cross-Site Request Forgery 跨站请求伪造**
   - 带有用户登陆状态的 cookie 进行安全操作的攻击方式，攻击者盗用身份发送恶意请求。对服务器来说这个请求是完全合法的，但是却完成了攻击者所期望的一个操作
   - 攻击原理及过程
      1. 用户 C 打开浏览器，访问受信任的网站 A， 输入用户名和密码请求登录网站；
      2. 在用户信息通过验证后， 网站 A 产生 Cookie 信息并返回给浏览器， 此时用户登陆网站 A 成功， 可  正常发送请求到网站 A；
      3. 用户在未退出网站 A 之前， 在同一浏览器中， 打开另一个 TAB 页访问网站 B；
      4. 网站 B 接收到用户请求后， 返回一些攻击性代码， 并发出一个请求要求访问第三方站点 A; 
      5. 浏览器在接收到这些攻击性代码后， 根据网站 B 的请求，在用户不知情的情况下携带 Cookie 信息向网站A发出请求。但网站 A 并不知道该请求其实是由 B 发起的， 所以会根据用户 C　的 Cookie 信息以 C的权限处理该请求，导致来自网站 B 的恶意代码被执行。
   - 防护措施：总体来说，CSRF攻击就是利用了系统对登录器用户的信任，使得用户执行了某些并非意愿的操作，从而造成用户的损失。所以我们对CSRF防护的一个重点是对“用户凭证”进行校验处理，通过这种机制可以对用户的请求是合法进行判断，判断是不是跨站攻击的行为。因为“用户凭证”是Cookie中存储的，所以防护机制的处理对像也是Cookie的数据，我们要在防护的数据中加入签名校验，并对数据进行生命周期时间管理，就是数据过期管理。
  
2. **XSS攻击 CSS -- Creoo Site Script 跨站脚本攻击**
    - 指恶意攻击者在Web页面里插入恶意的JavaScript代码，当用户浏览该网页时，嵌入在Web里面的JavaScript代码会被执行，从而达到恶意的特殊目的
    - 防护措施：防护XSS攻击其实就记住两条原则：过滤输入和转义输出。具体措施如下：
      1. 在输入方面对所有用户提交内容进行可靠的输入验证，提交内容包括URL、查询关键字、http头、post数据等；
      2. 在输出方面，在用户输内容中使用标签，标签内的内容不会解释，直接显示；
      3。 严格执行字符输入字数控制；
      3. 在脚本执行区中，应绝无用户输入。

### CORS跨域解决方案
- 一种浏览器机制，允许网页从不同源的服务器请求资源。
- 预检：当发送某些非简单方法时、或发送JSON数据以及添加自定义请求头等会发生预检，浏览器会先发送一个预检请求（OPTIONS请求）
  ，询问服务器允不允许。

#### 1. CORS 基本概念
- CORS(Cross-Origin Resource Sharing)是W3C标准，允许浏览器向跨源服务器发送XMLHttpRequest请求
- 同源策略要求**协议**、**域名**、**端口**三者相同，否则浏览器会阻止请求
- CORS需要浏览器和服务器同时支持，对前端开发者来说代码与普通AJAX相同

#### 2. CORS请求分类

##### 2.1 简单请求
**条件**（同时满足）：
- 请求方法是：`GET`、`HEAD` 或 `POST`
- 头信息不超出以下字段：
  - `Accept`、`Accept-Language`、`Content-Language`、`Last-Event-ID`
  - `Content-Type`（仅限于：`application/x-www-form-urlencoded`、`multipart/form-data` 或 `text/plain`）

**流程**：浏览器直接发送请求，自动在请求头中添加 `Origin` 字段

##### 2.2 非简单请求（预检请求）
- 使用 `PUT`、`DELETE` 方法
- `Content-Type` 为 `application/json`
- 自定义头信息字段

**流程**：浏览器先发送 `OPTIONS` 预检请求，询问服务器是否允许该跨域请求，服务器回应允许后才发送真正的请求

##### 2.3 带凭证的请求
- 需前端设置 `withCredentials: true`
- 服务端设置 `Access-Control-Allow-Credentials: true`
- `Access-Control-Allow-Origin` 不能设为通配符 `*`，必须明确指定域名

#### 3. 前端CORS配置

##### 3.1 基础请求配置
```javascript
// 使用fetch API
fetch('https://api.example.com/data', {
  method: 'GET',
  credentials: 'include', // 是否发送凭证(Cookie)
  headers: {
    'Content-Type': 'application/json'
  }
})

// 使用Axios库
axios.get('https://api.example.com/data', {
  withCredentials: true,
  headers: {
    'Authorization': 'Bearer token'
  }
});
```

##### 3.2 处理请求头和相应格式
```javascript
fetch('https://api.example.com/data', {
  headers: {
    'Content-Type': 'application/json',  // 指定发送的数据格式
    'Accept': 'application/json',        // 指定期望接收的数据格式
    'Authorization': 'Bearer token123',  // 认证信息
  }
})
.then(response => {
  // 检查响应头中的Content-Type
  const contentType = response.headers.get('Content-Type');
  
  if (contentType && contentType.includes('application/json')) {
    return response.json();  // 解析JSON数据
  } else if (contentType && contentType.includes('text/')) {
    return response.text();  // 解析文本数据
  }
})
```

##### 3.3 处理CORS错误
```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      if (response.status === 403) {
        console.error('CORS权限被拒绝');
      }
      throw new Error(`HTTP错误，状态码: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    if (error instanceof TypeError && error.message.includes('CORS')) {
      console.error('CORS错误: 服务器可能没有设置正确的CORS头');
    }
    console.error('请求失败:', error);
  });
```

#### 4. 重要的CORS响应头

| 响应头 | 描述 | 示例 |
|-------|------|------|
| `Access-Control-Allow-Origin` | **必填**。指定允许跨域的源 | `https://example.com` 或 `*` |
| `Access-Control-Allow-Methods` | **预检必填**。允许的HTTP方法 | `GET, POST, PUT, DELETE` |
| `Access-Control-Allow-Headers` | **预检必填**。允许的请求头 | `Content-Type, Authorization` |
| `Access-Control-Allow-Credentials` | **可选**。是否允许发送Cookie | `true` |
| `Access-Control-Max-Age` | **可选**。预检请求的缓存时间(秒) | `3600` |
| `Access-Control-Expose-Headers` | **可选**。允许浏览器读取的响应头 | `X-Custom-Header` |

#### 5. 框架中的CORS配置

##### 5.1 React中使用代理解决开发环境CORS
在`package.json`中添加：
```json
{
  "proxy": "https://api.example.com"
}
```

##### 5.2 Vue中使用代理解决开发环境CORS
在`vue.config.js`中添加：
```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true
      }
    }
  }
}
```

#### 常见问题与解决方案
1. 无法发送Cookie

- 前端必须设置 credentials: 'include' 或 withCredentials: true
- 后端必须设置 Access-Control-Allow-Credentials: true
- Access-Control-Allow-Origin 不能为 *，必须指定具体域名

2. 预检请求过多影响性能
- 服务器设置 Access-Control-Max-Age 缓存预检结果

3. 如何调试CORS问题

- 使用浏览器开发者工具的Network面板
- 查看是否有被阻止的请求(通常会显示红色)
- 检查OPTIONS请求的响应头是否包含需要的CORS头部