<template>
    <div id="tarbar">
        <div class="page-tabbar">
            <div class="page-wrap">
                <div class="page-title">Tabbar</div>
                <div>
                    <mt-cell class="page-part" title="当前选中" :value="selected" />
                </div>

                <mt-tab-container class="page-tabbar-container" v-model="selected">
                    <mt-tab-container-item id="我的">
                        <mt-cell v-for="n in 10" :title="'餐厅 ' + n" >
                            <div id="tempture">
                                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE3NXB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTc1IDIwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy44LjIgKDI5NzUzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT7nu7/lj7ZAMXg8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMjU2LWNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MC4wMDAwMDAsIC0yOC4wMDAwMDApIiBmaWxsPSIjMjZhMmZmIj4KICAgICAgICAgICAgPGcgaWQ9Iue7v+WPtiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAuMDAwMDAwLCAyOC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4zMDQ2ODgsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTgzLjcyOTQ4OTUsMTU1LjAxMTg3NiBDODIuMTA5MzUsMTUxLjY2MDE1OSA4MC4wMzY0ODA3LDE0Ny4xMTY3MTIgNzcuOTA3NTkzMiwxNDEuNzU1NTIgQzc1Ljc3ODcwNTcsMTQ0LjUwMzU5NyA3My40NTk2MzU3LDE0Ny4yNjc0MjMgNzAuOTU3NTYsMTUwLjA2MzU0NCBMNjYuOTk0NDI4MywxNTQuNTc1MDk1IEw2MS45NzQ1Mjc5LDE1Mi40NTQzOCBDNDcuMzA0MTYyNSwxNDYuMjY2ODcxIDQuNzYyMjk2MDksMTI1LjU4MzgyOSAwLjM3NzczMjYxNyw5Mi4xNzYzMDM1IEMtMi43NTk0ODA4Niw1Ny4zNzA5MTY2IDE3LjYwNTc5MzIsMzkuMDg2NDg2MSAxMC4yNDI5MDA0LDE5LjczNzcxMTcgQzM5Ljk0MTA3MDUsMjYuODM4NjU0OSA2My4zNTY0NDA4LDM4LjMzOTkxMDQgNzguMzM2NjAwMiw1My4wNTc5MjExIEMxMDEuODM5Mjg3LDIzLjA1NzkzMDkgMTMxLjk0Mjk0LDIxLjg4MjM0OCAxMzkuOTcyNjY4LDAgQzE5NS43MzkzOTMsNzcuOTQyNzE5OSAxODYuODQzMjc5LDE0OS4xODk5OCA5My44ODgzMDM5LDE2MC42NzQ4ODkgQzg2LjAyNTIzNTQsMTc1LjEzOTEyMyA3Ny4yNjQyODIsMTg4LjU3MDExMyA2Ny43NDA4MDQ5LDIwMCBMNTQuNzA2NzI2NiwxOTEuOTA2MjggQzY1Ljg4MjIzOTUsMTgxLjE3NTUyMyA3NS40NDU1ODczLDE2OC42NDk3OTQgODMuNzI5NDg5NSwxNTUuMDExODc2IEw4My43Mjk0ODk1LDE1NS4wMTE4NzYgTDgzLjcyOTQ4OTUsMTU1LjAxMTg3NiBaIE05Mi42OTcxNzE1LDExNi4xNzk3NjQgQzk0LjYzNTI3ODUsMTIxLjM5ODAyMSA5Ni42MjEwMzA3LDEyNS42MjM1IDk3Ljg5OTg3ODMsMTI4LjE4ODc3MSBDMTExLjQzNDUzMSw5OC44MDA1OTQ1IDEyMC42NzE5MzgsNjYuNjYzOTQyMiAxMjguMTE0MzcyLDM3LjA2OTAzNjkgQzEyMC4wOTIwMjEsNDUuNDA4OTU3MiAxMDQuNjM1NDA4LDQ4LjY2NTU4MyA5Mi41MzA1MTI3LDY1LjQzMjkzOTMgQzkxLjc2ODE4NzksNjYuNTc2NjI1OCA5MS4xMDA1NTU5LDY3Ljc2MDE4MjYgOTAuNTA1Mjg4Nyw2OC45Njc0NjI3IEM5OC4wNjY3MzY1LDgyLjk3MDU5NDUgOTkuMjI2MTcxOSw5OC45NDM3Mjk3IDkyLjY5NzE3MTUsMTE2LjE3OTc2NCBMOTIuNjk3MTcxNSwxMTYuMTc5NzY0IEw5Mi42OTcxNzE1LDExNi4xNzk3NjQgWiBNNTIuNjA5NzM1NCwxMjcuNzEyMzE4IEM0Ny40NjI4NDczLDk5LjA2Mjc0MzQgNDAuNTEyODE0MSw3Mi40MzgzOTI2IDI4LjM1MjQ5ODYsNDguODgwMDg2MyBMMjguMzUyNDk4Niw0OC44ODAwODYzIEM0MS4zMzA5NTc2LDY2Ljk5NzY1ODYgNTYuNDA2NDA3Niw5My4yNjQ1Njk5IDY0LjM5Njg2MjUsMTIyLjk5NDIzOCBDOTIuNDM1MDIyNyw4OS43NjE1NDQzIDc0LjA5NTE3MjEsNTQuOTQwMjA5MiAyMi4zODc0NjcsNDIuNTg5MzEyNSBDMjcuMTkyODYzOSw1NS4yMjY0Nzk3IDEzLjg4ODY2MjcsNjcuMTcyMjkxNiAxNS45Mzc4MDksODkuOTEyNjUzNSBDMTguOTU2MDA5LDExMi44NTkzNDYgNDQuNjI3MjU0NSwxMjQuNDg3Nzg4IDUyLjYwOTczNTQsMTI3LjcxMjMxOCBMNTIuNjA5NzM1NCwxMjcuNzEyMzE4IEw1Mi42MDk3MzU0LDEyNy43MTIzMTggWiBNMTA4Ljc4MTM0NiwxMjkuNjkwMjk2IEMxNTkuNzEwNTc5LDEyMC45MjEzNjggMTY1LjQ0NTE1OSw4MC42ODMwMjIzIDEzNS44MTA3ODEsMzUuNzkwMTg5MyBDMTMyLjAyOTg1OCw2Mi45NTQ1ODY1IDEyMi41OTM4OTcsOTcuMTg4MjI5OSAxMDguNzgxMzQ2LDEyOS42OTAyOTYgTDEwOC43ODEzNDYsMTI5LjY5MDI5NiBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+">
                            </div>
                        </mt-cell>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="关于">
                        <mt-cell v-for="n in 5" :title="'订单 ' + n" />
                    </mt-tab-container-item>
                    <mt-tab-container-item id="发现">
                        <mt-cell v-for="n in 7" :title="'发现 ' + n" />
                    </mt-tab-container-item>
                    <mt-tab-container-item id="我的">
                        <div class="page-part">
                            <mt-cell v-for="n in 12" :title="'我的 ' + n" />
                        </div>
                        <router-link to="/">
                            <mt-button type="danger" size="large">退出</mt-button>
                        </router-link>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>

            <mt-tabbar v-model="selected" fixed>
                <mt-tab-item id="外卖">
                    <img slot="icon" src="./assets/my.png">
                    外卖
                </mt-tab-item>
                <mt-tab-item id="关于">
                    <img slot="icon" src="./assets/my.png">
                    订单
                </mt-tab-item>
                <mt-tab-item id="发现">
                    <img slot="icon" src="./assets/my.png">
                    发现
                </mt-tab-item>
                <mt-tab-item id="我的">
                    <img slot="icon" src="./assets/my.png">
                    我的
                </mt-tab-item>
            </mt-tabbar>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabbar',
        data() {
            return {
                selected: '我的'
            };
        }
    };
</script>

<style>
    .page-tabbar {
        overflow: hidden;
        height: 100vh;
    }
    .page-wrap {
        overflow: auto;
        height: 100%;
        padding-bottom: 100px;
    }
</style>