快速开始

步骤1. 安装Node.js 18.17以上版本.
npm install

步骤2. 运行next.js服务

cd <project_path>
npm install
npm run dev
步骤3. 打开浏览器, 访问 http://localhost:3000

服务器部署：
    使用 nohup 来执行 npm run dev：
    nohup npm run dev > output.log 2>&1 &

    查看日志：你可以查看输出日志来查看程序的运行状态：
    tail -f output.log

    关闭进程：你可以通过查看后台进程并将其关闭。首先查找进程 ID（PID）：
    ps aux | grep 'npm run dev'
    然后使用 kill 命令终止进程：
    kill <PID>


