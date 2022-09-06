$(document).ready(function(){
    //===== Dropdown =====//
    $(".dropdown").click(function () {
        $(this).attr("tabindex", 1).focus();
        $(this).toggleClass("active");
        $(this).find(".dropdown-menu").slideToggle(300);
    });
    $(".dropdown").focusout(function () {
        $(this).removeClass("active");
        $(this).find(".dropdown-menu").slideUp(300);
    });
    $(".dropdown .dropdown-menu li").click(function () {
        $(this).parents(".dropdown").find("span").text($(this).text());
        $(this).parents(".dropdown").find("input").attr("value", $(this).attr("id"));
    });
    /*webmobile value값 선택시 depth*/
    $(".dropdown-menu li").click(function () {
        if($(this).parents(".dropdown").find("input").val() === 'webMobile'){
            $(this).parents('.area-sel-wrap').find('.area-sel-depth').addClass('depth-on');
        }else{
            $(this).parents('.area-sel-wrap').find('.area-sel-depth').removeClass('depth-on');
        }
    });
    $(".area-sel-depth .dropdown-menu li").click(function () {
        $(this).parents('.area-sel-wrap').find('.area-sel-depth').addClass('depth-on');
    });


    //===== Tab =====//
    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');
        var tabContent = $(this).parent('.tabs').siblings('.tab-content');

        $(this).removeClass('current');
        $(this).siblings('li').removeClass('current');
        $(tabContent).removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    });


    //===== Popup =====//
    $('.popup-open').click(function(){
        var $href = $(this).attr('data-target');
        layerPopup($href);
    });


    //===== Alarm Popover =====//
    $('.has-popover, .alarm-num').click(function(){
        var popOver = $(this).siblings('.popover-wrap');
      
        if($(popOver).hasClass('active')){
			$(popOver).removeClass("active");
		}else{
			$(popOver).addClass("active");
		}
        //popover-close
        $('.popover-close').click(function(e) {
            $(popOver).removeClass("active");
        });

        return false;
    });


    //Sitemap
    $('#sitemap-toggle').click(function() {
        if($(this).hasClass('active')){
            $('body').removeClass('sitemap-open').removeClass('overflow-h');
            $(this).removeClass('active');
            $('.sitemap-overlay').removeClass('open');
        }else{
            $('body').addClass('sitemap-open').addClass('overflow-h');
            $(this).addClass('active');
            $('.sitemap-overlay').addClass('open');
        }

    });


    //Cart
    $(".cart-open-btn").click(function () {
        cartON();
    });

    $(".cart-close-btn").click(function () {
        cartOFF();
    });


    


    


    hasTooltip();//tooltip
    userLayout();//userLayout
    accordionDefault();//accordionDefault
    uiSelect();//uiSelect
    hasIconInput();


});


//===== scroll event =====//
$(window).scroll(function() {
    processScrollFunc();
});


//===== resize event =====//
$(window).on('resize', function(){
    processScrollFunc();
});


