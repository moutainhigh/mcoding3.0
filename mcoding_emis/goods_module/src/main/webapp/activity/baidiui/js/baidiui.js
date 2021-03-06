// JavaScript Document
/*同步刷新*/
//document.write("<script language='javascript' src='http://127.0.0.1:81/_/js/reloader.js'></script>");
//resize
(function($, h, c) {
	var a = $([]),
		e = $.resize = $.extend($.resize, {}),
		i, k = "setTimeout",
		j = "resize",
		d = j + "-special-event",
		b = "delay",
		f = "throttleWindow";
	e[b] = 250;
	e[f] = true;
	$.event.special[j] = {
		setup: function() {
			if (!e[f] && this[k]) {
				return false
			}
			var l = $(this);
			a = a.add(l);
			$.data(this, d, {
				w: l.width(),
				h: l.height()
			});
			if (a.length === 1) {
				g()
			}
		},
		teardown: function() {
			if (!e[f] && this[k]) {
				return false
			}
			var l = $(this);
			a = a.not(l);
			l.removeData(d);
			if (!a.length) {
				clearTimeout(i)
			}
		},
		add: function(l) {
			if (!e[f] && this[k]) {
				return false
			}
			var n;

			function m(s, o, p) {
				var q = $(this),
					r = $.data(this, d);
				r.w = o !== c ? o : q.width();
				r.h = p !== c ? p : q.height();
				n.apply(this, arguments)
			}
			if ($.isFunction(l)) {
				n = l;
				return m
			} else {
				n = l.handler;
				l.handler = m
			}
		}
	};

	function g() {
		i = h[k](function() {
			a.each(function() {
				var n = $(this),
					m = n.width(),
					l = n.height(),
					o = $.data(this, d);
				if (m !== o.w || l !== o.h) {
					n.trigger(j, [o.w = m, o.h = l])
				}
			});
			g()
		}, e[b])
	}
})(jQuery, this);

//hover延时
$.fn.hoverDelay = function(options) {
	var defaults = {
		hoverDuring: 200,
		outDuring: 200,
		hoverEvent: function() {
			$.noop();
		},
		outEvent: function() {
			$.noop();
		}
	};
	var sets = $.extend(defaults, options || {});
	var hoverTimer, outTimer;
	return $(this).each(function() {
		$(this).hover(function() {
			clearTimeout(outTimer);
			hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
		}, function() {
			clearTimeout(hoverTimer);
			outTimer = setTimeout(sets.outEvent, sets.outDuring);
		});
	});
};


