import React, { Component, createContext } from 'react';

const themeConfig = {
  light: {
    mainBGColor: 'linear-gradient(90deg, #dae3ff 0%, snow 50%, #dae3ff 100%)',
    headerBGColor:
      'linear-gradient(90deg, #41e06e 0%, #91ffb1 50%, #41e06e 100%)',
    contentColor: '#1d2bcc',
    mainShadowBox: '0px 4px 10px -3px rgba(0, 0, 0, 0.75)',
    linkColor: '#1d2bcc',
    messageColor: 'black',
    mobileMenu: 'linear-gradient(90deg, #ffd1d1 0%, snow 50%, #ffd1d1 100%)',
  },

  dark: {
    mainBGColor: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
    headerBGColor:
      'linear-gradient(90deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    contentColor: '#ccc',
    mainShadowBox: '0px 4px 10px -3px rgba(255, 255, 255, 0.75)',
    linkColor: '#00d0ff',
    messageColor: '#ccc',
    mobileMenu: 'linear-gradient(90deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  },
};

export const ContextOfTheme = createContext(themeConfig.light);

class ThemeContext extends Component {
  static Consumer = ContextOfTheme.Consumer;

  toggleTheme = () => {
    const { theme, config } = this.state;
    this.setState({
      theme: theme === 'dark' ? 'light' : 'dark',
      config:
        config === themeConfig.light ? themeConfig.dark : themeConfig.light,
    });
    window.localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
  };

  state = {
    theme: 'light',
    toggleTheme: this.toggleTheme,
    config: themeConfig.light,
  };

  componentDidMount() {
    if (window.localStorage.getItem('theme')) {
      const currentTheme = window.localStorage.getItem('theme');
      this.setState({
        theme: currentTheme,
        config: themeConfig[currentTheme],
      });
    } else {
      window.localStorage.setItem('theme', 'light');
    }
  }

  render() {
    const { children } = this.props;
    return (
      <ContextOfTheme.Provider
        value={{
          ...this.state,
        }}
      >
        {children}
      </ContextOfTheme.Provider>
    );
  }
}

export default ThemeContext;
