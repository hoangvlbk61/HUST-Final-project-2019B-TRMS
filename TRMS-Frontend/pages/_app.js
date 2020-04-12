import '../assets/styles.less';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import makeStore from '../redux-saga/store';
import App, { Container } from 'next/app';

import AppProvider from '../components/shared/AppProvider';
import { GlobalStyles } from '../components/styles/GlobalStyles';
import Head from 'next/head';
import NProgress from 'nprogress';
import Page from '../components/Page';
import Router from 'next/router';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

class MyApp extends App {
  // static async getInitialProps({ Component, ctx, req }) {
  //   let pageProps = {};
  //   const userAgent = ctx.req
  //     ? ctx.req.headers['user-agent']
  //     : navigator.userAgent;

  //   let ie = false;
  //   if (userAgent.match(/Edge/i) || userAgent.match(/Trident.*rv[ :]*11\./i)) {
  //     ie = true;
  //   }

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   pageProps.query = ctx.query;
  //   pageProps.ieBrowser = ie;
  //   return { pageProps };
  // }

  render() {
		const { Component, pageProps, store } = this.props;

		return (
			<Container>
				<Provider store={store}>
					<GlobalStyles />
					<Head>
						<meta
							name="viewport"
							content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
						/>	
						<meta charSet="utf-8" />
						<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
						<link rel="shortcut icon" href="/static/images/Headbot.png" />
						<title> SBot </title>{' '}
						<link href="https://fonts.googleapis.com/css?family=Anonymous+Pro:400,700" rel="stylesheet" />{' '}
						{pageProps.ieBrowser && (
							<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js" />
						)}{' '}
					</Head>{' '}
					<AppProvider>
						<Page>
							<Component {...pageProps} />{' '}
						</Page>{' '}
					</AppProvider>{' '}
				</Provider>
			</Container>
		);
	}
}

export default withRedux(makeStore)(MyApp);