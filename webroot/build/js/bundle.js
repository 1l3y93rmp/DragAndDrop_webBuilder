!function e(t,r,i){function n(o,s){if(!r[o]){if(!t[o]){var l="function"==typeof require&&require;if(!s&&l)return l(o,!0);if(a)return a(o,!0);var d=new Error("Cannot find module '"+o+"'");throw d.code="MODULE_NOT_FOUND",d}var c=r[o]={exports:{}};t[o][0].call(c.exports,function(e){var r=t[o][1][e];return n(r?r:e)},c,c.exports,e,t,r,i)}return r[o].exports}for(var a="function"==typeof require&&require,o=0;o<i.length;o++)n(i[o]);return n}({"D:\\git-repo\\DragAndDrop_webBuilder\\webroot\\_scripts\\newsletter-builder.js":[function(e,t,r){$(function(){function e(){}function t(){$(".sim-row-edit").hover(function(){$(this).append('<div class="sim-row-edit-hover"><i class="fa fa-pencil" style="line-height:30px;"></i></div>'),$(".sim-row-edit-hover").click(function(e){e.preventDefault()}),$(".sim-row-edit-hover i").click(function(e){e.preventDefault(),big_parent=$(this).parent().parent(),"image"==big_parent.attr("data-type")&&($("#sim-edit-image .image").val(big_parent.children("img").attr("src")),$("#sim-edit-image").fadeIn(500),$("#sim-edit-image .sim-edit-box").slideDown(500),$("#sim-edit-image .sim-edit-box-buttons-save").click(function(){$(this).parent().parent().parent().fadeOut(500),$(this).parent().parent().slideUp(500),big_parent.children("img").attr("src",$("#sim-edit-image .image").val())})),"link"==big_parent.attr("data-type")&&($("#sim-edit-link .title").val(big_parent.text()),$("#sim-edit-link .url").val(big_parent.attr("href")),$("#sim-edit-link").fadeIn(500),$("#sim-edit-link .sim-edit-box").slideDown(500),$("#sim-edit-link .sim-edit-box-buttons-save").click(function(){$(this).parent().parent().parent().fadeOut(500),$(this).parent().parent().slideUp(500),big_parent.text($("#sim-edit-link .title").val()),big_parent.attr("href",$("#sim-edit-link .url").val())})),"title"==big_parent.attr("data-type")&&($("#sim-edit-title .title").val(big_parent.text()),$("#sim-edit-title").fadeIn(500),$("#sim-edit-title .sim-edit-box").slideDown(500),$("#sim-edit-title .sim-edit-box-buttons-save").click(function(){$(this).parent().parent().parent().fadeOut(500),$(this).parent().parent().slideUp(500),big_parent.text($("#sim-edit-title .title").val())})),"text"==big_parent.attr("data-type")&&($("#sim-edit-text .text").val(big_parent.text()),$("#sim-edit-text").fadeIn(500),$("#sim-edit-text .sim-edit-box").slideDown(500),$("#sim-edit-text .sim-edit-box-buttons-save").click(function(){$(this).parent().parent().parent().fadeOut(500),$(this).parent().parent().slideUp(500),big_parent.text($("#sim-edit-text .text").val())})),"icon"==big_parent.attr("data-type")&&($("#sim-edit-icon").fadeIn(500),$("#sim-edit-icon .sim-edit-box").slideDown(500),$("#sim-edit-icon i").click(function(){$(this).parent().parent().parent().parent().fadeOut(500),$(this).parent().parent().parent().slideUp(500),big_parent.children("i").attr("class",$(this).attr("class"))}))})},function(){$(this).children(".sim-row-edit-hover").remove()})}function r(){$(".sim-row").append('<div class="sim-row-delete"><i class="fa fa-times" ></i></div><div class="sim-row-changeColor">換背景色：<input class="changeColor-input-text" type="text" placeholder="請輸入色碼" size="7";></div>')}function i(){$(".sim-row-delete").click(function(){$(this).parent().remove()})}function n(){$(".changeColor-input-text").blur(function(e){$(this).closest(".sim-row").css({background:$(this).val()})})}$(window).resize(function(){e()}),e(),$("#all-template").load("allTemplate.html #newsletter-preloaded-rows",function(){r()}),$("#all-edit-bord").load("allEditBord.html",function(){$(".sim-edit-box-buttons-cancel").click(function(){$(this).parent().parent().parent().fadeOut(500),$(this).parent().parent().slideUp(500)})}),$("#newsletter-builder-area-center-frame-buttons-add").hover(function(){$("#newsletter-builder-area-center-frame-buttons-dropdown").fadeIn(200)},function(){$("#newsletter-builder-area-center-frame-buttons-dropdown").fadeOut(200)}),$("#newsletter-builder-area-center-frame-buttons-dropdown").hover(function(){$(".newsletter-builder-area-center-frame-buttons-content").fadeIn(200)},function(){$(".newsletter-builder-area-center-frame-buttons-content").fadeOut(200)}),$("#add-column-1").hover(function(){$(".newsletter-builder-area-center-frame-buttons-content-tab[data-type='column-1']").show(),$(".newsletter-builder-area-center-frame-buttons-content-tab[data-type='column-2']").hide()}),$("#add-column-2").hover(function(){$(".newsletter-builder-area-center-frame-buttons-content-tab[data-type='column-1']").hide(),$(".newsletter-builder-area-center-frame-buttons-content-tab[data-type='column-2']").show()}),$(".newsletter-builder-area-center-frame-buttons-content-tab").hover(function(){$(this).append('<div class="newsletter-builder-area-center-frame-buttons-content-tab-add"><i class="fa fa-plus"></i>&nbsp;Insert</div>'),$(".newsletter-builder-area-center-frame-buttons-content-tab-add").click(function(){$("#newsletter-builder-area-center-frame-content").prepend($("#newsletter-preloaded-rows .sim-row[data-id='"+$(this).parent().attr("data-id")+"']").clone()),t(),i(),n(),$("#newsletter-builder-area-center-frame-buttons-dropdown").fadeOut(200)})},function(){$(this).children(".newsletter-builder-area-center-frame-buttons-content-tab-add").remove()}),t(),$("#newsletter-builder-area-center-frame-content").sortable({revert:!0}),$(".sim-row").draggable({connectToSortable:"#newsletter-builder-area-center-frame-content",revert:"invalid",handle:".sim-row-move"}),i(),n(),$(".Rwd-bottom").click(function(){"rwd-phone"==$(this).attr("id")?($("#newsletter-builder-area-center-frame-content").css("width",320),$("#RWD-css").attr("media","all")):"rwd-pad"==$(this).attr("id")?($("#newsletter-builder-area-center-frame-content").css("width",1024),$("#RWD-css").attr("media","screen and (max-width: 420px)")):($("#newsletter-builder-area-center-frame-content").css("width","100%"),$("#RWD-css").attr("media","screen and (max-width: 420px)"))}),$("#newsletter-builder-sidebar-buttons-abutton").click(function(){$("#newsletter-preloaded-export").html($("#newsletter-builder-area-center-frame-content").html()),$("#newsletter-preloaded-export .sim-row-delete").remove(),$("#newsletter-preloaded-export .sim-row").removeClass("ui-draggable"),$("#newsletter-preloaded-export .sim-row-edit").removeAttr("data-type"),$("#newsletter-preloaded-export .sim-row-edit").removeClass("sim-row-edit"),export_content=$("#newsletter-preloaded-export").html(),$("#export-textarea").val(export_content),$("#export-form").submit(),$("#export-textarea").val(" ")}),$("#newsletter-builder-sidebar-buttons-bbutton").click(function(){$("#sim-edit-export").fadeIn(500),$("#sim-edit-export .sim-edit-box").slideDown(500),$("#newsletter-preloaded-export").html($("#newsletter-builder-area-center-frame-content").html()),$("#newsletter-preloaded-export .sim-row-delete").remove(),$("#newsletter-preloaded-export .sim-row").removeClass("ui-draggable"),$("#newsletter-preloaded-export .sim-row-edit").removeAttr("data-type"),$("#newsletter-preloaded-export .sim-row-edit").removeClass("sim-row-edit"),preload_export_html=$("#newsletter-preloaded-export").html(),$.ajax({url:"_css/newsletter.css"}).done(function(e){export_content="<style>"+e+'</style><link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic" rel="stylesheet" type="text/css"><link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"><div id="sim-wrapper"><div id="sim-wrapper-newsletter">'+preload_export_html+"</div></div>",$("#sim-edit-export .text").val(export_content)}),$("#newsletter-preloaded-export").html(" ")})})},{}]},{},["D:\\git-repo\\DragAndDrop_webBuilder\\webroot\\_scripts\\newsletter-builder.js"]);
//# sourceMappingURL=bundle.js.map
