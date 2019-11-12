$(function(){
	var baseUrl = './img/';
	
	var weatherIcons = {
		qing: {
			title: '晴',
			icon: 'qing.png'
		},
		baoyu: {
			title: '暴雨',
			icon: 'baoyu.png'
		},
		daxue: {
			title: '大雪',
			icon: 'daxue.png'
		},
		dayu: {
			title: '大雨',
			icon: 'dayu.png'
		},
		yun: {
			title: '多云',
			icon: 'duoyun.png'
		},
		lei: {
			title: '雷阵雨',
			icon: 'leizhenyu.png'
		},
		wu: {
			title: '雾',
			icon: 'wu.png'
		},
		xue: {
			title: '小雪',
			icon: 'xiaoxue.png'
		},
		yu: {
			title: '小雨',
			icon: 'xiaoyu.png'
		},
		zhongyu: {
			title: '中雨',
			icon: 'zhongyu.png'
		},
		zhongxue: {
			title: '中雪',
			icon: 'zhongxue.png'
		},
		yin: {
			title: '阴',
			icon: 'yin.png'
		},
		yuzhuanqing: {
			title: '雨转晴',
			icon: 'yuzhuanqing.png'
		},
		default:{
			title: '未知',
			icon: ''
		}
	}
	
	function getData(city){
		var data = {
			appid: '64429686',
			appsecret: 'qZJL21ZG',
			version: 'v6',
		};
		
		if(city !== undefined){
			data.city = city;
		}
		
		$.ajax({
			type: 'GET',
			url: 'https://www.tianqiapi.com/api/',
			data: data,
			dataType: 'jsonp',
			success: function(data){
				console.log('data ==> ',data);
				
				$('.location-city').text(data.city);
				
				var weatherData = ['date','week','tem','air_level','tem1','tem2','win','win_speed','humidity','air_tips'];
				for(var i = 0;i < weatherData.length;i++){
					if(weatherData[i] === 'wea'){
						$('.' + weatherData[i]).css({
							backgroundImage: 'url(' + baseUrl + (weatherIcons[data.wea_img] == undefined ? weatherIcons.default : weatherIcons[data.wea_img]).icon + ')',
						});
					}else{
						$('.' + weatherData[i]).text(data[weatherData[i]]);
					}
				}
				
				var params = {
					appid: '64429686',
					appsecret: 'qZJL21ZG',
					version: 'v9',
				};
				
				if(city !== undefined){
					params.city = city;
				}
				
				$.ajax({
					type: 'GET',
					url: 'https://www.tianqiapi.com/api/',
					data: params,
					dataType: 'jsonp',
					success: function(params){
						console.log("params ==> ",params);
						
						var hoursData = params.data[0].hours;
						$.each(hoursData,function(i,v){
							var $li = $(`<li>
								<div>${v.hours}</div>
								<div class="hour-icon" style="background-image: url('${baseUrl + (weatherIcons[v.wea_img] == undefined ? weatherIcons.default : weatherIcons[v.wea_img]).icon}')"></div>
								<div>${v.tem}℃</div>
								<div>${v.win}</div>
							</li>`);
							$('.hour-wea').append($li);
						})
						
						var futureData = params.data.slice(1);
						
						console.log('futureData ==>',futureData);
						
						$.each(futureData,function(i,v){
							var $li = $(`<li class="clearfix">
								<span class="f-date">${v.day}</span>
								<span class="future-icon" style="background-image: url('${baseUrl + (weatherIcons[v.wea_img] == undefined ? weatherIcons.default : weatherIcons[v.wea_img]).icon}')"></span>
								<span class="f-tem">${v.tem2 + '℃ ~ ' + v.tem1 + '℃'}</span>
							</li>`)
							$('.future-wea').append($li);
						})
					}
				})
			}
		})
	}
	getData();
	
	$('.search-icon').click(function(){
		var city = $('.search-inp').val();
		if(city == undefined || city.trim() == ''){
			return;
		}
		console.log(city);
		$('.hour-wea,.future-wea').empty();
		getData(city);
	})
})
