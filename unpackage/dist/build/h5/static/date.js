function timeWeekFormat(times) {
	//定义一个日期对象;
	var dateTime = new Date(times);
	//获得系统年份;
	var year = dateTime.getFullYear();
	//获得系统月份;
	var month = dateTime.getMonth() + 1;
	//获得系统当月分天数;
	var day = dateTime.getDate();
	//获得系统小时;
	var hours = dateTime.getHours();
	//获得系统分钟;
	var minutes = dateTime.getMinutes();
	//获得系统秒数;
	var second = dateTime.getSeconds();
	//获得系统星期几;
	var dayCycle = dateTime.getDay();
	//使用数组更改日期样式;
	var dayCycleArray = ["日", "一", "二", "三", "四", "五", "六"];
	for (var i = 0; i < 7; i++) {
		if (dayCycle == i) {
			//将dayCycleArray的数赋值到系统星期几里面中去;
			dayCycle = dayCycleArray[i];
		}
	}
	month < 10 ? month = '0' + month : month;
	hours < 10 ? hours = '0' + hours : hours;
	minutes < 10 ? minutes = '0' + minutes : minutes;
	second < 10 ? second = '0' + second : second;
	//打印完整的系统日期;
	let dateStr = {
		year: year,
		month: month,
		day: day,
		date: year + '-' + month + '-' + day,
		week: dayCycle
	}
	return dateStr;
}

function getBeforeDate(n) {
	var now = new Date();
	var aftertime = new Date(n);
	var year = now.getFullYear();
	var mon = now.getMonth() + 1;
	var day = now.getDate();
	var year_after = aftertime.getFullYear();
	var mon_after = aftertime.getMonth() + 1;
	var day_after = aftertime.getDate();
	var chs = 0;
	//获取当月的天数
	function DayNumOfMonth(Year, Month) {
		return 32 - new Date(Year, Month - 1, 32).getDate();
	}
	if (aftertime.getTime() - now.getTime() < 0) {
		var temp1 = day_after;
		var temp2 = mon_after;
		var temp3 = year_after;
		day_after = day;
		mon_after = mon;
		year_after = year;
		day = temp1;
		mon = temp2;
		year = temp3;
	}
	if (year == year_after) { //不跨年
		if (mon == mon_after) { //不跨年不跨月
			chs += day_after - day;
		} else { //不跨年跨月
			chs += DayNumOfMonth(year, mon) - day + 1; //加上第一个不满的
			for (var i = 1; i < mon_after - mon; i++) {
				chs += DayNumOfMonth(year, mon + i);
			}
			chs += day_after - 1; //加上
		}
	} else { //存在跨年
		chs += DayNumOfMonth(year, mon) - day + 1; //加上开始年份不满的一个月
		for (var m = 1; m < 12 - mon; m++) {
			chs += DayNumOfMonth(year, mon + m);
		}
		for (var j = 1; j < year_after - year; j++) {
			if ((year + j) % 400 == 0 || (year + j) % 4 == 0 && (year + j) % 100 != 0) {
				chs += 366;
			} else {
				chs += 365;
			}
		}
		for (var n = 1; n <= mon_after; n++) {
			chs += DayNumOfMonth(year_after, n);
		}
		chs += day_after - 1;
	}
	if (aftertime.getTime() - now.getTime() < 0) {
		return -chs;
	} else {
		return chs;
	}
}


function formatDate(date) {
	var y = date.getFullYear();
	var m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() +
		1); //获取当前月份的日期，不足10补0
	var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //获取当前几号，不足10补0
	var day = y + "-" + m + "-" + d
	return day
}

module.exports = {
	timeWeekFormat,
	getBeforeDate,
	formatDate
}
