# zheye

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 接口文档

### endpoints
GET /teams/${ID}/players

### parameters
{
  name: 'ID',
  desc: '当前球队的ID',
  type: 'string'
}
### response
**200相应**
```javascript
  {
    "code": 0,
    "data": [
      {
        "createdAt": "2020-06-05 16:45:22",
        "description": "有一段非常有意思的简介，可以更新一下哦",
        "name": "洛杉矶湖人",
        "_id": "5asg62sdaga45ksd2jk10358e"
      },
      {
        "createdAt": "2020-06-05 16:45:22",
        "description": "有一段非常有意思的简介，可以更新一下哦",
        "name": "洛杉矶湖人",
        "_id": "5asg62sdaga45ksd2jk10358e"
      },
      {
        "createdAt": "2020-06-05 16:45:22",
        "description": "有一段非常有意思的简介，可以更新一下哦",
        "name": "洛杉矶湖人",
        "_id": "5asg62sdaga45ksd2jk10358e"
      }
    ],
    "message": "请求成功" 
  }
```
**401相应**
