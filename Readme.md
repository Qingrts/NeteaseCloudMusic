# 运行需要使用Binaryify提供的接口,请到此处下载[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)
安装依赖(推荐cnpm)
```
npm install
或者
cnpm install
```

运行
```
npm run dev
```

上线 压缩
```
npm run pub
```


# 项目介绍
仿网易云音乐官网,基于React,使用git进行版本控制

## 接口使用
[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)

# 技术栈
+ react v16.1.1
+ react-dom v16.1.1
+ react-router-dom v4.2.2
+ webpack v3.8.1
+ scss v6.0.6
+ antd-design v4.9.4
+ jsx
+ css modules
+ git 版本控制

# 项目搭建
使用webpack\@3.8.1构建项目

# 项目目录结构
+ dist
  + index.html
  + css
  + images
  + js
+ src
	+ component
  	+ Download
    	+ Download.jsx
  	+ FindMusic				主页发现音乐部分, 路由配置以及结构搭建
			+ tagsComponents			标签对应的组件
				+ Album.jsx
				+ Artist.jsx
				+ Djradio.jsx
				+ Playlist.jsx
				+ PlaylistCategory.jsx
				+ Recommend.jsx
				+ Toplist.jsx
    	+ FindMusic.jsx
  	+ Friend
    	+ Friend.jsx
		+ Musicperson
  		+ Musicperson.jsx
		+ MyMusic
  		+ MyMusic.jsx
		+ Store
  		+ Store.jsx				
	+ css									css文件以及其他css预处理器(less,scss)
  	+ findmusic					主页发现音乐部分样式文件
    	+ playlist.scss		
    	+ PlaylistCategory.scss
    	+ recommend.scss
  	+ app.scss
  	+ common.css
  	+ findmusic.scss
	+ images							图片
	+ App.jsx							根组件
	+ index.html					主页
	+ main.js							入口文件夹
+ todos									项目开发记录
  + toc									使用i5ting_toc生成的html文件
  + 网易云音乐项目.html		同上
  + toc_conf.js					同上
  + 网易云音乐项目.md			项目开发记录
+ .babelrc							es6转es5, 插件按需导入
+ .gitignore						指定添加到暂存区时忽略的文件
+ package.json					包管理
+ webpack.config.js			开发使用
+ webpack.pub.config.js	上线压缩用的


# Todos
+ 首页
	+ ~~首页页面搭建~~
	+ ~~首页路由管理与相应组件的展示~~
	+ ~~首页发现音乐路由导航部分~~
	+ ~~推荐部分banner图~~
		+ ~~展示 antd-design Carousel组件~~
		+ ~~点击小图标切换~~
		+ ~~点击左右箭头切换~~
	+ 热门推荐
		+ ~~展示~~
		+ ~~歌单详情~~
			+ ~~评论~~
			+ ~~评论分页~~
			+ ~~右侧信息~~
		+ ~~更多~~
		+ ~~电台详情~~
	+ 登录
		+ 模态窗
	+ 入驻歌手
		+ ~~展示~~
		+ 歌手详情
		+ 查看更多
		+ 申请成为网易音乐人
	+ 新碟上架
		+ ~~轮播图展示~~
		+ ~~更多~~
		+ ~~专辑详情~~
	+ 热门主播
		+ ~~展示~~
		+ 详情
	+ 榜单
		+ ~~展示~~
		+ ~~榜单详情~~
		+ ~~查看榜单全部歌曲(查看更多)~~
		+ ~~更多(榜单)~~
+ 用户详情
+ ~~歌曲详情~~
+ 电台分类
+ 搜索
+ 歌单分类
+ 排行榜
+ 主播电台
+ 歌手列表
+ 新碟上架

+ css优化
+ js优化
+ 公共模块抽离


# 疑难
1. 切换时背景图片与当前图片不同步问题 antd-design
```
// 第一个参数是当前图片的索引,第二个参数是下一张图片的索引,使用第二个参数可以实现同步切换
beforeChange: function(currentSlide, nextSlide) {
	console.log("before change", currentSlide, nextSlide);
}
// 参数是当前的索引,在切换过之后才会触发
afterChange: function(currentSlide) {
	console.log("after change", currentSlide);
}
```


# 日志
## 2020/12/23 
未完成的:

+ ~~歌单详情~~

## 2020/12/24
未完成的:

+ ~~歌单详情~~
+ ~~评论分页~~

## 2020/12/25
未完成的:

+ ~~电台详情~~
+ ~~专辑详情~~

## 2020/12/26 今日预计完成 
+ 公共组件的抽离
+ css文件的抽离

## 组件抽离完成度 50% (2020/12/26任务 失败)


## 2020/12/27 电台详情页面完成

## 2020/12/28 完成
+ ~~专辑详情~~
+ ~~电台详情~~

## 2020/12/29 完成
+ ~~单曲详情~~
+ ~~排行榜页面~~


## 2020/12/30 完成
+ ~~单曲的播放~~
+ ~~评论组件的bug~~
+ ~~歌曲的播放与快进~~
+ ~~歌曲是否可用~~
+ ~~歌曲缓冲进度~~


## 2020/12/31 完成
+ ~~音量 点击调节~~
+ ~~音量 滑动调节~~
+ ~~歌曲 进度点击调节~~
+ ~~歌曲 进度滑动调节~~

## 2020/1/2 完成
tips:　(将歌曲播放控件重新放回到单曲页面)

+ ~~标签 新碟上架部分~~
+ ~~分页完成~~
+ ~~评论列表的bug~~
+ ~~主页链接跳转~~