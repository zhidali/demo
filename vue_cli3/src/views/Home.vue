<template>
    <div class="home">
        <img
            alt="Vue logo"
            src="../assets/logo.png"
        />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue';

    export default {
        name: 'home',
        components: {
            HelloWorld
        },
        created() {
            let postData = {
                job_number: '25',
                password: 'Julive@888'
            };
            this.axios
                .post('/backend-api/api-user/login', postData)
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.code === 0) {
                            console.log('登录成功');
                        } else {
                            // 登录失败
                            alert(res.data.msg);
                        }
                    } else {
                        alert('数据错误');
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            // this.axios.post('')
        }
    };
</script>
