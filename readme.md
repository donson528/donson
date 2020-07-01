# 注册github账户 记住用户名和密码

ctrl+r cmd进入控制台

# 本地生成ssh key

$ ssh-keygen -t rsa -C "donson528@example.com"

# 一直回车直到出现一个图片密码

# 然后去C盘 用户 用户名里 找.shh文件
# 用vsco打开pub文件 得到秘钥 复制全部

# 在github主页右上角点头像下拉出现setting 进里面的SSH and GPG keys 

# new SSh 上框随便填名字
# 下框填刚刚复制的秘钥

# 成功后右上角加号 
  New repository 
  # 只有Repository name 下面的框需要填一个好记的名字

  # 确认后--远程仓库创建完成

  # 查看Quick setup — if you’ve done this kind of thing before下面的
  SSH 后面的仓库地址. 一定是SSH 不是https

# 仓库地址的规律好像是git@github.com:(网站用户名)/(仓库用户名).git

git@github.com:donson528/donson.git

# 在你需要上传的文件夹新建一个readme.md 和index.html文件
readme.md会在仓库页面显示 index.html会在你的"域名"显示

# 右键文件夹终端打开
# 执行命令
git init 
# 将所有文件添加到暂停区

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

# 成功后就可以去仓库首页查看了,显示的是readme.md内容


>可以进入仓库的setting 设置Repository name =="域名"
>以后可以通过这个域名直接访问你的index内容
>以后可以通过这个域名直接访问你的index内容

username.github.io


git命令符
git  
分布式 版本控制系统

ls  列出目录 -a
cd 进入目录 ./ ../

touch 新建
tab 命令补全
vi 编辑器 i插入 esc推出插入 :wq保存并退出 vim
cat 查看
clear



git --version
git --help


git init  U

# 添加文件
git add readme.md  A
git add . 添加所有文件

# 提交文件
git commit -m "wrote a readme file" 


# 配置用户信息
git config --global user.email "you@example.com"
git config --global user.name "Your Name" 


U A M-2
git status


git log
git log --pretty=oneline



工作区 暂存区 仓库区


git restore <file>...  撤销工作区

git restore --staged <file>  撤销



首先，Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。

# 强制刷新工作区
# 将仓库返回上一步或者返回上一步的ID
git reset --hard HEAD^
git reset --hard 573a483ab9973

