import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
	${reset}
	html,
	body {
		background-color: #263143;
		padding: 0;
		margin: 0;
		-webkit-tap-highlight-color: transparent;
		font-family:'neuzeit-grotesk', sans-serif;
		font-size: 14px;
		@media (max-width: 810px){
			font-size: 13px;
		}
	}
	input, button, textarea{
		font-family:'neuzeit-grotesk', sans-serif;
	}
	a {
		color: inherit;
		text-decoration: none;
	}
	* {
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
	}
`;