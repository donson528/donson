1.注册github账户 记住用户名和密码

ctrl+r cmd进入控制台

# 本地生成ssh key

$ ssh-keygen -t rsa -C "donson528@example.com"

一直回车直到出现一个图片密码

然后去C盘 用户 用户名里 找.shh文件
用vsco打开pub文件 得到秘钥 复制全部

在github主页右上角点头像下拉出现setting 进里面的SSH and GPG keys 

new SSh 上框随便填名字
下框填刚刚复制的秘钥

成功后右上角加号 
  New repository 
  只有Repository name 下面的框需要填一个好记的名字

  确认后--远程仓库创建完成

  查看Quick setup — if you’ve done this kind of thing before下面的
  SSH 后面的仓库地址. 一定是SSH 不是https

仓库地址的规律好像是git@github.com:(网站用户名)/(仓库用户名).git

git@github.com:donson528/donson.git

在你需要上传的文件夹新建一个readme.md 和index.html文件
readme.md会在仓库页面显示 index.html会在你的"域名"显示

右键文件夹终端打开
执行命令
git init 
将所有文件添加到暂停区

git add .     

# 将所有文件添加到仓库区 ""里面的文字自己定

git commit  -m "第一次"

# 目前仓库已经有你想要的文件了
# 你需要将本地仓库和远程仓库建起链接,然后把本地仓库和远程仓库进行内容交换即可

# 关联远程仓库
# origin 后面是你的仓库地址
git remote add origin git@github.com:donson528/donson.git

# 没有反应是正常的 有反应才不正常
# 建起联系后就可以互换内容啦
# 推送到远程仓库 
git push -u origin master

# 第一次如果长时间没反应请按CTRL+C终止  继续上面的命令 第一次有可能会问你YES/NO 请回答yes!!!!

成功后就可以去仓库首页查看了,显示的是readme.md内容


