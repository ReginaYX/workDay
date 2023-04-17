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
	import datejs from "@/static/date.js"
	export default {
		data() {
			return {
				nowObj: {},
				form: {
					work: '2023-03-30',
					period: 6
				},
				selected: []
			}
		},
		onLoad() {
			// this.nowObj = date.timeWeekFormat(new Date())
			// this.form.work = this.nowObj.date
			// // this.searchRest()
			// this.loopPeriod()
		},
		onShow() {
			uni.showLoading()
			this.nowObj = datejs.timeWeekFormat(new Date())
			let gap = datejs.getBeforeDate(this.form.work)
			console.log(gap)
			if (gap <= this.form.period * -1) {
				var date = new Date(this.form.work);
				var gapPeriod = Math.floor((gap*-1) / this.form.period)
				date.setDate(date.getDate() + this.form.period * gapPeriod);
				this.form.work = datejs.formatDate(date)
			}
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

					this.selected.push({
						date: datejs.formatDate(dd), // date为所需要打点的日期
						type: "rest" // abnormal显示为橙色点
					})
				}
				// this.selected.push(arr)
				// this.loopPeriod(arr)
			},
			loopPeriod(arr) {
				this.selected = []
				for (let l = 0; l < 60; l++) {
					var date = new Date(this.form.work);
					date.setDate(date.getDate() + this.form.period * l);
					if (l % 2 == 0) {
						this.searchRest(date)
					} else {
						continue
					}
				}
				uni.hideLoading()
				// this.selected = arr
			},

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