//图片处理
$.fn.buijs_img = function(options) {

	$(this).each(function() {
		var _box = $(this);
		var _img = _box.children('img');
		//使用标签
		if (_box.attr('data-bui_img') != undefined) {
			var _data_center, _data_lazy, _data_alt, _data_hover
			_data_center = _box.data('bui_img').center || 'cut';
			_data_alt = _box.data('bui_img').alt || false;
			_data_hover = _box.data('bui_img').hover || false;
		}
		//不使用标签
		if (_box.attr('data-bui_img') == undefined) {
			_box.css({
				'display': 'block',
				'overflow': 'hidden'
			});
			var defaults = {
				center: false,
				alt: false,
				hover: false
			};
		}
		var sets = $.extend(defaults, options);
		var _center = _data_center || sets.center
		var _alt = _data_alt || sets.alt
		var _hover = _data_hover || sets.hover

		//使用lazyload
		if (_img.attr('data-src') && !_img.attr('src')) {
			buijs_img_lazy(_box, _img, _center);
		};
		if (!_img.attr('data-src') && _img.attr('src')) {
			buijs_img_c(_box, _img, _center);
			_img.load(function() {
				buijs_img_c(_box, _img, _center);
			})

		};


		//窗口尺寸
		$(window).resize(function() {
			buijs_img_c(_box, _img, _center);
		});
		//鼠标经过效果
		if (_hover != false) {
			buijs_img_hover(_box, _img, _hover);
		};
		//显示alt
		if (_alt != false) {
			buijs_img_alt(_box, _img, _alt);
		};

	});

	//lazyload
	function buijs_img_lazy(_box, _img, _center) {
		//使用lazy
		_img.lazyload({
			threshold: 0,
			failure_limit: 100,
			data_attribute: "src",
			placeholder: "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
			effect: "show",
			skip_invisible: true,
			load: function() {
				buijs_img_c(_box, _img, _center);
			}
		});
	};
	//center开启
	function buijs_img_c(_box, _img, _center) {
		var _box_w = _box.width(),
			_box_h = _box.height(),
			_box_p = _box_w / _box_h,
			_img_w = _img.width(),
			_img_h = _img.height(),
			_img_p = _img_w / _img_h;
		//裁剪
		if (_center == 'cut') {
			//水平裁剪
			if (_img_p >= _box_p) {
				_img.css({
					'width': 'auto',
					'height': _box_h + 'px'
				});
				_img_w = _img.width();
				_img.css({
					'margin-top': '0px',
					'margin-left': [_box_w - _img_w] / 2
				});
			};
			//垂直裁剪
			if (_img_p < _box_p) {
				_img.css({
					'width': _box_w + 'px',
					'height': 'auto',
				});
				_img_h = _img.height();
				_img.css({
					'margin-top': [_box_h - _img_h] / 2,
					'margin-left': '0px'
				});
			};
		};
		//匹配
		if (_center == 'inside') {
			//水平居中
			if (_box_p >= _img_p) {
				_img.css({
					'width': 'auto',
					'height': _box_h
				});
				_img_w = _img.width();
				_img.css({
					'margin-top': '0px',
					'margin-left': [_box_w - _img_w] / 2
				});
			};
			//垂直居中
			if (_box_p < _img_p) {
				_img.css({
					'width': _box_w,
					'height': 'auto'
				});
				_img_h = _img.height();
				_img.css({
					'margin-top': [_box_h - _img_h] / 2,
					'margin-left': '0px'
				});
			};
		}
		//显示图片;
		_img.css({
			'opacity': '1'
		});
	};

	//hover开启
	function buijs_img_hover(_box, _img, _hover) {
		_img.css({
			'transition': 'transform 0.3s',
			'-webkit-transition': 'transform 0.3s',
			'-moz-transition': 'transform 0.3s'

		});


		if (_hover == 'out') {
			_img.css('transform', 'scale(1)');
			//PC
			if ($('body').hasClass('bui_body_lg') || $('body').hasClass('bui_body_md')) {
				_box.hover(function() {
					_img.css('transform', 'scale(1.1)');
				}, function() {
					_img.css('transform', 'scale(1)');
				});
				_box.parents('a').hover(function() {
					_img.css('transform', 'scale(1.1)');
				}, function() {
					_img.css('transform', 'scale(1)');
				});
			};
			//移动
			if ($('body').hasClass('bui_body_sm')) {
				_box.on({
					'touchstart': function() {
						_img.css('transform', 'scale(1.1)');
					},
					'touchend': function() {
						_img.css('transform', 'scale(1)');
					}
				});
			};

		};
		if (_hover == 'in') {
			_img.css('transform', 'scale(1.1)');
			//PC
			if ($('body').hasClass('bui_body_lg') || $('body').hasClass('bui_body_md')) {
				_box.hover(function() {
					_img.css('transform', 'scale(1)');
				}, function() {
					_img.css('transform', 'scale(1.1)');
				});
				_box.parents('a').hover(function() {
					_img.css('transform', 'scale(1)');
				}, function() {
					_img.css('transform', 'scale(1.1)');
				});
			};
			//移动
			if ($('body').hasClass('bui_body_sm')) {
				_box.on({
					'touchstart': function() {
						_img.css('transform', 'scale(1)');
					},
					'touchend': function() {
						_img.css('transform', 'scale(1.1)');
					}
				});
			};
		};

	};
	//显示alt
	function buijs_img_alt(_box, _img, _alt) {
		var _alttext = _img.attr('alt');
		if (_alttext != '' && _alttext != undefined) {
			_box.append("<div class='bui_img_alt'><p>" + _alttext + "</p></div>");
			_box.css({
				'position': 'relative'
			});
			_box.children('.bui_img_alt').css({
				'width': '100%',
				'padding': '0.5em 1em',
				'background-color': 'rgba(0,0,0,0.48)',
				'color': '#fff',
				'position': 'absolute',
				'top': '-100%',
				'left': '-100%',
				'transition': 'all 0.3s',
				'-webkit-transition': 'all 0.3s',
				'-moz-transition': 'all 0.3s'
			});
			//下
			if (_alt == 'bottom') {
				_box.children('.bui_img_alt').css({
					'top': 'auto',
					'bottom': '0px',
					'left': '0px',
					'transform': 'translateY(100%)'
				});
				//PC
				if ($('body').hasClass('bui_body_lg') || $('body').hasClass('bui_body_md')) {
					_box.hover(function() {
						_box.children('.bui_img_alt').css({
							'transform': 'translateY(0)'
						});
					}, function() {
						_box.children('.bui_img_alt').css({
							'transform': 'translateY(100%)'
						});
					});
				};
				//移动
				if ($('body').hasClass('bui_body_sm')) {
					_box.on({
						'touchstart': function() {
							_box.children('.bui_img_alt').css({
								'transform': 'translateY(0)'
							});
						},
						'touchend': function() {
							_box.children('.bui_img_alt').css({
								'transform': 'translateY(100%)'
							});
						}
					});
				};
			};
			//上
			if (_alt == 'top') {
				_box.children('.bui_img_alt').css({
					'top': '0px',
					'bottom': 'auto',
					'left': '0px',
					'transform': 'translateY(-100%)'
				});
				//PC
				if ($('body').hasClass('bui_body_lg') || $('body').hasClass('bui_body_md')) {
					_box.hover(function() {
						_box.children('.bui_img_alt').css({
							'transform': 'translateY(0)'
						});
					}, function() {
						_box.children('.bui_img_alt').css({
							'transform': 'translateY(-100%)'
						});
					});
				};
				//移动
				if ($('body').hasClass('bui_body_sm')) {
					_box.on({
						'touchstart': function() {
							_box.children('.bui_img_alt').css({
								'transform': 'translateY(0)'
							});
						},
						'touchend': function() {
							_box.children('.bui_img_alt').css({
								'transform': 'translateY(-100%)'
							});
						}
					});
				};
			};
		};

	};
};

