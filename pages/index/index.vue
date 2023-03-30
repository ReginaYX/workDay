<template>
	<view class="content">
		<text class="top" space="emsp">
			今天{{nowObj.date}} 周{{nowObj.week}}咯
		</text>
		<view class="formBox">
			<view class="cu-form-group">
				<view class="title">上班日期</view>
				<picker mode="date" :value="form.work" start="2023-03-31" @change="bindDateChange">
					<view class="picker">
						{{form.work}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">周期</view>
				<input placeholder="上班周期" :value="form.period" maxlength="2" type="number" @blur="changePeriod"></input>
			</view>
			<!-- <button class="cu-btn block bg-gradual-blue margin-tb-sm lg">查询</button> -->
		</view>
		<view class="margin-tb-sm lg">
			<uni-calendar :insert="true" :lunar="true" :selected="selected" @change="change" />
		</view>
	</view>
</template>

<script>
	import date from "@/static/date.js"
	export default {
		data() {
			return {
				nowObj: {},
				form: {
					work: '',
					period: 6
				},
				selected: [{
					date: '2023-03-30', // date为所需要打点的日期
					type: "rest" // abnormal显示为橙色点
				}]
			}
		},
		onLoad() {
			// this.nowObj = date.timeWeekFormat(new Date())
			// this.form.work = this.nowObj.date
			// // this.searchRest()
			// this.loopPeriod()
		},
		onShow() {
			this.nowObj = date.timeWeekFormat(new Date())
			this.form.work = '2023-03-30'
			// this.searchRest()
			this.loopPeriod()
		},
		methods: {
			bindDateChange(e) {
				this.form.work = e.detail.value
				this.loopPeriod()
			},
			change(e) {
				// this.form.work = e.fulldate
				console.log(e)
			},
			changePeriod(e) {
				this.form.period = e.detail.value
				this.loopPeriod()
			},
			searchRest(date) {
				let arr = []
				var dd = date;
				// console.log(this.form.work + 6*l)
				for (let i = 0; i < this.form.period; i++) {
					dd.setDate(dd.getDate() + 1); //获取AddDayCount天后的日期
					var y = dd.getFullYear();
					var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0
					var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
					console.log(y + "-" + m + "-" + d)

					this.selected.push({
						date: y + "-" + m + "-" + d, // date为所需要打点的日期
						type: "rest" // abnormal显示为橙色点
					})
				}
				// this.selected.push(arr)
				// this.loopPeriod(arr)
			},
			loopPeriod(arr) {
				uni.showLoading()
				this.selected = []
				for (let l = 0; l < 60; l++) {
					var date = new Date(this.form.work);
					date.setDate(date.getDate() + this.form.period * l);
					if (l % 2 == 0) {
						this.searchRest(date)
						// var y = date.getFullYear();
						// var m = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() +
						// 1); //获取当前月份的日期，不足10补0
						// var d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //获取当前几号，不足10补0
						// console.log(y + "-" + m + "-" + d)
					} else {
						continue
					}
				}
				uni.hideLoading()
				// this.selected = arr
			}
		}
	}
</script>

<style>
	.top {
		font-size: 30upx;
		margin: 20upx 30upx;
		display: block;
	}

	input {
		text-align: right;
	}

	.cu-btn {
		width: calc(100vw - 60upx);
		margin: 40upx 30upx;
	}

	.uni-calendar-item__weeks-box-item:nth-child(6n) {
		background: red;
	}
</style>
