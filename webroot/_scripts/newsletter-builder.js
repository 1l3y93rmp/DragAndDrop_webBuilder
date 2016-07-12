$(function() {

	if($('#newsletter-builder-area-center-frame-content').children().length != 0){
		console.log('一載入content已經有東西!')
		hover_edit ($('#newsletter-builder-area-center-frame-content>.sim-row .sim-row-edit'));
		add_delete();
		perform_delete();
		perform_changeColor();
	}
	//外部檔案載入模板
	$('.newsletter-builder-area-center-frame-buttons-content').load('allTemplate.html #newsletter-preloaded-rows', function(data) {


		//載入模板 將資訊填入選單內使其可選擇 先加上Class
		$('.newsletter-builder-area-center-frame-buttons-content').find('.sim-row').addClass('newsletter-builder-area-center-frame-buttons-content-tab')
			//讓這個Class有用
		$('.newsletter-builder-area-center-frame-buttons-content-tab').hover(
			function(e) {
				e.preventDefault();
				e.stopPropagation();
				$(this).append('<div class="newsletter-builder-area-center-frame-buttons-content-tab-add"><i class="fa fa-plus"></i>&nbsp;Insert</div>');
				//在ADD放入一個Insert++鈕
				$('.newsletter-builder-area-center-frame-buttons-content-tab-add').click(function() {

					//++鈕按下後 把模板內的東西複製加入到畫面當中

					$('#newsletter-builder-area-center-frame-content').prepend($('#newsletter-preloaded-rows .sim-row[data-id="' + $(this).parent().attr('data-id') + '"]').clone());

					add_delete();
					perform_delete();
					perform_changeColor();
					//var pancilBox = $('#newsletter-builder-area-center-frame-content>.sim-row:first .sim-row-edit');

					hover_edit ($('#newsletter-builder-area-center-frame-content>.sim-row:first .sim-row-edit'));


					$('#newsletter-builder-area-center-frame-buttons-dropdown').fadeOut(200);

				})
			},
			function(e) {
				//滑出"Insert++"時
				e.preventDefault();
				e.stopPropagation();
				//把Insert++鈕拿掉，功能也拿掉
				$('.newsletter-builder-area-center-frame-buttons-content-tab-add').remove();
				$('.newsletter-builder-area-center-frame-buttons-content-tab-add').off()

			}
		);

		//Add 選單開闔
		$('#newsletter-builder-area-center-frame-buttons-add').hover(
			function() {
				$('#newsletter-builder-area-center-frame-buttons-dropdown').fadeIn(200);
			},
			function() {
				$('#newsletter-builder-area-center-frame-buttons-dropdown').fadeOut(200);
			}
		);

		$('#newsletter-builder-area-center-frame-buttons-dropdown').hover(
			function() {
				$('.newsletter-builder-area-center-frame-buttons-content').fadeIn(200);
			},
			function() {
				$('.newsletter-builder-area-center-frame-buttons-content').fadeOut(200);
			}
		);

		//ADD選單分類過濾
		$('#add-column-1').hover(function() {

			$('.newsletter-builder-area-center-frame-buttons-content-tab[data-type="column-1"]').show()
			$('.newsletter-builder-area-center-frame-buttons-content-tab:not([data-type="column-1"])').hide()
		});

		$('#add-column-2').hover(function() {

			$('.newsletter-builder-area-center-frame-buttons-content-tab[data-type="column-2"]').show()
			$('.newsletter-builder-area-center-frame-buttons-content-tab:not([data-type="column-2"])').hide()
		});

		$('#add-column-3').hover(function() {

			$('.newsletter-builder-area-center-frame-buttons-content-tab[data-type="column-3"]').show()
			$('.newsletter-builder-area-center-frame-buttons-content-tab:not([data-type="column-3"])').hide()
		});

		$('#add-column-4').hover(function() {

			$('.newsletter-builder-area-center-frame-buttons-content-tab[data-type="column-4"]').show()
			$('.newsletter-builder-area-center-frame-buttons-content-tab:not([data-type="column-4"])').hide()
		});
	});


	//這裡去外部檔案載入所有編輯面版，關閉、開啟面板都要在這裡執行
	//這個涵式會慢~
	$('#all-edit-bord').load('allEditBord.html', function() {
		console.log('所有編輯面板已被載入')
	});

		//pancilBox有兩種傳入的值 1.預設直接載入在Contend的 2.新被複製出現的
		function hover_edit (pancilBox){
			//當sim-row-edit被滑入出現鉛筆按鈕
			pancilBox.hover(
				function(e) {
					e.preventDefault();
					e.stopPropagation();
					console.log($(this).attr('data-type'))
					if(/image/.test($(this).attr('data-type'))){
						$(this).append('<div class="sim-row-edit-hover"><i class="fa fa-pencil" style="line-height:30px;"></i> <div class="edit-changeColor">背景設定(局部)</div></div>');
					}else{
						$(this).append('<div class="sim-row-edit-hover"><i class="fa fa-pencil" style="line-height:30px;"></i></div>');
					}
					

					//鉛筆按鈕被按下 打開編輯面板
					$('.sim-row-edit-hover i').one('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						big_parent = $(this).parent().parent();
						//edit image
						if (big_parent.attr('data-type') == 'image') {
							$('#sim-edit-image').fadeIn(500);
							$('#sim-edit-image .sim-edit-box').slideDown(500);

							$('#sim-edit-image .image').val(big_parent.find('img').attr('src'));
							$('#sim-edit-image .link').val(big_parent.find('a').attr('href'));
							if (!big_parent.find('a').attr('class')) {
								$('#sim-edit-image .style').val(big_parent.find('img').attr('class'));
							} else {
								$('#sim-edit-image .style').val(big_parent.find('a').attr('class'));
							}

							$('#sim-edit-image .sim-edit-box-buttons-save').one('click', function(e) {
								e.preventDefault();
								e.stopPropagation();
								console.log('圖片儲存被觸發..')
								var imgSrc = $('#sim-edit-image .image').val();
								var img = new Image();
								img.src = imgSrc;

								$(this).parent().parent().parent().fadeOut(500)
								$(this).parent().parent().slideUp(500)
								big_parent.find('img').removeAttr('style').attr('src', imgSrc);
								//替換上IMG

								//將該圖片的寬設置成最大寬度
								//在JS中載入圖片並取得該寬度~
								img.onload = function() {
									var IMGwidth = this.width;
									big_parent.find('img').css({
										'max-width': IMGwidth,
										'width': '100%'
									})
								}

								var style = $('#sim-edit-image .style').val();

								if ($('#sim-edit-image .link').val().length != 0) {
									big_parent.wrapInner('<a></a>');
									big_parent.find('img').removeAttr('class');
									big_parent.find('a').attr('href', $('#sim-edit-image .link').val()).addClass(style);
								} else {
									big_parent.find('a').find('img').unwrap()
									big_parent.addClass(style);
								};

								if (!style) {
									big_parent.find('a').removeAttr('class');
									//big_parent.removeAttr('class').addClass('sim-row-header3-slider sim-row-edit');
								}
							});
							$('#sim-edit-image .sim-edit-box-buttons-cancel').one('click',function(e) {
								e.preventDefault();
								e.stopPropagation();
								console.log('關閉image編輯面板')
								$(this).closest('.sim-edit-box').parent().fadeOut(500)
								$(this).closest('.sim-edit-box').slideUp(500)
								$(this).off();
								$('#sim-edit-image .sim-edit-box-buttons-save').off();
							});


						} else if (big_parent.attr('data-type') == 'text') {
							console.log('data-type=text')

							$('#sim-edit-text').fadeIn(500);
							$('#sim-edit-text .sim-edit-box').slideDown(500);

							big_parent.find('.sim-row-edit-hover').remove()
							$('#sim-edit-text .text').val(big_parent.html());
							$('#sim-edit-text .color').val(big_parent.css('color'));
							$('#sim-edit-text .size').val(big_parent.css('font-size'));
							$('#sim-edit-text .weight').val(big_parent.css('font-weight'));
							$('#sim-edit-text .bgcolor').val(big_parent.find('span').css('background-color'));
							$('#sim-edit-text .align').val(big_parent.css('text-align'));
							$('#sim-edit-text .fonts').val(big_parent.attr('class').split(' ')[2]);



							$('#sim-edit-text .sim-edit-box-buttons-save').one('click', function(e) {
								e.preventDefault();
								e.stopPropagation();
								console.log('文字儲存被觸發..')

								$('#sim-edit-text').fadeOut(500);
								$('#sim-edit-text .sim-edit-box').slideUp(500);


								var str = $('#sim-edit-text .text').val(),
									newColor = $('#sim-edit-text .color').val(),
									newSize = $('#sim-edit-text .size').val(),
									newFonts = $('#sim-edit-text .fonts').val(),
									newWeight = $('#sim-edit-text .weight').val(),
									newAlign = $('#sim-edit-text .align').val(),
									newBgcolor = $('#sim-edit-text .bgcolor').val()

								big_parent.html(str);
								big_parent.removeClass('NotoSans SourceSans SourceSerif MicrosoftJhengHei serif').addClass(newFonts);
								big_parent.css({
									'color': newColor,
									'font-size': newSize,
									'text-align': newAlign,
									'font-weight': newWeight
								})
								if (newBgcolor && big_parent.find('span').length == 0) {
									big_parent.wrapInner('span');
								}

								big_parent.find('span').css({
									'background-color': newBgcolor
								})
								$(this).off();
								$('#sim-edit-text .sim-edit-box-buttons-add').off();
								$('#sim-edit-text .sim-edit-box-buttons-del').off();
								$('#sim-edit-text .sim-edit-box-buttons-cancel').off();
							});

							$('#sim-edit-text .sim-edit-box-content-text-min').click(function(){
									/*$('.trip').slideToggle();
									$(this).off();*/
								})

							$('#sim-edit-text .sim-edit-box-buttons-add').one('click', function(e) {
								e.preventDefault();
								e.stopPropagation();
								console.log('觸發複製')
								$(this).parent().parent().parent().fadeOut(500);
								$(this).parent().parent().slideUp(500);
								big_parent.after(big_parent.clone(true));
								$(this).off();
							})

							$('#sim-edit-text .sim-edit-box-buttons-del').one('click', function(e) {
								e.preventDefault();
								e.stopPropagation();
								console.log('觸發刪除')
								if (confirm('確認要刪除此文字框?')) {

									$(this).parent().parent().parent().fadeOut(500);
									$(this).parent().parent().slideUp(500);
									big_parent.remove();
									$(this).off();
									$('#sim-edit-text .sim-edit-box-buttons-add').off();
									$('#sim-edit-text .sim-edit-box-buttons-save').off();
									$('#sim-edit-text .sim-edit-box-buttons-cancel').off();
								} else {
									$(this).parent().parent().parent().fadeOut(500);
									$(this).parent().parent().slideUp(500);
									$(this).off();
								}
							})
							$('#sim-edit-text .sim-edit-box-buttons-cancel').one('click',function(e) {
								e.preventDefault();
								e.stopPropagation();
								console.log('關閉text編輯面板')
								$(this).closest('.sim-edit-box').parent().fadeOut(500)
								$(this).closest('.sim-edit-box').slideUp(500)
								$(this).off();
								$('#sim-edit-text .sim-edit-box-buttons-add').off();
								$('#sim-edit-text .sim-edit-box-buttons-save').off();
								$('#sim-edit-text .sim-edit-box-buttons-del').off();
							});
						} else if (big_parent.attr('data-type') == 'icon') {


							$('#sim-edit-icon').fadeIn(500);
							$('#sim-edit-icon .sim-edit-box').slideDown(500);

							$('#sim-edit-icon i').one('click', function(e) {
								e.preventDefault();
								e.stopPropagation();
								$(this).parent().parent().parent().parent().fadeOut(500)
								$(this).parent().parent().parent().slideUp(500)

								big_parent.children('i').attr('class', $(this).attr('class'));
							});
						}
					});



				},
				function(e) {
					//這裡是當sim-row-edit(鉛筆)滑出 要拔除的東西
					e.preventDefault();
					e.stopPropagation();
					$(this).children('.sim-row-edit-hover').remove();
					$(this).children('.sim-row-edit-hover').off();
					$('.sim-row-edit-hover i').off() //打開編輯面板

				}
			);//這個HOVER只能加在新clone出現的那一塊content上，故使用:first
		}



		//Drag & Drop
		$('#newsletter-builder-area-center-frame-content').sortable({
			revert: true
		});


		$('.sim-row').draggable({
			connectToSortable: "#newsletter-builder-area-center-frame-content",
			//helper: "clone",
			revert: "invalid",
			handle: ".sim-row-move"
		});



	//Delete
	function add_delete() {
		$('#newsletter-builder-area-center-frame-content .sim-row').removeClass('newsletter-builder-area-center-frame-buttons-content-tab').append('<div class="sim-row-delete"><i class="fa fa-times" ></i></div><div class="sim-row-changeColor">背景設定(橫的整塊)</div>');

		
	}


	function perform_delete() {
		$('.sim-row-delete').click(function() {
			$(this).parent().remove();
		});

	}


	function perform_changeColor() {

		$('.sim-row-changeColor').click(function() {



			$(this).parent().append('<div class="changeColor-box">換背景色：<input class="changeColor-input-text" type="text" placeholder="請輸入#色碼" size="20";><br>換背景圖：<input class="changeImg-input-text" type="text" placeholder="請輸入Url" size="20";><br>背景是否固定：<select class="background-attachment"><option value="scroll">不固定</option><option value="fixed">固定</option></select><br>限制最大寬度：<input class="maxWidth" placeholder="請輸入寬度px或%" size="20";><br>加上特殊樣式：<input class="style" placeholder="多個樣式請用空白分開" size="20";><br><button class="btnOK" id="btnOK">OK</button></div>	');

				/*填入值*/
				var changeColorBox = $(this).next('.changeColor-box')
				var simRow = $(this).closest('.sim-row')

				changeColorBox.find('.changeColor-input-text').val(simRow.css('background-color'))
				changeColorBox.find('.changeImg-input-text').val(simRow.css('background-image'))
				changeColorBox.find('.maxWidth').val(simRow.css('max-width'))
				changeColorBox.find('.background-attachment').val(simRow.css('background-attachment'))
				changeColorBox.find('.style').val($(this).closest('.sim-row').attr('class').replace(/sim-row/,''))



			$('#btnOK').click(function(){
				$(this).closest('.sim-row').css({
					'background-color': $(this).prevAll('.changeColor-input-text').val(),
					'background-image': 'url(' + $(this).prevAll('.changeImg-input-text').val() + ')',
					'max-width': $(this).prevAll('.maxWidth').val(),
					'background-attachment': $(this).prevAll('.background-attachment').val()
				});

				$(this).closest('.sim-row').removeClass().addClass('sim-row ' + $(this).prevAll('.style').val());
				$(this).closest('.changeColor-box').remove();
			})

		})


/*
		$('.changeColor-input-text').keyup(function(event) {
			$(this).closest('.sim-row').css({
				'background-color': $(this).val()
			});
		});
		$('.changeImg-input-text').keyup(function(event) {
			$(this).closest('.sim-row').css({
				'background-image': 'url(' + $(this).val() + ')'
			});
		});
		$('.maxWidth').blur(function(event) {
			$(this).closest('.sim-row').css({
				'max-width': $(this).val()
			});
		});

		$('.background-attachment').blur(function(event) {
			$(this).closest('.sim-row').css({
				'background-attachment': $(this).val()
			});
		});

		$('.style').blur(function(event) {
			$(this).closest('.sim-row').removeClass().addClass('sim-row ' + $(this).val());
		});*/
	}





	//Download
	$('#newsletter-builder-sidebar-buttons-abutton').click(function() {

		$('#newsletter-preloaded-export').html($('#newsletter-builder-area-center-frame-content').html());
		$('#newsletter-preloaded-export .sim-row-delete').remove();
		$('#newsletter-preloaded-export .sim-row').removeClass('ui-draggable');
		$('#newsletter-preloaded-export .sim-row-edit').removeAttr('data-type');
		$('#newsletter-preloaded-export .sim-row-edit').removeClass('sim-row-edit');

		export_content = $('#newsletter-preloaded-export').html();

		$('#export-textarea').val(export_content)
		$('#export-form').submit();
		$('#export-textarea').val(' ');

	});


	//Export 
	$('#newsletter-builder-sidebar-buttons-bbutton').click(function() {

		$('#sim-edit-export').fadeIn(500);
		$('#sim-edit-export .sim-edit-box').slideDown(500);

		$('#newsletter-preloaded-export').html($('#newsletter-builder-area-center-frame-content').html());
		$('#newsletter-preloaded-export .sim-row-delete').remove();
		$('#newsletter-preloaded-export .sim-row').removeClass('ui-draggable');
		$('#newsletter-preloaded-export .sim-row-edit').removeAttr('data-type');
		$('#newsletter-preloaded-export .sim-row-edit').removeClass('sim-row-edit');

		preload_export_html = $('#newsletter-preloaded-export').html();
		$.ajax({
			url: "_css/newsletter.css"
		}).done(function(data) {


			export_content = '<style>' + data + '</style><link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic" rel="stylesheet" type="text/css"><link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"><div id="sim-wrapper"><div id="sim-wrapper-newsletter">' + preload_export_html + '</div></div>';

			$('#sim-edit-export .text').val(export_content);


		});



		$('#newsletter-preloaded-export').html(' ');

	});




});