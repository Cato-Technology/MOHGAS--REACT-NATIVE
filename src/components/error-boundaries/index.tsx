import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

import Logo from '../../assets/images/logo.png';

import {styles} from './styles';
class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error('from error boundary', error, errorInfo);
  }

  render() {
    if (this.state?.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <View style={styles.container}>
            <View style={styles.icon}>
              <Image
                style={{marginTop: 100, width: 250, height: 250}}
                source={Logo}
              />
            </View>
            <Text style={styles.heading}>System Under Maintenance</Text>
            <Text style={styles.subHeading}>
              Mohgas App is not available at the moment.
            </Text>
            <Text style={styles.subHeading}>Please come again later.</Text>
          </View>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
