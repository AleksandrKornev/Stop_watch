import React from 'react';
import { StyleSheet, View, Text, Button, Animated, TouchableOpacity, Dimensions  } from 'react-native';;

export default class App extends React.Component {
  state = {
    animateTextGreetingMargin: new Animated.Value(-200),
    animateTextGreetingOpacity : new Animated.Value(0),
    textGreetingDisplay: 'flex',
    twoDisplay : 'none',
    twoAnimateOpacity : new Animated.Value(0),
    twoAnimateOpacityText: new Animated.Value(1),
    twoDisplayBlock : 'none',
    twoOpacityBlock : new Animated.Value(0),
    seconds: 0,
    minutes: 0,
    hours  : 0 ,
    time   : 0 ,
    statusStopWatch : false,
    statusResetWatch : false,
    animateHeightTwoBlockNode : new Animated.Value(0)
  };
  componentWillMount () {
    
  }
  componentDidMount () {
    
    Animated.timing(this.state.animateTextGreetingMargin, {
      toValue: 0,
      duration: 1000
    }).start()
    Animated.timing(this.state.animateTextGreetingOpacity, {
      toValue: 1,
      duration: 1500
    }).start(
        () => {
          Animated.timing(this.state.animateTextGreetingOpacity,{
            toValue: 0,
            duration: 1200
          }).start(
              () => {
                this.setState({textGreetingDisplay: 'none'})
                this.setState({twoDisplay: 'flex'})
                Animated.timing (this.state.twoAnimateOpacity,{
                    toValue: 1,
                    duration: 1000
                }).start(
                    () =>
                      Animated.timing (this.state.twoAnimateOpacityText, {
                         toValue: 0,
                         duration: 1500
                      }).start(
                        () => {
                          this.setState({twoDisplayBlock: 'flex'})
                          Animated.timing(this.state.twoOpacityBlock,{
                                toValue: 1,
                                duration: 1000
                          }).start(this.Home())
                        }
                      )
                )
              }
            )
        }
      )
  }

  Home = () => {
      this.setState({time : ((this.state.hours < 10 ? '0' + this.state.hours : this.state.hours)  + ':' + ( this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes) + ':' + ( this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds))})
  }

  animateHeight = () => {
    Animated.timing(this.state.animateHeightTwoBlockNode, {
      toValue: this.state.animateHeightTwoBlockNode._value + this.counterHeightTwoBlock,
      duration: 800
    }).start(
      () => this.setState({animateHeightTwoBlockNode: new Animated.Value(this.state.animateHeightTwoBlockNode._value)})
    )
    
  }

  Start = () => {
    if(this.state.statusStopWatch == false){
      st = setInterval(() => {
        if(this.state.seconds < 60) {
          this.setState({seconds : this.state.seconds + 1})
          this.animateHeight()
          //this.setState({animateHeightTwoBlockNode: this.state.animateHeightTwoBlockNode + this.counterHeightTwoBlock})
        }
        if(this.state.seconds == 60) {
          this.setState({minutes: this.state.minutes + 1})
          this.setState({seconds: 0})
          if(this.state.minutes == 60) {
            this.setState({hours: this.state.hours + 1})
            this.setState({minutes: 0})
          }
        }
        this.setState({time : ((this.state.hours < 10 ? '0' + this.state.hours : this.state.hours)  + ':' + ( this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes) + ':' + ( this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds))})
      }, 1000)
      this.setState({statusStopWatch: true})
      this.setState({statusResetWatch: false})
    }
  }

  Pause = () => {
    if(this.state.statusStopWatch == true){ 
      clearInterval(st)
      this.setState({statusStopWatch: false})
      this.setState({statusResetWatch: false})
    }
  }

  Reset = () => {
    if(this.state.statusResetWatch == false && typeof st != "undefined"){ 
      clearInterval(st)
      this.setState({statusStopWatch: false})
      this.setState({seconds: 0})
      this.setState({minutes: 0})
      this.setState({hours: 0})
      this.setState({time : '00:00:00'})
      this.setState({statusResetWatch: true})
    }
  }

  counterHeightTwoBlock = 2.5
  render() {
    

      return(
        <View style={styles.container}>
          <Animated.View style={[{marginTop: this.state.animateTextGreetingMargin, opacity: this.state.animateTextGreetingOpacity, display: this.state.textGreetingDisplay}]}>
            <Text 
            ref="greeting" 
            style={[styles.greeting]}
            >
              Hello
            </Text>
          </Animated.View>
          <Animated.View style={[{display : this.state.twoDisplay, opacity: this.state.twoAnimateOpacity}, styles.twoDisplay]}>
              <Animated.Text style={[{fontSize : 30, color: 'lightskyblue',opacity: this.state.twoAnimateOpacityText}]}>World</Animated.Text>
              <Animated.View style={[styles.twoBlock, {display : this.state.twoDisplayBlock,opacity : this.state.twoOpacityBlock}]}>
                <Animated.View style={[{backgroundColor: 'rgba(255,255,255, 0.4)', width: '100%', height: this.state.animateHeightTwoBlockNode , position: 'absolute', bottom: 0}]}>
                </Animated.View>
              </Animated.View>
              <Animated.Text style={[{display : this.state.twoDisplayBlock,opacity : this.state.twoOpacityBlock, fontSize: 18}]}>
                {this.state.time}
              </Animated.Text>
              <Animated.View style={[{display : this.state.twoDisplayBlock,opacity : this.state.twoOpacityBlock, position: 'absolute', bottom: '15%', flexDirection: 'row', justifyContent: 'center'}]}>
                <TouchableOpacity
                  onPress={this.Start}
                >
                  <Animated.View style={[styles.button]}>
                    <Animated.Text style={[styles.buttonText]}>
                      Старт
                    </Animated.Text>
                  </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.Pause}
                >
                  <Animated.View style={[styles.button]}>
                    <Animated.Text style={[styles.buttonText]}>
                      Пауза
                    </Animated.Text>
                  </Animated.View>
                </TouchableOpacity>
                
              </Animated.View>
          </Animated.View>
          <Animated.View style={[{display : this.state.twoDisplayBlock,opacity : this.state.twoOpacityBlock}, styles.buttonResetContainer]}>
            <TouchableOpacity
              onPress={this.Reset}
              style={[styles.buttonReset]}
            >
              <Animated.View style={[styles.button, styles.buttonResetStyle]}>
                <Animated.Text style={[styles.buttonText]}>
                  Сброс
                </Animated.Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
          
          {/* bad works touchableOpacity with absolute*/}
        </View>
      )
  }
}

/*<Animated.View style={[styles.button, styles.buttonResetStyle]}>
                    <Animated.Text style={[styles.buttonText]}>
                      Сброс
                    </Animated.Text>
                  </Animated.View>*/

const heightTwoBlockNode   = 150
//git new text
//git new text 2

//git new text 3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  greeting: {
    fontSize: 30,
    color: 'gray',
  },
  twoDisplay: {
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    position: 'relative'
  },
  twoBlock : {
    position: 'relative',
    display: 'flex',
    width: '50%',
    height: heightTwoBlockNode,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius : 30,
    marginTop: '-20%',
    marginBottom: '5%',
    overflow: 'hidden'
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.03)'
  },
  buttonText: {
    fontSize: 16,
    color: 'lightslategray',
    textAlign : 'center',
    zIndex: 1
  },
  buttonResetContainer : {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonReset : {
    width : 150,
    height: 45,
    margin: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)'
  },
  buttonResetStyle: {
    width: '50%',
    padding : 0,
    margin: 0,
    zIndex : 0,
    backgroundColor: 'transparent'
  }
});
