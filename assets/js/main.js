$(document).ready(function() {

    if($.cookie("ody-theme") == 1){
        $(".hero-jumbo").css({background:'linear-gradient(242deg, #42c19a, #bd6bc0) 0% 0% / 200% '});
        $(".hero-jumbo").css({animation:'9s ease 0s infinite normal none running AnimationName'});
    }
    
    if($.cookie("ody-theme") == 2){
    
    
        $(".hero-jumbo").css({background:'linear-gradient(242deg, #dbddd7, #cf436b, #1f1828) 0% 0% / 200% '});
        $(".hero-jumbo").css({animation:'9s ease 0s infinite normal none running AnimationName'});
    }
    
    if($.cookie("ody-theme") == 3){
        
    
        $(".hero-jumbo").css({background:'linear-gradient(242deg, #29bfdc, #1d5680) 0% 0% / 200% '});
        $(".hero-jumbo").css({animation:'9s ease 0s infinite normal none running AnimationName'});
    }
    
    if(!$.cookie("ody-theme")){
        $(".hero-jumbo").css({background:'linear-gradient(242deg, #42c19a, #bd6bc0) 0% 0% / 200% '});
        $(".hero-jumbo").css({animation:'9s ease 0s infinite normal none running AnimationName'});
    }
    
    
    
    $("#default").on('click',function(){
    
        $.cookie("ody-theme", 1);
        $(".hero-jumbo").css({background:'linear-gradient(242deg, #42c19a, #bd6bc0) 0% 0% / 200% '});
        $(".hero-jumbo").css({animation:'9s ease 0s infinite normal none running AnimationName'});
    
    
     });
    
     $("#cottoncandy").on('click',function(){
    
        $.cookie("ody-theme", 2);
    
        $(".hero-jumbo").css({background:'linear-gradient(242deg, #dbddd7, #cf436b, #1f1828) 0% 0% / 200% '});
        $(".hero-jumbo").css({animation:'9s ease 0s infinite normal none running AnimationName'});
     });
    
     $("#rain").on('click',function(){
    
        $.cookie("ody-theme", 3);
    
        $(".hero-jumbo").css({background:'linear-gradient(242deg, #29bfdc, #1d5680) 0% 0% / 200% '});
        $(".hero-jumbo").css({animation:'9s ease 0s infinite normal none running AnimationName'});
     });
     
    
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            //i.e. apply safari class via jquery
            $(".navbar").addClass("fancy");
        }
    
        if ($("#hero-container").length > 0) {
            window.addEventListener("scroll", function() {
                if ($(window).scrollTop() > $("#hero-container").height()) {
                    $("body").addClass("page-scrolled");
                    $(".navbar").removeClass("clearbg");
                } else {
                    $("body").removeClass("page-scrolled");
                    $(".navbar").addClass("clearbg");
                }
            }, { passive: true });
        }
        console.log(window.location.pathname);
    
        $(".none_shall_know").on('click',function(){
    
    
    
           $(".hero-jumbo").css({'background-image': 'url("https://pbs.twimg.com/media/EQh9D61X0AURDK_.jpg")'});
           $(".hero-jumbo").css({'background-repeat': 'repeat'});
           $(".hero-jumbo").css({'background-size': '200px'});
           
        });
       
    });
    
    
    
    
    
    
    
    
    