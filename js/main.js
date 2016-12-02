function showPattern() {
    var tileIdNum=[];
    for (var i=0; i<5;i++){
        var num = Math.floor(Math.random() * 16);
        tileIdNum.push('t'+num);
        $('#t'+num).addClass('flip');
    }
    setTimeout(function () {
        $('.tile').removeClass('flip');
    },2000);
    return tileIdNum;
}

$(document).ready(function(){
    var tileIdNum=[];
    var countDownDiv = $('#count-down');
    var i=1;
    var intervalId = window.setInterval(function () {
        countDownDiv.css('display','block');
        countDownDiv.text(i);
        i++;
        if (i==5){
            clearInterval(intervalId);
            countDownDiv.css('display','none');
            $('table').css('display','block');
        }
    },1000);

    setTimeout(function () {
        for (var i=0;i<5;i++){
            var num = Math.floor(Math.random() * 16)+1;
            tileIdNum.push('t' + num);
            $.unique(tileIdNum);
            $('#t'+num).addClass('flip');
        }
        setTimeout(function () {
            $('.tile').removeClass('flip');
        },2000);
        console.log(tileIdNum);
    },5000);

    var tries = [];
    var correct=0; var wrong = 0;
    $('.tile').click(function(){
        tries.push($(this).attr('id'));
        if (tileIdNum.length >= tries.length){
            if ($.inArray($(this).attr('id'), tileIdNum) != -1){
                correct++;
                $(this).addClass('flip');
                console.log(tries );
                console.log('correct');
                $('#correct').text(correct);
            }else{
                wrong++;
                $(this).css('background-image','url(img/rsz_wrong_no_background.png)');
                console.log('wrong');
                $('#wrong').text(wrong);
            }
            console.log($(this).attr('id'));
        }
        if (tileIdNum.length == tries.length){
            console.log('game over');
            var left = $(tileIdNum).not(tries).get();
            console.log(left.length);

            if(left.length == 0){
                console.log('you win!');
                $('#end-game').text('Right! 😄');
            }else{
                console.log('try again');
                $('#end-game').text('You can try again... 😉');
                setTimeout(function () {
                    for (var i=0; i<left.length;i++){
                        $('#'+left[i]).addClass('flip');
                        // $('#'+left[i]).find(".face.back").css('background-image','url(img/rsz_green-check.png)');
                    }
                },1500);
            }
        }
    });
});