/*滚动*/
$.fn.buijs_fixed = function(options) {

	$(this).each(function() {
		var _box = $(this);
		var _item = _box.find('.bui_fixed_item');


		//使用标签
		if (_box.attr('data-bui_fixed') != undefined) {
			var _data_top = _box.data('bui_fixed').top;
			var _data_topstop = _box.data('bui_fixed').topstop;
			var _data_bottom = _box.data('bui_fixed').bottom;
			var _data_zindex = _box.data('bui_fixed').zindex;
			var _data_scroll = _box.data('bui_fixed').scroll;
		};
		//使用js
		var defaults = {
			top: 'false',
			topstop: 'false',
			bottom: 'false',
			zindex: 1,
			scroll: 'false'
		};
		var sets = $.extend(defaults, options);

		var _top = _data_top || sets.top;
		var _topstop = _data_topstop || sets.topstop;
		var _bottom = _data_bottom || sets.bottom;
		var _zindex = _data_zindex || sets.zindex;
		var _scroll = _data_scroll || sets.scroll;

		//滚动活动
		buijs_fixed_function(_top, _topstop, _bottom, _zindex, _scroll);
		$(window).on({
			'scroll': function() {
				buijs_fixed_function(_top, _topstop, _bottom, _zindex, _scroll);
			},
			'resize': function() {
				buijs_fixed_function(_top, _topstop, _bottom, _zindex, _scroll);
			}
		});
		//滚动活动
		function buijs_fixed_function(_top, _topstop, _bottom, _zindex, _scroll) {
			var _win_t = parseFloat($(window).scrollTop());
			var _win_h = parseFloat($(window).height());
			var _box_t = parseFloat(_box.offset().top) + parseFloat(_box.css('padding-top'));
			var _box_l = parseFloat(_box.offset().left) + parseFloat(_box.css('padding-left'));
			var _box_w = parseFloat(_box.width());
			var _item_h = parseFloat(_item.height());
			var _box_h = parseFloat(_box.parent().height()) + parseFloat(_box.parent().css('margin-top')) + parseFloat(_box.parent().css('margin-bottom')) + parseFloat(_box.parent().css('padding-top')) + parseFloat(_box.parent().css('padding-bottom'));


			//顶部固定
			if (_top != 'false' && _bottom == 'false') {
				//顶部
				if (_win_t < _box_t - _top) {
					_item.css({
						'position': 'static',
						'z-index': _zindex,
						'width': 'auto',
						'top': 'auto',
						'left': 'auto'
					});
				};
				//滚动
				if (_win_t >= _box_t - _top) {
					_item.css({
						'position': 'fixed',
						'z-index': _zindex,
						'width': _box_w + 'px',
						'top': _top + 'px',
						'left': _box_l + 'px'
					});
				};
				//到达底部
				if (_topstop != 'false') {

					if (_win_t > _box_t + _box_h - _item_h - _top - _topstop) {
						_item.css({
							'position': 'absolute',
							'z-index': _zindex,
							'width': _box_w,
							'top': _box_t + _box_h - _item_h - _topstop + 'px',
							'left': _box_l + 'px'
						});
					}
				};
			};

			//底部固定
			if (_top == 'false' && _bottom != 'false') {
				//到达顶部
				if (_win_t - _bottom < _box_t + _item_h - _win_h) {
					_item.css({
						'position': 'static',
						'z-index': _zindex,
						'width': _box_w + 'px',
						'top': 'auto',
						'bottom': 'auto',
						'left': _box_l + 'px'
					});
				};
				//滚动中
				if (_win_t - _bottom >= _box_t + _item_h - _win_h) {
					_item.css({
						'position': 'fixed',
						'z-index': _zindex,
						'width': _box_w + 'px',
						'left': _box_l + 'px',
						'top': 'auto',
						'bottom': _bottom + 'px',

					});
				};
				//到达底部
				if (_win_t >= _box_t + _box_h - _win_h) {
					_item.css({
						'position': 'absolute',
						'z-index': _zindex,
						'width': _box_w + 'px',
						'left': _box_l + 'px',
						'top': _box_h + _box_t - _item_h - _bottom + 'px',
						'bottom': 'auto'
					});
				};
			};

			//内部滚动
			if (_scroll != 'false') {
				_item.hoverDelay({
					hoverEvent: function() {
						_item.css({
							'height': _win_h - _top,
							'overflow-y': 'auto'
						});
					},
					outEvent: function() {
						_item.css({
							'overflow-y': 'hidden'
						});
					}
				})

				//				_item.bind({
				//					'DOMMouseScroll': function(e) {
				//						e.preventDefault();
				//						var _tst = _item.scrollTop();
				//						var _ewt = e.originalEvent.detail;
				//						if (_ewt > 0) {
				//							_item.scrollTop(_tst + _ewt);
				//						}
				//						if (_ewt < 0) {
				//
				//							_item.scrollTop(_tst + _ewt);
				//						}
				//					}
				//				});
			};
		};
	});
};

