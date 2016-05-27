$(function() { 
// Resize	
function resize(){
	//$('.resize-height').height(window.innerHeight - 50);
	//$('.resize-width').width(window.innerWidth - 250);
	//if(window.innerWidth<=1150){$('.resize-width').css('overflow','auto');}
	
	}
$( window ).resize(function() {resize();});
resize();

$('.newsletter-builder-area-center-frame-buttons-content').load( "allTemplate.html #newsletter-preloaded-rows",function(data){
	//載入模板 加入刪除鈕
	
	//載入模板 將資訊填入選單內使其可選擇 先加上Class
	$('.newsletter-builder-area-center-frame-buttons-content').find('.sim-row').addClass('newsletter-builder-area-center-frame-buttons-content-tab')
	//讓這個Class有用
 $(".newsletter-builder-area-center-frame-buttons-content-tab").hover(
  function() {
    $(this).append('<div class="newsletter-builder-area-center-frame-buttons-content-tab-add"><i class="fa fa-plus"></i>&nbsp;Insert</div>');
    //放入一個++鈕
	$('.newsletter-builder-area-center-frame-buttons-content-tab-add').click(function() {

		//++鈕按下後 把模板內的東西複製加入到畫面當中
		
	$("#newsletter-builder-area-center-frame-content").prepend($("#newsletter-preloaded-rows .sim-row[data-id='"+$(this).parent().attr("data-id")+"']").clone());
	
	add_delete();
	
	perform_delete();
	perform_changeColor();
	hover_edit();
	
	$("#newsletter-builder-area-center-frame-buttons-dropdown").fadeOut(200);
		})
  }, function() {
    $('.newsletter-builder-area-center-frame-buttons-content-tab-add').remove()
  }
); 
	

});

$('#all-edit-bord').load( "allEditBord.html",function(){
//close edit
	$(".sim-edit-box-buttons-cancel").click(function() {
	  $(this).parent().parent().parent().fadeOut(500)
	   $(this).parent().parent().slideUp(500)
	});
});

 
//Add Sections
$("#newsletter-builder-area-center-frame-buttons-add").hover(
  function() {
    $("#newsletter-builder-area-center-frame-buttons-dropdown").fadeIn(200);
  }, function() {
    $("#newsletter-builder-area-center-frame-buttons-dropdown").fadeOut(200);
  }
);

$("#newsletter-builder-area-center-frame-buttons-dropdown").hover(
  function() {
    $(".newsletter-builder-area-center-frame-buttons-content").fadeIn(200);
  }, function() {
    $(".newsletter-builder-area-center-frame-buttons-content").fadeOut(200);
  }
);


$("#add-column-1").hover(function() {

    $(".newsletter-builder-area-center-frame-buttons-content-tab[data-type='column-1']").show()
    $(".newsletter-builder-area-center-frame-buttons-content-tab:not([data-type='column-1'])").hide()
  });
  
$("#add-column-2").hover(function() {

    $(".newsletter-builder-area-center-frame-buttons-content-tab[data-type='column-2']").show()
    $(".newsletter-builder-area-center-frame-buttons-content-tab:not([data-type='column-2'])").hide()
  });
  
$("#add-column-3").hover(function() {

    $(".newsletter-builder-area-center-frame-buttons-content-tab[data-type='column-3']").show()
    $(".newsletter-builder-area-center-frame-buttons-content-tab:not([data-type='column-3'])").hide()
  });

$("#add-column-4").hover(function() {

    $(".newsletter-builder-area-center-frame-buttons-content-tab[data-type='column-4']").show()
    $(".newsletter-builder-area-center-frame-buttons-content-tab:not([data-type='column-4'])").hide()
  });


  
  

  
  
//Edit
function hover_edit(){


$("#newsletter-builder-area-center-frame-content .sim-row-edit").hover(
  function() {
    $(this).append('<div class="sim-row-edit-hover"><i class="fa fa-pencil" style="line-height:30px;"></i></div>');
	$(".sim-row-edit-hover").click(function(e) {e.preventDefault()})
	$(".sim-row-edit-hover i").click(function(e) {
	e.preventDefault();
	big_parent = $(this).parent().parent();
	
	//edit image
	if(big_parent.attr("data-type")=='image'){
	
	
	$("#sim-edit-image .image").val(big_parent.find('img').attr("src"));
	$("#sim-edit-image .link").val(big_parent.find('a').attr("href"));
	$("#sim-edit-image").fadeIn(500);
	$("#sim-edit-image .sim-edit-box").slideDown(500);
	
	$("#sim-edit-image .sim-edit-box-buttons-save").click(function() {
	  $(this).parent().parent().parent().fadeOut(500)
	  $(this).parent().parent().slideUp(500)
	  big_parent.find('img').attr("src",$("#sim-edit-image .image").val());
	  if ( $("#sim-edit-image .link").val().length !=0 ) {
	  	big_parent.wrapInner( "<a></a>" );
	  	big_parent.find('a').attr("href",$("#sim-edit-image .link").val());
	  } else {
	  	console.log( big_parent )
	  	big_parent.find('a').find('img').unwrap();
	  };
	   });

	}
	
	//edit link
	if(big_parent.attr("data-type")=='link'){
	
	$("#sim-edit-link .title").val(big_parent.text());
	$("#sim-edit-link .url").val(big_parent.attr("href"));
	$("#sim-edit-link").fadeIn(500);
	$("#sim-edit-link .sim-edit-box").slideDown(500);
	
	$("#sim-edit-link .sim-edit-box-buttons-save").click(function() {
	  $(this).parent().parent().parent().fadeOut(500)
	  $(this).parent().parent().slideUp(500)
	   
	    big_parent.text($("#sim-edit-link .title").val());
		big_parent.attr("href",$("#sim-edit-link .url").val());

		});

	}
	
	//edit title
	
	if(big_parent.attr("data-type")=='title'){
	
	$("#sim-edit-title .title").val(big_parent.text());
	$("#sim-edit-title").fadeIn(500);
	$("#sim-edit-title .sim-edit-box").slideDown(500);
	
	$("#sim-edit-title .sim-edit-box-buttons-save").click(function() {
	  $(this).parent().parent().parent().fadeOut(500)
	  $(this).parent().parent().slideUp(500)
	   
	    big_parent.text($("#sim-edit-title .title").val());

		});

	}
	
	//edit text
	if(big_parent.attr("data-type")=='text'){
	big_parent.find('.sim-row-edit-hover').remove()
	console.log(big_parent)
	$("#sim-edit-text .text").val(big_parent.html());
	console.log(big_parent.text())
	$("#sim-edit-text").fadeIn(500);
	$("#sim-edit-text .sim-edit-box").slideDown(500);
	
	$("#sim-edit-text .sim-edit-box-buttons-save").click(function() {
	  $(this).parent().parent().parent().fadeOut(500)
	  $(this).parent().parent().slideUp(500)

	  var str = $("#sim-edit-text .text").val()

	    big_parent.html(str);
		
		
	   
		});

	}
	
	//edit icon
	if(big_parent.attr("data-type")=='icon'){
	
	
	$("#sim-edit-icon").fadeIn(500);
	$("#sim-edit-icon .sim-edit-box").slideDown(500);
	
	$("#sim-edit-icon i").click(function() {
	  $(this).parent().parent().parent().parent().fadeOut(500)
	  $(this).parent().parent().parent().slideUp(500)
	   
	    big_parent.children('i').attr('class',$(this).attr('class'));

		});

	}//
	
	});
  }, function() {
    $(this).children(".sim-row-edit-hover").remove();
  }
);
}
hover_edit();



//Drag & Drop
$("#newsletter-builder-area-center-frame-content").sortable({
  revert: true
});
	

$(".sim-row").draggable({
      connectToSortable: "#newsletter-builder-area-center-frame-content",
      //helper: "clone",
      revert: "invalid",
	  handle: ".sim-row-move"
});



//Delete
function add_delete(){
	$("#newsletter-builder-area-center-frame-content .sim-row").removeClass('newsletter-builder-area-center-frame-buttons-content-tab').append('<div class="sim-row-delete"><i class="fa fa-times" ></i></div><div class="sim-row-changeColor">換背景色：<input class="changeColor-input-text" type="text" placeholder="請輸入色碼" size="20";><br>換背景圖：<input class="changeImg-input-text" type="text" placeholder="請輸入Url" size="20";></div>');
		//執行動做移到東西載入
	}


function perform_delete(){
$(".sim-row-delete").click(function() {
  $(this).parent().remove();
});
}
perform_delete();

function perform_changeColor(){
	$(".changeColor-input-text").blur(function(event) {
		$(this).closest('.sim-row').css({
			'background-color': $(this).val()
		});
	});
	$(".changeImg-input-text").blur(function(event) {
		$(this).closest('.sim-row').css({
			'background-image': 'url('+ $(this).val() +')'
		});
	});
}
perform_changeColor();

//改變可視大小

$('.Rwd-bottom').click(function(){
	if ($(this).attr('id') == 'rwd-phone') {
		$('#newsletter-builder-area-center-frame-content,.newsletter-builder-area-center-frame-buttons-content .sim-row').css('width',320)
		$('#RWD-css-420 , #RWD-css-900').attr('media','all')
	} else if($(this).attr('id') == 'rwd-pad'){
		$('#newsletter-builder-area-center-frame-content,.newsletter-builder-area-center-frame-buttons-content .sim-row').css('width',1024)
		$('#RWD-css-420').attr('media','screen and (max-width: 420px)')
		$('#RWD-css-900').attr('media','all')
	} else{
		$('#newsletter-builder-area-center-frame-content,.newsletter-builder-area-center-frame-buttons-content .sim-row').css('width','100%')
		$('#RWD-css-420').attr('media','screen and (max-width: 420px)')
		$('#RWD-css-900').attr('media','screen and (max-width: 900px)')
	};

})



//Download
 $("#newsletter-builder-sidebar-buttons-abutton").click(function(){
	 
	$("#newsletter-preloaded-export").html($("#newsletter-builder-area-center-frame-content").html());
	$("#newsletter-preloaded-export .sim-row-delete").remove();
	$("#newsletter-preloaded-export .sim-row").removeClass("ui-draggable");
	$("#newsletter-preloaded-export .sim-row-edit").removeAttr("data-type");
	$("#newsletter-preloaded-export .sim-row-edit").removeClass("sim-row-edit");
	
	export_content = $("#newsletter-preloaded-export").html();
	
	$("#export-textarea").val(export_content)
	$( "#export-form" ).submit();
	$("#export-textarea").val(' ');
	 
});
	 
	 
//Export 
$("#newsletter-builder-sidebar-buttons-bbutton").click(function(){
	
	$("#sim-edit-export").fadeIn(500);
	$("#sim-edit-export .sim-edit-box").slideDown(500);
	
	$("#newsletter-preloaded-export").html($("#newsletter-builder-area-center-frame-content").html());
	$("#newsletter-preloaded-export .sim-row-delete").remove();
	$("#newsletter-preloaded-export .sim-row").removeClass("ui-draggable");
	$("#newsletter-preloaded-export .sim-row-edit").removeAttr("data-type");
	$("#newsletter-preloaded-export .sim-row-edit").removeClass("sim-row-edit");
	
	preload_export_html = $("#newsletter-preloaded-export").html();
	$.ajax({
	  url: "_css/newsletter.css"
	}).done(function(data) {

	
export_content = '<style>'+data+'</style><link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic" rel="stylesheet" type="text/css"><link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"><div id="sim-wrapper"><div id="sim-wrapper-newsletter">'+preload_export_html+'</div></div>';
	
	$("#sim-edit-export .text").val(export_content);
	
	
	});
	
	
	
	$("#newsletter-preloaded-export").html(' ');
	
	});




});