import index from './index.css'
import alert from './alert.css'
(function () {
    console.log("程序运行正常");
    $('.button-example').on('click', () => {
        console.log('测试')
        $('.tip').css('display', 'block')
        let i = 6
        let interval
        interval = setInterval(() => {
            i--;
            console.log(i)
            $('.close h3').text(i)
            if (i === 0) {
                $('.tip').css('display', 'none')
                clearInterval(interval)
            }
        }, 1000)
    })

    $('#submit').on('click', () => {
        // 前后端使用校验码码进行提交校验,防止恶意攻击
        fetch('http://www.usercode.ga:3000/submitData', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res) => {
            if (res.ok) {
                console.log('Perfect! Your settings are saved.');
            } else if (res.status == 401) {
                console.log('Oops! You are not authorized.');
            }
        }, function (e) {
            console.log('Error submitting form!');
        })
    })

})()