/*锚链接动画*/
$.fn.buijs_anchor = function(options) {
	$(this).each(function(e) {
		var _t = $(this);
		var _url = _t.attr('href');
		var _data_top = _t.data('bui_anchor').top || 0
		_t.on({
			'click': function(e) {
				e.preventDefault();
				var _target = $(_url).offset().top || '0';

				$('html,body').animate({
					scrollTop: _target - _data_top + 'px'
				});
			}
		})
	});
};

/*操作变换*/
$.fn.buijs_mask = function() {
	$(this).each(function() {
		var _t = $(this);
		var _i = _t.children('li');
		var _data_event = _t.data('bui_mask').event || 'hover';
		var _data_show = _t.data('bui_mask').show || '0';
		var _data_back = _t.data('bui_mask').back || 'true';
		var _event = _data_event;
		var _show = _data_show;
		var _back = _data_back;

		//初始化
		buijs_mask_defautl();

		//操作
		if (_event == 'click') {
			_i.on({
				'click': function() {
					buijs_mask_active($(this));
				}
			});
		}
		if (_event == 'hover') {
			_i.each(function() {
				var _i = $(this);
				_i.hoverDelay({
					hoverEvent: function() {
						buijs_mask_active(_i);
					}
				});
				if (_back == 'true') {
					_t.hoverDelay({
						outEvent: function() {
							buijs_mask_defautl();
						}
					})
				};
			});
		}
		if (_event == 'tap') {
			_i.on({
				'touchend': function() {
					buijs_mask_active($(this));
				}
			});
		}

		//初始化
		function buijs_mask_defautl() {
			_i.children('.bui_mask_show').show();
			_i.children('.bui_mask_hide').hide();
			_i.eq(_show).children('.bui_mask_hide').show();
			_i.eq(_show).children('.bui_mask_show').hide();
		};

		//活动
		function buijs_mask_active(_i) {
			var _s = _i.children('.bui_mask_show');
			var _h = _i.children('.bui_mask_hide');
			var _os = _i.siblings('li').children('.bui_mask_show');
			var _oh = _i.siblings('li').children('.bui_mask_hide');
			_s.hide();
			_h.show(0, function() {
				$(this).find($('[data-bui_img]')).buijs_img();
			});
			_oh.hide();
			_os.show(0, function() {
				$(this).find($('[data-bui_img]')).buijs_img();
			});
		};
	});
};

