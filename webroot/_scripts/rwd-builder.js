$(function() {

	if($('#rwd-builder-area-center-frame-content').children().length != 0){
		console.log('一載入content已經有東西!')
		hover_edit($('#rwd-builder-area-center-frame-content>.sim-row .sim-row-edit'));
		hover_edit_BG($('#rwd-builder-area-center-frame-content [edit_BG]'));

		add_delete();
		perform_delete();
		changeIndex;
		perform_changeColor();


	}
	//外部檔案載入模板
	$('.rwd-builder-area-center-frame-buttons-content').load('allTemplate.html #rwd-preloaded-rows', function(data) {

		console.log('所有模板已被載入')

		//載入模板 將資訊填入選單內使其可選擇 先加上Class
		$('.rwd-builder-area-center-frame-buttons-content').find('.sim-row').addClass('rwd-builder-area-center-frame-buttons-content-tab')
			//讓這個Class有用
		$('.rwd-builder-area-center-frame-buttons-content-tab').hover(
			function(e) {
				e.preventDefault();
				e.stopPropagation();
				//console.log($(this))
				$(this).append('<div class="rwd-builder-area-center-frame-buttons-content-tab-add"><i class="fa fa-plus"></i>&nbsp;Insert<br><span>'+$(this).attr('ex')+'</span></div>');
				//在ADD放入一個Insert++鈕
				$('.rwd-builder-area-center-frame-buttons-content-tab-add').click(function() {

					//++鈕按下後 把模板內的東西複製加入到畫面當中(別把說明文字也複製了所以刪除!)

					$('#rwd-builder-area-center-frame-content').append($('#rwd-preloaded-rows .sim-row[data-id="' + $(this).parent().attr('data-id') + '"]').clone().removeAttr('ex'));

					$('html, body').animate({scrollTop: $('html, body').height()-window.innerHeight}, 300);

					console.log($(this))
					add_delete();
					perform_delete();
					changeIndex();
					perform_changeColor();
					var pancilBox = $('#rwd-builder-area-center-frame-content>.sim-row:last .sim-row-edit');

					hover_edit ($('#rwd-builder-area-center-frame-content>.sim-row:last .sim-row-edit'));
					hover_edit_BG($('#rwd-builder-area-center-frame-content [edit_BG]'));


					$('#rwd-builder-area-center-frame-buttons-dropdown').fadeOut(200);
				})
			},
			function(e) {
				//滑出"Insert++"時
				e.preventDefault();
				e.stopPropagation();
				//把Insert++鈕拿掉，功能也拿掉
				$('.rwd-builder-area-center-frame-buttons-content-tab-add').remove();
				$('.rwd-builder-area-center-frame-buttons-content-tab-add').off()

			}
		);

		//Add 選單開闔
		$('#rwd-builder-area-center-frame-buttons-add').hover(
			function() {
				$('#rwd-builder-area-center-frame-buttons-dropdown').fadeIn(200);
			},
			function() {
				$('#rwd-builder-area-center-frame-buttons-dropdown').fadeOut(200);
			}
		);

		$('#rwd-builder-area-center-frame-buttons-dropdown').hover(
			function() {
				$('.rwd-builder-area-center-frame-buttons-content').fadeIn(200);
			},
			function() {
				$('.rwd-builder-area-center-frame-buttons-content').fadeOut(200);
			}
		);

		//ADD選單分類過濾
		$('#add-column-1').hover(function() {

			$('.rwd-builder-area-center-frame-buttons-content-tab[data-type="column-1"]').show()
			$('.rwd-builder-area-center-frame-buttons-content-tab:not([data-type="column-1"])').hide()
		});

		$('#add-column-2').hover(function() {

			$('.rwd-builder-area-center-frame-buttons-content-tab[data-type="column-2"]').show()
			$('.rwd-builder-area-center-frame-buttons-content-tab:not([data-type="column-2"])').hide()
		});

		$('#add-column-3').hover(function() {

			$('.rwd-builder-area-center-frame-buttons-content-tab[data-type="column-3"]').show()
			$('.rwd-builder-area-center-frame-buttons-content-tab:not([data-type="column-3"])').hide()
		});

		$('#add-column-4').hover(function() {

			$('.rwd-builder-area-center-frame-buttons-content-tab[data-type="column-4"]').show()
			$('.rwd-builder-area-center-frame-buttons-content-tab:not([data-type="column-4"])').hide()
		});
		
		$('#add-column-5').hover(function() {

			$('.rwd-builder-area-center-frame-buttons-content-tab[data-type="column-5"]').show()
			$('.rwd-builder-area-center-frame-buttons-content-tab:not([data-type="column-5"])').hide()
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
					//console.log($(this).attr('data-type'))
					$(this).append('<div class="sim-row-edit-hover"><i class="fa fa-pencil" style="line-height:30px;"></i></div>');
					

					//鉛筆按鈕被按下 打開編輯面板
					$('.sim-row-edit-hover i').one('click', function(e) {
						e.preventDefault();
						e.stopPropagation();
						big_parent = $(this).parent().parent();
						//edit image
						if (big_parent.attr('data-type') === 'image') {
							var hoverKeyCode = [72, 79, 86, 69, 82]
							var testKeyCode = false
							var testFrequency = 0
							var hoverFeatures
							var spanSrcis = big_parent.find('span.bgspan').length;
							
							var whichButton = function (event) {
								console.log(event.keyCode)
								if(event.keyCode === hoverKeyCode[testFrequency] ){
									testFrequency++
								} else {
									testFrequency = 0
								}
								if (testFrequency === hoverKeyCode.length) {
									alert('你成功打開游標hover效果設定功能了，請在"另一張圖"的欄位放上你要呈現相同大小的另外一張圖 PS:如果你不想要這個效果請在"另一張圖"的欄位上留下空白')
									hoverFeatures = true
									$('[type="spanSrc"]').show()
									$('#sim-edit-image .style').val($('#sim-edit-image .style').val() + ' hoverOpacity0');
									$('body').off('keyup', whichButton)
								}
							}
							var isBlankGIF = big_parent.find('img[src="img/blank.gif"]').length;
							if(isBlankGIF === 0){
								console.log('異動圖片SRC')
								$('[type="src"]').show()
								$('[type="BGsrc"]').hide()
							}else{
								console.log('異動圖片背景')
								$('[type="src"]').hide()
								$('[type="BGsrc"]').show()
							}

							$('#sim-edit-image').fadeIn(500);
							$('#sim-edit-image .sim-edit-box').slideDown(500);

							$('#sim-edit-image .image').val(big_parent.find('img').attr('src'));
							$('#sim-edit-image .imageBG').val(big_parent.find('img').css('background-image').split('"')[1]);

							
							$('#sim-edit-image .link').val(big_parent.find('a.imglink').attr('href'));
							$('#sim-edit-image .target').val(big_parent.find('a.imglink').attr('target'));
							$('#sim-edit-image .style').val(big_parent.find('img').attr('class'));

							$('#sim-edit-image .align').val(big_parent.css('text-align'));
							if(big_parent.closest('[decode="absolute-box"]').length ===1){
									$('#sim-edit-image .left').val(big_parent.closest('.absolute-contrnt').css('left'));
									$('#sim-edit-image .top').val(big_parent.closest('.absolute-contrnt').css('top'));
								}
							
							if (spanSrcis === 0) {
								//如果Span不存在 開始偵聽有沒有輸入密技
								$('body').on('keyup', whichButton)
								$('[type="spanSrc"]').hide()
								$('#sim-edit-image .spanSrc').val('')
								console.log('Span不存在 開始偵聽有沒有輸入密技')
							} else {
								console.log('Span已存在')
								$('[type="spanSrc"]').show()
								$('#sim-edit-image .spanSrc').val(big_parent.find('span.bgspan').css('background-image').split('"')[1])
							}

							if (spanSrcis === 1) { // 如果Span存在 那麼需要添加
								hoverFeatures = false
								$('body').off('keyup', whichButton)
								$('#sim-edit-image .spanSrc').val(big_parent.find('span.bgspan').css('background-image').split('"')[1]);
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

								//將該圖片的寬設置成最大寬度
								//在JS中載入圖片並取得該寬度~
								//此動作只有在圖片SRC並非透明blank.gif才使用
								//或是如果圖片上被加上了noSetTheSidth的Class的時候
								if(isBlankGIF === 0){
									//替換上IMG
									big_parent.find('img').removeAttr('style').attr('src', imgSrc)
									//如果圖片有屬性no-zoom表示不用限制最大寬為圖片原始寬度
									if(typeof big_parent.attr('no-zoom') === 'string'){
										big_parent.find('img').css({
												'width': '100%'
											})
									}else if(typeof big_parent.attr('nosetthewidth') === 'string') {
										console.log('不設定CSS')
									}else{
										img.onload = function() {
											var IMGwidth = this.width;
											big_parent.find('img').css({
												'max-width': IMGwidth,
												'width': '100%'
											})
											// 如果外層的DIV有absolute 也給它一個最大寬
											if (big_parent.parent().hasClass('absolute-contrnt')) {
												big_parent.parent('.absolute-contrnt').css({
													'max-width': IMGwidth
												})
											}
										}									
									}

								}else{
									//替換上IMG
									big_parent.find('img').css('background-image','url("'+$('#sim-edit-image .imageBG').val()+'")');
									
								}



								var style = $('#sim-edit-image .style').val(),
										align = $('#sim-edit-image .align').val();

								if ($('#sim-edit-image .spanSrc').val().length !== 0) {
									big_parent.find('img').wrap('<span class="bgspan"></span>')
									big_parent.find('span.bgspan').css('background-image', 'url("'+$('#sim-edit-image .spanSrc').val()+'")')
								} else {
									big_parent.find('span.bgspan').find('img').unwrap('span')
									big_parent.find('img').removeClass('hoverOpacity0')
									console.log('有開啟功能/但是沒有輸入 刪除＿hoverOpacity0')
								}
								
								big_parent.find('img').removeClass().addClass(style)

								console.log($('#sim-edit-image .link').val())

								if ($('#sim-edit-image .link').val().length != 0) {
									//如果有A包住圖片 CLASS統一寫在圖片上
									if (big_parent.find('span.bgspan').length != 0) {
										// 如果說已經被上面的span包過了，就把a改包在Span上面
										big_parent.find('span.bgspan').wrap('<a class="imglink"></a>')
									} else {
										big_parent.find('img').wrap('<a class="imglink"></a>')
									}
									big_parent.find('a.imglink').attr({
										'href': $('#sim-edit-image .link').val(),
										'target': $('#sim-edit-image .target').val()
									})
								} else {
									//如果沒有A
									if (big_parent.find('span.bgspan').length != 0){
										big_parent.find('a.imglink').find('span.bgspan').unwrap('a.imglink')
									} else {
										big_parent.find('img').unwrap('a.imglink')
									}
								};

								if (!style) {
									big_parent.find('img').removeAttr('class');
								}

								if(big_parent.closest('[decode="absolute-box"]').length ===1){
									var newLeft = $('#sim-edit-image .left').val(),
									newTop = $('#sim-edit-image .top').val()
									big_parent.closest('.absolute-contrnt').css({
									'left': newLeft,
									'top': newTop
								})
								}
								$('.sim-row-edit-hover i,.sim-edit-box-buttons-del,.sim-edit-box-buttons-add,.sim-edit-box-buttons-cancel,.sim-edit-box-buttons-save').off('click')
								$('body').off('keyup', whichButton)
							});

							$('#sim-edit-image .sim-edit-box-buttons-cancel').one('click',function(e) {
								e.preventDefault();
								e.stopPropagation();
								$(this).closest('.sim-edit-box').parent().fadeOut(500)
								$(this).closest('.sim-edit-box').slideUp(500)
								$('#sim-edit-image .sim-edit-box-buttons-save').off();
								$('.sim-row-edit-hover i,.sim-edit-box-buttons-del,.sim-edit-box-buttons-add,.sim-edit-box-buttons-cancel,.sim-edit-box-buttons-save').off('click')
								$('body').off('keyup', whichButton)
							});

							if(big_parent.closest('.slick').length ===1 || big_parent.closest('.slick-Grouping').length ===1 || big_parent.closest('ul').hasClass('sideBySide') || big_parent.closest('[decode="absolute-box"]').length ===1){
								$('#sim-edit-image .sim-edit-box-buttons-add,#sim-edit-image .sim-edit-box-buttons-del').show()
								$('#sim-edit-image .sim-edit-box-buttons-add').one('click', function(e) {
									e.preventDefault();
									e.stopPropagation();
									console.log('觸發圖片複製')
									$(this).parent().parent().parent().fadeOut(500);
									$(this).parent().parent().slideUp(500);
									big_parent.parent().after(big_parent.parent().clone(true));
										$('.sim-row-edit-hover i').off('click')
										$('#sim-edit-image .sim-edit-box-buttons-add').off();
										$('#sim-edit-image .sim-edit-box-buttons-del').off();
										$('#sim-edit-image .sim-edit-box-buttons-save').off();
										$('#sim-edit-image .sim-edit-box-buttons-cancel').off();
										$('body').off('keyup', whichButton)
								})
								$('#sim-edit-image .sim-edit-box-buttons-del').one('click', function(e) {
									e.preventDefault();
									e.stopPropagation();
									console.log('觸發img刪除')
									if (confirm('確認要刪除此圖片?')) {

										$(this).parent().parent().parent().fadeOut(500);
										$(this).parent().parent().slideUp(500);
										big_parent.parent().remove();
										$(this).off();
										$('.sim-row-edit-hover i').off('click')
										$('#sim-edit-image .sim-edit-box-buttons-add').off();
										$('#sim-edit-image .sim-edit-box-buttons-save').off();
										$('#sim-edit-image .sim-edit-box-buttons-cancel').off();
									} else {
										$(this).parent().parent().parent().fadeOut(500);
										$(this).parent().parent().slideUp(500);
										$('.sim-row-edit-hover i,.sim-edit-box-buttons-del,.sim-edit-box-buttons-add,.sim-edit-box-buttons-cancel,.sim-edit-box-buttons-save').off('click')
										$('body').off('keyup', whichButton)
									}
								})
								
								if(big_parent.closest('[decode="absolute-box"]').length ===1){
									//decode="absolute-box"代表可以操作top left 兩個CSS
									$('.left_top').show()
									
								}else{
									$('.left_top').hide()
								}

							}else{
								$('#sim-edit-image .sim-edit-box-buttons-add,#sim-edit-image .sim-edit-box-buttons-del ,.left_top').hide()
							}

						} else if (big_parent.attr('data-type') === 'text') {
							// console.log('data-type=text')

							$('#sim-edit-text').fadeIn(500);
							$('#sim-edit-text .sim-edit-box').slideDown(500);

							big_parent.find('.sim-row-edit-hover').remove()
							// console.log(big_parent.html())
							$('#sim-edit-text .text').val(big_parent.html());
							$('#sim-edit-text .color').val(big_parent.css('color'));
							$('#sim-edit-text .size').val(big_parent.css('font-size'));
							$('#sim-edit-text .weight').val(big_parent.css('font-weight'));
							$('#sim-edit-text .bgcolor').val(big_parent.css('background-color'));
							$('#sim-edit-text .align').val(big_parent.css('text-align'));
							$('#sim-edit-text .highlight').val(big_parent.css('line-height'));
							$('#sim-edit-text .letter-spacing').val(big_parent.css('letter-spacing'));
							$('#sim-edit-text .fonts').val(big_parent.attr('class').split(' ')[1]);
							// console.log(big_parent.attr('class'))
							$('#sim-edit-text .paddingTop').val(big_parent.css('padding-top'));



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
									newBgcolor = $('#sim-edit-text .bgcolor').val(),
									newLetterSpacing = $('#sim-edit-text .letter-spacing').val(),
									newHighlight = $('#sim-edit-text .highlight').val(),
									paddingTop = $('#sim-edit-text .paddingTop').val()

								big_parent.html(str);
								big_parent.removeClass('NotoSans SourceSans SourceSerif MicrosoftJhengHei serif Marcellus Andika Oxygen OpenSans ReemKufi Crimson').addClass(newFonts);
								big_parent.css({
									'color': newColor,
									'font-size': newSize,
									'text-align': newAlign,
									'font-weight': newWeight,
									'padding-top': paddingTop,
									'letter-spacing': newLetterSpacing,
									'line-height': newHighlight,
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
						} else if (big_parent.attr('data-type') === 'video') {
							
							$('#sim-edit-video').fadeIn(500);
							$('#sim-edit-video .sim-edit-box').slideDown(500);

							$('#sim-edit-video .image').val(big_parent.find('video').attr('src'));
							$('#sim-edit-video .link').val(big_parent.find('a.imglink').attr('href'));
							$('#sim-edit-video .target').val(big_parent.find('a.imglink').attr('target'));
							$('#sim-edit-video .style').val(big_parent.find('video').attr('class'));

							$('#sim-edit-video .align').val(big_parent.css('text-align'));


							$('#sim-edit-video .sim-edit-box-buttons-save').one('click', function(e) {
								e.preventDefault();
								e.stopPropagation();
								console.log('影片儲存被觸發..')
								var videoSrc = $('#sim-edit-video .video').val();

								$(this).parent().parent().parent().fadeOut(500)
								$(this).parent().parent().slideUp(500)
								big_parent.find('video').removeAttr('style').attr('src', videoSrc);
								//替換上VIDEO


								var style = $('#sim-edit-video .style').val(),
										align = $('#sim-edit-video .align').val();
								big_parent.find('video').removeClass().addClass(style);

								if ($('#sim-edit-video .link').val().length != 0) {
									//如果有A包住圖片 CLASS統一寫在圖片上
									big_parent.find('video').wrap('<a class="imglink"></a>');
									big_parent.find('a.imglink').attr({
										'href': $('#sim-edit-video .link').val(),
										'target': $('#sim-edit-video .target').val()
									})
								} else {
									//如果沒有A
									big_parent.find('a.imglink').find('video').unwrap()
								};

								if (!style) {
									big_parent.find('video').removeAttr('class');
									//big_parent.removeAttr('class').addClass('sim-row-header3-slider sim-row-edit');
								}
								//影片設置最大寬度只能在載入後才設置，使用setTimeout
								setTimeout(function(){
									big_parent.find('video').css({
										'max-width': big_parent.find('video').width(),
										'width': '100%'
										})
								},300)
								
								
							});
							$('#sim-edit-video .sim-edit-box-buttons-cancel').one('click',function(e) {
								e.preventDefault();
								e.stopPropagation();
								$(this).closest('.sim-edit-box').parent().fadeOut(500)
								$(this).closest('.sim-edit-box').slideUp(500)
								$(this).off();
								$('#sim-edit-video .sim-edit-box-buttons-save').off();

								
							});
						} else if (big_parent.attr('data-type') === 'json'){
							$('#sim-edit-json').fadeIn(500);
							$('#sim-edit-json .sim-edit-box').slideDown(500);

							big_parent.find('.sim-row-edit-hover').remove()
							$('#sim-edit-json .json').val(big_parent.html());
							$('#sim-edit-json .sim-edit-box-buttons-save').one('click', function(e) {
								e.preventDefault();
								e.stopPropagation();
								console.log('json儲存被觸發..')

								$('#sim-edit-json').fadeOut(500);
								$('#sim-edit-json .sim-edit-box').slideUp(500);


								var str = $('#sim-edit-json .json').val()

								big_parent.html(str);

								$(this).off();
								$('#sim-edit-json .sim-edit-box-buttons-cancel').off();
							});
							$('#sim-edit-json .sim-edit-box-buttons-cancel').one('click',function(e) {
								e.preventDefault();
								e.stopPropagation();
								console.log('關閉json編輯面板')
								$(this).closest('.sim-edit-box').parent().fadeOut(500)
								$(this).closest('.sim-edit-box').slideUp(500)
								$(this).off();
								$('#sim-edit-json .sim-edit-box-buttons-save').off();
							});
						}
					});
				},
				function(e) {
					//這裡是當sim-row-edit(鉛筆)滑出 要拔除的東西
					e.preventDefault();
					e.stopPropagation();
					$(this).children('.sim-row-edit-hover').off();
					$('.sim-row-edit-hover i').off('click') //打開編輯面板
					$('.sim-row-edit-hover').remove();


				}
			);//這個HOVER只能加在新clone出現的那一塊content上，故使用:first
		}

		function hover_edit_BG(BGBox){
			BGBox.hover(
				function(e) {
					e.preventDefault();
					e.stopPropagation();
					$(this).append('<div class="edit-changeColor">背景設定(局部)</div>');
					//某些外框會比較特殊會有背景設定(不是全部)

					//局部背景按鈕被按下 打開編輯面板
					$('.edit-changeColor').one('click', function(e) {
						e.preventDefault();
						e.stopPropagation();



						//顯示目前 CLASS name數量
						//紅色的按鈕
						$(this).parent().append('<div class="changeColor-box-min"><div class="sim-edit-box-title">Edit Background</div>換背景色：(輸入色碼)<input class="changeColor-input-text" type="text" placeholder="請輸入#色碼" size="20";><br>換背景圖(請輸入Url)：<input class="changeImg-input-text" type="text" placeholder="請輸入url(網址...)" size="20";><br>背景是否固定：<select class="background-attachment"><option value="scroll">不固定(隨滾輪捲動)</option><option value="fixed">固定(不隨滾輪捲動)</option></select><br>設定最小高度：<input class="minHeight" placeholder="請輸入高度px" size="20" ;><br>局部區塊設為連結：<input class="fullLink" placeholder="請直接輸入連結網址" size="20" ;=""><br>加上特殊樣式：<input class="style" placeholder="多個樣式請用空白分開" size="20" ;=""><button class="btnOK" id="btnOK">OK</button><button class="btnOK" id="btnCancel">Cancel</button></div>	');

							$(this).closest('.sim-row-box').css('overflow', 'inherit')

								/*填入值*/
						var changeColorBox = $(this).next('.changeColor-box-min'),
						    simRow = $(this).closest('[edit_BG]'),
						    CLASS = simRow.attr('class').split(" "),
						    original_CLASS_length = simRow.attr('edit_bg'),
						    new_CLASS_length = simRow.attr('class').split(" ").length,
						    CLASSarr = CLASS, //ALL的CLASS陣列
								original = CLASSarr.splice(0,original_CLASS_length); //"被暫時刪掉"的東西　所以也就是被保留的原本的

							//console.log(CLASS)//ALL CLASS陣列
							//console.log(original_CLASS_length+'原有CLASS數量')
							//console.log(new_CLASS_length+'目前CLASS數量')
							//console.log(CLASSarr) //這是刪掉需要被保護後的陣列 也就是可被使用者異動的部分

							

							changeColorBox.find('.changeColor-input-text').val(simRow.css('background-color'))
							changeColorBox.find('.changeImg-input-text').val(simRow.css('background-image'))
							changeColorBox.find('.background-attachment').val(simRow.css('background-attachment'))
							changeColorBox.find('.minHeight').val(simRow.css('min-height'))
							changeColorBox.find('.fullLink').val(simRow.children('a.full').attr('href'))
							changeColorBox.find('.style').val(CLASSarr.toString().replace(/,/g, ' '))//顯示區
							//注意 如果這樣直接抓會抓到模板預設的Class mane
							

							$('#btnOK').click(function(){
								$(this).closest('[edit_BG]').css({
									'background-color': $(this).prevAll('.changeColor-input-text').val(),
									'background-image': $(this).prevAll('.changeImg-input-text').val(),
									'background-attachment': $(this).prevAll('.background-attachment').val(),
									'min-height': $(this).prevAll('.minHeight').val()
								});
								var OKOK = original.toString().replace(/,/g, ' ') +' '+ $(this).prevAll('.style').val()
								simRow.attr('class',OKOK);

								if(changeColorBox.find('.fullLink').val()){　//如果設定為連截區塊有值的話
									if(simRow.find('a.full').length != 0){ //如果已經有設定過的話
										simRow.find('a.full').attr('href',changeColorBox.find('.fullLink').val())
									}else{
										simRow.prepend('<a class="full" href="'+ changeColorBox.find('.fullLink').val() +'"/>');
										$('a.full').find('a').children().unwrap()
									}

								}else{
									simRow.children('a.full').remove()
								}

								$(this).closest('.changeColor-box-min').remove();
								$('.edit-changeColor').off();
								$('.sim-row-edit-hover').off();
								$('.sim-row-edit-hover i').off() //關掉編輯面板		
								$('.sim-row-edit-hover').remove();			
								$('.changeColor-box-min').remove();			
								$('.edit-changeColor').remove();
								$(this).closest('.sim-row-box').css('overflow', 'hidden')
							})

							$('#btnCancel').click(function(e){
								e.preventDefault();
								e.stopPropagation();
								$('.edit-changeColor').off();
								$('.sim-row-edit-hover').off();
								$('.sim-row-edit-hover i').off() //打開編輯面板		
								$('.sim-row-edit-hover').remove();			
								$('.changeColor-box-min').remove();			
								$('.edit-changeColor').remove();

							})
					});
				},
				function(e){
					e.preventDefault();
					e.stopPropagation();
					$('.edit-changeColor').remove();
					$('.edit-changeColor').off();
				}
			)
		}


		//Drag & Drop
		$('#rwd-builder-area-center-frame-content').sortable({
			revert: true,
			deactivate: function() { // 在移動順序結束後 重新呈現一次新的順位
				var allSimRow = $('#rwd-builder-area-center-frame-content > .sim-row').length
				for (var i = 0 ; i < allSimRow ; i++) {
					$('.rightCtrl .ModuleIndexIs').eq(i).val(i)
				}
			}
		});


		$('.sim-row').draggable({
			connectToSortable: "#rwd-builder-area-center-frame-content",
			//helper: "clone",
			revert: "invalid",
			handle: ".sim-row-move"
		});



	//Delete (加入控制的刪除 順位 背景顏色鈕)
	function add_delete() { // 這個會不斷的重複直行在每一次加入新模塊進到頁面的同時
		$('.rightCtrl').remove();

		var allSimRow = $('#rwd-builder-area-center-frame-content > .sim-row').length
		$('#rwd-builder-area-center-frame-content .sim-row').removeClass('rwd-builder-area-center-frame-buttons-content-tab').append('<div class="rightCtrl"><div class="sim-row-delete"><i class="fa fa-times" ></i></div><div class="ModuleIndex">模塊順位<input type="text" size="2" class="ModuleIndexIs"></div><div class="sim-row-changeColor">背景設定(橫的整塊)</div></div>');

		for (var i = 0 ; i < allSimRow ; i++) {
			$('.rightCtrl .ModuleIndexIs').eq(i).val(i)
		}
	}

	//刪除動作
	function perform_delete() {
		$('.sim-row-delete').click(function() {
			$(this).closest('.sim-row').remove();
		});

	}

	//改變背景顏色動作
	function perform_changeColor() {

		$('.sim-row-changeColor').click(function() {

			var isSlick = $(this).parent('.rightCtrl').siblings('.slick').length === 1 //這個模塊要輪播嗎?
			
			var moreOption = ''
			if (isSlick) {moreOption = '輪播畫面出現幾張：<input class="slidestoshow" value="1" placeholder="請輸入數字" size="20";><br>輪播一次滑動幾張：<input class="slidestoscroll" value="1" placeholder="請輸入數字" size="20";><br>替換圖片漸變時間：<input class="speed" value="300" placeholder="請輸入數字(單位:毫秒)" size="20";><br>每次停留時間：<input class="autoplayspeed" value="2000" placeholder="請輸入數字(單位:毫秒)" size="20";><br>換圖方式：<select class="fade"><option value="false">圖片往左滑</option><option value="true">圖片淡入淡出</option><option value="vertical">圖片上下滑動</option></select><select class="arrows"><option value="false">沒有左右箭頭</option><option value="true">要有左右箭頭</option></select><select class="dots"><option value="false">沒有點點</option><option value="true">要有點點</option></select>'}

			//藍色的按鈕
			$(this).parent().append('<div class="changeColor-box"><div class="sim-edit-box-title">Edit Background</div>換背景色：<input class="changeColor-input-text" type="text" placeholder="請輸入#色碼" size="20";><br>換背景圖：<input class="changeImg-input-text" type="text" placeholder="請輸入url(網址...)" size="20";><br>背景是否固定：<select class="background-attachment"><option value="scroll">不固定(隨滾輪捲動)</option><option value="fixed">固定(不隨滾輪捲動)</option></select><br>限制最大寬度：<input class="maxWidth" placeholder="請輸入寬度px或%" size="20";><br>限制最小高度：<input class="minHeight" placeholder="請輸入高度px" size="20";><br>往下推：<input class="marginBottom" placeholder="註:螢幕寬小於400px失效" size="20";><br>加上特殊樣式：<input class="style" placeholder="多個樣式請用空白分開" size="20";><br>'+moreOption+'<button class="btnOK" id="btnOK">OK</button><button class="btnOK" id="btnCancel">Cancel</button></div>');
			

				$('html, body').animate({scrollTop: $('.changeColor-box').offset().top}, 300);

				/*填入值*/
				var changeColorBox = $(this).next('.changeColor-box')
				var simRow = $(this).closest('.sim-row')

				changeColorBox.find('.changeColor-input-text').val(simRow.css('background-color'))
				changeColorBox.find('.changeImg-input-text').val(simRow.css('background-image'))
				changeColorBox.find('.maxWidth').val(simRow.find('.sim-row-box').css('max-width'))
				changeColorBox.find('.minHeight').val(simRow.css('min-height'))
				changeColorBox.find('.background-attachment').val(simRow.css('background-attachment'))
				changeColorBox.find('.marginBottom').val(simRow.css('margin-bottom'))
				changeColorBox.find('.style').val(simRow.attr('class').replace(/sim-row/,''))

				if (isSlick) {
					var $slick = simRow.children('.slick')
					console.log($slick)
					changeColorBox.find('.speed').val($slick.attr('speed'))
					changeColorBox.find('.autoplayspeed').val($slick.attr('autoplayspeed'))
					changeColorBox.find('.slidestoscroll').val($slick.attr('slidestoscroll'))
					changeColorBox.find('.slidestoshow').val($slick.attr('slidestoshow'))
					console.log($slick.attr('fade'))
					changeColorBox.find('.fade').val($slick.attr('fade'))
					changeColorBox.find('.dots').val($slick.attr('dots'))
					changeColorBox.find('.arrows').val($slick.attr('arrows'))
				}



			$('#btnOK').click(function(){
				$(this).closest('.sim-row').css({
					'background-color': $(this).prevAll('.changeColor-input-text').val(),
					'background-image': $(this).prevAll('.changeImg-input-text').val(),

					'min-height': $(this).prevAll('.minHeight').val(),
					'margin-bottom': $(this).prevAll('.marginBottom').val(),
					'background-attachment': $(this).prevAll('.background-attachment').val()
				});

				if (isSlick) {

					$slick.attr('slidestoshow', $(this).prevAll('.slidestoshow').val())
					$slick.attr('slidestoscroll', $(this).prevAll('.slidestoscroll').val())
					$slick.attr('dots', $(this).prevAll('.dots').val())
					$slick.attr('arrows', $(this).prevAll('.arrows').val())
					console.log($(this).prevAll('.fade').val())
					$slick.attr('fade', $(this).prevAll('.fade').val())
					$slick.attr('autoplayspeed', $(this).prevAll('.autoplayspeed').val())
					$slick.attr('speed', $(this).prevAll('.speed').val())

				}

				$(this).closest('.sim-row').find('.sim-row-box').css({
					'max-width': $(this).prevAll('.maxWidth').val()
				});

				$(this).closest('.sim-row').removeClass().addClass('sim-row ' + $(this).prevAll('.style').val());
				$(this).closest('.changeColor-box').remove();
			})

			$('#btnCancel').click(function(){
				$(this).closest('.changeColor-box').remove();
			})

		})



	}

	//替換順位動作
	function changeIndex() {
		$('.ModuleIndexIs').keyup(function(event) {
			
			if (event.key === 'Enter') {
				var oldIndex = $('.ModuleIndexIs').index( this )
				var all = $('#rwd-builder-area-center-frame-content .sim-row').length
				var val = $(this).val()
				console.log(val)
				if (val >= all) {
					val = all-1
				} 
				if (oldIndex === val) {
					return
				}

				if (oldIndex > val) { // 上移
					$('#rwd-builder-area-center-frame-content .sim-row').eq(val).before( $(this).closest('.sim-row'));
				} else { // 下移
					$('#rwd-builder-area-center-frame-content .sim-row').eq(val).after( $(this).closest('.sim-row'));
				}
					
				
				console.log($(this).closest('.sim-row'))
				var allSimRow = $('#rwd-builder-area-center-frame-content > .sim-row').length
				for (var i = 0 ; i < allSimRow ; i++) {
					$('.rightCtrl .ModuleIndexIs').eq(i).val(i)
				}
			}
		});
	}


	//Inport
	$('#rwd-buttons-impote').click(function() {
		$('#sim-edit-import').fadeIn(500);
		$('#sim-edit-import .sim-edit-box').slideDown(500);
		$('#sim-edit-import .sim-edit-box-buttons-save').on('click',function(){

			var importText = $('#sim-edit-import .text').val();
			if(!/^\s*[<]{1}.*[>]{1}\s*$/m.test(importText)){
				alert('只能匯入Html喔，不行匯入請注意看看是不是HTML碼最前面是否有空格');
				return ;
			}

			//挑選出剛載入的加入class
			$newImportText = $(importText).addClass('new')

			$('#rwd-builder-area-center-frame-content').append($newImportText)
			/* 這裡特別真對PZ的News做資料的調整 */
			var $simRow51 = $('#rwd-builder-area-center-frame-content .sim-row[data-id="5-1"]')
			console.log($simRow51)
			console.log($simRow51.length)
			if ($simRow51.length === 1) {
				$simRow51.prepend('<p class="sim-row-edit" data-type="text" style="line-height: 1.6em;"></p>')
				$simRow51.children('p').css({
					'background-color':$simRow51.attr('data-titlebgcolor'),
					'color':$simRow51.attr('data-titlecolor')
				})
				$simRow51.children('p').html($simRow51.attr('data-title')+'<br>'+$simRow51.attr('data-subtitle'))
			}


			$('#sim-edit-import .text').val('')
			$(this).closest('.sim-edit-box').parent().fadeOut(500)
			$(this).closest('.sim-edit-box').slideUp(500);


			hover_edit($('#rwd-builder-area-center-frame-content>.sim-row.new .sim-row-edit'));
			hover_edit_BG($('#rwd-builder-area-center-frame-content>.sim-row.new [edit_BG]'));
			$('html, body').animate({scrollTop: $('.new').offset().top}, 300);
			$('#rwd-builder-area-center-frame-content>.new').removeClass('new')

			

			
			add_delete();
			perform_delete();
			changeIndex();
			perform_changeColor();
			$('#sim-edit-import .sim-edit-box-buttons-save').off()

		})

		$('#sim-edit-import .sim-edit-box-buttons-cancel').one('click',function(){
			$(this).closest('.sim-edit-box').parent().fadeOut(500)
			$(this).closest('.sim-edit-box').slideUp(500)
			$('#sim-edit-import .sim-edit-box-buttons-save').off()
		})

	})

	//Export 
	$('#rwd-builder-sidebar-buttons-bbutton').click(function() {
		$('#sim-edit-export').fadeIn(500);
		$('#sim-edit-export .sim-edit-box').slideDown(500);

		
		// 複製之前先 整理一下(因為這邊用到高度去判別，如果到export裏面會都扁到)
		// 檢察一下有沒有扁掉的sim-row模塊 扁掉的要移除...(代表為廢碼)
		var allSimRow = $('#rwd-builder-area-center-frame-content .sim-row').length
		for (var i = 0 ; i < allSimRow ; i++) {
			var thisSim = $('#rwd-builder-area-center-frame-content .sim-row').eq(i)
			var thisHighr = thisSim.height()
			console.log(thisHighr)
			if (thisHighr === 0 ) {
				thisSim.addClass('goRemove')
			}
		}
		$('#rwd-builder-area-center-frame-content .goRemove').remove();

		// 因為剛剛有刪除異動了length 所以重抓一次
		allSimRow = $('#rwd-builder-area-center-frame-content > .sim-row').length		
		for (var i = 0 ; i < allSimRow ; i++) {
			$('.rightCtrl .ModuleIndexIs').eq(i).val(i)
		}

		//開始把東西複製進去 然後再逐個刪除不需要的東西
		$('#rwd-preloaded-export').html($('#rwd-builder-area-center-frame-content').html());
		$('#rwd-preloaded-export>#rwd-builder-area-center-frame-content').unwrap();


		$('#rwd-preloaded-export .rightCtrl').remove();
		$('#rwd-preloaded-export .sim-row').removeClass('ui-draggable');

		/* 這裡特別真對PZ的News做資料的調整 */
		var $simRow51 = $('#rwd-preloaded-export .sim-row[data-id="5-1"]')
		console.log($simRow51.length)
		if ($simRow51.length === 1) {
			$simRow51.attr('data-title',$simRow51.children('p').html().split('<br>')[0])
			$simRow51.attr('data-subtitle',$simRow51.children('p').html().split('<br>')[1]?$simRow51.children('p').html().split('<br>')[1]:'')
			$simRow51.attr('data-titlebgcolor',$simRow51.children('p').css('background-color'))
			$simRow51.attr('data-titlecolor',$simRow51.children('p').css('color'))
			$simRow51.children('p').remove()
		}
		


		var imglinkattr = $('#rwd-preloaded-export .sim-row').find('.imglink'),
				imglinklength = $('#rwd-preloaded-export .sim-row').find('.imglink').length;

		for (var i = 0; i <= imglinklength; i++) {
			if(imglinkattr.eq(i).children().length==0){
				imglinkattr.eq(i).remove()
			}
		};

		//$('#rwd-preloaded-export .sim-row-edit').removeAttr('data-type');
		//$('#rwd-preloaded-export .sim-row-edit').removeClass('sim-row-edit');
		//注意 上面這兩個是能夠重複編輯的重要ATTR 如果刪除了再放回本編輯器會不能夠再編輯，所以儲存在資料庫如果不存下去，記得回到編輯器後要加回來

		preload_export_html = $('#rwd-preloaded-export').html();
		//所有內容
		//修正

    preload_export_html = preload_export_html.replace(/style=""/g, '').replace(/max-width:\snone;/g, '').replace(/min-height:\s0px;/g, '').replace(/min-height:\s0px;/g, '').replace(/background-image: url\(&quot;none&quot;\);/g, '').replace(/background-image:\surl\(&quot;&quot;\);/g, '').replace(/padding-top:\s0px;/g, '').replace(/background-color:\srgba\(0,\s0,\s0,\s0\);/g, '').replace(/\s(?=\s)/g, '').replace(/&quot;/g, '')

		$('#sim-edit-export .text').val(preload_export_html);//把值填寫到val內


		$('#rwd-preloaded-export').html(''); //把複製進去的東西挖空

		$('#sim-edit-export .sim-edit-box-buttons-cancel').one('click',function(){
			$(this).closest('.sim-edit-box').parent().fadeOut(500)
			$(this).closest('.sim-edit-box').slideUp(500)
		})
	});
	//Preview
	$('#rwd-builder-sidebar-buttons-Preview').click(function() {


		$('#rwd-preloaded-export').html($('#rwd-builder-area-center-frame-content').html());


		$('#rwd-preloaded-export .rightCtrl').remove();
		$('#rwd-preloaded-export .sim-row').removeClass('ui-draggable');
		$('#rwd-preloaded-export .sim-row-edit').removeAttr('data-type');
		$('#rwd-preloaded-export .sim-row-edit').removeClass('sim-row-edit');

		preload_export_html = $('#rwd-preloaded-export').html();
		//所有內容

		//修正廢碼
		

    preload_export_html = preload_export_html.replace(/style=""/g, '').replace(/max-width:\snone;/g, '').replace(/min-height:\s0px;/g, '').replace(/min-height:\s0px;/g, '').replace(/background-image: url\(&quot;none&quot;\);/g, '').replace(/background-image:\surl\(&quot;&quot;\);/g, '').replace(/padding-top:\s0px;/g, '').replace(/background-color:\srgba\(0,\s0,\s0,\s0\);/g, '').replace(/\s(?=\s)/g, '')


		//$('#sim-edit-export .text').val(preload_export_html);//把值填寫到val內

		var PreviewWindow = window.open('','','resizable=yes,status=yes,scrollbars=yes');
		PreviewWindow.document.write('<link href="_css/rwd-content.css" rel="stylesheet" type="text/css" />'+
			'<link href="_css/reset.css" rel="stylesheet" type="text/css" />'+
			'<link href="_css/slick.css" rel="stylesheet" type="text/css" />'+preload_export_html+
			'<script type="text/javascript" src="https://code.jquery.com/jquery-3.0.0.min.js"></script>'+
			'<script type="text/javascript" src="_scripts/slick.min.js"/></script>'+
			'<script  type="text/javascript">$(".slick").slick({autoplay: true,Speed: 3000,dots: true,fade: true,arrows: false});</script>')



		$('#rwd-preloaded-export').html(' '); //把複製進去的東西挖空
	});

});