//===== Function =====//
/*hasIconInput*/
function hasIconInput(){
    $('.has-icon-input').each(function(){
        var hasIconInput = $(this);
        var inputText = $(this).find('.inp-base');
        var inputBtnW = $(this).find('.ui-btn').outerWidth() + 6;
        
        if($(hasIconInput).find('.ui-btn').length){
            $(inputText).css('padding-right', inputBtnW);
        }else{
            $(inputText).css('padding-right','0');
        }
    });
}
/* Popup */
function layerPopup(popEl){

    var $popEl = $(popEl);//레이어의 id를 $popEl 변수에 저장

    $popEl.addClass('state-opened');//$popEl.show();
    $('body').addClass('no-scroll').on('scroll touchmove', function(e){e.preventDefault();});//바디스크롤막기
    
    var $elWidth = ~~($popEl.outerWidth()),
        $elHeight = ~~($popEl.outerHeight()),
        docWidth = $(document).width(),
        docHeight = $(document).height();

    $popEl.find('.pop-close').click(function(){
        $popEl.removeClass('state-opened');//$popEl.hide();
        $('body').removeClass('no-scroll').off('scroll touchmove');//바디스크롤풀기

        //팝업중첩시
        if($('body').find('.state-opened').length){
            $('body').addClass('no-scroll').on('scroll touchmove', function(e){e.preventDefault();});//바디스크롤막기
        }else{
            $('body').removeClass('no-scroll').off('scroll touchmove');//바디스크롤풀기
        }
        return false;
        
    });    
}   
/*레이어팝업_아이디값으로 닫을때*/
function layerPopupClose(popElClose){
    var $popElClose = $(popElClose);//레이어의 id를 $popEl 변수에 저장
    $popElClose.removeClass('state-opened');//$popEl.hide();
}
/*process3 스크롤 */
function processScrollFunc(){
    var scrollPos = $(window).scrollTop();

    //process3의 모바일 하단 버튼고정
    if (scrollPos >= 150) {
        $('.process-right').find('.btn-group.mo-show').css('position','fixed');
    } else {
        $('.process-right').find('.btn-group.mo-show').css('position','relative');
    }

    //process3의 오른쪽영역의 디자인을 위한 스타일
    if (scrollPos >= 50) {
        var processRightW =  $(".process-right").outerWidth();
        $(".process-right").addClass("fixed-pos");
        $(".process-left").css("padding-right", processRightW);

    } else {
        $(".process-right").removeClass("fixed-pos");
        $(".process-left").css("padding-right", '');
    }

    //mCSB Move
    var stepCallScroll1 = $('.step1-call-scroll');
    var stepCallScroll2 = $('.step1-call-scrol2');
    var stepCallScroll3 = $('.step1-call-scrol3');
    if (stepCallScroll1.length){ var stepOffset1 = stepCallScroll1.offset().top}
    if (stepCallScroll2.length){ var stepOffset2 = stepCallScroll2.offset().top}
    if (stepCallScroll3.length){ var stepOffset3 = stepCallScroll3.offset().top}

    if ($(window).scrollTop() >= stepOffset1) {
        $('.process3-scrollbar').mCustomScrollbar('scrollTo',$('.process3-scrollbar').find('.mCSB_container').find('.txt-step1'));

    } else if($(window).scrollTop() >= stepOffset2){
        $('.process3-scrollbar').mCustomScrollbar('scrollTo',$('.process3-scrollbar').find('.mCSB_container').find('.txt-step2'));

    } else if($(window).scrollTop() >= stepOffset3){
        $('.process3-scrollbar').mCustomScrollbar('scrollTo',$('.process3-scrollbar').find('.mCSB_container').find('.txt-step3'));

    } else {
        $('.process3-scrollbar').mCustomScrollbar('scrollTo','top');

    }
}
/*user-layout*/
function userLayout(){
    $('.user-wrap').each(function(){
        if($(this).find('.user-bottom').length){
            $(this).parent('.box-inner').addClass('has-user-bottom');
        }else{
            $(this).parent('.box-inner').removeClass('has-user-bottom');
        }
    });
}
/*tooltip */
function hasTooltip(){
    var hasTooltip = $('.has-tooltip');
    var tooltipCon = $(hasTooltip).find('.tooltip-con');
    //tooltip open
    $(hasTooltip).find('.tooltip-shape').on({
        click: function(){
            var pos = $(hasTooltip).position();
            $(hasTooltip).addClass('tooltip-on');
            $(tooltipCon).css('top', (pos.top)+32 + 'px').css('left', (pos.left)-5 + 'px').fadeIn(100);
        }
    });
    //tooltip close
    $('.tooltip-close').on({
        click: function(){
            $(hasTooltip).removeClass('tooltip-on');
            $(tooltipCon).fadeOut(100);
        }
    });
}
/*accordionDefault*/
function accordionDefault(){
    $('.accordion-body').each(function(){
        var accordionBody = $(this);

        if($(accordionBody).find('.accordion-content').length){

            if($(accordionBody).find('.accordion-label').hasClass('label-click-open')){
                //아코디언타이틀영역 전체 클릭시 오픈의 경우 accordion-label에 label-click-open 클래스 추가
                $(this).find('.label-click-open').click(function () {
                    $(this).parent('.accordion-body').toggleClass('active');
                });

            }else{
                //기본 타이틀영역 우측 아이콘 클릭시 열림
                $(this).find('.accord-icon').click(function () {
                    $(this).parent().parent('.accordion-body').toggleClass('active');
                });

            }
            
        }else{
            $(this).removeClass('active');
        }
    });
}
/*ui-select*/
function uiSelect(){
    $(".ui-select").click(function () {
        $(this).attr("tabindex", 1).focus();
        $(this).toggleClass("active");
        $(this).find(".ui-select-menu").slideToggle(300);
    });
    $(".ui-select").focusout(function () {
        $(this).removeClass("active");
        $(this).find(".ui-select-menu").slideUp(300);
    });
    $(".ui-select .ui-select-menu li").click(function () {
        $(this).parents(".ui-select").find("span").text($(this).text());
        $(this).parents(".ui-select").find("input").attr("value", $(this).attr("id"));
    });
}
/*cart*/
function cartON(){
    var cartWrap = $('.cart-wrap');
    $(cartWrap).addClass('cart-on');
}
function cartOFF(){
    var cartWrap = $('.cart-wrap');
    $(cartWrap).removeClass('cart-on');
}


/*exampleFunc*/
function exampleFunc(){

}


//===== jqueryui-Datepicker Setting =====//
$.datepicker.setDefaults({
	dateFormat: "yy-mm-dd",
	prevText: '<i class="ico ri-arrow-left-s-line size28"><span class="blind">이전</span></i>',
	nextText: '<i class="ico ri-arrow-right-s-line size28"><span class="blind">다음</span></i>',
	monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],	//한글 캘린더중 월 표시를 위한 부분
	monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],	//한글 캘린더 중 월 표시를 위한 부분
	dayNames: ['일', '월', '화', '수', '목', '금', '토'],	//한글 캘린더 요일 표시 부분
	dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],	//한글 요일 표시 부분
	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],	// 한글 요일 표시 부분
	showMonthAfterYear: true,	// true : 년 월  false : 월 년 순으로 보여줌
	yearSuffix: '년',//
    showOn: "button",
    buttonImage: "../resource/img/inp_calendar.png",
});
//===== mCustomScrollbar =====//
$(window).load(function(){
    /*Default Scrollbar*/
    $(".mCustomScrollbar").mCustomScrollbar({
        //scrollButtons:{enable:true},
        theme:"dark-thin",
        scrollbarPosition:"outside"
    });
    /*process3 Scrollbar*/
    $(".process3-scrollbar").mCustomScrollbar({
        scrollButtons:{enable:true},
        theme:"dark",
        scrollbarPosition:"outside"
    });
});
//===== mobile Web =====//
document.documentElement.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
         event.preventDefault(); 
    } 
}, false);

var lastTouchEnd = 0; 

document.documentElement.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault(); 
    } lastTouchEnd = now; 
}, false);