/*模拟弹窗*/
function buijs_modal(options) {
	var defaults = {
		positions: 'auto',
		title: '提示',
		content: '<div class="bui_m_24 bui_ta_c bui_fas_24 bui_fac_lgray"><i class="fa fa-circle-o-notch fa-spin"></i></div>',
		width: '320px',
		ajaxload: ''
	};
	var setting = $.extend(defaults, options);
	if (setting.positions == 'auto') {
		if ($('body').hasClass('bui_body_lg') || $('body').hasClass('bui_body_md')) {
			setting.positions = 'center'
		}
		if ($('body').hasClass('bui_body_sm')) {
			setting.positions = 'top'
		}

	}
	if (setting.positions == 'bottom' || setting.positions == 'top') {
		setting.width = '100%'
	}
	$('body').append('<div class="bui_mask_64"></div><div class="bui_modal ' + setting.positions + '" style="width:' + setting.width + ';"><div class="bui_modal_h"><span>' + setting.title + '</span><i class="fa fa-close"></i></div><div class="bui_modal_b">' + setting.content + '</div></div>');

	buijs_modal_open();

	if (setting.ajaxload != '' && setting.ajaxload != undefined) {
		setTimeout(function() {
			$('.bui_modal_b').load(setting.ajaxload, function() {
				buijs_modal_open();
			});
		}, 1000);

	};

	$('.bui_mask_64,.bui_modal .fa-close').on({
		'click': function() {
			buijs_modal_close()
		}
	});


	function buijs_modal_open() {

		var _WW = $(window).width();
		var _WH = $(window).height();
		$('.bui_mask_64').fadeIn(100);
		$('.bui_modal').show(0, function() {
			if ($(this).hasClass('center')) {
				$('.bui_modal').css({
					'left': [
						[_WW - $('.bui_modal').width()] / 2
					] + 'px',
					'top': [
						[_WH - $('.bui_modal').height()] / 2
					] + 'px'
				});
			};

			if ($(this).hasClass('bottom')) {
				$('.bui_modal').css({
					'left': '0px',
					'bottom': '0px',
				});
			};
			if ($(this).hasClass('top')) {
				$('.bui_modal').css({
					'left': '0px',
					'top': '0px',
				});
			};
			$('.bui_modal').addClass('active');
		});
		$('html').css({
			'overflow': 'hidden',
			'padding-right': '16.5px'
		})
	};


};

