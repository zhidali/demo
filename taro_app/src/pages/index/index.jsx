import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { Dal } from '../../components/dal/dal'
import { add, minus, asyncAdd } from '../../actions/counter';

import './index.less';

@connect(
	({ counter }) => ({
		counter
	}),
	(dispatch) => ({
		add() {
			dispatch(add());
		},
		dec() {
			dispatch(minus());
		},
		asyncAdd() {
			dispatch(asyncAdd());
		}
	})
)
class Index extends Component {
	componentDidMount() {
		Taro.navigateTo({
			url: '/pages/one/one?id=123'
		})
	}
	componentWillReceiveProps(nextProps) {
		console.log(this.props, nextProps);
	}
	
	config = {
		navigationBarTitleText: '首页'
	};
	// componentWillUnmount () { }
	
	// componentDidShow () { }

	// componentDidHide () { }
	toOne = () => {
		// 跳转到目的页面，打开新页面
		Taro.navigateTo({
			url: '/pages/todo/todo?id=123'
		})
		// 跳转当前页面
		// Taro.redirectTo({
		// 	url: '/pages/one/one'
		// });
	}
	toJ = (val) => {
		console.log('接受到' + val)
	}
	render() {
		return (
			<View className='index'>
				<Dal pp='123' onJieshou={this.toJ}></Dal>
				<Button className='add_btn' onClick={this.props.add}>
					+ 增加
				</Button>
				<Button className='dec_btn' onClick={this.props.dec}>
					-
				</Button>
				<Button className='dec_btn' onClick={this.props.asyncAdd}>
					async
				</Button>
				<View>
					<Text>{this.props.counter.num}</Text>
				</View>
				<View>
					<Text>Hello, World</Text>
				</View>
				<View onClick={() => this.toOne()}>
					跳转到one
				</View>
			</View>
		);
	}
}

export default Index;


