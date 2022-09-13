// Hisotry API부분
export const changeBrowserRoute = route => {
	// 기존의 히스토리인경우 스택에 쌓지않음
	if (route === location.pathname) {
		history.replaceState(null, '', route);
	}
	// 기존의 히스토리가 아닐경우 pushState
	else {
		history.pushState(null, '', route);
	}
};