function buijs_modal_close() {
	$('.bui_modal').removeClass('active');
	$('.bui_mask_64').fadeOut(300, function() {
		$('.bui_modal,.bui_mask_64').remove();
	});
	$('html').css({
		'overflow': 'auto',
		'padding-right': '0'
	})
};

/*公用标签*/
function buijs_tips() {

	$('[data-bui_tips]').each(function(options) {
		var _T = $(this);
		var _B = $('#' + _T.data('bui_tips').name);
		var _BW = _T.data('bui_tips').width;
		var _A = _B.find('.bui_arrow');
		var _Position = _T.data('bui_tips').position;
		var _Url = _T.data('bui_tips').url;
		var _Event = _T.data('bui_tips').event;
		var _Am = _T.data('bui_tips').am;
		if (_BW != undefined) {
			_B.css({
				'width': _BW
			});
		} else {
			_B.css({
				'width': 320
			});
		};

		function bui_tips_open() {
			var _TL = _T.offset().left;
			var _TT = _T.offset().top;
			var _TW = _T.width();
			var _TH = _T.height();
			var _BW = _B.width();
			var _BH = _B.height();

			if (_Url != undefined) {
				_B.load(_Url);
			};
			if (_Position.indexOf('left') > -1) {
				_B.css({
					'left': _TL
				});
			};
			if (_Position.indexOf('right') > -1) {
				_B.css({
					'left': _TL + _TW - _BW
				});
			};
			if (_Position.indexOf('bottom') > -1) {

				_B.css({
					'top': _TT + _TH
				});
			};
			if (_Position.indexOf('top') > -1) {
				_B.css({
					'top': _TT - _BH
				});
			};
			if (_Position.indexOf('center') > -1) {
				_B.css({
					'left': _TL + (_TW / 2) - (_BW / 2)
				});
			};
			if (_Position.indexOf('autow') > -1) {
				var _AL = _T.parents('.bui_auto_w').offset().left;
				var _AW = _T.parents('.bui_auto_w').width();
				_B.css({
					'left': _AL,
					'width': _AW
				});
			};

			if (_Am == '' || _Am == undefined) {
				_B.fadeIn(100).addClass('open');
			};
			if (_Am == 'slide') {
				_B.slideDown(100).addClass('open');
			};
		};

		function bui_tips_close() {
			_B.removeClass('Center', 'Left', 'Right', 'Top', 'Bottom');
			if (_Am == '' || _Am == undefined) {
				_B.fadeOut(100).removeClass('open');
			};
			if (_Am == 'slide') {
				_B.slideUp(100).removeClass('open')
			};
		};
		if (_Event == 'hover' || _Event == '' || _Event == undefined) {
			_T.hoverDelay({
				hoverEvent: function() {
					bui_tips_open();
				},
				outEvent: function() {
					bui_tips_close()
				}
			});
		};
		if (_Event == 'tap') {
			_T.on({
				'touchend': function(e) {
					if (_B.hasClass('open')) {
						bui_tips_close();
					} else {
						bui_tips_open();
					};
				}
			});
		};

	});
};

