import Taro , { Component } from '@tarojs/taro';
import { View, Text} from '@tarojs/components';

class Dal extends Component {
  state={} 
  componentWillMount () {} 
  componentDidMount () {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  chuandi(e) {
    e.stopPropagation();
    this.props.onJieshou('789');
  }
  render() {
      let {pp} = this.props
    return (
      <View>
        Dal{pp}
        <Text onClick={this.chuandi.bind(this)}>传递给父组件789</Text>
      </View>
    );
  }
}
export default Dal;