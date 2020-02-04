import Taro , { Component } from '@tarojs/taro';
import { View, Text, Input } from '@tarojs/components';
import './todo.less';

class Todo extends Component {
  state = {
      // 总数
      num: 0,
      // 列表
      list: [],
      // input绑定值
      ipt: ''
  }
  
  componentWillMount () {
      console.log(this.$router.params);
  }
  componentDidMount () {} 
//   componentWillReceiveProps (nextProps,nextContext) {} 
  componentWillUnmount () {} 
  componentDidShow () {} 
  componentDidHide () {} 
  componentDidCatchError () {} 
  componentDidNotFound () {} 
  config = {
    navigationBarTitleText: 'one页'
  }
  addNum = () => {
    let num = this.state.num
    this.setState({
        num: num+=1
    })
  }
  addList = (e) => {
    e.stopPropagation();
    let {list} = this.state;
    const inputVal = this.inputVal;
    if(inputVal === '') {
        return 
    } else {
        list.push(inputVal);
    }
    this.setState({
        list,
        ipt: null
    })
  }
  deleteList(i, e){
    e.stopPropagation();
    console.log(i);
    let {list} = this.state;
    list.splice(i, 1);
    this.setState({
        list
    })
  }
  addIpt(e){
    e.stopPropagation();
    this.inputVal = e.target.value;
  }
  render() {
    let { ipt } = this.state;
    return (  
      <View className='one'>
        <Text onClick={() => this.addNum()}> 总数 + </Text>
        {
            this.state.num
        }
        <View>
            <Input className='ipt' value={ipt} onInput={this.addIpt.bind(this)}></Input>
            <Text onClick={this.addList}>
                增加数据
            </Text>
            {
                this.state.list.map((v, i) => {
                    return (<View key={i}>
                        {v}
                        <Text onClick={this.deleteList.bind(this, i)}>
                            删除 {i}
                        </Text>
                    </View>)
                })
            }
        </View>
      </View>
    );
  }
}
export default Todo;