//公共用tab
$.fn.buijs_tab = function() {
	$(this).each(function() {
		var _nav = $(this);
		var _box = $('#' + _nav.data('bui_tab').target);
		var _data_event = _nav.data('bui_tab').event || 'click';

		var _event = _data_event;

		//初始化
		buijs_tab_default(_nav, _box);

		//操作
		if (_event == 'click') {
			_nav.children('*').click(function() {
				var _t = $(this);
				buijs_tab_active(_t, _box);
			});
		};
		if (_event == 'hover') {
			_nav.children('*').each(function() {
				var _t = $(this);
				_t.hoverDelay({
					hoverEvent: function() {
						buijs_tab_active(_t, _box);
					}
				});
			});
		};

		//初始化
		function buijs_tab_default(_nav, _box) {
			//初始化
			_nav.children('*:first').addClass('active').siblings('*').removeClass('active');
			_box.children('*').hide();
			_box.children('*:first').show();
		};
		//活动
		function buijs_tab_active(_t, _box) {
			var _index = _t.index();
			_t.addClass('active').siblings('*').removeClass('active');
			_box.children('*:eq(' + _index + ')').show(0, function() {
				$(this).find('[data-bui_img]').buijs_img();
			}).siblings('*').hide();

		};
	});
};
/*共用tab*/
function buijs_tab() {
	$('[data-bui_tab]').each(function(e) {
		var _T = $(this);
		var _Target = _T.data('bui_tab').target;
		var _B = $('#' + _Target)
		var _Event = _T.data('bui_tab').event;
		_T.children().first().addClass('active');
		_B.children().first().addClass('active');
		if (_Event == 'hover') {
			_T.children().on({
				'hover': function() {
					var _Index = $(this).index();
					$(this).addClass('active').siblings().removeClass('active');
					_B.children().eq(_Index).addClass('active').siblings().removeClass('active');
					_B.children().eq(_Index).find('img').AutoCenter();
				}
			});
		};
		if (_Event == 'click') {
			_T.children().on({
				'click': function() {
					var _Index = $(this).index();
					$(this).addClass('active').siblings().removeClass('active');
					_B.children().eq(_Index).addClass('active').siblings().removeClass('active');
					_B.children().eq(_Index).find('img').AutoCenter();
				}
			});
		};
		if (_Event == 'touch') {
			_T.children().on({
				'touchstart': function(e) {
					$(this).addClass('hover');
					e.preventDefault();
				},
				'touchend': function(e) {
					var _Index = $(this).index();
					$(this).removeClass('hover');
					$(this).addClass('active').siblings().removeClass('active');
					_B.children().eq(_Index).addClass('active').siblings().removeClass('active');
					_B.children().eq(_Index).find('img').AutoCenter();
					e.preventDefault();
				}
			});
		};
	});
};

/*判断窗口宽度*/
function bui_auto_w() {
	var _WW = $(window).width();

	if (_WW >= 1440) {
		$('body').addClass('bui_body_lg').removeClass('bui_body_md bui_body_sm');
	}
	if (_WW < 1440 && _WW >= 641) {
		$('body').addClass('bui_body_md').removeClass('bui_body_lg bui_body_sm');
	}
	if (_WW <= 640) {
		$('body').addClass('bui_body_sm').removeClass('bui_body_lg bui_body_md');
	}
};

//幻灯片
$.fn.buijs_swiper = function(options) {
	var _i = 0
	$(this).each(function() {
		var _t = $(this);
		if (_t.attr('data-bui_swiper')) {
			var _data_nav = _t.data('bui_swiper').nav;
			var _data_btn = _t.data('bui_swiper').btn;
			var _data_play = _t.data('bui_swiper').play;
			var _data_speed = _t.data('bui_swiper').speed;
			var _data_loop = _t.data('bui_swiper').loop;
			var _data_effect = _t.data('bui_swiper').effect;
		} else {
			_t.addClass('bui_swiper')
		};
		var defaults = {
			nav: 'true',
			btn: 'true',
			play: 0,
			speed: 300,
			loop: 'true',
			effect: 'slide'
		};
		var sets = $.extend(defaults, options);

		var _nav = _data_nav || sets.nav;
		var _btn = _data_btn || sets.btn;
		var _play = _data_play || sets.play;
		var _speed = _data_speed || sets.speed;
		var _loop = _data_loop || sets.loop;
		var _effect = _data_effect || sets.effect;


		if (_nav == 'true') {
			_t.append('<div class="nav" id="navno' + _i+++'"></div>');
			var _navno = '#' + _t.find('.nav').attr('id');
		}
		if (_btn == 'true') {
			_t.append('<a href="javascript:;" class="bui_btn_48 bui_btnsq swiperbtn_prev bui_hide_sm"><i class="fa fa-angle-left"></i></a><a href="javascript:;" class="bui_btn_48 bui_btnsq swiperbtn_next bui_hide_sm"><i class="fa fa-angle-right"></i></a>');
		};

		var mySwiper = _t.swiper({
			wrapperClass: 'box',
			slideClass: 'item',
			pagination: _navno,
			bulletClass: 'nav_item',
			bulletActiveClass: 'active',
			initialSlide: 0,
			direction: 'horizontal',
			setWrapperSize: true,
			loop: _loop,
			grabCursor: true,
			autoplay: parseInt(_play),
			speed: parseInt(_speed),
			autoplayDisableOnInteraction: false,
			effect: _effect,
			onInit: function(swiper) {
				_t.find('[data-bui_img]').buijs_img();
			},
		});
		_t.children('.swiperbtn_prev').click(function() {
			mySwiper.slidePrev();
		});
		_t.children('.swiperbtn_next').click(function() {
			mySwiper.slideNext();
		});

	});
};

$(document).ready(function() {
	/*判断窗口宽度*/
	bui_auto_w();
	/*公用标签*/
	buijs_tips();
	/*共用tab*/
	$('[data-bui_tab]').buijs_tab();
	//新图片处理
	$('[data-bui_img]').buijs_img();
	//滚动固定
	$('[data-bui_fixed]').buijs_fixed();
	//幻灯片 低版本IE不执行
	if (!+[1, ]) {} else {
		$('[data-bui_swiper]').buijs_swiper();
	};

	//锚链接
	$('[data-bui_anchor]').buijs_anchor();
	//锚链接
	$('[data-bui_mask]').buijs_mask();
	//滑屏
	$('[data-pageswiper]').each(function() {
		var _T = $(this);
		var _Name = _T.data('pageswiper').name;
		var _Url = _T.data('pageswiper').url;
		_T.click(function() {
			$('body').append('<div class="PageSwiper bui_bgc_lgray" id="' + _Name + '"><div class="PageSwiperInset"></div></div>');
			var _Box = $('#' + _Name);
			_Box.find('.PageSwiperInset').load(_Url, function() {

				$('body').css({
					'overflow': 'hidden'
				});
				_Box.addClass('Open');

				$('.PageSwiperHeader .bui_mediaLeft').click(function() {
					$('body').css({
						'overflow': 'auto'
					});
					_Box.removeClass('Open');
				});
			});
		});
	});

	//内容图片处理
	$('.bui_content').each(function() {
		$(this).find('p:has(img)').css({
			'text-align': 'center',
			'text-indent': '0px'
		});
		$(this).find('img').lazyload({
			effect: 'fadeIn',
			failurelimit: 10,
		});
	});


	/*锚链接*/
	$('[data-scroll-link]').click(function() {
		var _Name = $(this).attr('data-scroll-link');
		var _WT = $('[data-scroll-name="' + _Name + '"]').offset().top;
		$('html,body').animate({
			scrollTop: _WT
		});
	});


	/*按钮相关*/
	$('[class*=bui_btn_],[class*=bui_btng_] > *').each(function() {
		var _T = $(this);
		_T.on({
			'mousedown': function() {
				_T.addClass('active')
			},
			'mouseup': function() {
				_T.removeClass('active')
			}
		})
	});
});


$(window).scroll(function() {
	/*滚动监听*/
	$('[data-scroll-name]').each(function() {
		var _T = $(this);
		var _TT = _T.offset().top;
		var _TB = _TT + _T.height();
		var _WT = $(window).scrollTop();
		var _Name = _T.attr('data-scroll-name');
		if (_WT >= _TT - 24 && _WT < _TB) {
			$('[data-scroll-link="' + _Name + '"]').parents('li').addClass('Active');
		} else {
			$('[data-scroll-link="' + _Name + '"]').parents('li').removeClass('Active');
		}
	});
});
$('body,html').resize(function() {
	/*判断窗口宽度*/
	bui_auto_w();
});